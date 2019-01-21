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
