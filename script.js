// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// Highlight the current section in the nav
const links = [...navLinks.querySelectorAll('a')];
const sections = links.map(l => document.querySelector(l.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && spy.observe(s));

// Animate skill bars once when they scroll into view
const bars = document.querySelectorAll('.bar i');
const barObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.level + '%';
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObs.observe(b));

// Contact form: opens the visitor's email app with the message filled in
const EMAIL = 'josephine.marcelino@edu.lcup.edu.com'; // change to your email
document.getElementById('sendBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const msg = document.getElementById('msg').value.trim();
  const note = document.getElementById('formNote');
  if (!name || !msg) {
    note.textContent = 'Please enter your name and a message.';
    return;
  }
  note.textContent = 'Opening your email app...';
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(msg + '\n\n' + name);
  window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
