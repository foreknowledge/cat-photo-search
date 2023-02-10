import api from '../api.js';
import DarkMode from './DarkMode.js';
import ImageInfo from './ImageInfo.js';
import SearchNoResult from './SearchNoResult.js';
import SearchResult from './SearchResult.js';
import RecentKeywords from './RecentKeywords.js';
import { loadLocalStorage, saveLocalStorage } from '../utils/localStorage.js';
import SearchWrapper from './SearchWrapper.js';
import Loading from './Loading.js';

export default class App {
  $target = null;
  state = {
    data: [],
    keyword: '',
    isLoading: false,
  };

  constructor($target) {
    this.$target = $target;

    const savedState = loadLocalStorage(KEY_APP_STATE);
    if (savedState) {
      this.state = JSON.parse(savedState);
    }

    this.darkMode = new DarkMode($target);

    const onSearch = (keyword) => {
      this.setState({ ...this.state, keyword, isLoading: true });
      api.searchCats(keyword).then((data) => {
        this.setState({ ...this.state, data, isLoading: false });
        this.recentKeywords.addKeyword(keyword);
      });
    };

    this.searchWrapper = new SearchWrapper({
      $target,
      keyword: this.state.keyword,
      onSearch: onSearch,
      onRandom: () => {
        this.setState({ ...this.state, keyword: '', isLoading: true });
        api.fetchRandomCats().then((data) => {
          this.setState({ ...this.state, data, isLoading: false });
        });
      },
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onClickKeyword: onSearch,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.state.data,
      onClick: (image) => {
        this.setState({ ...this.state, isLoading: true });
        api.fetchCatDetails(image.id).then((data) => {
          this.setState({ ...this.state, isLoading: false });
          this.imageInfo.setState({
            visible: true,
            image: {
              ...image,
              origin: data.origin,
              temperament: data.temperament,
            },
          });
        });
      },
    });

    this.searchNoResult = new SearchNoResult({
      $target,
      initialState: this.state,
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
    this.searchWrapper.setState(nextState.keyword);
    this.searchResult.setState(nextState.data);
    this.searchNoResult.setState(nextState);
    this.loading.setState(nextState.isLoading);

    saveLocalStorage(KEY_APP_STATE, JSON.stringify(this.state));
  }
}

const KEY_APP_STATE = 'app_state';
