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

document.querySelectorAll('.history-gallery').forEach(function(gallery){
  const track = gallery.querySelector('.gallery-track');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gallery.querySelectorAll('.gallery-button').forEach(function(button){
    button.addEventListener('click', function(){
      const direction = Number(button.dataset.galleryDirection);
      track.scrollBy({
        left: direction * track.clientWidth * 0.86,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    });
  });
});

const hallOfFameFilter = document.querySelector('#hof-year-filter');
const hallOfFameRosters = Array.from(document.querySelectorAll('.hall-roster'));

if (hallOfFameFilter && hallOfFameRosters.length) {
  hallOfFameRosters.forEach(function(roster, index){
    const yearHeading = roster.querySelector('.roster-topline h2');

    if (!yearHeading) {
      return;
    }

    const year = yearHeading.textContent.trim();
    roster.dataset.rosterYear = year;

    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    hallOfFameFilter.appendChild(option);

    if (index === 0) {
      hallOfFameFilter.value = year;
    }
  });

  const updateHallOfFame = function(){
    const selectedYear = hallOfFameFilter.value;

    hallOfFameRosters.forEach(function(roster){
      roster.hidden = selectedYear !== 'all' && roster.dataset.rosterYear !== selectedYear;
    });
  };

  hallOfFameFilter.addEventListener('change', updateHallOfFame);
  updateHallOfFame();
}
