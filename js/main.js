/* ============================================================
   main.js — Minimal vanilla JS for Linda Petrini site
   ============================================================ */

(function () {
  'use strict';

  /* ── Hamburger nav ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open', !isOpen);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        hamburger.focus();
      }
    });

    // Close when a nav link is clicked (mobile)
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });
  }

  /* ── Email obfuscation ──────────────────────────────────── */
  // Assembles Linda's email address at runtime to prevent bot harvesting.
  // The address is split into parts and joined in JS — not present as
  // plaintext in the HTML source.
  const emailTargets = document.querySelectorAll('[data-email]');

  emailTargets.forEach(function (el) {
    const user   = el.getAttribute('data-email-user')   || '';
    const domain = el.getAttribute('data-email-domain') || '';
    const tld    = el.getAttribute('data-email-tld')    || '';

    if (user && domain && tld) {
      const address = user + '@' + domain + '.' + tld;
      el.setAttribute('href', 'mailto:' + address);
      if (el.hasAttribute('data-email-show')) {
        el.textContent = address;
      }
    }
  });

  /* ── Carrd anchor redirect ──────────────────────────────── */
  // If someone visits /#coaching from an old Carrd link,
  // redirect them to the new coaching page.
  const hashRedirects = {
    '#coaching':   '/coaching.html',
    '#mentorship': '/coaching.html',
    '#work':       '/work.html',
    '#writing':    '/writing.html',
    '#about':      '/about.html',
    '#contact':    '/contact.html',
  };

  const hash = window.location.hash;
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    if (hashRedirects[hash]) {
      window.location.replace(hashRedirects[hash]);
    }
  }

})();
