/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "baseCss" }] */
/* global CustomizerCuration */

import baseCss from '../css/index.css';
import autoList from './autosuggest-list';
import autoItem from './auto-item';

const createAutoSuggestItem = ( value ) => {
	return `<li class="text-list-item" data-id="${value.id}">
        <span>${value.title}</span>
        <svg viewBox="0 0 20 20">
            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8
			8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
        </svg>
    </li>`;
};

document.addEventListener( 'DOMContentLoaded', () => {
	const autoLists = document.querySelectorAll( '.customizer-curation-list' );

	if ( autoLists ) {
		[].forEach().call( autoLists, ( el ) => {
			autoList( {
				parent: el,
				input: el.querySelector( '.customizer-curation-list-input' ),
				list: el.querySelector( '.customizer-curation-list-list' ),
				hidden: el.querySelector( '.customizer-curation-list-hidden' ),
				listTemplate: createAutoSuggestItem,
				endpoint: `${CustomizerCuration.baseURL}/wp-json/wp/v2/${CustomizerCuration.resource}?search=`
			} );
		} );
	}

	autoItem( {
		parent: '.customizer-curation',
		input: '.customizer-curation-input',
		hidden: '.customizer-curation-hidden',
		endpoint: `${CustomizerCuration.baseURL}/wp-json/wp/v2/${CustomizerCuration.resource}?search=`
	} );
} );
