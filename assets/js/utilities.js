/* global jQuery */
export const removeItems = ( Hidden, onRemove, autoList ) => {
	return ( value ) => {
		Hidden.remove( value, onRemove );
		checkLimit( autoList );
		jQuery( Hidden.el ).trigger( 'change' );
	};
};

export const dragItems = ( Hidden, onDrag ) => {
	return ( list, listItems ) => {
		const values = onDrag( list, listItems );

		Hidden.update( values );
		jQuery( Hidden.el ).trigger( 'change' );
	};
};

export const onDragObject = ( list, listItems ) => {
	return [].reduce.call( listItems, ( acc, listItem ) => {
		const value = {
			id: listItem.dataset.id,
			title: listItem.querySelector( 'span' ).innerHTML
		};

		return acc.concat( [value] );
	}, [] );
};

export const onDragText = ( list, listItems ) => {
	return [].reduce.call( listItems, ( acc, listItem ) => {
		const value = listItem.querySelector( 'span' ).innerHTML;

		return acc.concat( [value] );
	}, [] );
};

export const onRemoveObject = ( currentValue, newValue ) => {
	return currentValue.filter( ( current ) => current.title !== newValue );
};

export const onRemoveText = ( currentValue, newValue ) => {
	return currentValue.filter( ( current ) => current !== newValue );
};


export const checkLimit = ( autoList ) => {
	const children = autoList.querySelectorAll('li');
	const field = autoList.querySelector( '.customizer-curation-list-input' );
	const max = field.getAttribute( 'data-max' );

	if ( max ) {
		if ( children.length < parseInt( max, 10 ) ) {
			field.removeAttribute( 'disabled' );
		} else {
			field.setAttribute( 'disabled', true );
		}
	}
};
