var blogCardImage = document.getElementsByClassName('--js-blog-card-image');
var instagramImage = document.getElementsByClassName('--js-instagram-image');

// Adds Long Class to images in the page
function addLongClassToImages() {
  // for blog card images
  for (var i = 0; i < blogCardImage.length; i++) {
    var height = blogCardImage[i].naturalHeight;
    var width  = blogCardImage[i].naturalWidth;
    if (height > width) {
      blogCardImage[i].classList.add('long');
    }
  }
  // for instagram images
  for (var i = 0; i < instagramImage.length; i++) {
    var height = instagramImage[i].naturalHeight;
    var width  = instagramImage[i].naturalWidth;
    if (height > width) {
      instagramImage[i].classList.add('long');
    }
  }
}

// Change it and try to make one function to  prevent all buttons
document.getElementById('about_newsletter_form').addEventListener('click', function(e) {
  e.preventDefault();
});
