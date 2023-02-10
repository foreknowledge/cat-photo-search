export default class SearchNoResult {
  noResult = null;

  constructor({ $target, initialState }) {
    const $searchNoResult = document.createElement('div');
    $searchNoResult.className = 'SearchNoResult';
    $searchNoResult.innerHTML = '검색 결과가 없습니다.';
    this.$searchNoResult = $searchNoResult;
    $target.appendChild($searchNoResult);

    this.noResult = initialState;

    this.render();
  }

  setState(noResult) {
    this.noResult = noResult;
    this.render();
  }

  render() {
    this.$searchNoResult.style.display = this.noResult ? 'block' : 'none';
  }
}
