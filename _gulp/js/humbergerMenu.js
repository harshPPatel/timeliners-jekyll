var toggleButton = document.getElementById('--js-toggle-button');

toggleButton.addEventListener('click', function(event){
  event.preventDefault();
  toggleButton.classList.toggle('toggled');
  document.getElementById('--js-navigation').classList.toggle('mobile-show');
  document.body.classList.toggle('mobile-navigation-open');
});