/**
 * WordPress dependencies
 */
import {
	__experimentalVStack as VStack,
	__experimentalHeading as Heading,
	__experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import usePatternCategories from '../sidebar-navigation-screen-patterns/use-pattern-categories';
import {
	USER_PATTERN_CATEGORY,
	USER_PATTERNS,
	TEMPLATE_PARTS,
	PATTERNS,
	TEMPLATE_PART_AREA_LABELS,
} from './utils';

export default function PatternsHeader( {
	categoryId,
	type,
	titleId,
	descriptionId,
} ) {
	const { patternCategories } = usePatternCategories();

	let title, description;
	if ( categoryId === USER_PATTERN_CATEGORY && type === USER_PATTERNS ) {
		title = __( 'My Patterns' );
		description = __( 'Patterns that are kept in sync across your site.' ); // TODO
	} else if ( type === TEMPLATE_PARTS ) {
		title = TEMPLATE_PART_AREA_LABELS[ categoryId ];
		description = __( 'Patterns that are kept in sync across your site.' ); // TODO
	} else if ( type === PATTERNS ) {
		const patternCategory = patternCategories.find(
			( category ) => category.name === categoryId
		);
		title = patternCategory?.label;
		description = patternCategory?.description;
	}

	if ( ! title ) return null;

	return (
		<VStack className="edit-site-patterns__section-header">
			<Heading as="h2" level={ 4 } id={ titleId }>
				{ title }
			</Heading>
			{ description ? (
				<Text variant="muted" as="p" id={ descriptionId }>
					{ description }
				</Text>
			) : null }
		</VStack>
	);
}
