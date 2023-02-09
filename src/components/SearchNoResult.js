export default class SearchNoResult {
  state = null;

  constructor({ $target, initialState }) {
    const $searchNoResult = document.createElement('div');
    $searchNoResult.className = 'SearchNoResult';
    $searchNoResult.innerHTML = '검색 결과가 없습니다.';
    this.$searchNoResult = $searchNoResult;
    $target.appendChild($searchNoResult);

    this.state = initialState;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { data, keyword, isLoading } = this.state;
    this.$searchNoResult.style.display =
      keyword && !isLoading && !data.length ? 'block' : 'none';
  }
}
