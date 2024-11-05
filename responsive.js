document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.tab-link');
  const sections = document.querySelectorAll('main section');


  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();


      // Remove 'active' class from all links
      links.forEach(link => link.classList.remove('active'));


      // Add 'active' class to the clicked link
      e.target.classList.add('active');


      // Get the target section from the clicked link's data attribute
      const target = e.target.getAttribute('data-target');


      // Hide all sections
      sections.forEach(section => section.classList.add('hidden'));


      // Show the targeted section
      document.getElementById(target).classList.remove('hidden');
    });
  });
});
const themeToggleButton = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

themeToggleButton.addEventListener('click', () => {
  if (themeStylesheet.getAttribute('href') === 'light.css') {
    themeStylesheet.setAttribute('href', 'dark.css');
    themeToggleButton.textContent = 'Switch to Light Mode';
  } else {
    themeStylesheet.setAttribute('href', 'light.css');
    themeToggleButton.textContent = 'Switch to Dark Mode';
  }
});