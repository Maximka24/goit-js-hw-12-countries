import API from './js/fetchCountries';

import itemCardCount from './partials/count-card.hbs';
import itemCardCountList from './partials/count-card-list.hbs';

const debounce = require('lodash.debounce');

const refs = {
	errorParagraph: document.querySelector('.js-render-error'),
	countriesList: document.querySelector('.js-render-countries'),
	inputDate: document.querySelector('.js-get-input')
};

refs.inputDate.addEventListener('input', debounce(onGetBecCountri, 500));

function onGetBecCountri() {
	const value = refs.inputDate.value;

	API.fetchCountries(value)
		.then(renderCountriCard)
		.catch(error => console.log(error))
		// .finally()
}

function renderCountriCard(countries){
	if (countries.length < 10 && countries.length >=2) {
		const markup = itemCardCountList(countries);
		refs.countriesList.innerHTML = markup;		
	}

	if (countries.length === 1) {
		const markup = itemCardCount(countries);			
		refs.countriesList.innerHTML = markup;
	}
}

