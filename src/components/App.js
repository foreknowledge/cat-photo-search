import api from '../api.js';
import DarkMode from './DarkMode.js';
import ImageInfo from './ImageInfo.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkMode = new DarkMode($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        api.searchCats(keyword).then((data) => {
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
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

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
