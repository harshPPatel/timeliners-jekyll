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

window.onload = function() {
  addLongClassToImages();
  setTimeout(productCarousal, 3000); // Setting Timeout to avoid errors
}

// Function to initialize product carousal in watch page

productCarousal = $(function() {
  $("#watch_header_image_carousal").exzoom({
    "navWidth": 45,
    "navHeight": 45,
    "navItemNum": 5,
    "autoPlay": false
  });
});

var teamData;
var JSON_SOURCE = './assets/json/teamMembers.json';

console.log(teamData);

fetch("assets/json/teamMembers.json")
  .then(res => res.json())
  .then(data => teamData = data);

 window.onload = function () {
  console.log(teamData[0].teamMembers);
  
 }

//  TODO: Create class of team slider with methods and init with selected element
// constructor takes html element as argument


// console.log(teamData[0].teamMmbers[0].name);

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