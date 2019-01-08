var blogCardImage = document.getElementsByClassName('--js-blog-card-image');
var instagramImage = document.getElementsByClassName('--js-instagram-image');

for (var i = 0; i < blogCardImage.length; i++) {
  var height = blogCardImage[i].naturalHeight;
  var width  = blogCardImage[i].naturalWidth;
  if (height > width) {
    blogCardImage[i].classList.add('long');
  }
}

for (var i = 0; i < instagramImage.length; i++) {
  var height = instagramImage[i].naturalHeight;
  var width  = instagramImage[i].naturalWidth;
  if (height > width) {
    instagramImage[i].classList.add('long');
  }
}
