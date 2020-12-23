function blockfullScreen() {
  const elem = document.querySelector(`.${this.dataset.toggleClass}`);
  elem.classList.toggle('FullScreen');
  document.querySelector('body').style.overflowY =
    document.querySelector('body').style.overflowY !== 'hidden'
      ? 'hidden'
      : 'auto';
  if (this.dataset.toggleFull !== undefined) {
    const elemPlus80na80 = document.querySelector(
      `.${this.dataset.toggleFull}`
    );
    elemPlus80na80.classList.toggle('Fullobj');
    if (this.dataset.toggleFull === 'canvas') {
      /* принудительное обновление размеров графика */
      // eslint-disable-next-line no-undef
      Chart.instances[0].resize();
    }
  }
}

export default function loadeventlistener() {
  const input = document.querySelectorAll('.expandInput');
  for (let i = 0; i < input.length; i += 1) {
    input[i].addEventListener('click', blockfullScreen);
  }
}
