/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { NavigatorContext } from './context';
import type { Navigator } from './types';

/**
 * Retrieves a `navigator` instance.
 */
function useNavigator(): Navigator {
	const { location, params, hasBack, goTo, goBack, goToParent } =
		useContext( NavigatorContext );

	return {
		location,
		params,
		hasBack,
		goTo,
		goBack,
		goToParent,
	};
}

export default useNavigator;
