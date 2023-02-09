import api from '../api.js';
import DarkMode from './DarkMode.js';
import ImageInfo from './ImageInfo.js';
import SearchNoResult from './SearchNoResult.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import RecentKeywords from './RecentKeywords.js';

export default class App {
  $target = null;
  state = {
    data: [],
    keyword: '',
    isLoading: false,
  };

  constructor($target) {
    this.$target = $target;

    this.darkMode = new DarkMode($target);

    const onSearch = (keyword) => {
      this.setState({ ...this.state, keyword, isLoading: true });
      api.searchCats(keyword).then((data) => {
        this.setState({ ...this.state, data, isLoading: false });
        this.recentKeywords.addKeyword(keyword);
      });
    };

    this.searchInput = new SearchInput({
      $target,
      onSearch: onSearch,
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onClickKeyword: onSearch,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.state.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
  }

  setState(nextState) {
    this.state = nextState;
    this.searchResult.setState(nextState.data);
    this.searchNoResult.setState(nextState);
  }
}
