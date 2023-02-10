import lazyLoading from '../utils/LazyLoading.js';
import SearchNoResult from './SearchNoResult.js';

export default class SearchResult {
  $searchResult = null;
  onClick = null;

  constructor({ $target, initialState, onClick }) {
    this.$searchResult = document.createElement('ul');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.searchNoResult = new SearchNoResult({
      $target,
      initialState: false,
    });

    this.state = initialState;
    this.onClick = onClick;

    this.render();

    this.$searchResult.addEventListener('click', (e) => {
      const $searchItem = e.target.closest('.item');
      if (!$searchItem) return;

      const { index } = $searchItem.dataset;
      this.onClick(this.state.data[index]);
    });
  }

  setState(nextState) {
    if (this.state === nextState) return;

    this.state = nextState;
    this.render();

    const { keyword, data } = this.state;
    this.searchNoResult.setState(keyword && !data.length);
  }

  render() {
    const { data } = this.state;
    this.$searchResult.innerHTML = data
      .map(
        (cat, index) => `
          <li class="item" title="${cat.name}" data-index=${index}>
            <img class="lazy" data-src="${cat.url}" alt="${cat.name}" />
          </li>
        `
      )
      .join('');

    lazyLoading();
  }
}
