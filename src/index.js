import API from './js/fetchCountries';

import itemCardCount from './partials/count-card.hbs';
import itemCardCountList from './partials/count-card-list.hbs';

const debounce = require('lodash.debounce');

// Import Notification
import { success, error, warning } from './js/notification';


const refs = {
	errorParagraph: document.querySelector('.js-render-error'),
	countriesList: document.querySelector('.js-render-countries'),
	inputDate: document.querySelector('.js-get-input')
};

refs.inputDate.addEventListener('input', debounce(onGetBecCountri, 500));

function onGetBecCountri() {
	const value = refs.inputDate.value.trim();
	
    refs.inputDate.innerHTML = '';

    if (value.length < 1) {
       return;
    }

	API.fetchCountries(value)
		.then(renderCountriCard)
}

function renderCountriCard(countries){
	if (!countries){
		warning.showToast();
		return;
	}
	if (countries.length <= 10 && countries.length >=2) {
		const markup = itemCardCountList(countries);
		refs.countriesList.innerHTML = markup;
		return;		
	}

	if (countries.length === 1) {
		refs.inputDate.value = '';
		const markup = itemCardCount(countries);			
		refs.countriesList.innerHTML = markup;
		return
	}

	error.showToast();
}

