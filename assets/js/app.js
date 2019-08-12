"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Variables
var blogCardImage = document.getElementsByClassName('--js-blog-card-image');
var instagramImage = document.getElementsByClassName('--js-instagram-image');
var newsletterSubmitButton = document.getElementById('about_newsletter_form'); // Add if check as i added in newsform button event handler
// Adds Long Class to images in the page

function addLongClassToImages() {
  // for blog card images
  for (var i = 0; i < blogCardImage.length; i++) {
    var height = blogCardImage[i].naturalHeight;
    var width = blogCardImage[i].naturalWidth;

    if (height > width) {
      blogCardImage[i].classList.add('long');
    }
  } // for instagram images


  for (var i = 0; i < instagramImage.length; i++) {
    var height = instagramImage[i].naturalHeight;
    var width = instagramImage[i].naturalWidth;

    if (height > width) {
      instagramImage[i].classList.add('long');
    }
  }
} // Preventing default submit trigger of newsletter form in about page


if (newsletterSubmitButton) {
  newsletterSubmitButton.addEventListener('click', function (e) {
    e.preventDefault();
  });
}

var toggleButton = document.getElementById('--js-hamburger-btn');
toggleButton.addEventListener('click', function (event) {
  event.preventDefault();
  toggleButton.classList.toggle('active');
  document.getElementById('--js-navigation').classList.toggle('mobile-show');
  document.body.classList.toggle('mobile-navigation-open');
}); // functions to run on window load

window.onload = function () {
  // Adding long class
  addLongClassToImages(); // Setting time out to prevent errors

  if (document.getElementById('watch_header_image_carousal') !== null) {
    setTimeout(productCarousal, 3000);
  }
}; // Function to initialize product carousal in watch page


var productCarousal = $(function () {
  $("#watch_header_image_carousal").exzoom({
    "navWidth": 45,
    "navHeight": 45,
    "navItemNum": 5,
    "autoPlay": true,
    "autoPlayTimeout": 4000
  });
});

var Team =
/*#__PURE__*/
function () {
  /**
   * Constructor of class Team, inializes the url
   *
   * Parameter(s):
   * url url of JSON Source
   */
  function Team(url) {
    _classCallCheck(this, Team);

    this._url = url;
  }
  /**
   * getter for url variable
   *
   * Returns: value of url variable
   */


  _createClass(Team, [{
    key: "fetchJSON",

    /**
     * fetches JSON Data using AJAX and calls appropriate methods
     *
     * Returns: Description of what is returned
     */
    value: function fetchJSON() {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var myData = JSON.parse(this.responseText);
          Team.setJSONData(myData);
          Team.addButtonEvents(myData);
        }
      };

      xhttp.open("GET", this._url, true);
      xhttp.send();
    }
    /**
     * method init basic methods
     *
     * Methods(s):
     * fetchJSON()
     */

  }, {
    key: "init",
    value: function init() {
      this.fetchJSON();
    }
    /** 
     * removes active class from all js buttons
     */

  }, {
    key: "url",
    get: function get() {
      return this._url;
    }
    /**
     * Setter for url variable
     *
     * Parameter(s):
     * url value of JSON Source
     */
    ,
    set: function set(url) {
      this._url = url;
    }
    /**
     * Save JSON Data to variable
     *
     * Parameter(s):
     * data JSON response
     */

  }], [{
    key: "setJSONData",
    value: function setJSONData(data) {
      this.teamData = data;
    }
  }, {
    key: "removeActiveClass",
    value: function removeActiveClass() {
      var buttons = document.querySelectorAll('.--js-team-buttons');
      buttons.forEach(function (button) {
        button.classList.remove('active');
      });
    }
    /**
     * Adds Active class to cliked button
     *
     * Parameter(s):
     * button button to add active class
     */

  }, {
    key: "addActiveClass",
    value: function addActiveClass(button) {
      button.classList.add('active');
    }
    /**
     * Changes data of Members
     *
     * Parameter(s):
     * index index of array
     * data data got from json
     * 
     * Methods(s):
     * changeImage(index, data);
     * changeEmail(index, data);
     * changePhoneNumber(index, data);
     */

  }, {
    key: "changeData",
    value: function changeData(index, data) {
      var nameElement = document.getElementById('--js-member-name');
      var postElement = document.getElementById('--js-post-name');
      var kickerElement = document.getElementById('--js-kicker');
      var socialLinkElements = document.querySelectorAll('.--js-team-web-links');
      Team.changeImage(index, data);
      Team.changeEmail(index, data);
      Team.changePhoneNumber(index, data);
      nameElement.innerHTML = data[0].teamMembers[index].name;
      postElement.innerHTML = data[0].teamMembers[index].post;
      kickerElement.innerHTML = data[0].teamMembers[index].kicker;
      socialLinkElements.forEach(function (link, index2) {
        link.href = data[0].teamMembers[index].socialLinks[index2];
      });
    }
    /**
     * Adds click button events to the buttons
     * 
     * Parameter(s):
     * data data fetched from JSON
     * 
     */

  }, {
    key: "addButtonEvents",
    value: function addButtonEvents(data) {
      var buttons = document.querySelectorAll('.--js-team-buttons');

      var _loop = function _loop(index) {
        buttons[index].onclick = function (event) {
          event.preventDefault();
          Team.removeActiveClass();
          Team.addActiveClass(this);
          Team.changeData(index, data);
        };
      };

      for (var index = 0; index < buttons.length; index++) {
        _loop(index);
      }
    }
    /**
     * Changes the email of member as well as link's href attribute
     * 
     * Parameter(s):
     * index index of array
     * data data fetched form JSON
     * 
     */

  }, {
    key: "changeEmail",
    value: function changeEmail(index, data) {
      var email = data[0].teamMembers[index].email;
      var element = document.querySelector('#--js-email-id a');
      element.innerHTML = email;
      element.href = "mailto: " + email;
    }
    /**
     * Formates the phone number and change the number of member as well as link's href
     * 
     * Parameter(s):
     * index index of array
     * data data fetched form JSON
     * 
     */

  }, {
    key: "changePhoneNumber",
    value: function changePhoneNumber(index, data) {
      var phone = data[0].teamMembers[index].phone;
      var countryCode = data[0].teamMembers[index].countryCode;
      var element = document.querySelector('#--js-phone-id a');
      var tempPhone = new String(phone.toString(0));
      var formattedPhone = countryCode + " (" + tempPhone.substring(0, 3) + ") " + tempPhone.substring(3, 6) + " " + tempPhone.substring(6, 10);
      element.innerHTML = formattedPhone;
      element.href = "tel: " + countryCode + phone;
    }
    /**
     * change the image of the team and the alternative text
     * 
     * Parameter(s):
     * index index of array
     * data data fetched form JSON
     * 
     */

  }, {
    key: "changeImage",
    value: function changeImage(index, data) {
      var element = document.getElementById('--js-team-image');
      var baseUrl = 'assets/img/team/team-';
      element.src = baseUrl + index + ".png";
      element.alt = data[0].teamMembers[index].name;
    }
  }]);

  return Team;
}();

var JSON_SOURCE = "/assets/json/teamMembers.json"; // Defining Team

var teams = new Team(JSON_SOURCE); // Initializing the team

teams.init(); // Watch reviews carousal

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