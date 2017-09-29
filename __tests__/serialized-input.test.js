import serializedInput from '../assets/js/serialized-input';

describe( 'Request Reducer', () => {
	let Hidden = false;
	let hiddenEl = false;
	const hiddenHTML = '<input class="input__field customizer-curation-list-hidden" type="hidden" value />';
	const value = { id: 1, title: 'yolo' };

	beforeEach( () => {
		document.body.innerHTML =
				'<div>' +
				hiddenHTML +
				'</div>';
		hiddenEl = document.querySelector( '.customizer-curation-list-hidden' );
		Hidden = serializedInput( hiddenEl );
	} );

	it( 'Add object value to hidden', () => {
		Hidden.add( value );
		expect( Hidden.el.value ).toEqual( JSON.stringify( [ value ] ) );
	} );

	it( 'Add multiple objects to hidden element', () => {
		Hidden.add( { id: 1, title: 'yolo' } );
		Hidden.add( { id: 2, title: 'bolo' } );
		expect( Hidden.el.value ).toEqual(
			JSON.stringify( [ { id: 1, title: 'yolo' }, { id: 2, title: 'bolo' } ]
			) );
	} );
} );
