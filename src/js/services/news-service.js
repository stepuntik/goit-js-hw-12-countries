const baseUrl = 'https://newsapi.org/v2/everything';

export default {
  page: 1,
  query: '',
  fetchArticles() {
    const options = {
      headers: {
        Authorization: '5124683f16af4df2a1dd67b8c8ef50a1',
      },
    };

    const requestParams = `?q=${this.query}&page=${this.page}&pageSize=12`;

    return fetch(baseUrl + requestParams, options)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.articles;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
