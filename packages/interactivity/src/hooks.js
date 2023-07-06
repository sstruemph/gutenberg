/**
 * External dependencies
 */
import { h, options, createContext, cloneElement } from 'preact';
import { useRef, useMemo } from 'preact/hooks';
/**
 * Internal dependencies
 */
import { rawStore as store } from './store';

/** @typedef {import('preact').VNode} VNode */
/** @typedef {typeof context} Context */
/** @typedef {ReturnType<typeof getEvaluate>} Evaluate */

/**
 * @typedef {Object} DirectiveCallbackParams Callback parameters.
 * @property {Object}   directives Object map with the defined directives of the element being evaluated.
 * @property {Object}   props      Props present in the current element.
 * @property {VNode}    element    Virtual node representing the original element.
 * @property {Context}  context    The inherited context.
 * @property {Evaluate} evaluate   Function that resolves a given path to a value either in the store or the context.
 */

/**
 * @callback DirectiveCallback Callback that runs the directive logic.
 * @param {DirectiveCallbackParams} params Callback parameters.
 */

/**
 * @typedef DirectiveOptions Options object.
 * @property {number} [priority=10] Value that specifies the priority to
 *                                  evaluate directives of this type. Lower
 *                                  numbers correspond with earlier execution.
 *                                  Default is `10`.
 */

// Main context.
const context = createContext( {} );

// WordPress Directives.
const directiveMap = {};
const directivePriorities = {};

/**
 * Register a new directive type in the Interactivity API runtime.
 *
 * @example
 * ```js
 * directive(
 *   'alert', // Name without the `data-wp-` prefix.
 *   ( { directives: { alert }, element, evaluate }) => {
 *     element.props.onClick = () => {
 *       alert( evaluate( alert.default ) );
 *     }
 *   }
 * )
 * ```
 *
 * The previous code register a custom directive type for displaying an alert
 * message whenever an element using it is clicked. The message text is obtained
 * from the store using `evaluate`.
 *
 * When the HTML is processed by the Interactivity API, any element containing
 * the `data-wp-alert` directive will have the `onClick` event handler, e.g.,
 *
 * ```html
 * <button data-wp-alert="state.messages.alert">Click me!</button>
 * ```
 *
 * @param {string}            name     Directive name, without the `data-wp-` prefix.
 * @param {DirectiveCallback} callback Function that runs the directive logic.
 * @param {DirectiveOptions=} options  Options object.
 */
export const directive = ( name, callback, { priority = 10 } = {} ) => {
	directiveMap[ name ] = callback;
	directivePriorities[ name ] = priority;
};

// Resolve the path to some property of the store object.
const resolve = ( path, ctx ) => {
	let current = { ...store, context: ctx };
	path.split( '.' ).forEach( ( p ) => ( current = current[ p ] ) );
	return current;
};

// Generate the evaluate function.
const getEvaluate =
	( { ref } = {} ) =>
	( path, extraArgs = {} ) => {
		// If path starts with !, remove it and save a flag.
		const hasNegationOperator =
			path[ 0 ] === '!' && !! ( path = path.slice( 1 ) );
		const value = resolve( path, extraArgs.context );
		const returnValue =
			typeof value === 'function'
				? value( {
						ref: ref.current,
						...store,
						...extraArgs,
				  } )
				: value;
		return hasNegationOperator ? ! returnValue : returnValue;
	};

// Separate directives by priority. The resulting array contains objects
// of directives grouped by same priority, and sorted in ascending order.
const usePriorityLevels = ( directives ) =>
	useMemo( () => {
		const byPriority = Object.entries( directives ).reduce(
			( acc, [ name, values ] ) => {
				const priority = directivePriorities[ name ];
				if ( ! acc[ priority ] ) acc[ priority ] = {};
				acc[ priority ][ name ] = values;

				return acc;
			},
			{}
		);

		return Object.entries( byPriority )
			.sort( ( [ p1 ], [ p2 ] ) => p1 - p2 )
			.map( ( [ , obj ] ) => obj );
	}, [ directives ] );

// Directive wrapper.
const Directive = ( { type, directives, props: originalProps } ) => {
	const ref = useRef( null );
	const element = h( type, { ...originalProps, ref } );
	const evaluate = useMemo( () => getEvaluate( { ref } ), [] );

	// Add wrappers recursively for each priority level.
	const byPriorityLevel = usePriorityLevels( directives );
	return (
		<RecursivePriorityLevel
			directives={ byPriorityLevel }
			element={ element }
			evaluate={ evaluate }
			originalProps={ originalProps }
		/>
	);
};

// Priority level wrapper.
const RecursivePriorityLevel = ( {
	directives: [ directives, ...rest ],
	element,
	evaluate,
	originalProps,
} ) => {
	// This element needs to be a fresh copy so we are not modifying an already
	// rendered element with Preact's internal properties initialized. This
	// prevents an error with changes in `element.props.children` not being
	// reflected in `element.__k`.
	element = cloneElement( element );

	// Recursively render the wrapper for the next priority level.
	//
	// Note that, even though we're instantiating a vnode with a
	// `RecursivePriorityLevel` here, its render function will not be executed
	// just yet. Actually, it will be delayed until the current render function
	// has finished. That ensures directives in the current priorty level have
	// run (and thus modified the passed `element`) before the next level.
	const children =
		rest.length > 0 ? (
			<RecursivePriorityLevel
				directives={ rest }
				element={ element }
				evaluate={ evaluate }
				originalProps={ originalProps }
			/>
		) : (
			element
		);

	const props = { ...originalProps, children };
	const directiveArgs = { directives, props, element, context, evaluate };

	for ( const d in directives ) {
		const wrapper = directiveMap[ d ]?.( directiveArgs );
		if ( wrapper !== undefined ) props.children = wrapper;
	}

	return props.children;
};

// Preact Options Hook called each time a vnode is created.
const old = options.vnode;
options.vnode = ( vnode ) => {
	if ( vnode.props.__directives ) {
		const props = vnode.props;
		const directives = props.__directives;
		delete props.__directives;
		vnode.props = {
			type: vnode.type,
			directives,
			props,
		};
		vnode.type = Directive;
	}

	if ( old ) old( vnode );
};
