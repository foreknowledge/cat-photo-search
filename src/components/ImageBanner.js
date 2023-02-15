export default class ImageBanner {
  startPos = 0;
  constructor({ $target, fetchRandomCats }) {
    const $imageBanner = document.createElement('section');
    $imageBanner.className = 'ImageBanner';
    $target.appendChild($imageBanner);

    const $prevButton = document.createElement('button');
    $prevButton.innerText = '❮';
    $prevButton.addEventListener('click', () => {
      if (this.startPos === 0) return;
      this.startPos -= 1;
      this.render();
    });
    $imageBanner.appendChild($prevButton);

    const $imgList = document.createElement('ul');
    $imgList.className = 'ImageList';
    $imgList.style.display = 'none';
    $imageBanner.appendChild($imgList);
    this.$imgList = $imgList;

    const $loadingText = document.createElement('span');
    $loadingText.innerText = 'loading...';
    $imageBanner.appendChild($loadingText);

    const $nextButton = document.createElement('button');
    $nextButton.innerText = '❯';
    $nextButton.addEventListener('click', () => {
      if (this.startPos + 5 === this.data.length) return;
      this.startPos += 1;
      this.render();
    });
    $imageBanner.appendChild($nextButton);

    (async () => {
      this.data = await fetchRandomCats();
      $loadingText.style.display = 'none';
      $imgList.style.display = 'block';
      this.render();
    })();
  }

  render() {
    this.$imgList.innerHTML = this.data
      .slice(this.startPos, this.startPos + 5)
      .map(
        (cat) =>
          `<li><img src="${cat.url}" alt="${cat.name}" title="${cat.name}" /></li>`
      )
      .join('');
  }
}
