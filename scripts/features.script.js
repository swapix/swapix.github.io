// Function to check if an element is in viewport
function isInViewport(element) {
    var bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
// Function to handle scroll animations
function handleScrollAnimations() {
    var elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(function(element) {
      if (isInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.classList.add('animated'); // Add 'animated' class to prevent re-triggering
      }
    });
  }
  
  // Function to check if an element is partially in viewport
  function isPartiallyInViewport(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return (
      (rect.top <= windowHeight && rect.bottom >= 0) ||
      (rect.bottom >= 0 && rect.top <= 0)
    );
  }
  
  // Function to handle scroll animations based on scroll position
  function handlePositionBasedAnimations() {
    var animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach(function(element) {
      if (isPartiallyInViewport(element)) {
        element.classList.add('slide-in-left');
      }
    });
  }


document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimation = document.querySelector('.particle-animation');

    window.addEventListener('mousemove', (event) => {
        const xTranslation = event.clientX / window.innerWidth;
        const yTranslation = event.clientY / window.innerHeight;
      
        const angle = Math.floor((xTranslation + yTranslation) * 180); // Combine x and y for smoother effect
      
        backgroundAnimation.style.background = `linear-gradient(${angle}deg, #1d2d52 0%, #030321 150%)`;
      });
  });



  // Listen for scroll events and trigger animations
  window.addEventListener('scroll', function() {
    handleScrollAnimations();
    handlePositionBasedAnimations();
  });
  