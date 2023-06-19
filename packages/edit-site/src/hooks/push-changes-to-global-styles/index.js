/**
 * External dependencies
 */
import { get, set } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorAdvancedControls,
	store as blockEditorStore,
	privateApis as blockEditorPrivateApis,
} from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	__EXPERIMENTAL_STYLE_PROPERTY as STYLE_PROPERTY,
	getBlockType,
} from '@wordpress/blocks';
import { useContext, useMemo, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { useSupportedStyles } from '../../components/global-styles/hooks';
import { unlock } from '../../lock-unlock';

const { GlobalStylesContext, useBlockEditingMode } = unlock(
	blockEditorPrivateApis
);

// TODO: Temporary duplication of constant in @wordpress/block-editor. Can be
// removed by moving PushChangesToGlobalStylesControl to
// @wordpress/block-editor.
const STYLE_PATH_TO_CSS_VAR_INFIX = {
	'border.color': 'color',
	'color.background': 'color',
	'color.text': 'color',
	'elements.link.color.text': 'color',
	'elements.link.:hover.color.text': 'color',
	'elements.link.typography.fontFamily': 'font-family',
	'elements.link.typography.fontSize': 'font-size',
	'elements.button.color.text': 'color',
	'elements.button.color.background': 'color',
	'elements.button.typography.fontFamily': 'font-family',
	'elements.button.typography.fontSize': 'font-size',
	'elements.caption.color.text': 'color',
	'elements.heading.color': 'color',
	'elements.heading.color.background': 'color',
	'elements.heading.typography.fontFamily': 'font-family',
	'elements.heading.gradient': 'gradient',
	'elements.heading.color.gradient': 'gradient',
	'elements.h1.color': 'color',
	'elements.h1.color.background': 'color',
	'elements.h1.typography.fontFamily': 'font-family',
	'elements.h1.color.gradient': 'gradient',
	'elements.h2.color': 'color',
	'elements.h2.color.background': 'color',
	'elements.h2.typography.fontFamily': 'font-family',
	'elements.h2.color.gradient': 'gradient',
	'elements.h3.color': 'color',
	'elements.h3.color.background': 'color',
	'elements.h3.typography.fontFamily': 'font-family',
	'elements.h3.color.gradient': 'gradient',
	'elements.h4.color': 'color',
	'elements.h4.color.background': 'color',
	'elements.h4.typography.fontFamily': 'font-family',
	'elements.h4.color.gradient': 'gradient',
	'elements.h5.color': 'color',
	'elements.h5.color.background': 'color',
	'elements.h5.typography.fontFamily': 'font-family',
	'elements.h5.color.gradient': 'gradient',
	'elements.h6.color': 'color',
	'elements.h6.color.background': 'color',
	'elements.h6.typography.fontFamily': 'font-family',
	'elements.h6.color.gradient': 'gradient',
	'color.gradient': 'gradient',
	'spacing.blockGap': 'spacing',
	'typography.fontSize': 'font-size',
	'typography.fontFamily': 'font-family',
};

// TODO: Temporary duplication of constant in @wordpress/block-editor. Can be
// removed by moving PushChangesToGlobalStylesControl to
// @wordpress/block-editor.
const STYLE_PATH_TO_PRESET_BLOCK_ATTRIBUTE = {
	'border.color': 'borderColor',
	'color.background': 'backgroundColor',
	'color.text': 'textColor',
	'color.gradient': 'gradient',
	'typography.fontSize': 'fontSize',
	'typography.fontFamily': 'fontFamily',
};

function getBorderStyleChanges( border, presetColor ) {
	if ( ! border && ! presetColor ) {
		return [];
	}

	const changes = [
		...getFallbackBorderStyleChange( border?.top, 'top' ),
		...getFallbackBorderStyleChange( border?.right, 'right' ),
		...getFallbackBorderStyleChange( border?.bottom, 'bottom' ),
		...getFallbackBorderStyleChange( border?.left, 'left' ),
	];

	// Handle a flat border i.e. all sides the same, CSS shorthand.
	const { color: customColor, style, width } = border || {};
	const hasColorOrWidth = presetColor || customColor || width;

	if ( hasColorOrWidth && ! style ) {
		changes.push( { path: [ 'border', 'style' ], value: 'solid' } );
	}

	return changes;
}

function getFallbackBorderStyleChange( border, side ) {
	if ( ! border ) {
		return [];
	}

	const { color, style, width } = border;
	const hasColorOrWidth = color || width;

	if ( ! hasColorOrWidth || style ) {
		return [];
	}

	return [ { path: [ 'border', side, 'style' ], value: 'solid' } ];
}

function useChangesToPush( name, attributes ) {
	const supports = useSupportedStyles( name );

	return useMemo( () => {
		const changes = supports.flatMap( ( key ) => {
			if ( ! STYLE_PROPERTY[ key ] ) {
				return [];
			}
			const { value: path } = STYLE_PROPERTY[ key ];
			const presetAttributeKey = path.join( '.' );
			const presetAttributeValue =
				attributes[
					STYLE_PATH_TO_PRESET_BLOCK_ATTRIBUTE[ presetAttributeKey ]
				];
			const value = presetAttributeValue
				? `var:preset|${ STYLE_PATH_TO_CSS_VAR_INFIX[ presetAttributeKey ] }|${ presetAttributeValue }`
				: get( attributes.style, path );
			return value ? [ { path, value } ] : [];
		} );

		// To ensure display of a visible border, global styles require a
		// default border style if a border color or width is present.
		getBorderStyleChanges(
			attributes.style?.border,
			attributes.borderColor
		).forEach( ( change ) => changes.push( change ) );

		return changes;
	}, [ supports, attributes ] );
}

function cloneDeep( object ) {
	return ! object ? {} : JSON.parse( JSON.stringify( object ) );
}

function PushChangesToGlobalStylesControl( {
	name,
	attributes,
	setAttributes,
} ) {
	const changes = useChangesToPush( name, attributes );

	const { user: userConfig, setUserConfig } =
		useContext( GlobalStylesContext );

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch( blockEditorStore );
	const { createSuccessNotice } = useDispatch( noticesStore );

	const pushChanges = useCallback( () => {
		if ( changes.length === 0 ) {
			return;
		}

		const { style: blockStyles } = attributes;

		const newBlockStyles = cloneDeep( blockStyles );
		const newUserConfig = cloneDeep( userConfig );

		for ( const { path, value } of changes ) {
			set( newBlockStyles, path, undefined );
			set( newUserConfig, [ 'styles', 'blocks', name, ...path ], value );
		}

		const newBlockAttributes = {
			borderColor: undefined,
			backgroundColor: undefined,
			textColor: undefined,
			gradient: undefined,
			fontSize: undefined,
			fontFamily: undefined,
			style: newBlockStyles,
		};

		// @wordpress/core-data doesn't support editing multiple entity types in
		// a single undo level. So for now, we disable @wordpress/core-data undo
		// tracking and implement our own Undo button in the snackbar
		// notification.
		__unstableMarkNextChangeAsNotPersistent();
		setAttributes( newBlockAttributes );
		setUserConfig( () => newUserConfig, { undoIgnore: true } );

		createSuccessNotice(
			sprintf(
				// translators: %s: Title of the block e.g. 'Heading'.
				__( '%s styles applied.' ),
				getBlockType( name ).title
			),
			{
				type: 'snackbar',
				actions: [
					{
						label: __( 'Undo' ),
						onClick() {
							__unstableMarkNextChangeAsNotPersistent();
							setAttributes( { style: blockStyles } );
							setUserConfig( () => userConfig, {
								undoIgnore: true,
							} );
						},
					},
				],
			}
		);
	}, [
		changes,
		attributes,
		userConfig,
		name,
		createSuccessNotice,
		setAttributes,
		setUserConfig,
		__unstableMarkNextChangeAsNotPersistent,
	] );

	return (
		<BaseControl
			className="edit-site-push-changes-to-global-styles-control"
			help={ sprintf(
				// translators: %s: Title of the block e.g. 'Heading'.
				__(
					'Apply this block’s typography, spacing, dimensions, and color styles to all %s blocks.'
				),
				getBlockType( name ).title
			) }
		>
			<BaseControl.VisualLabel>
				{ __( 'Styles' ) }
			</BaseControl.VisualLabel>
			<Button
				variant="primary"
				disabled={ changes.length === 0 }
				onClick={ pushChanges }
			>
				{ __( 'Apply globally' ) }
			</Button>
		</BaseControl>
	);
}

const withPushChangesToGlobalStyles = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const blockEditingMode = useBlockEditingMode();
		return (
			<>
				<BlockEdit { ...props } />
				{ blockEditingMode === 'default' && (
					<InspectorAdvancedControls>
						<PushChangesToGlobalStylesControl { ...props } />
					</InspectorAdvancedControls>
				) }
			</>
		);
	}
);

addFilter(
	'editor.BlockEdit',
	'core/edit-site/push-changes-to-global-styles',
	withPushChangesToGlobalStyles
);
