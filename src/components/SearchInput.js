const TEMPLATE = '<input type="text">';

export default class SearchInput {
  keyword = '';

  constructor({ $target, keyword, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.autofocus = true;
    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

    this.keyword = keyword;
    this.render();

    $searchInput.addEventListener('focus', (e) => {
      if (e.target.value) {
        e.target.value = '';
      }
    });

    $searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    });
  }

  setState(keyword) {
    if (this.keyword === keyword) return;

    this.keyword = keyword;
    this.render();
  }

  render() {
    this.$searchInput.value = this.keyword;
  }
}
