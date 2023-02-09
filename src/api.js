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

    throw new Error(response);
  } catch (e) {
    console.warn(e);
    alert(e.messages);
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
