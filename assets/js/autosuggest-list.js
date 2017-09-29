/* global jQuery */

import list from './list';
import autoSuggest from './autosuggest';
import hidden from './serialized-input';
import { removeItems, dragItems, onDragObject, onRemoveObject } from './utilities';

export default function ( args ) {
	const Hidden = hidden( args.hidden );
	const remove = removeItems( Hidden, onRemoveObject );
	const drag = dragItems( Hidden, onDragObject );
	const List = list( args.list, Object.assign( args, { onDrag: drag, onRemove: remove} ) );

	autoSuggest( args.input, args.endpoint, ( value, input ) => {
		List.add( value );
		input.value = '';
		Hidden.add( value );
		jQuery( args.hidden ).trigger( 'change' );
	} );
}
