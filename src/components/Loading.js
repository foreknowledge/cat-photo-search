export default class Loading {
  isLoading = false;

  constructor($target) {
    const $loading = document.createElement('div');
    $loading.className = 'Loading';

    $target.appendChild($loading);
    this.$loading = $loading;

    this.render();
  }

  setState(isLoading) {
    if (this.isLoading === isLoading) return;

    this.isLoading = isLoading;
    this.render();
  }

  render() {
    this.$loading.style.display = this.isLoading ? 'block' : 'none';
  }
}
