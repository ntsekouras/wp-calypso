/**
 * External dependencies
 */
import { VerticalsTemplates } from '@automattic/data-stores';

/**
 * Internal dependencies
 */
import { ActionType, SiteVertical } from './types';

type Template = VerticalsTemplates.Template;

export const setDomain = (
	domain: import('@automattic/data-stores').DomainSuggestions.DomainSuggestion | undefined
) => ( {
	type: ActionType.SET_DOMAIN as const,
	domain,
} );

export const setSelectedDesign = (
	selectedDesign: import('@automattic/data-stores').VerticalsTemplates.Template | undefined
) => ( {
	type: ActionType.SET_SELECTED_DESIGN as const,
	selectedDesign,
} );

export const setSiteVertical = ( siteVertical: SiteVertical ) => ( {
	type: ActionType.SET_SITE_VERTICAL as const,
	siteVertical,
} );

export const resetSiteVertical = () => ( {
	type: ActionType.RESET_SITE_VERTICAL as const,
} );

export const setSiteTitle = ( siteTitle: string ) => ( {
	type: ActionType.SET_SITE_TITLE as const,
	siteTitle,
} );

export const togglePageLayout = ( pageLayout: Template ) => ( {
	type: ActionType.TOGGLE_PAGE_LAYOUT as const,
	pageLayout,
} );

export const setShouldCreate = ( shouldCreate: boolean ) => ( {
	type: ActionType.SET_SHOULD_CREATE as const,
	shouldCreate,
} );

export const resetOnboardStore = () => ( {
	type: ActionType.RESET_ONBOARD_STORE as const,
} );

export const setIsCreatingSite = ( isCreatingSite: boolean ) => ( {
	type: ActionType.IS_CREATING_SITE as const,
	isCreatingSite,
} );
