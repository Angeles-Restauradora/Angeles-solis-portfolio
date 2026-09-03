/**
 * nav.js — hamburger menu / drawer, shared by index.html,
 * complete-archive.html and project-detail.html. Below the
 * ≤1024px breakpoint the nav becomes an off-canvas drawer;
 * above it this script is inert (the toggle button is hidden
 * by CSS and the drawer styles don't apply).
 */

const navHeader   = document.querySelector('.site-nav');
const navToggle   = document.querySelector('.nav-toggle');
const navBackdrop = document.querySelector('.nav-backdrop');
const navMenu     = document.getElementById('site-nav-menu');

if (navHeader && navToggle && navBackdrop && navMenu) {
  function openMenu() {
    navHeader.classList.add('is-open');
    navBackdrop.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navHeader.classList.remove('is-open');
    navBackdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navHeader.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  navBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // If the viewport grows past the drawer breakpoint while the
  // menu is open, drop the open state so it doesn't get stuck.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}
