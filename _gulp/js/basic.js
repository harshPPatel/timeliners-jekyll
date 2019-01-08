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
