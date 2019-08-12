var toggleButton = document.getElementById('--js-hamburger-btn');

toggleButton.addEventListener('click', function(event){
  event.preventDefault();
  toggleButton.classList.toggle('active');
  document.getElementById('--js-navigation').classList.toggle('mobile-show');
  document.body.classList.toggle('mobile-navigation-open');
});