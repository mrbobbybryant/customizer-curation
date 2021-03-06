/* global jQuery */

import list from './list';
import autoSuggest from './autosuggest';
import hidden from './serialized-input';
import { removeItems, dragItems, onDragObject, onRemoveObject, checkLimit } from './utilities';

export default function ( args ) {
	const fields = document.querySelectorAll( args.parent );

	if ( ! fields ) {
		return false;
	}

	[].forEach.call( fields, ( autoList ) => {
		const Hidden = hidden( autoList, args.hidden );
		const hiddenEl = autoList.querySelector( args.hidden );
		const remove = removeItems( Hidden, onRemoveObject, autoList );
		const drag = dragItems( Hidden, onDragObject );
		const List = list( autoList, Object.assign( args, { onDrag: drag, onRemove: remove} ) );
		const localizedKey = `Curation_${autoList.dataset.id}`;
		const endpoint = `${window[localizedKey].baseURL}/wp-json/wp/v2/${window[localizedKey].resource}?search=`;

		autoSuggest( autoList.querySelector( args.input ), endpoint, ( value, input ) => {
			List.add( value );
			input.value = '';
			Hidden.add( value );
			checkLimit( autoList );
			jQuery( hiddenEl ).trigger( 'change' );
		} );
	} );
}
