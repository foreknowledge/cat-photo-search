import { loadKeywords, saveKeywords } from '../utils/localStorage.js';

export default class RecentKeywords {
  keywords = [];

  constructor({ $target, onClickKeyword }) {
    const $recentKeywords = document.createElement('section');
    $recentKeywords.className = 'RecentKeywords';
    this.$recentKeywords = $recentKeywords;
    $target.appendChild($recentKeywords);

    const keywords = loadKeywords();
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
    this.keywords.push(keyword);
    if (this.keywords.length > 5) {
      this.keywords.shift();
    }
    saveKeywords(this.keywords.join(','));
    this.render();
  }

  render() {
    this.$recentKeywords.innerHTML = [...this.keywords]
      .reverse()
      .map((keyword) => `<button class='keyword'>${keyword}</button>`)
      .join('');
  }
}
