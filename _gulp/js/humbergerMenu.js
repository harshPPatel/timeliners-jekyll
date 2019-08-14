// Fetching Humburger Button from document (HTML Page)
var humburgerButton = document.getElementById('--js-hamburger-btn');

// Adding click listener to Humburger Menu and toggling active class 
// to it and addinf mobile-show class to navigation
humburgerButton.addEventListener('click', function(event){
  event.preventDefault();
  humburgerButton.classList.toggle('active');
  document.getElementById('--js-navigation').classList.toggle('mobile-show');
  document.body.classList.toggle('mobile-navigation-open');
});