/**
 * External dependencies
 */
import { useRef } from 'react';

/**
 * Internal dependencies
 */
import {
	ManagedValue,
	touchIfDifferent,
	WpcomStoreState,
	initialWpcomStoreState,
	DomainContactDetails,
	ManagedDomainContactDetails,
	updateManagedDomainContactDetails,
} from '../types';

type WpcomStoreAction =
	| { type: 'SET_CONTACT_DETAILS'; payload: DomainContactDetails }
	| { type: 'SET_SITE_ID'; payload: string }
	| { type: 'SET_VAT_ID'; payload: string };

export function useWpcomStore( registerStore, onEvent ) {
	// Only register once
	const registerIsComplete = useRef< boolean >( false );
	if ( registerIsComplete.current ) {
		return;
	}
	registerIsComplete.current = true;

	function contactReducer(
		state: ManagedDomainContactDetails,
		action: WpcomStoreAction
	): ManagedDomainContactDetails {
		switch ( action.type ) {
			case 'SET_CONTACT_DETAILS':
				return updateManagedDomainContactDetails( state, action.payload );
			default:
				return state;
		}
	}

	function siteIdReducer( state: string, action: WpcomStoreAction ): string {
		switch ( action.type ) {
			case 'SET_SITE_ID':
				return action.payload;
			default:
				return state;
		}
	}

	function vatIdReducer(
		state: ManagedValue< string >,
		action: WpcomStoreAction
	): ManagedValue< string > {
		switch ( action.type ) {
			case 'SET_VAT_ID':
				return touchIfDifferent( action.payload, state );
			default:
				return state;
		}
	}

	registerStore( 'wpcom', {
		reducer( state: WpcomStoreState | null, action: WpcomStoreAction ): WpcomStoreState {
			const checkedState = state === null ? initialWpcomStoreState : state;
			return {
				contact: contactReducer( checkedState.contact, action ),
				siteId: siteIdReducer( checkedState.siteId, action ),
				vatId: vatIdReducer( checkedState.vatId, action ),
			};
		},

		actions: {
			setSiteId( payload: string ): WpcomStoreAction {
				return { type: 'SET_SITE_ID', payload };
			},

			// TODO: type this; need to use error messages from contact form
			setContactField( key, field ) {
				if ( ! field.isValid ) {
					onEvent( {
						type: 'a8c_checkout_error',
						payload: {
							type: 'Field error',
							field: key,
						},
					} );
				}
				return { type: 'CONTACT_SET_FIELD', payload: { key, field } };
			},

			setVatId( payload: string ): WpcomStoreAction {
				return { type: 'SET_VAT_ID', payload: payload };
			},
		},

		selectors: {
			getSiteId( state: WpcomStoreState ): string {
				return state.siteId;
			},

			getContactInfo( state: WpcomStoreState ): ManagedDomainContactDetails {
				return state.contact;
			},
		},
	} );
}
