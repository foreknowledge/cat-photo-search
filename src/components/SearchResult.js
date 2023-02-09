class SearchResult {
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
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <li class="item">
            <img class="cat_img" data-id=${cat.id} src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join('');

    this.$searchResult.addEventListener('click', (e) => {
      if (e.target.className === 'cat_img') {
        const targetId = e.target.dataset.id;
        const data = this.data.find((item) => item.id === targetId);
        this.onClick(data);
      }
    });
  }
}
