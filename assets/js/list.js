import dragula from 'dragula';

const registerRemoveEvents = ( list, onRemove ) => {
	const listItems = list.querySelectorAll( 'li' );

	list.addEventListener( 'click', ( e ) => {
		const target = ( e.target.tagName === 'svg' ) ? e.target : e.target.closest( 'svg' );

		if ( target.tagName === 'svg' ) {
			const listItem = e.target.closest( 'li' );
			const value = listItem.querySelector( 'span' ).innerHTML;

			list.removeChild( listItem );
			onRemove( value );
		}
	} );

	return listItems;
};

const registerDragEvents = ( list, callback ) => {
	const drake = dragula( [list] );

	drake.on( 'dragend', ( el ) => {
		const listItems = list.querySelectorAll( 'li' );

		callback( list, listItems );
	} );
};

export default function ( parent, args ) {
	const list = parent.querySelector( args.list );

	registerDragEvents( list, args.onDrag );
	registerRemoveEvents( list, args.onRemove );

	return {
		add: function ( value ) {
			const html = args.listTemplate( value );
			const listItem = document.createRange().createContextualFragment( html );

			list.appendChild( listItem );
		}
	};
}
