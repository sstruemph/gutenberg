/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { MenuItem, Modal, Button, Flex, FlexItem } from '@wordpress/components';
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
	const availableTemplates = useAvailableTemplates();
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
					title={ __( 'Choose a template' ) }
					onRequestClose={ onClose }
					isFullScreen
				>
					<div className="edit-site-page-panels__swap-template__modal-content">
						<TemplatesList closeSwapTemplateModal={ onClose } />
					</div>
				</Modal>
			) }
		</>
	);
}

function TemplatesList( { closeSwapTemplateModal } ) {
	const [ showModal, setShowModal ] = useState( false );
	const [ selectedTemplate, setSelectedTemplate ] = useState();
	const onClose = useCallback( () => setShowModal( false ), [] );
	const availableTemplates = useAvailableTemplates();
	const { postType, postId } = useEditedPostContext();
	const entitiy = useEntityRecord( 'postType', postType, postId );
	const { setPage } = useDispatch( editSiteStore );
	const { createSuccessNotice } = useDispatch( noticesStore );
	const templatesAsPatterns = useMemo(
		() =>
			availableTemplates.map( ( template ) => ( {
				name: template.slug,
				blocks: parse( template.content.raw ),
				title: decodeEntities( template.title.rendered ),
				id: template.id,
			} ) ),
		[ availableTemplates ]
	);
	const shownTemplates = useAsyncList( templatesAsPatterns );
	const onConfirmSwap = async ( template ) => {
		entitiy.edit( { template: template.name }, { undoIgnore: true } );
		await entitiy.save();
		closeSwapTemplateModal();
		await setPage( {
			context: { postType, postId },
		} );
		createSuccessNotice(
			sprintf(
				/* translators: The page's title. */
				__( '"%s" applied.' ),
				decodeEntities( template.title )
			),
			{ type: 'snackbar' }
		);
	};
	return (
		<>
			<BlockPatternsList
				label={ __( 'Templates' ) }
				blockPatterns={ templatesAsPatterns }
				shownPatterns={ shownTemplates }
				onClickPattern={ ( template ) => {
					setShowModal( true );
					setSelectedTemplate( template );
				} }
			/>
			{ showModal && (
				<Modal
					title={ __( 'Update page template?' ) }
					onRequestClose={ onClose }
				>
					{ __( 'Template swaps are published immediately.' ) }
					<Flex
						className="edit-site-page-panels__swap-template__confirm-modal__actions"
						justify="flex-end"
						expanded={ false }
					>
						<FlexItem>
							<Button variant="tertiary" onClick={ onClose }>
								{ __( 'Cancel' ) }
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								variant="primary"
								type="submit"
								onClick={ () =>
									onConfirmSwap( selectedTemplate )
								}
							>
								{ __( 'Swap template' ) }
							</Button>
						</FlexItem>
					</Flex>
				</Modal>
			) }
		</>
	);
}
