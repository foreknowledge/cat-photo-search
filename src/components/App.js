import api from '../api.js';
import DarkMode from './DarkMode.js';
import ImageInfo from './ImageInfo.js';
import SearchResult from './SearchResult.js';
import RecentKeywords from './RecentKeywords.js';
import { getItem, setItem } from '../utils/sessionStorage.js';
import SearchWrapper from './SearchWrapper.js';
import Loading from './Loading.js';
import ImageBanner from './ImageBanner.js';

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

    // dark mode
    this.darkMode = new DarkMode($target);

    // search input
    this.searchWrapper = new SearchWrapper({
      $target,
      keyword: this.state.keyword,
      onSearch: (keyword) => this.onSearch(keyword),
      onRandom: async () => {
        this.showLoading();
        const data = await api.fetchRandomCats();
        this.hideLoading();

        if (!data) return;
        this.setState({ data, keyword: '' });
      },
    });

    // recent keywords
    this.recentKeywords = new RecentKeywords({
      $target,
      onClickKeyword: (keyword) => this.onSearch(keyword),
    });

    // image banner
    this.imageBanner = new ImageBanner({
      $target,
      fetchRandomCats: api.fetchRandomCats,
    });

    // search result
    this.searchResult = new SearchResult({
      $target,
      initialState: this.state,
      fetchNextData: async () => {
        this.showLoading();
        const data = await api.fetchRandomCats();
        this.hideLoading();
        return data;
      },
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

    // image info
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

    // loading
    this.loading = new Loading($target);
  }

  setState(nextState) {
    this.state = nextState;
    this.searchWrapper.setState(this.state.keyword);
    this.searchResult.setState(this.state);

    setItem(KEY_APP_STATE, JSON.stringify(this.state));
  }

  async onSearch(keyword) {
    this.showLoading();
    const data = await api.searchCats(keyword);
    this.hideLoading();

    if (!data) return;
    this.setState({ data, keyword });
    this.recentKeywords.addKeyword(keyword);
  }

  showLoading() {
    this.loading.setState(true);
  }

  hideLoading() {
    this.loading.setState(false);
  }
}

const KEY_APP_STATE = 'app_state';
