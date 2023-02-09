const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.autofocus = true;
    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

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

    console.log('SearchInput created.', this);
  }

  render() {}
}
