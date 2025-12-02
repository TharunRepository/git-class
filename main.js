// Add a scroll event listener to handle the sticky navigation
window.addEventListener('scroll', function() {
  const mainNav = document.querySelector('.main-nav');
  const topbar = document.querySelector('.topbar');
  const scrollPosition = window.scrollY;
  
  // When scrolling down more than 50px, add the 'scrolled' class
  if (scrollPosition > 50) {
    mainNav.classList.add('scrolled');
    topbar.style.background = 'rgba(0,0,0,0.95)';
  } else {
    mainNav.classList.remove('scrolled');
    topbar.style.background = 'rgba(0,0,0,0.75)';
  }
});
