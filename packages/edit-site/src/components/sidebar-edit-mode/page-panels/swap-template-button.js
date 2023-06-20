/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { MenuItem, Modal } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useEntityRecord } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { parse } from '@wordpress/blocks';
import { useAsyncList } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import { useAvailableTemplates, useEditedPostContext } from './hooks';

export default function SwapTemplateButton() {
	const [ showSwapTemplateModal, setShowSwapTemplateModal ] =
		useState( false );
	const { availableTemplates } = useAvailableTemplates();
	const onClose = useCallback( () => setShowSwapTemplateModal( false ), [] );
	if ( ! availableTemplates?.length ) {
		return null;
	}
	return (
		<>
			<MenuItem onClick={ () => setShowSwapTemplateModal( true ) }>
				{ __( 'Swap template' ) }
			</MenuItem>
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
	const { availableTemplates, currentTemplate } = useAvailableTemplates();
	const { postType, postId } = useEditedPostContext();
	const entitiy = useEntityRecord( 'postType', postType, postId );
	const { setPage } = useDispatch( editSiteStore );
	const { createSuccessNotice } = useDispatch( noticesStore );
	const templatesAsPatterns = useMemo( () => {
		const mappedTemplates = availableTemplates.map( ( template ) => ( {
			name: template.slug,
			blocks: parse( template.content.raw ),
			title: decodeEntities( template.title.rendered ),
			id: template.id,
		} ) );

		return mappedTemplates;
	}, [ availableTemplates ] );
	const shownTemplates = useAsyncList( templatesAsPatterns );
	const onClickPattern = async ( template ) => {
		entitiy.edit( { template: template.name }, { undoIgnore: true } );
		await entitiy.save();
		onSelect();
		await setPage( {
			context: { postType, postId },
		} );
		createSuccessNotice(
			sprintf(
				/* translators: The page's title. */
				__( '"%s" applied.' ),
				decodeEntities( template.title )
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
							await setPage( {
								context: { postType, postId },
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
