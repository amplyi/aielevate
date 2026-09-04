/**
 * AI Elevate. Homepage capability pillars (cinematic rail)
 * Replaces the marble orbit with Insights-style discovery for 3 pillars.
 */
(function (global) {
 'use strict';

 function prefersReducedMotion() {
 return global.matchMedia('(prefers-reduced-motion: reduce)').matches;
 }

 function escapeHtml(str) {
 return String(str == null ? '' : str)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;');
 }

 function CapabilityPillars(root, data) {
 this.root = root;
 this.data = data;
 this.domains = (data && data.domains) || [];
 this.index = 0;
 this.satId = null;
 this.bound = false;
 }

 CapabilityPillars.prototype.init = function () {
 if (!this.root || !this.domains.length) return;
 this.root.classList.add('home-pillar-shell');
 this.root.innerHTML = this.template();
 this.cache();
 this.bind();
 this.render();
 this.bound = true;
 };

 CapabilityPillars.prototype.cache = function () {
 this.el = {
 stage: this.root.querySelector('[data-pillar-stage]'),
 feature: this.root.querySelector('[data-pillar-feature]'),
 progress: this.root.querySelector('[data-pillar-progress]'),
 live: this.root.querySelector('[data-pillar-live]'),
 prev: this.root.querySelector('[data-pillar-prev]'),
 next: this.root.querySelector('[data-pillar-next]')
 };
 };

 CapabilityPillars.prototype.template = function () {
 const t = (key, fallback) => (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t(key, fallback) : fallback;
 return `
 <div class="home-pillar-kicker">${escapeHtml(t('pillars.kicker', 'Organisational AI capability'))}</div>
 <p class="home-pillar-intro">${escapeHtml(t('pillars.intro', 'Three pillars leadership must connect: explore each one.'))}</p>
 <div class="home-pillar-rail" data-pillar-rail>
 <button type="button" class="home-pillar-nav" data-pillar-prev aria-label="${escapeHtml(t('pillars.prev', 'Previous pillar'))}">‹</button>
 <div class="home-pillar-stage" data-pillar-stage tabindex="0" role="listbox" aria-label="${escapeHtml(t('pillars.listAria', 'Capability pillars'))}"></div>
 <button type="button" class="home-pillar-nav" data-pillar-next aria-label="${escapeHtml(t('pillars.next', 'Next pillar'))}">›</button>
 </div>
 <div class="home-pillar-progress" data-pillar-progress role="tablist" aria-label="${escapeHtml(t('pillars.positionAria', 'Pillar position'))}"></div>
 <article class="home-pillar-feature glass" data-pillar-feature tabindex="-1"></article>
 <p class="visually-hidden" data-pillar-live aria-live="polite"></p>
 `;
 };

 CapabilityPillars.prototype.refreshLocale = function () {
 const index = this.index;
 const satId = this.satId;
 this.data = global.CAPABILITY_ORBIT_DATA || this.data;
 this.domains = (this.data && this.data.domains) || [];
 this.root.innerHTML = this.template();
 this.cache();
 const self = this;
 if (this.el.prev) this.el.prev.onclick = function () { self.step(-1); };
 if (this.el.next) this.el.next.onclick = function () { self.step(1); };
 this.index = Math.min(index, Math.max(0, this.domains.length - 1));
 this.satId = satId;
 this.render();
 };

 CapabilityPillars.prototype.bind = function () {
 const self = this;
 if (this.el.prev) this.el.prev.addEventListener('click', () => self.step(-1));
 if (this.el.next) this.el.next.addEventListener('click', () => self.step(1));

 this.root.addEventListener('click', (e) => {
 const card = e.target.closest('[data-pillar-id]');
 if (card && self.el.stage.contains(card)) {
 const id = card.getAttribute('data-pillar-id');
 const idx = self.domains.findIndex((d) => d.id === id);
 if (idx >= 0) self.setIndex(idx);
 return;
 }
 const dot = e.target.closest('[data-pillar-dot]');
 if (dot) {
 self.setIndex(Number(dot.getAttribute('data-pillar-dot')) || 0);
 return;
 }
 const sat = e.target.closest('[data-sat-id]');
 if (sat) {
 self.satId = sat.getAttribute('data-sat-id');
 if (typeof global.aieTrack === 'function') {
 global.aieTrack('capability_selected', { pillar: self.domains[self.index].id, capability: self.satId, source: 'home' });
 }
 self.renderFeature();
 return;
 }
 const explorePillar = e.target.closest('[data-pillar-explore]');
 if (explorePillar) {
 const route = explorePillar.getAttribute('data-pillar-explore');
 const domain = self.domains[self.index];
 if (global.AIE_CAPABILITY) global.AIE_CAPABILITY.saveFocus(domain.id, null);
 if (typeof global.aieTrack === 'function') {
 global.aieTrack('pillar_deep_dive', { pillar: domain.id, source: 'home_explore' });
 }
 if (typeof global.navigateToView === 'function') global.navigateToView(route);
 return;
 }
 const exploreSat = e.target.closest('[data-sat-explore]');
 if (exploreSat) {
 const satId = exploreSat.getAttribute('data-sat-explore');
 const route = exploreSat.getAttribute('data-pillar-route');
 const domain = self.domains[self.index];
 if (global.AIE_CAPABILITY) global.AIE_CAPABILITY.saveFocus(domain.id, satId);
 if (typeof global.aieTrack === 'function') {
 global.aieTrack('capability_deep_dive', { pillar: domain.id, capability: satId, source: 'home' });
 }
 if (typeof global.navigateToView === 'function') global.navigateToView(route);
 }
 });

 if (this.el.stage) {
 this.el.stage.addEventListener('keydown', (e) => {
 if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
 e.preventDefault();
 self.step(1);
 } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
 e.preventDefault();
 self.step(-1);
 }
 });

 let startX = null;
 this.el.stage.addEventListener('pointerdown', (e) => {
 startX = e.clientX;
 });
 this.el.stage.addEventListener('pointerup', (e) => {
 if (startX == null) return;
 const dx = e.clientX - startX;
 startX = null;
 if (Math.abs(dx) < 40) return;
 self.step(dx < 0 ? 1 : -1);
 });
 }
 };

 CapabilityPillars.prototype.step = function (delta) {
 const n = this.domains.length;
 this.setIndex((this.index + delta + n) % n);
 };

 CapabilityPillars.prototype.setIndex = function (index, opts) {
 opts = opts || {};
 this.index = index;
 if (!opts.keepSat) this.satId = null;
 this.render();
 const domain = this.domains[this.index];
 if (domain && typeof global.aieTrack === 'function') {
 global.aieTrack('pillar_selected', { pillar: domain.id, source: opts.source || 'home' });
 }
 };

 CapabilityPillars.prototype.setPillarById = function (pillarId, capabilityId) {
 const idx = this.domains.findIndex((d) => d.id === pillarId);
 if (idx < 0) return false;
 this.index = idx;
 this.satId = capabilityId || null;
 if (capabilityId && !(this.domains[idx].satellites || []).some((s) => s.id === capabilityId)) {
 this.satId = null;
 }
 this.render();
 return true;
 };

 CapabilityPillars.prototype.roleFor = function (i) {
 const n = this.domains.length;
 if (i === this.index) return 'active';
 if (i === (this.index - 1 + n) % n) return 'prev';
 if (i === (this.index + 1) % n) return 'next';
 return 'hidden';
 };

 CapabilityPillars.prototype.render = function () {
 if (!this.el.stage) return;
 this.root.style.setProperty('--pillar-accent', this.domains[this.index].color || '#8fd3ff');

 this.el.stage.innerHTML = this.domains.map((domain, i) => {
 const role = this.roleFor(i);
 return `
 <button type="button"
 class="home-pillar-card is-${role}"
 data-pillar-id="${escapeHtml(domain.id)}"
 role="option"
 aria-selected="${role === 'active' ? 'true' : 'false'}"
 style="--card-accent:${escapeHtml(domain.color)}">
 <span class="home-pillar-card-glow" aria-hidden="true"></span>
 <span class="home-pillar-card-index">0${i + 1}</span>
 <strong>${escapeHtml(domain.label)}</strong>
 <span class="home-pillar-card-copy">${escapeHtml((domain.tooltip && domain.tooltip.body) ? domain.tooltip.body.slice(0, 110) + '…' : '')}</span>
 </button>
 `;
 }).join('');

 if (this.el.progress) {
 this.el.progress.innerHTML = this.domains.map((domain, i) => `
 <button type="button" class="home-pillar-dot${i === this.index ? ' is-active' : ''}${i < this.index ? ' is-traversed' : ''}"
 data-pillar-dot="${i}" role="tab" aria-selected="${i === this.index ? 'true' : 'false'}"
 aria-label="${escapeHtml(domain.label)}"></button>
 `).join('');
 }

 this.renderFeature();
 const active = this.domains[this.index];
 if (this.el.live && active) {
 this.el.live.textContent = `${active.label}. ${active.tooltip ? active.tooltip.body : ''}`;
 }
 };

 CapabilityPillars.prototype.renderFeature = function () {
 const domain = this.domains[this.index];
 if (!domain || !this.el.feature) return;
 const sats = domain.satellites || [];
 const activeSat = sats.find((s) => s.id === this.satId) || null;
 const detailTitle = activeSat ? activeSat.tooltip.title : domain.tooltip.title;
 const detailBody = activeSat ? activeSat.tooltip.body : domain.tooltip.body;
 const exploreLabel = activeSat
 ? (activeSat.exploreLabel || ('Explore ' + activeSat.label))
 : (domain.exploreLabel || ('Explore ' + domain.label));
 const exploreAttrs = activeSat
 ? `data-sat-explore="${escapeHtml(activeSat.id)}" data-pillar-route="${escapeHtml(domain.route || domain.id)}"`
 : `data-pillar-explore="${escapeHtml(domain.route || domain.id)}"`;

 this.el.feature.innerHTML = `
 <div class="home-pillar-feature-head">
 <span class="home-pillar-feature-kicker">${escapeHtml(domain.shortLabel || domain.label)}</span>
 <h3>${escapeHtml(detailTitle)}</h3>
 <p>${escapeHtml(detailBody)}</p>
 </div>
 <div class="home-pillar-sats" role="group" aria-label="${escapeHtml(domain.label)} capability points">
 ${sats.map((sat) => `
 <button type="button" class="home-pillar-sat${this.satId === sat.id ? ' is-active' : ''}"
 data-sat-id="${escapeHtml(sat.id)}"
 aria-pressed="${this.satId === sat.id ? 'true' : 'false'}">
 ${escapeHtml(sat.label)}
 </button>
 `).join('')}
 </div>
 <div class="home-pillar-deep-actions">
 <button type="button" class="btn btn-primary btn-cta home-pillar-explore" ${exploreAttrs}>${escapeHtml(exploreLabel)}</button>
 </div>
 <p class="home-pillar-hint">${activeSat ? 'Capability detail selected. Continue into the expanded model when ready.' : 'Select a capability point to go deeper'}</p>
 `;
};

 function initCapabilityPillars(target) {
 const root = typeof target === 'string' ? document.querySelector(target) : target;
 const data = global.CAPABILITY_ORBIT_DATA || global.CAPABILITY_PILLAR_DATA;
 if (!root || !data) return null;
 if (root._capabilityPillars && typeof root._capabilityPillars.destroy === 'function') {
 /* no destroy needed. Replace */
 }
 const instance = new CapabilityPillars(root, data);
 instance.init();
 root._capabilityPillars = instance;
 global.__capabilityPillars = instance;
 return instance;
 }

 global.initCapabilityPillars = initCapabilityPillars;
 global.CapabilityPillars = CapabilityPillars;
})(typeof window !== 'undefined' ? window : globalThis);
