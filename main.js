/* ============================================
   White Colors Painting — Interactions (v2)
   ============================================ */

(function () {
  'use strict';

  // ---- Nav scroll effect ----
  var nav = document.getElementById('nav');

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll-triggered fade-ins ----
  var fadeSelectors = [
    '.service-card',
    '.work__item',
    '.why__point',
    '.testimonial',
    '.contact__text',
    '.contact__form',
    '.section-header',
    '.hero__stats',
    '.cta-banner__content'
  ];

  fadeSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('fade-in');
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // ---- Stagger children in grids ----
  var grids = document.querySelectorAll(
    '.services__grid, .work__grid, .testimonials__grid, .why__points'
  );
  grids.forEach(function (grid) {
    grid.querySelectorAll('.fade-in').forEach(function (item, i) {
      item.style.transitionDelay = (i * 0.1) + 's';
    });
  });

  // ---- Form demo ----
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = 'Request Sent!';
      btn.style.background = 'var(--forest)';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2500);
    }, 1200);
  });

})();
