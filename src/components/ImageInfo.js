export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.addCloseEvent();

    this.render();
  }

  onShow() {
    this.$imageInfo.classList.remove('fade-out');
  }

  onClose() {
    this.$imageInfo.classList.add('fade-out');
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

      // x 버튼 클릭
      document
        .querySelector('button.close')
        .addEventListener('click', () => this.onClose());

      this.onShow();
    } else {
      this.onClose();
    }
  }

  addCloseEvent() {
    // 모달 외부 영역 클릭
    this.$imageInfo.addEventListener('click', (e) => {
      if (e.target.className === 'ImageInfo') {
        this.onClose();
      }
    });

    // ESC 키 입력
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.onClose();
      }
    });
  }
}
