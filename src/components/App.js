import api from '../api.js';
import DarkMode from './DarkMode.js';
import ImageInfo from './ImageInfo.js';
import SearchNoResult from './SearchNoResult.js';
import SearchResult from './SearchResult.js';
import RecentKeywords from './RecentKeywords.js';
import { getItem, setItem } from '../utils/sessionStorage.js';
import SearchWrapper from './SearchWrapper.js';
import Loading from './Loading.js';

export default class App {
  $target = null;
  state = {
    data: [],
    keyword: '',
  };

  constructor($target) {
    this.$target = $target;

    const savedState = getItem(KEY_APP_STATE);
    if (savedState) {
      this.state = JSON.parse(savedState);
    }

    this.darkMode = new DarkMode($target);

    const onSearch = async (keyword) => {
      this.showLoading();
      const data = await api.searchCats(keyword);
      this.hideLoading();

      if (!data) return;
      this.setState({ data, keyword });
      this.recentKeywords.addKeyword(keyword);
    };

    this.searchWrapper = new SearchWrapper({
      $target,
      keyword: this.state.keyword,
      onSearch: onSearch,
      onRandom: async () => {
        this.showLoading();
        const data = await api.fetchRandomCats();
        this.hideLoading();

        if (!data) return;
        this.setState({ data, keyword: '' });
      },
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onClickKeyword: onSearch,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.state.data,
      onClick: async (image) => {
        this.showLoading();
        const data = await api.fetchCatDetails(image.id);
        this.hideLoading();

        if (!data) return;
        this.imageInfo.setState({
          visible: true,
          image: {
            ...image,
            origin: data.origin,
            temperament: data.temperament,
          },
        });
      },
    });

    this.searchNoResult = new SearchNoResult({
      $target,
      initialState: false,
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      onClose: () => {
        this.imageInfo.setState({
          visible: false,
          image: null,
        });
      },
    });

    this.loading = new Loading($target);
  }

  setState(nextState) {
    this.state = nextState;
    const { data, keyword } = nextState;
    this.searchWrapper.setState(keyword);
    this.searchResult.setState(data);
    this.searchNoResult.setState(keyword && !data.length);

    setItem(KEY_APP_STATE, JSON.stringify(this.state));
  }

  showLoading() {
    this.loading.setState(true);
  }

  hideLoading() {
    this.loading.setState(false);
  }
}

const KEY_APP_STATE = 'app_state';
