window.onload = function() {
  addLongClassToImages();
  if (document.getElementById('watch_header_image_carousal') !== null) {
    setTimeout(productCarousal, 3000); // Setting Timeout to avoid errors
  }
}
