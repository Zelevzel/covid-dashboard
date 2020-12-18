export default function fullScreen() {
  function blockfullScreen() {
    const elem = document.querySelector(`.${this.dataset.toggleClass}`);
    elem.classList.toggle('FullScreen');
    document.querySelector('footer').style.display =
      document.querySelector('footer').style.display !== 'none'
        ? 'none'
        : 'grid';
  }

  window.onload = function load() {
    const input = document.querySelectorAll('.expandInput');
    for (let i = 0; i < input.length; i += 1) {
      input[i].addEventListener('click', blockfullScreen);
    }
  };
  return 0;
}
