/*
 * The data model used in the ContactDetailsFormFields component.
 * This belongs in components/domains/contact-details-form-fields, but until
 * that component is rewritten in TypeScript we'll put it here.
 */
export type DomainContactDetails = {
	firstName: string;
	lastName: string;
	organization: string;
	email: string;
	alternateEmail: string;
	phone: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	postalCode: string;
	countryCode: string;
	fax: string;
};

/*
 * All child components in composite checkout are controlled -- they accept
 * data from their parents and evaluate callbacks when edited, rather than
 * managing their own state. Hooks providing this data in turn need some extra
 * data on each field: specifically whether it has been edited by the user
 * or passed validation. We wrap this extra data into an object type.
 */
export interface ManagedValue< T > {
	value: T;
	isTouched: boolean; // Has value been edited by the user?
	isValid: boolean; // Has value passed validation?
}

export function initialManagedValue< T >( x: T ): ManagedValue< T > {
	return {
		value: x,
		isTouched: false,
		isValid: false,
	};
}

export function touchIfDifferent< T >(
	newValue: T,
	oldData: ManagedValue< T >
): ManagedValue< T > {
	return newValue === oldData.value ? oldData : { ...oldData, value: newValue, isTouched: true };
}

/*
 * The wpcom store hook itself won't store a DomainContactDetails
 * object directly, but a managed version of it. (We could probably express
 * this more nicely with higher kinded types but it does the job.)
 * Each field keeps track of whether it has been edited and validated.
 */
export type ManagedDomainContactDetails = {
	firstName: ManagedValue< string >;
	lastName: ManagedValue< string >;
	organization: ManagedValue< string >;
	email: ManagedValue< string >;
	alternateEmail: ManagedValue< string >;
	phone: ManagedValue< string >;
	address1: ManagedValue< string >;
	address2: ManagedValue< string >;
	city: ManagedValue< string >;
	state: ManagedValue< string >;
	postalCode: ManagedValue< string >;
	countryCode: ManagedValue< string >;
	fax: ManagedValue< string >;
};

export const defaultManagedDomainContactDetails: ManagedDomainContactDetails = {
	firstName: initialManagedValue( '' ),
	lastName: initialManagedValue( '' ),
	organization: initialManagedValue( '' ),
	email: initialManagedValue( '' ),
	alternateEmail: initialManagedValue( '' ),
	phone: initialManagedValue( '' ),
	address1: initialManagedValue( '' ),
	address2: initialManagedValue( '' ),
	city: initialManagedValue( '' ),
	state: initialManagedValue( '' ),
	postalCode: initialManagedValue( '' ),
	countryCode: initialManagedValue( '' ),
	fax: initialManagedValue( '' ),
};

/*
 * Convert a ManagedDomainContactDetails object (used internally by the
 * WPCOM store state hook) into a DomainContactDetails object (used by
 * the ContactDetailsFormFields component)
 */
export function prepareDomainContactDetails(
	details: ManagedDomainContactDetails
): DomainContactDetails {
	return {
		firstName: details.firstName.value,
		lastName: details.lastName.value,
		organization: details.organization.value,
		email: details.email.value,
		alternateEmail: details.alternateEmail.value,
		phone: details.phone.value,
		address1: details.address1.value,
		address2: details.address2.value,
		city: details.city.value,
		state: details.state.value,
		postalCode: details.postalCode.value,
		countryCode: details.countryCode.value,
		fax: details.fax.value,
	};
}

/*
 * This utility updates a ManagedDomainContactDetails object in
 * response to a DomainContactDetails object which, we assume,
 * came from user input.
 */
export function updateManagedDomainContactDetails(
	oldDetails: ManagedDomainContactDetails,
	newDetails: DomainContactDetails
): ManagedDomainContactDetails {
	return {
		firstName: touchIfDifferent( newDetails.firstName, oldDetails.firstName ),
		lastName: touchIfDifferent( newDetails.lastName, oldDetails.lastName ),
		organization: touchIfDifferent( newDetails.organization, oldDetails.organization ),
		email: touchIfDifferent( newDetails.email, oldDetails.email ),
		alternateEmail: touchIfDifferent( newDetails.alternateEmail, oldDetails.alternateEmail ),
		phone: touchIfDifferent( newDetails.phone, oldDetails.phone ),
		address1: touchIfDifferent( newDetails.address1, oldDetails.address1 ),
		address2: touchIfDifferent( newDetails.address2, oldDetails.address2 ),
		city: touchIfDifferent( newDetails.city, oldDetails.city ),
		state: touchIfDifferent( newDetails.state, oldDetails.state ),
		postalCode: touchIfDifferent( newDetails.postalCode, oldDetails.postalCode ),
		countryCode: touchIfDifferent( newDetails.countryCode, oldDetails.countryCode ),
		fax: touchIfDifferent( newDetails.fax, oldDetails.fax ),
	};
}

export type WpcomStoreState = {
	siteId: string;
	contact: ManagedDomainContactDetails;
	vatId: ManagedValue< string >;
};

export const initialWpcomStoreState: WpcomStoreState = {
	siteId: '',
	contact: defaultManagedDomainContactDetails,
	vatId: initialManagedValue( '' ),
};
