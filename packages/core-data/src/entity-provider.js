/**
 * WordPress dependencies
 */
import {
	createContext,
	useContext,
	useCallback,
	useEffect,
} from '@wordpress/element';
import { useSelect, useDispatch, useRegistry } from '@wordpress/data';
import { parse, __unstableSerializeAndClean } from '@wordpress/blocks';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './name';
import { unlock } from './private-apis';

/** @typedef {import('@wordpress/blocks').WPBlock} WPBlock */

const EMPTY_ARRAY = [];

let oldFootnotes = {};

/**
 * Internal dependencies
 */
import { rootEntitiesConfig, additionalEntityConfigLoaders } from './entities';

const entityContexts = {
	...rootEntitiesConfig.reduce( ( acc, loader ) => {
		if ( ! acc[ loader.kind ] ) {
			acc[ loader.kind ] = {};
		}
		acc[ loader.kind ][ loader.name ] = {
			context: createContext( undefined ),
		};
		return acc;
	}, {} ),
	...additionalEntityConfigLoaders.reduce( ( acc, loader ) => {
		acc[ loader.kind ] = {};
		return acc;
	}, {} ),
};
const getEntityContext = ( kind, name ) => {
	if ( ! entityContexts[ kind ] ) {
		throw new Error( `Missing entity config for kind: ${ kind }.` );
	}

	if ( ! entityContexts[ kind ][ name ] ) {
		entityContexts[ kind ][ name ] = {
			context: createContext( undefined ),
		};
	}

	return entityContexts[ kind ][ name ].context;
};

/**
 * Context provider component for providing
 * an entity for a specific entity.
 *
 * @param {Object} props          The component's props.
 * @param {string} props.kind     The entity kind.
 * @param {string} props.type     The entity name.
 * @param {number} props.id       The entity ID.
 * @param {*}      props.children The children to wrap.
 *
 * @return {Object} The provided children, wrapped with
 *                   the entity's context provider.
 */
export default function EntityProvider( { kind, type: name, id, children } ) {
	const Provider = getEntityContext( kind, name ).Provider;
	return <Provider value={ id }>{ children }</Provider>;
}

/**
 * Hook that returns the ID for the nearest
 * provided entity of the specified type.
 *
 * @param {string} kind The entity kind.
 * @param {string} name The entity name.
 */
export function useEntityId( kind, name ) {
	return useContext( getEntityContext( kind, name ) );
}

/**
 * Hook that returns the value and a setter for the
 * specified property of the nearest provided
 * entity of the specified type.
 *
 * @param {string} kind  The entity kind.
 * @param {string} name  The entity name.
 * @param {string} prop  The property name.
 * @param {string} [_id] An entity ID to use instead of the context-provided one.
 *
 * @return {[*, Function, *]} An array where the first item is the
 *                            property value, the second is the
 *                            setter and the third is the full value
 * 							  object from REST API containing more
 * 							  information like `raw`, `rendered` and
 * 							  `protected` props.
 */
export function useEntityProp( kind, name, prop, _id ) {
	const providerId = useEntityId( kind, name );
	const id = _id ?? providerId;

	const { value, fullValue } = useSelect(
		( select ) => {
			const { getEntityRecord, getEditedEntityRecord } =
				select( STORE_NAME );
			const record = getEntityRecord( kind, name, id ); // Trigger resolver.
			const editedRecord = getEditedEntityRecord( kind, name, id );
			return record && editedRecord
				? {
						value: editedRecord[ prop ],
						fullValue: record[ prop ],
				  }
				: {};
		},
		[ kind, name, id, prop ]
	);
	const { editEntityRecord } = useDispatch( STORE_NAME );
	const setValue = useCallback(
		( newValue ) => {
			editEntityRecord( kind, name, id, {
				[ prop ]: newValue,
			} );
		},
		[ kind, name, id, prop ]
	);

	return [ value, setValue, fullValue ];
}

/**
 * Hook that returns block content getters and setters for
 * the nearest provided entity of the specified type.
 *
 * The return value has the shape `[ blocks, onInput, onChange ]`.
 * `onInput` is for block changes that don't create undo levels
 * or dirty the post, non-persistent changes, and `onChange` is for
 * peristent changes. They map directly to the props of a
 * `BlockEditorProvider` and are intended to be used with it,
 * or similar components or hooks.
 *
 * @param {string} kind         The entity kind.
 * @param {string} name         The entity name.
 * @param {Object} options
 * @param {string} [options.id] An entity ID to use instead of the context-provided one.
 *
 * @return {[WPBlock[], Function, Function]} The block array and setters.
 */
