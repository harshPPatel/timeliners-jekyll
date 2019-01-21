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
  if (document.getElementById('watch_header_image_carousal') !== null) {
    setTimeout(productCarousal, 3000); // Setting Timeout to avoid errors
  }
}

// Function to initialize product carousal in watch page

var productCarousal = $(function() {
  $("#watch_header_image_carousal").exzoom({
    "navWidth": 45,
    "navHeight": 45,
    "navItemNum": 5,
    "autoPlay": false
  });
});

class Team {
  /**
   * Constructor of class Team, inializes the url
   *
   * Parameter(s):
   * url url of JSON Source
   */
  constructor(url) {
    this._url = url;
  }

  /**
   * getter for url variable
   *
   * Returns: value of url variable
   */
  get url() {
    return this._url;
  }

  /**
   * Setter for url variable
   *
   * Parameter(s):
   * url value of JSON Source
   */
  set url(url) {
    this._url = url;
  }

  static printJSON() {
    console.log(this.teamData);
  }

  /**
   * Save JSON Data to variable
   *
   * Parameter(s):
   * data JSON response
   */
  static setJSONData(data) {
    this.teamData = data;
  }

  /**
   * fetches JSON Data using AJAX and calls appropriate methods
   *
   * Returns: Description of what is returned
   */
  fetchJSON() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myData = JSON.parse(this.responseText);
        Team.setJSONData(myData);
        Team.printJSON();
      }
    }
    xhttp.open("GET", this._url, true);
    xhttp.send();
  }

  /**
   * method init basic methods
   *
   * Methods(s):
   * fetchJSON()
   */
  init() {
    this.fetchJSON();
    this.addButtonEvents();
  }

  /** 
   * removes active class from all js buttons
   */
  static removeActiveClass() {
    var buttons = document.querySelectorAll('.--js-team-buttons');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  }

   /**
   * Adds Active class to cliked button
   */
  static addActiveClass(button) {
    button.classList.add('active');
  }

  addButtonEvents() {
    var buttons = document.querySelectorAll('.--js-team-buttons');
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].onclick = function(event) {
        event.preventDefault();
        Team.removeActiveClass();
        Team.addActiveClass(this);
      };
    }
  }

}

var JSON_SOURCE = "assets/json/teamMembers.json";

var teams = new Team(JSON_SOURCE);
teams.init();
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