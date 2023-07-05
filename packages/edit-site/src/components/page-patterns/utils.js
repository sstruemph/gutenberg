/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const DEFAULT_CATEGORY = 'my-patterns';
export const DEFAULT_TYPE = 'wp_block';
export const PATTERNS = 'pattern';
export const TEMPLATE_PARTS = 'wp_template_part';
export const USER_PATTERNS = 'wp_block';
export const USER_PATTERN_CATEGORY = 'my-patterns';

export const CORE_PATTERN_SOURCES = [
	'core',
	'pattern-directory/core',
	'pattern-directory/featured',
	'pattern-directory/theme',
];

export const SYNC_TYPES = {
	full: 'fully',
	unsynced: 'unsynced',
};

export const filterOutDuplicatesByName = ( currentItem, index, items ) =>
	index === items.findIndex( ( item ) => currentItem.name === item.name );

export const TEMPLATE_PART_AREA_LABELS = {
	header: __( 'Headers' ),
	footer: __( 'Footers' ),
	sidebar: __( 'Sidebar' ),
	uncategorized: __( 'Uncategorized' ),
};
