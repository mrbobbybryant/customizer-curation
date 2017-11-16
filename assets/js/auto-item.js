/* global jQuery */

import autoSuggest from './autosuggest';

export default function ( args ) {
	const fields = document.querySelectorAll( args.parent );

	if ( ! fields ) {
		return false;
	}

	[].forEach.call( fields, ( autoItem ) => {
		const hidden = autoItem.querySelector( args.hidden );
		const localizedKey = `Curation_${autoItem.dataset.id}`;
		const endpoint = `${window[localizedKey].baseURL}/wp-json/wp/v2/${window[localizedKey].resource}?search=`;

		autoSuggest(
			autoItem.querySelector( args.input ),
			endpoint,
			( value, input ) => {
				hidden.value = JSON.stringify( value );
				jQuery( hidden ).trigger( 'change' );
			},
			() => {
				hidden.value = '';
				jQuery( hidden ).trigger( 'change' );
			}
		);
	} );
}
