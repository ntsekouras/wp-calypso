/**
 * External dependencies
 */
import React from 'react';

type WPCheckoutErrorBoundaryState = {
	componentTitle: string;
	hasError: boolean;
	errorMessage: string;
};

const initialWPCheckoutErrorBoundaryState = title => {
	return {
		componentTitle: title,
		errorMessage: '',
		hasError: false,
	};
};

export default class WpcomCheckoutErrorBoundary extends React.Component {
	constructor( props ) {
		super( props );
		this.state = initialWPCheckoutErrorBoundaryState( props.componentTitle );
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if ( this.state.hasError ) {
			return <h1>{ `Something went wrong in ${ this.state.componentTitle }.` }</h1>;
		}

		return this.props.children;
	}
}
