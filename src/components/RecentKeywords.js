import {
  loadSessionStorage,
  saveSessionStorage,
} from '../utils/sessionStorage.js';

export default class RecentKeywords {
  keywords = [];

  constructor({ $target, onClickKeyword }) {
    const $recentKeywords = document.createElement('section');
    $recentKeywords.className = 'RecentKeywords';
    this.$recentKeywords = $recentKeywords;
    $target.appendChild($recentKeywords);

    const keywords = loadSessionStorage(KEY_KEYWORDS);
    if (keywords) {
      this.keywords = keywords.split(',');
    }

    this.render();

    $recentKeywords.addEventListener('click', (e) => {
      const $keywordItem = e.target.closest('.keyword');
      if ($keywordItem) {
        onClickKeyword($keywordItem.innerText);
      }
    });
  }

  addKeyword(keyword) {
    this.keywords = this.keywords.filter((item) => item !== keyword);
    this.keywords.push(keyword);
    if (this.keywords.length > 5) {
      this.keywords.shift();
    }
    saveSessionStorage(KEY_KEYWORDS, this.keywords.join(','));
    this.render();
  }

  render() {
    this.$recentKeywords.innerHTML =
      '<span>최근 검색어: </span>' +
      [...this.keywords]
        .map((keyword) => `<button class='keyword'>${keyword}</button>`)
        .join('');
  }
}

const KEY_KEYWORDS = 'keywords';
