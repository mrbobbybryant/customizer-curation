export default function ( parent, hiddenInput ) {
	const hiddenEl = parent.querySelector( hiddenInput );

	const getCurrentValue = () => {
		const value = hiddenEl.value;

		if ( value ) {
			return JSON.parse( value );
		}
		return [];

	};

	const checkLimit = ( currentValue ) => {
		const count = currentValue.length;
		const field = parent.querySelector( '.customizer-curation-list-input' );
		const max = field.getAttribute( 'data-max' );

		if ( max ) {
			if ( count < parseInt( max, 10 ) ) {
				field.removeAttribute( 'disabled' );
			} else {
				field.setAttribute( 'disabled', true );
			}
		}
	};

	const addValue = ( value ) => {
		let currentValue = getCurrentValue();

		currentValue = currentValue.concat( value );
		checkLimit( currentValue );
		return currentValue;
	};

	const removeValue = ( value, onRemove ) => {
		let currentValue = getCurrentValue();

		currentValue = onRemove( currentValue, value );
		checkLimit( currentValue );
		return currentValue;
	};

	return {
		add: function ( value ) {
			hiddenEl.value = JSON.stringify( addValue( value ) );
		},
		remove: function ( value, onRemove ) {
			hiddenEl.value = JSON.stringify( removeValue( value, onRemove ) );
		},
		update: function ( values ) {
			hiddenEl.value = JSON.stringify( values );
		},
		el: hiddenEl
	};
}
