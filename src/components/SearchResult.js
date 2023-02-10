import lazyLoading from '../utils/LazyLoading.js';

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('ul');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();

    this.$searchResult.addEventListener('click', (e) => {
      const $searchItem = e.target.closest('.item');
      if (!$searchItem) return;

      const { index } = $searchItem.dataset;
      this.onClick(this.data[index]);
    });
  }

  setState(nextData) {
    if (this.data === nextData) return;

    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img class="lazy" data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join('');

    lazyLoading();
  }
}
