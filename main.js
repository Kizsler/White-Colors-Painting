/* ============================================
   White Colors Painting — Interactions
   ============================================ */

(function () {
  'use strict';

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 60);
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu toggle ----
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll-triggered fade-ins ----
  const fadeTargets = [
    '.service-card',
    '.work__item',
    '.process__step',
    '.testimonial',
    '.contact__text',
    '.contact__form',
    '.section-header'
  ];

  fadeTargets.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('fade-in');
    });
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // ---- Staggered animation delay for grid items ----
  document.querySelectorAll('.services__grid, .work__grid, .testimonials__grid, .process__timeline').forEach(function (grid) {
    grid.querySelectorAll('.fade-in').forEach(function (item, i) {
      item.style.transitionDelay = (i * 0.1) + 's';
    });
  });

  // ---- Form submission (demo) ----
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate sending
    setTimeout(function () {
      btn.textContent = 'Estimate Requested!';
      btn.style.background = '#7A8B6F';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2500);
    }, 1200);
  });

  // ---- Smooth swatch tooltip on hover ----
  document.querySelectorAll('.swatch').forEach(function (swatch) {
    swatch.setAttribute('aria-label', swatch.getAttribute('title'));
  });

})();
