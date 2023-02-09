class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <article class="content-wrapper">
          <header class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </header>
          <img src="${url}" alt="${name}"/>        
          <footer class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </footer>
        </article>`;
      this.$imageInfo.style.display = 'block';
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
