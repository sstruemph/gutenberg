/**
 * WordPress dependencies
 */
import {
	useState,
	createPortal,
	forwardRef,
	useMemo,
	useEffect,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useResizeObserver,
	useMergeRefs,
	useRefEffect,
	useDisabled,
} from '@wordpress/compose';
import { __experimentalStyleProvider as StyleProvider } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useBlockSelectionClearer } from '../block-selection-clearer';
import { useWritingFlow } from '../writing-flow';
import { useCompatibilityStyles } from './use-compatibility-styles';
import { store as blockEditorStore } from '../../store';

/**
 * Bubbles some event types (keydown, keypress, and dragover) to parent document
 * document to ensure that the keyboard shortcuts and drag and drop work.
 *
 * Ideally, we should remove event bubbling in the future. Keyboard shortcuts
 * should be context dependent, e.g. actions on blocks like Cmd+A should not
 * work globally outside the block editor.
 *
 * @param {Document} doc Document to attach listeners to.
 */
function bubbleEvents( doc ) {
	const { defaultView } = doc;
	const { frameElement } = defaultView;

	function bubbleEvent( event ) {
		const prototype = Object.getPrototypeOf( event );
		const constructorName = prototype.constructor.name;
		const Constructor = window[ constructorName ];

		const init = {};

		for ( const key in event ) {
			init[ key ] = event[ key ];
		}

		if ( event instanceof defaultView.MouseEvent ) {
			const rect = frameElement.getBoundingClientRect();
			init.clientX += rect.left;
			init.clientY += rect.top;
		}

		const newEvent = new Constructor( event.type, init );
		const cancelled = ! frameElement.dispatchEvent( newEvent );

		if ( cancelled ) {
			event.preventDefault();
		}
	}

	const eventTypes = [ 'dragover', 'mousemove' ];

	for ( const name of eventTypes ) {
		doc.addEventListener( name, bubbleEvent );
	}
}

