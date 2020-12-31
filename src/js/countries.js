const debounce = require('lodash/debounce');
const PNotify = require('@pnotify/core');

import countriesService from './services/countries-service';

import oneCountryTemplate from '../templates/one-country-info.hbs';
import multipleCountriesTemplate from '../templates/multiple-countries-info.hbs';

const refs = {
  searchBar: document.querySelector('#search-bar'),
  countryList: document.querySelector('#country-container'),
  spinner: document.querySelector('#spinner'),
};

refs.searchBar.addEventListener('input', debounce(searchBarInputHandler, 1000));

function searchBarInputHandler(e) {
  clearListItems();

  countriesService.searchQuery = e.target.value;
  if (!e.target.value) return;

  refs.spinner.classList.remove('is-hidden');
  fetchCountries();
}

function fetchCountries() {
  countriesService
    .fetchCountries()
    .then(countries => {
      if (countries.length >= 2 && countries.length <= 10) {
        insertCountriesList(countries);
      } else if (countries.length > 10) {
        insertSearchNotification();
      } else if (countries.status === 404) {
        insertNotFoundNotification();
      } else if (countries.status !== 404) {
        insertCountry(countries[0]);
      }
      refs.spinner.classList.add('is-hidden');
    })
    .catch(error => {
      console.warn(error);
    });
}

function insertCountry(country) {
  const markup = oneCountryTemplate(country);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function insertCountriesList(countries) {
  const markup = multipleCountriesTemplate(countries);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function insertSearchNotification() {
  PNotify.error({
    text: 'Too many matches found. Please enter a more specific query!',
    title: false,
    closer: false,
    width: '100%',
    delay: 2000,
    sticker: false,
    maxTextHeight: null,
  });
}

function insertNotFoundNotification() {
  PNotify.error({
    text: 'Incorrect input. Please enter a proper country name!',
    title: false,
    closer: false,
    width: '100%',
    delay: 2000,
    sticker: false,
    maxTextHeight: null,
  });
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}
