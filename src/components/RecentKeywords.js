import { loadKeywords, saveKeywords } from '../utils/localStorage.js';

export default class RecentKeywords {
  keywords = [];

  constructor($target) {
    const $recentKeywords = document.createElement('ul');
    $recentKeywords.className = 'RecentKeywords';
    this.$recentKeywords = $recentKeywords;
    $target.appendChild($recentKeywords);

    const keywords = loadKeywords();
    if (keywords) {
      this.keywords = keywords.split(',');
    }

    this.render();
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
      .map((keyword) => `<li class='keyword'>${keyword}</li>`)
      .join('');
  }
}
