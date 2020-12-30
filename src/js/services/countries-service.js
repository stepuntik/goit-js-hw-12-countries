const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  query: '',
  fetchCountries() {
    return fetch(baseUrl + this.query)
      .then(response => response.json())
      .then(parsedResponse => parsedResponse);
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
};
