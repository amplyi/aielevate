/**
 * Subtle desktop section rail. Jump between page sections while scrolling.
 * Opt-in via [data-rail-section="Label"] inside.view.active-view
 */
(function (global) {
 'use strict';

 const MQ = '(min-width: 1101px)';
 let railEl = null;
 let listEl = null;
 let sections = [];
 let ticking = false;
 let bound = false;

 function prefersReducedMotion() {
 return global.matchMedia('(prefers-reduced-motion: reduce)').matches;
 }

 function isDesktop() {
 return global.matchMedia(MQ).matches;
 }

 function ensureRail() {
 if (railEl) return railEl;
 railEl = document.createElement('nav');
 railEl.className = 'section-rail';
 railEl.setAttribute('aria-label', 'Page sections');
 railEl.hidden = true;
 listEl = document.createElement('div');
 listEl.className = 'section-rail-list';
 railEl.appendChild(listEl);
 document.body.appendChild(railEl);

 railEl.addEventListener('click', (e) => {
 const btn = e.target.closest('[data-rail-target]');
 if (!btn) return;
 const id = btn.getAttribute('data-rail-target');
 const target = document.getElementById(id);
 if (!target) return;
 target.scrollIntoView({
 behavior: prefersReducedMotion() ? 'auto' : 'smooth',
 block: 'start'
 });
 if (typeof global.aieTrack === 'function') {
 global.aieTrack('section_rail_jump', { id: id });
 }
 });

 return railEl;
 }

 function collectSections() {
 const view = document.querySelector('.view.active-view');
 if (!view) return [];
 return Array.from(view.querySelectorAll('[data-rail-section]')).filter((el) => {
 if (!el.id) return false;
 const rect = el.getBoundingClientRect();
 return el.offsetParent !== null || rect.height > 0;
 });
 }

 function rebuild() {
 ensureRail();
 sections = collectSections();
 if (!isDesktop() || sections.length < 2) {
 railEl.hidden = true;
 railEl.classList.remove('is-visible');
 listEl.innerHTML = '';
 return;
 }

 listEl.innerHTML = sections.map((section) => {
 const label = section.getAttribute('data-rail-section') || section.id;
 return (
 `<button type="button" class="section-rail-item" data-rail-target="${section.id}" aria-label="${label}">` +
 `<span class="section-rail-dot" aria-hidden="true"></span>` +
 `<span class="section-rail-label">${label}</span>` +
 `</button>`
 );
 }).join('');

 railEl.hidden = false;
 updateActive();
 }

 function updateActive() {
 if (!railEl || railEl.hidden || !sections.length) return;

 const scrollY = global.scrollY || document.documentElement.scrollTop || 0;
 const show = scrollY > 120;
 railEl.classList.toggle('is-visible', show);

 const marker = global.innerHeight * 0.32;
 let activeId = sections[0].id;
 sections.forEach((section) => {
 const top = section.getBoundingClientRect().top;
 if (top <= marker) activeId = section.id;
 });

 listEl.querySelectorAll('.section-rail-item').forEach((btn) => {
 const on = btn.getAttribute('data-rail-target') === activeId;
 btn.classList.toggle('is-active', on);
 btn.setAttribute('aria-current', on ? 'true' : 'false');
 });
 }

 function onScroll() {
 if (ticking) return;
 ticking = true;
 requestAnimationFrame(() => {
 ticking = false;
 updateActive();
 });
 }

 function refreshSectionRail() {
 rebuild();
 }

 function initSectionRail() {
 if (bound) {
 refreshSectionRail();
 return;
 }
 bound = true;
 ensureRail();
 rebuild();
 global.addEventListener('scroll', onScroll, { passive: true });
 global.addEventListener('resize', () => {
 rebuild();
 }, { passive: true });
 }

 global.initSectionRail = initSectionRail;
 global.refreshSectionRail = refreshSectionRail;
})(typeof window !== 'undefined' ? window : globalThis);
