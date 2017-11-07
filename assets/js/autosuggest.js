const isJSON = ( str ) => {

	if ( typeof ( str ) !== 'string' ) {
		return false;
	}
	try {
		JSON.parse( str );
		return true;
	} catch ( e ) {
		return false;
	}
};

const buildQuery = ( value ) => {
	return encodeURIComponent( value.toLowerCase() );
};

const onAutoSuggestInput = ( e ) => {
	const input = e.target;
	const inputValue = input.value;
	const listName = input.getAttribute( 'list' );
	const listOptions = document.getElementById( listName ).childNodes;

	const match = [].reduce.call( listOptions, ( acc, option ) => {
		if ( option.value === inputValue ) {
			return acc.concat( {
				id: option.dataset.id,
				title: option.value
			} ) ;
		}
		return acc;
	}, [] );

	return ( match.length === 0 ) ? false : match[0];
};

const getOptions = ( xhr, callback, input, endpoint ) => {
	const query = buildQuery( input.value );
	const url = endpoint + query;

	if ( xhr ) {
		xhr.abort();
	}

	xhr = new XMLHttpRequest();

	xhr.addEventListener( 'load', ( evt ) => {
		callback( false, evt );
	}, false );

	xhr.onreadystatechange = function () {
		if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
			callback( false, { results: JSON.parse( xhr.responseText ), input: input } );
		} else if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400 ) {
			if ( xhr.responseText && isJSON( xhr.responseText ) ) {
				callback( { message: JSON.parse( xhr.responseText ), input: input }, false );
			}
		}
	};

	xhr.addEventListener( 'error', ( evt ) => {
		callback( evt, false );
	}, false );

	xhr.addEventListener( 'abort', ( evt ) => {
		callback( true, false );
	}, false );

	xhr.open( 'GET', url, true );

	xhr.send();

	return xhr;
};

const createOption = ( value ) => {
	return `<option data-id=${value.id} value="${value.title.rendered}">`;
};

const createOptions = ( results, input ) => {
	const listName = input.getAttribute( 'list' );
	const datalist = document.getElementById( listName );

	const newOptions = results.reduce( ( acc, result ) => {
		const option = createOption( result );

		return acc.concat( option );
	}, '' );

	input.classList.remove( 'show' );
	datalist.innerHTML = newOptions;
};

const updateOptions = ( error, response ) => {
	if ( error ) {

		if ( error === true ) {
			return false;
		}

		error.input.classList.remove( 'show' );
		console.warn( error );
	}

	if ( response ) {
		if ( ! Array.isArray( response.results ) ) {
			return false;
		}

		createOptions( response.results, response.input );
	}
};

export default function ( autosuggest, endpoint, onSelect, onEmpty ) {

	if ( ! autosuggest ) {
		return false;
	}

	let xhr = false;

	autosuggest.addEventListener( 'keyup', ( e ) => {
		if ( e.target.value.length === 0 && onEmpty ) {
			onEmpty();
		}

		if ( e.target.value.length < 3 ) {
			return false;
		}

		autosuggest.classList.add( 'show' );
		xhr = getOptions( xhr, updateOptions, autosuggest, endpoint );

	} );
	autosuggest.addEventListener( 'input', ( e ) => {
		const value = onAutoSuggestInput( e );

		if ( value ) {
			onSelect( value, autosuggest );
		}
	} );
}
