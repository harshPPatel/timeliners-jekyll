new Glider(document.querySelector('.watch_reviews #review_carousal .glider'), {
  slidesToShow: 1,
  dots: '.dots',
  draggable: true,
  duration: 1.5,
  rewind: true,
  scrollLock: true,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});