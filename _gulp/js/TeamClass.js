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
        Team.addButtonEvents(myData);
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
   *
   * Parameter(s):
   * button button to add active class
   */
  static addActiveClass(button) {
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
  static changeData(index, data) {
    const nameElement = document.getElementById('--js-member-name');
    const postElement = document.getElementById('--js-post-name');
    const kickerElement = document.getElementById('--js-kicker');
    const socialLinkElements = document.querySelectorAll('.--js-team-web-links');
    Team.changeImage(index, data);
    Team.changeEmail(index, data);
    Team.changePhoneNumber(index, data);
    nameElement.innerHTML = data[0].teamMembers[index].name;
    postElement.innerHTML = data[0].teamMembers[index].post;
    kickerElement.innerHTML = data[0].teamMembers[index].kicker;
    socialLinkElements.forEach(function(link, index2) {
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
  static addButtonEvents(data) {
    var buttons = document.querySelectorAll('.--js-team-buttons');
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].onclick = function(event) {
        event.preventDefault();
        Team.removeActiveClass();
        Team.addActiveClass(this);
        Team.changeData(index, data);
      };
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
  static changeEmail(index, data) {
    const email = data[0].teamMembers[index].email;
    const element = document.querySelector('#--js-email-id a');
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
  static changePhoneNumber(index, data) {
    const phone = data[0].teamMembers[index].phone;
    const countryCode = data[0].teamMembers[index].countryCode;
    const element = document.querySelector('#--js-phone-id a');
    var tempPhone = new String(phone.toString(0));
    
    var formattedPhone = countryCode + " (" + tempPhone.substring(0, 3) + ") " + tempPhone.substring(3,6) + " " + tempPhone.substring(6,10);
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
  static changeImage(index, data) {
    const element = document.getElementById('--js-team-image');
    const baseUrl = 'assets/img/team/team-';
    element.src = baseUrl + index + ".png";
    element.alt = data[0].teamMembers[index].name;
  }

}
