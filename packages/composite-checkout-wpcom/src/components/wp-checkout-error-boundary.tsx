/**
 * External dependencies
 */
import React from 'react';

type WPCheckoutErrorBoundaryState = {
	hasError: boolean;
	errorMessage: string;
};

const initialWPCheckoutErrorBoundaryState = {
	errorMessage: '',
	hasError: false,
};

export default class WpcomCheckoutErrorBoundary extends React.Component {
	state = initialWPCheckoutErrorBoundaryState;

	constructor( props ) {
		super( props );
	}

	static getDerivedStateFromError( error ): WPCheckoutErrorBoundaryState {
		return {
			hasError: true,
			errorMessage: error,
		};
	}

	render() {
		if ( this.state.hasError ) {
			return <h1>{ `Something went wrong in composite-checkout-wpcom.` }</h1>;
		}

		return this.props.children;
	}
}
