window.addEventListener('scroll', function() {
    handleStickyNavigation()
  });

  // Function to handle sticky navigation
function handleStickyNavigation() {
    var navbar = document.querySelector('.navbar');
    var navbarScrollClass = 'navbar-scroll';
    if (window.pageYOffset > 0) {
      navbar.classList.add(navbarScrollClass);
    } else {
      navbar.classList.remove(navbarScrollClass);
    }
  }