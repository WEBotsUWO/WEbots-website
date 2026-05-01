const menuToggle = document.querySelector('.menu-toggle');
const navBar = document.querySelector('.nav-bar');

if (menuToggle && navBar) {
  menuToggle.addEventListener('click', function(){
    const isOpen = navBar.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  const navLinks = navBar.querySelectorAll('a');
  navLinks.forEach(function(link){
    link.addEventListener('click', function(){
      navBar.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++){
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint){
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}
