class DarkMode {
  constructor($target) {
    const $darkMode = document.createElement('div');
    $darkMode.className = 'DarkMode';
    $darkMode.innerHTML = `
        <label>
            <input class="dark-mode-btn" type="checkbox"/>
            <span>dark mode</span>
        </label>
        `;
    $target.appendChild($darkMode);

    this.currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    this.render();

    const $checkBox = document.querySelector('.dark-mode-btn');
    $checkBox.checked = this.currentMode === 'dark';
    $checkBox.addEventListener('change', (e) => {
      this.currentMode = e.target.checked ? 'dark' : 'light';
      this.render();
    });
  }

  render() {
    const body = document.querySelector('body');
    body.className = this.currentMode;
  }
}
