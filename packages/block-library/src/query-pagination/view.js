/**
 * External dependencies
 */
import { useEffect } from 'preact/hooks';

/**
 * Internal dependencies
 */
import { prefetch, navigate } from './router';
import { directive } from './directives';

// The `wp-client-navigation` directive.
directive( 'clientNavigation', ( props ) => {
	const {
		wp: { clientNavigation },
		href,
	} = props;

	useEffect( () => {
		// Prefetch the page if it is in the directive options.
		if ( clientNavigation?.prefetch ) {
			prefetch( href );
		}
	} );

	// Don't do anything if it's falsy.
	if ( clientNavigation !== false ) {
		props.onclick = async ( event ) => {
			event.preventDefault();

			// Fetch the page (or return it from cache).
			await navigate( href );

			// Update the scroll, depending on the option. True by default.
			if ( clientNavigation?.scroll === 'smooth' ) {
				window.scrollTo( { top: 0, left: 0, behavior: 'smooth' } );
			} else if ( clientNavigation?.scroll !== false ) {
				window.scrollTo( 0, 0 );
			}
		};
	}
} );