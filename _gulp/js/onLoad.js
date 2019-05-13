// functions to run on window load
window.onload = function () {

  // Adding long class
  addLongClassToImages();

  // Setting time out to prevent errors
  if (document.getElementById('watch_header_image_carousal') !== null) {
    setTimeout(productCarousal, 3000);
  }
}