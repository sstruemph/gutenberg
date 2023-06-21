/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import {
	Button,
	Dropdown,
	MenuGroup,
	MenuItem,
	__experimentalHStack as HStack,
	__experimentalText as Text,
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
	const { hasResolved, title } = useSelect( ( select ) => {
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

	if ( ! hasResolved ) {
		return null;
	}

	return (
		<HStack className="edit-site-summary-field">
			<Text className="edit-site-summary-field__label">
				{ __( 'Template' ) }
			</Text>
			<Dropdown
				popoverProps={ POPOVER_PROPS }
				focusOnMount
				renderToggle={ ( { onToggle } ) => (
					<Button
						className="edit-site-summary-field__trigger"
						variant="tertiary"
						onClick={ onToggle }
					>
						{ decodeEntities( title ) }
					</Button>
				) }
				renderContent={ ( { onClose } ) => (
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
			/>
		</HStack>
	);
}
