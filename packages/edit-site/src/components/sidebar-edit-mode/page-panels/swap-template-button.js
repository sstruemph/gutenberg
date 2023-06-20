/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useEntityRecord, store as coreStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { parse } from '@wordpress/blocks';
import { useAsyncList } from '@wordpress/compose';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';

const EMPTY_ARRAY = [];

function useEditedPostContext() {
	return useSelect(
		( select ) => select( editSiteStore ).getEditedPostContext(),
		[]
	);
}

function useAvailableTemplates() {
	const { postType, postId } = useEditedPostContext();
	const { templates, currentTemplateSlug } = useSelect(
		( select ) => {
			const { getEntityRecords, getEntityRecord } = select( coreStore );
			const post = getEntityRecord( 'postType', postType, postId );
			const siteSettings = getEntityRecord( 'root', 'site' );
			// TODO: check about this logic...
			const _isPostsPage = postId === siteSettings?.page_for_posts;
			return {
				isPostsPage: _isPostsPage,
				currentTemplateSlug: post?.template,
				templates: getEntityRecords( 'postType', 'wp_template', {
					per_page: -1,
				} ),
			};
		},
		[ postType, postId ]
	);
	return useMemo(
		() =>
			templates?.filter(
				( template ) =>
					template.is_custom &&
					template.slug !== currentTemplateSlug &&
					!! template.content.raw // Skip empty templates.
			) || EMPTY_ARRAY,
		[ templates, currentTemplateSlug ]
	);
}

export default function SwapTemplateButton() {
	const [ showSwapTemplateModal, setShowSwapTemplateModal ] =
		useState( false );
	const availableTemplates = useAvailableTemplates();
	const onClose = useCallback( () => setShowSwapTemplateModal( false ), [] );
	if ( ! availableTemplates?.length ) {
		return null;
	}
	return (
		<>
			<Button
				className="edit-site-page-panels__swap-template-button"
				variant="secondary"
				onClick={ () => setShowSwapTemplateModal( true ) }
			>
				{ __( 'Swap template' ) }
			</Button>
			{ showSwapTemplateModal && (
				<Modal
					title={ __( 'Swap template' ) }
					onRequestClose={ onClose }
					isFullScreen
				>
					<div className="edit-site-page-panels__swap-template__modal-content">
						<TemplatesList onSelect={ onClose } />
					</div>
				</Modal>
			) }
		</>
	);
}

function TemplatesList( { onSelect } ) {
	const templates = useAvailableTemplates();
	const { postType, postId } = useEditedPostContext();
	const entitiy = useEntityRecord( 'postType', postType, postId );
	const currentTemplate = templates?.find(
		( { slug } ) => slug === entitiy.record.template
	);
	const { setEditedPost } = useDispatch( editSiteStore );
	const { createSuccessNotice } = useDispatch( noticesStore );
	const templatesAsPatterns = useMemo( () => {
		const mappedTemplates = templates.map( ( template ) => ( {
			name: template.slug,
			blocks: parse( template.content.raw ),
			title: decodeEntities( template.title.rendered ),
			id: template.id,
		} ) );
		// Append the default template to the list of available templates.
		if ( entitiy.record.template ) {
			mappedTemplates.push( {
				name: '',
				title: __( 'Default template' ),
				blocks: parse(
					'<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->'
				),
			} );
		}
		return mappedTemplates;
	}, [ templates, entitiy?.record.template ] );
	const shownTemplates = useAsyncList( templatesAsPatterns );
	const onClickPattern = async ( template ) => {
		entitiy.edit( { template: template.name }, { undoIgnore: true } );
		await entitiy.save();
		// If the default template is selected, we need to make a request
		// to fetch the template information.
		const { data: newTemplate } = await apiFetch( {
			url: addQueryArgs( entitiy.record.link, {
				'_wp-find-template': true,
			} ),
		} );
		setEditedPost( {
			postType: 'wp_template',
			id: newTemplate.id,
			context: {
				postType,
				postId,
				templateSlug: newTemplate.name,
			},
		} );
		createSuccessNotice(
			sprintf(
				/* translators: The page's title. */
				__( '"%s" applied.' ),
				decodeEntities( newTemplate.title )
			),
			{
				type: 'snackbar',
				actions: [
					{
						label: __( 'Undo' ),
						async onClick() {
							entitiy.edit(
								{ template: currentTemplate.slug },
								{ undoIgnore: true }
							);
							await entitiy.save();
							setEditedPost( {
								postType: 'wp_template',
								id: currentTemplate.id,
								context: {
									postType,
									postId,
									templateSlug: currentTemplate.slug,
								},
							} );
						},
					},
				],
			}
		);
		onSelect();
	};
	return (
		<BlockPatternsList
			label={ __( 'Templates' ) }
			blockPatterns={ templatesAsPatterns }
			shownPatterns={ shownTemplates }
			onClickPattern={ onClickPattern }
		/>
	);
}
