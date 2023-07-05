/**
 * External dependencies
 */
// @ts-ignore
import { IndexeddbPersistence } from 'y-indexeddb';

/** @typedef {import('./types').ObjectType} ObjectType */
/** @typedef {import('./types').ObjectID} ObjectID */
/** @typedef {import('./types').CRDTDoc} CRDTDoc */
/** @typedef {import('./types').ConnectDoc} ConnectDoc */
/** @typedef {import('./types').SyncProvider} SyncProvider */

/**
 * Connect function to the IndexedDB persistence provider.
 *
 * @param {ObjectID}   objectId   The object ID.
 * @param {ObjectType} objectType The object type.
 * @param {CRDTDoc}    doc        The CRDT document.
 *
 * @return {Promise<() => void>} Promise that resolves when the connection is established.
 */
export function connectIndexDb( objectId, objectType, doc ) {
	const docName = `${ objectType }-${ objectId }`;
	const provider = new IndexeddbPersistence( docName, doc );
	console.log('start sync', doc.toJSON());

	return new Promise( ( resolve ) => {
		provider.on( 'synced', () => {
			console.log('synced', doc.toJSON());
			resolve( () => provider.destroy() );
		} );
	} );
}