function Iframe( {
	contentRef,
	children,
	tabIndex = 0,
	scale = 1,
	frameSize = 0,
	expand = false,
	readonly,
	forwardedRef: ref,
	...props
} ) {
	const { styles = '', scripts = '' } = useSelect(
		( select ) =>
			select( blockEditorStore ).getSettings().__unstableResolvedAssets ??
			{},
		[]
	);
	const [ iframeDocument, setIframeDocument ] = useState();
	const compatStyles = useCompatibilityStyles();
	const clearerRef = useBlockSelectionClearer();
	const [ before, writingFlowRef, after ] = useWritingFlow();
	const [ contentResizeListener, { height: contentHeight } ] =
		useResizeObserver();
	const disabledRef = useDisabled( { isDisabled: ! readonly } );
	const bodyRef = useMergeRefs( [
		contentRef,
		clearerRef,
		writingFlowRef,
		disabledRef,
	] );
	const setRef = useRefEffect( ( node ) => {
		let iFrameDocument;
		// Prevent the default browser action for files dropped outside of dropzones.
		function preventFileDropDefault( event ) {
			event.preventDefault();
		}
		function onLoad() {
			const { contentDocument, ownerDocument } = node;
			const { documentElement } = contentDocument;
			iFrameDocument = contentDocument;

			bubbleEvents( contentDocument );
			setIframeDocument( contentDocument );
			clearerRef( documentElement );

			contentDocument.body.classList.add( 'wp-block-editor__iframe' );
			contentDocument.body.classList.add( 'editor-styles-wrapper' );

			// Ideally ALL classes that are added through get_body_class should
			// be added in the editor too, which we'll somehow have to get from
			// the server in the future (which will run the PHP filters).
			for ( const className of ownerDocument.body.classList ) {
				if (
					className.startsWith( 'admin-color-' ) ||
					className.startsWith( 'post-type-' ) ||
					className === 'wp-embed-responsive'
				) {
					contentDocument.body.classList.add( className );
				}
			}

			for ( const compatStyle of compatStyles ) {
				if ( contentDocument.getElementById( compatStyle.id ) ) {
					continue;
				}

				contentDocument.head.appendChild(
					compatStyle.cloneNode( true )
				);
			}

			contentDocument.dir = ownerDocument.dir;

			for ( const compatStyle of compatStyles ) {
				if ( contentDocument.getElementById( compatStyle.id ) ) {
					continue;
				}

				contentDocument.head.appendChild(
					compatStyle.cloneNode( true )
				);

				// eslint-disable-next-line no-console
				console.warn(
					`${ compatStyle.id } was added to the iframe incorrectly. Please use block.json or enqueue_block_assets to add styles to the iframe.`,
					compatStyle
				);
			}

			iFrameDocument.addEventListener(
				'dragover',
				preventFileDropDefault,
				false
			);
			iFrameDocument.addEventListener(
				'drop',
				preventFileDropDefault,
				false
			);
		}

		node.addEventListener( 'load', onLoad );

		return () => {
			node.removeEventListener( 'load', onLoad );
			iFrameDocument?.removeEventListener(
				'dragover',
				preventFileDropDefault
			);
			iFrameDocument?.removeEventListener(
				'drop',
				preventFileDropDefault
			);
		};
	}, [] );

	// Correct doctype is required to enable rendering in standards
	// mode. Also preload the styles to avoid a flash of unstyled
	// content.
	const html =
		'<!doctype html>' +
		'<head>' +
		'<meta charset="utf-8">' +
		'<style>html{height:auto!important;}body{margin:0}</style>' +
		styles +
		'</head>' +
		'<body>' +
		scripts +
		'</body>';

	const [ src, cleanup ] = useMemo( () => {
		const _src = URL.createObjectURL(
			new window.Blob( [ html ], { type: 'text/html' } )
		);
		return [ _src, () => URL.revokeObjectURL( _src ) ];
	}, [ html ] );

	useEffect( () => cleanup, [ cleanup ] );

	// We need to counter the margin created by scaling the iframe. If the scale
	// is e.g. 0.45, then the top + bottom margin is 0.55 (1 - scale). Just the
	// top or bottom margin is 0.55 / 2 ((1 - scale) / 2).
	const marginFromScaling = ( contentHeight * ( 1 - scale ) ) / 2;

	return (
		<>
			{ tabIndex >= 0 && before }
			<iframe
				{ ...props }
				style={ {
					...props.style,
					height: expand ? contentHeight : props.style?.height,
					marginTop:
						scale !== 1
							? -marginFromScaling + frameSize
							: props.style?.marginTop,
					marginBottom:
						scale !== 1
							? -marginFromScaling + frameSize
							: props.style?.marginBottom,
					transform:
						scale !== 1
							? `scale( ${ scale } )`
							: props.style?.transform,
					transition: 'all .3s',
				} }
				ref={ useMergeRefs( [ ref, setRef ] ) }
				tabIndex={ tabIndex }
				src={ src }
				title={ __( 'Editor canvas' ) }
			>
				{ iframeDocument &&
					createPortal(
						<div ref={ bodyRef }>
							{ contentResizeListener }
							<StyleProvider document={ iframeDocument }>
								{ children }
							</StyleProvider>
						</div>,
						iframeDocument.body
					) }
			</iframe>
			{ tabIndex >= 0 && after }
		</>
	);
}

function IframeIfReady( props, ref ) {
	const isInitialised = useSelect(
		( select ) =>
			select( blockEditorStore ).getSettings().__internalIsInitialized,
		[]
	);

	// We shouldn't render the iframe until the editor settings are initialised.
	// The initial settings are needed to get the styles for the srcDoc, which
	// cannot be changed after the iframe is mounted. srcDoc is used to to set
	// the initial iframe HTML, which is required to avoid a flash of unstyled
	// content.
	if ( ! isInitialised ) {
		return null;
	}

	return <Iframe { ...props } forwardedRef={ ref } />;
}

export default forwardRef( IframeIfReady );
