import baseCss from '../css/index.css';
import autoList from './autosuggest-list';
import autoItem from './auto-item';

const createAutoSuggestItem = (value) => {
	return `<li class="text-list-item" data-id="${value.id}">
        <span>${value.title}</span>
        <svg viewBox="0 0 20 20">
            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
        </svg>
    </li>`;
}

document.addEventListener( 'DOMContentLoaded', function() {

    autoList({
     parent: '.customizer-curation-list',
     input: '.customizer-curation-list-input',
     list: '.customizer-curation-list-list',
     hidden: '.customizer-curation-list-hidden',
     listTemplate: createAutoSuggestItem,
     endpoint: `${OMGFields.baseURL}/wp-json/wp/v2/posts?search=`
    });

    autoItem({
  	  parent: '.customizer-curation',
        input: '.customizer-curation-input',
  	  hidden: '.customizer-curation-hidden',
  	  endpoint: `${OMGFields.baseURL}/wp-json/wp/v2/posts?search=`
    });
} );
