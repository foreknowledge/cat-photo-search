import { showLoadingSpinner, hideLoadingSpinner } from './utils/loading.js';

const API_ENDPOINT =
  'https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  showLoadingSpinner();
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data.data;
    }

    throw response;
  } catch (e) {
    console.warn(e);
    let errMsg;
    switch (e.status / 100) {
      case 3:
        errMsg = `Redirects Error with status code ${e.status}`;
      case 4:
        errMsg = `Client Error with status code ${e.status}`;
      case 5:
        errMsg = `Server Error with status code ${e.status}`;
      default:
        errMsg = `Unknown Error with status code ${e.status}`;
    }
    alert(errMsg);
  } finally {
    hideLoadingSpinner();
  }
};

const api = {
  searchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetails: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
export default api;
