/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';

const EMPTY_ARRAY = [];
const DEFAULT_TEMPLATE = {
	slug: '',
	title: { rendered: __( 'Default template' ) },
	content: {
		raw: '<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->',
	},
};

export function useEditedPostContext() {
	return useSelect(
		( select ) => select( editSiteStore ).getEditedPostContext(),
		[]
	);
}

export function useAvailableTemplates() {
	const { postId } = useEditedPostContext();
	const currentTemplateSlug = useCurrentTemplateSlug();
	const { templates } = useSelect(
		( select ) => {
			const { getEntityRecords, getEntityRecord } = select( coreStore );
			const siteSettings = getEntityRecord( 'root', 'site' );
			// TODO: check about this logic...
			const _isPostsPage = postId === siteSettings?.page_for_posts;
			return {
				isPostsPage: _isPostsPage,
				templates: getEntityRecords( 'postType', 'wp_template', {
					per_page: -1,
				} ),
			};
		},
		[ postId ]
	);
	return useMemo( () => {
		const availableTemplates =
			templates?.filter(
				( template ) =>
					template.is_custom &&
					template.slug !== currentTemplateSlug &&
					!! template.content.raw // Skip empty templates.
			) || EMPTY_ARRAY;
		const currentTemplate = currentTemplateSlug
			? templates?.find( ( { slug } ) => slug === currentTemplateSlug )
			: DEFAULT_TEMPLATE;
		return { availableTemplates, currentTemplate };
	}, [ templates, currentTemplateSlug ] );
}

export function useCurrentTemplateSlug() {
	const { postType, postId } = useEditedPostContext();
	return useSelect(
		( select ) => {
			const post = select( coreStore ).getEntityRecord(
				'postType',
				postType,
				postId
			);
			return post?.template;
		},
		[ postType, postId ]
	);
}
