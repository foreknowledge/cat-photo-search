import lazyLoading from '../utils/LazyLoading.js';
import infiniteScroll from '../utils/infiniteScroll.js';
import SearchNoResult from './SearchNoResult.js';

export default class SearchResult {
  $searchResult = null;
  onClick = null;

  constructor({ $target, initialState, fetchNextData, onClick }) {
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

    infiniteScroll(async () => {
      const { data } = this.state;
      const nextData = await fetchNextData();
      if (!nextData) return;

      // 새로 들어온 데이터 결과 목록에 추가
      this.$searchResult.innerHTML += this.createCatCards(
        nextData,
        data.length
      );
      this.state.data = [...data, ...nextData];

      lazyLoading();
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
    this.$searchResult.innerHTML = this.createCatCards(data, 0);

    lazyLoading();
  }

  createCatCards(data, startOffset) {
    return data
      .map(
        (cat, i) => `
          <li class="item" title="${cat.name}" data-index=${startOffset + i}>
            <img class="lazy" data-src="${cat.url}" alt="${cat.name}" />
          </li>
        `
      )
      .join('');
  }
}
