import throttle from './throttle.js';

export default function infiniteScroll(onScrollEnd) {
  window.addEventListener('scroll', () => {
    throttle(() => {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (endOfPage) {
        onScrollEnd();
      }
    }, 1000);
  });
}