export function useEntityBlockEditor( kind, name, { id: _id } = {} ) {
	const [ meta, updateMeta ] = useEntityProp( kind, name, 'meta', _id );
	const registry = useRegistry();
	const providerId = useEntityId( kind, name );
	const id = _id ?? providerId;
	const { content, blocks } = useSelect(
		( select ) => {
			const { getEditedEntityRecord } = select( STORE_NAME );
			const editedRecord = getEditedEntityRecord( kind, name, id );
			return {
				blocks: editedRecord.blocks,
				content: editedRecord.content,
			};
		},
		[ kind, name, id ]
	);
	const { __unstableCreateUndoLevel, editEntityRecord } =
		useDispatch( STORE_NAME );

	useEffect( () => {
		// Load the blocks from the content if not already in state
		// Guard against other instances that might have
		// set content to a function already or the blocks are already in state.
		if ( content && typeof content !== 'function' && ! blocks ) {
			parse( content ).then( ( parsedContent ) => {
				editEntityRecord(
					kind,
					name,
					id,
					{ blocks: parsedContent },
					{ undoIgnore: true }
				);
			} );
		}
	}, [ content ] );

	const updateFootnotes = useCallback(
		( _blocks ) => {
			if ( ! meta ) return;
			// If meta.footnotes is empty, it means the meta is not registered.
			if ( meta.footnotes === undefined ) return;

			const { getRichTextValues } = unlock( blockEditorPrivateApis );
			const _content = getRichTextValues( _blocks ).join( '' ) || '';
			const newOrder = [];

			// This can be avoided when
			// https://github.com/WordPress/gutenberg/pull/43204 lands. We can then
			// get the order directly from the rich text values.
			if ( _content.indexOf( 'data-fn' ) !== -1 ) {
				const regex = /data-fn="([^"]+)"/g;
				let match;
				while ( ( match = regex.exec( _content ) ) !== null ) {
					newOrder.push( match[ 1 ] );
				}
			}

			const footnotes = meta.footnotes
				? JSON.parse( meta.footnotes )
				: [];
			const currentOrder = footnotes.map( ( fn ) => fn.id );

			if ( currentOrder.join( '' ) === newOrder.join( '' ) ) return;

			const newFootnotes = newOrder.map(
				( fnId ) =>
					footnotes.find( ( fn ) => fn.id === fnId ) ||
					oldFootnotes[ fnId ] || {
						id: fnId,
						content: '',
					}
			);

			oldFootnotes = {
				...oldFootnotes,
				...footnotes.reduce( ( acc, fn ) => {
					if ( ! newOrder.includes( fn.id ) ) {
						acc[ fn.id ] = fn;
					}
					return acc;
				}, {} ),
			};

			updateMeta( {
				...meta,
				footnotes: JSON.stringify( newFootnotes ),
			} );
		},
		[ meta, updateMeta ]
	);

	const onChange = useCallback(
		( newBlocks, options ) => {
			const { selection } = options;
			const edits = { blocks: newBlocks, selection };

			const noChange = blocks === edits.blocks;
			if ( noChange ) {
				return __unstableCreateUndoLevel( kind, name, id );
			}

			// We create a new function here on every persistent edit
			// to make sure the edit makes the post dirty and creates
			// a new undo level.
			edits.content = ( { blocks: blocksForSerialization = [] } ) =>
				__unstableSerializeAndClean( blocksForSerialization );

			registry.batch( () => {
				updateFootnotes( edits.blocks );
				editEntityRecord( kind, name, id, edits );
			} );
		},
		[ kind, name, id, blocks, updateFootnotes ]
	);

	const onInput = useCallback(
		( newBlocks, options ) => {
			const { selection } = options;
			const edits = { blocks: newBlocks, selection };
			registry.batch( () => {
				updateFootnotes( edits.blocks );
				editEntityRecord( kind, name, id, edits );
			} );
		},
		[ kind, name, id, updateFootnotes ]
	);

	return [ blocks ?? EMPTY_ARRAY, onInput, onChange ];
}
