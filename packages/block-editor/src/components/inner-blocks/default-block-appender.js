/**
 * External dependencies
 */
import { last } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BaseDefaultBlockAppender from '../default-block-appender';
import withClientId from './with-client-id';

export const DefaultBlockAppender = ( { clientId, lastBlockClientId } ) => {
	return (
		<BaseDefaultBlockAppender
			rootClientId={ clientId }
			lastBlockClientId={ lastBlockClientId }
		/>
	);
};

export default compose( [
	withClientId,
	withSelect( ( select, { clientId } ) => {
		const { getBlockOrder } = select( 'core/block-editor' );

		const blockClientIds = getBlockOrder( clientId );

		return {
			lastBlockClientId: last( blockClientIds ),
		};
	} ),
] )( DefaultBlockAppender );
