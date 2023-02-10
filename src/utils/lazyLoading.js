export default function lazyLoading() {
  const lazyImageObserver = new IntersectionObserver((entries, _) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  lazyImages.forEach((lazyImage) => lazyImageObserver.observe(lazyImage));
}
