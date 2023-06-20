/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { BlockContextProvider, BlockPreview } from '@wordpress/block-editor';
import { moreVertical, layout } from '@wordpress/icons';
import {
	Icon,
	DropdownMenu,
	MenuGroup,
	MenuItem,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import SwapTemplateButton from './swap-template-button';
import ResetDefaultTemplate from './reset-default-template';

const POPOVER_PROPS = {
	placement: 'bottom-start',
};

export default function EditTemplate() {
	const { context, hasResolved, title, blocks } = useSelect( ( select ) => {
		const { getEditedPostContext, getEditedPostType, getEditedPostId } =
			select( editSiteStore );
		const { getEditedEntityRecord, hasFinishedResolution } =
			select( coreStore );
		const _context = getEditedPostContext();
		const queryArgs = [
			'postType',
			getEditedPostType(),
			getEditedPostId(),
		];
		const template = getEditedEntityRecord( ...queryArgs );
		return {
			context: _context,
			hasResolved: hasFinishedResolution(
				'getEditedEntityRecord',
				queryArgs
			),
			title: template?.title,
			blocks: template?.blocks,
		};
	}, [] );

	const { setHasPageContentFocus } = useDispatch( editSiteStore );

	const blockContext = useMemo(
		() => ( { ...context, postType: null, postId: null } ),
		[ context ]
	);

	if ( ! hasResolved ) {
		return null;
	}

	return (
		<VStack>
			<HStack justify="space-between">
				<HStack justify="flex-start">
					<Icon icon={ layout } />
					<span>{ decodeEntities( title ) }</span>
				</HStack>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options' ) }
					popoverProps={ POPOVER_PROPS }
					noIcons
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup>
								<MenuItem
									onClick={ () => {
										setHasPageContentFocus( false );
										onClose();
									} }
								>
									{ __( 'Edit template' ) }
								</MenuItem>
								<SwapTemplateButton onClick={ onClose } />
							</MenuGroup>
							<ResetDefaultTemplate onClick={ onClose } />
						</>
					) }
				</DropdownMenu>
			</HStack>
			<div className="edit-site-page-panels__edit-template-preview">
				<BlockContextProvider value={ blockContext }>
					<BlockPreview viewportWidth={ 1024 } blocks={ blocks } />
				</BlockContextProvider>
			</div>
		</VStack>
	);
}
