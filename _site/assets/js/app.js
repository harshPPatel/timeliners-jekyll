var blogCardImage = document.getElementsByClassName('--js-blog-card-image');

console.log(blogCardImage);

for (var i = 0; i < blogCardImage.length; i++) {
  var height = blogCardImage[i].naturalHeight;
  var width  = blogCardImage[i].naturalWidth;
  console.log(height, width);
  if (height > width) {
    blogCardImage[i].classList.add('long');
  }
}

window.onload = $(function() {
  $("#watch_header_image_carousal").exzoom({
    "navWidth": 45,
    "navHeight": 45,
    "navItemNum": 5,
    "autoPlay": false
  });
});

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