import SearchInput from './SearchInput.js';

export default class SearchWrapper {
  constructor({ $target, keyword, onSearch, onRandom }) {
    const $inputWrapper = document.createElement('section');
    $inputWrapper.className = 'InputWrapper';
    $target.appendChild($inputWrapper);

    this.$searchInput = new SearchInput({
      $target: $inputWrapper,
      keyword,
      onSearch,
    });

    const $randomBtn = document.createElement('button');
    $randomBtn.className = 'RandomButton';
    $randomBtn.innerText = '🔀';
    $inputWrapper.appendChild($randomBtn);

    $randomBtn.addEventListener('click', onRandom);
  }

  setState(keyword) {
    this.$searchInput.setState(keyword);
  }
}
