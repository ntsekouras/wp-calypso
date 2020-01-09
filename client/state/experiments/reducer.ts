/**
 * External Dependencies
 */
import { findIndex, tail } from 'lodash';

/**
 * Internal Dependencies
 */

function getAnonId(): string | null {
	if ( document && document.cookie !== null ) {
		const cookieString = document.cookie;
		const rawCookies = cookieString.split( ';' );
		const anonIdCookieIndex = findIndex( rawCookies, c => c.trim().startsWith( 'tk_ai=' ) );
		if ( anonIdCookieIndex === -1 ) return null;
		const anonIdCookie = rawCookies[ anonIdCookieIndex ];
		const anonIdTuple = anonIdCookie.split( '=' );
		if ( anonIdTuple.length === 2 ) return anonIdTuple[ 1 ];
		if ( anonIdTuple.length >= 2 ) return tail( anonIdTuple ).join( '=' );
	}
	return null;
}

interface ExperimentState {
	anonId: string | null;
}

/**
 * Applies variations to user
 *
 * @param state The current state of the user
 * @param action The specified action
 * @returns object The modified state, if applied
 */
export default function reducer( state: ExperimentState = { anonId: null }, action: any ) {
	switch ( action.type ) {
		/**
		 * Store the anon-id in state, if there is one. We need this to apply any overrides for anonymous experiments
		 */
		case '@@INIT':
			state.anonId = getAnonId();
			return state;
		default:
			return state;
	}
}
