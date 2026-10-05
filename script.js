/* =====================================================
   LAKE VIEW CAFE CORBY — script.js
   ===================================================== */
(function () {
  'use strict';

  /* ── SKIP LINK ──────────────────────────────────── */
  var skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  /* ── HEADER SCROLL ──────────────────────────────── */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ────────────────────────────────── */
  var burgerBtn  = document.getElementById('burger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.removeAttribute('hidden');
    burgerBtn.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var first = mobileMenu.querySelector('a');
      if (first) first.focus();
    }, 80);
  }
  function closeMenu() {
    mobileMenu.setAttribute('hidden', '');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    burgerBtn.focus();
  }

  burgerBtn.addEventListener('click', function () {
    if (mobileMenu.hasAttribute('hidden')) openMenu();
    else closeMenu();
  });
  mobileLinks.forEach(function (l) { l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) closeMenu();
  });

  /* ── ACTIVE NAV ─────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.desktop-nav a');
  var secObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) {
          l.removeAttribute('aria-current');
          if (l.getAttribute('href') === '#' + entry.target.id) l.setAttribute('aria-current', 'page');
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(function (s) { secObs.observe(s); });

  /* ── REVEAL ON SCROLL ───────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { revObs.observe(el); });

  /* ── GENERIC FADE-IN ────────────────────────────── */
  var fadeEls = document.querySelectorAll(
    '.occ-card, .review-card, .gitem, .mi, .mi-small, .hours-row, .info-item, .rtag'
  );
  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = (i % 5) * 60;
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        fadeObs.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  fadeEls.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 5) * 60 + 'ms, transform 0.5s ease ' + (i % 5) * 60 + 'ms';
    fadeObs.observe(el);
  });

  /* ── HERO IMAGE KEN BURNS ───────────────────────── */
  var heroBgImg = document.querySelector('.hero-bg-img');
  if (heroBgImg) {
    if (heroBgImg.complete) heroBgImg.classList.add('loaded');
    else heroBgImg.addEventListener('load', function () { heroBgImg.classList.add('loaded'); });

    /* Subtle parallax */
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = 'translateY(' + (window.scrollY * 0.12) + 'px) scale(1)';
      }
    }, { passive: true });
  }

  /* ── SMOOTH ANCHOR SCROLL ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '68', 10);
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - hh, behavior: 'smooth' });
    });
  });

  /* ── TABBED MENU ────────────────────────────────── */
  var tabs   = document.querySelectorAll('.menu-tab');
  var panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('aria-controls');

      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(target);
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });

    /* Keyboard navigation for tabs */
    tab.addEventListener('keydown', function (e) {
      var tabArr = Array.from(tabs);
      var idx = tabArr.indexOf(this);
      if (e.key === 'ArrowRight') { tabArr[(idx + 1) % tabArr.length].focus(); tabArr[(idx + 1) % tabArr.length].click(); }
      if (e.key === 'ArrowLeft')  { tabArr[(idx - 1 + tabArr.length) % tabArr.length].focus(); tabArr[(idx - 1 + tabArr.length) % tabArr.length].click(); }
    });
  });

  /* ── GALLERY LIGHTBOX ───────────────────────────── */
  var galleryImgs = document.querySelectorAll('.gitem img');
  galleryImgs.forEach(function (img) {
    img.setAttribute('tabindex', '0');
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { openLb(this.src, this.alt); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(this.src, this.alt); }
    });
  });

  function openLb(src, alt) {
    var lb = document.createElement('div');
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Image lightbox');
    lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(15,37,53,0.95);display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:2rem;';
    var lbImg = document.createElement('img');
    lbImg.src = src; lbImg.alt = alt;
    lbImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:6px;';
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.style.cssText = 'position:absolute;top:1.5rem;right:1.5rem;background:rgba(247,243,236,0.15);border:none;color:#F7F3EC;font-size:2rem;width:48px;height:48px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;';
    lb.appendChild(lbImg); lb.appendChild(closeBtn);
    document.body.appendChild(lb);
    document.body.style.overflow = 'hidden';
    closeBtn.focus();

    function closeLb() { document.body.removeChild(lb); document.body.style.overflow = ''; }
    lb.addEventListener('click', function (ev) { if (ev.target === lb) closeLb(); });
    closeBtn.addEventListener('click', closeLb);
    document.addEventListener('keydown', function escFn(ev) { if (ev.key === 'Escape') { closeLb(); document.removeEventListener('keydown', escFn); } });
  }

  /* ── WATER RIPPLE on section headers ─────────────── */
  /* subtle scale pulse on the editorial ripple SVG */
  var ripple = document.querySelector('.editorial-ripple');
  if (ripple) {
    var t = 0;
    setInterval(function () {
      t += 0.04;
      var scale = 1 + 0.015 * Math.sin(t);
      ripple.style.transform = 'scale(' + scale + ')';
    }, 60);
  }

})();
