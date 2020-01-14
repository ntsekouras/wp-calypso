/**
 * External dependencies
 */
import React from 'react';
import { Gridicon } from '@automattic/components';

/**
 * Style dependencies
 */
import './title.scss';

/*
 * React component for rendering title bar
 */
export const Title = ( { onCloseChat, translate } ) => (
	<div className="happychat__title">
		<div className="happychat__active-toolbar">
			<h4>{ translate( 'Support Chat' ) }</h4>
			<div onClick={ onCloseChat }>
				<Gridicon icon="cross" />
			</div>
		</div>
	</div>
);
