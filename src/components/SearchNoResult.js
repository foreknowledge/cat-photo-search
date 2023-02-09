export default class SearchNoResult {
  data = null;

  constructor({ $target, initialData }) {
    const $searchNoResult = document.createElement('div');
    $searchNoResult.className = 'SearchNoResult';
    $searchNoResult.innerHTML = '검색 결과가 없습니다.';
    this.$searchNoResult = $searchNoResult;
    $target.appendChild($searchNoResult);

    this.data = initialData;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchNoResult.style.display = !this.data.length ? 'block' : 'none';
  }
}
