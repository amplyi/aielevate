/**
 * AI Elevate. Shared capability deep page renderer
 * Driven by CAPABILITY_ORBIT_DATA. One system, three visual modes.
 */
(function (global) {
 'use strict';

 const VIEW_IDS = ['business-ready', 'user-adoption', 'ai-technologies'];

 function escapeHtml(str) {
 return String(str == null ? '' : str)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;');
 }

 function track(name, payload) {
 if (typeof global.aieTrack === 'function') global.aieTrack(name, payload || {});
 }

 function getInsights() {
 return global.insights || [];
 }

 function relatedFor(domain, satId) {
 const api = global.AIE_CAPABILITY;
 const data = global.CAPABILITY_ORBIT_DATA;
 if (!api || !data) return [];
 const rels = (data.relationships || []).filter((r) => r.from === satId || r.to === satId);
 const relatedIds = new Set();
 (domain.satellites || []).forEach((s) => {
 if (s.id !== satId && (s.relatedCapabilities || []).indexOf(satId) >= 0) relatedIds.add(s.id);
 });
 const active = (domain.satellites || []).find((s) => s.id === satId);
 (active && active.relatedCapabilities || []).forEach((id) => relatedIds.add(id));
 rels.forEach((r) => {
 relatedIds.add(r.from === satId ? r.to : r.from);
 });
 const out = [];
 relatedIds.forEach((id) => {
 const hit = api.findSatellite(id);
 if (hit && hit.domain.id !== domain.id) {
 out.push({
 satId: id,
 label: hit.satellite.label,
 pillarId: hit.domain.id,
 pillarLabel: hit.domain.label,
 route: hit.domain.route,
 relLabel: (rels.find((r) => (r.from === satId && r.to === id) || (r.to === satId && r.from === id)) || {}).label || 'Connected'
 });
 } else if (hit && hit.domain.id === domain.id && id !== satId) {
 out.push({
 satId: id,
 label: hit.satellite.label,
 pillarId: hit.domain.id,
 pillarLabel: hit.domain.label,
 route: hit.domain.route,
 relLabel: 'Same pillar'
 });
 }
 });
 return out.slice(0, 6);
 }

 function CapabilityDeep(root) {
 this.root = root;
 this.domain = null;
 this.satId = null;
 this.bound = false;
 }

 CapabilityDeep.prototype.mount = function (route) {
 const api = global.AIE_CAPABILITY;
 const domain = api && api.findDomainByRoute(route);
 if (!this.root || !domain) return false;
 this.domain = domain;
 const focus = api.loadFocus();
 if (focus && focus.pillar === domain.id && focus.capability) {
 this.satId = focus.capability;
 } else {
 this.satId = (domain.satellites && domain.satellites[0] && domain.satellites[0].id) || null;
 }
 this.root.setAttribute('data-visual-mode', domain.visualMode || 'structural');
 this.root.style.setProperty('--cap-deep-accent', domain.color || '#8fd3ff');
 this.root.style.setProperty('--cap-deep-glow', domain.glow || 'rgba(143,211,255,.4)');
 this.root.innerHTML = this.template();
 this.bind();
 this.renderCapabilityDetail();
 this.bound = true;
 requestAnimationFrame(() => this.focusActive());
 track('pillar_deep_dive', { pillar: domain.id, route: domain.route, capability: this.satId });
 return true;
 };

 CapabilityDeep.prototype.template = function () {
 const d = this.domain;
 const deep = d.deepContent || {};
 const sats = d.satellites || [];
 const services = d.serviceMappings || [];
 const insightIds = (d.insightMappings && d.insightMappings.insightIds) || [];
 const insights = getInsights().filter((i) => insightIds.indexOf(i.id) >= 0).slice(0, 4);

 const satButtons = sats.map((s) => `
 <button type="button" class="cap-deep-sat${this.satId === s.id ? ' is-active' : ''}"
 data-cap-sat="${escapeHtml(s.id)}" aria-pressed="${this.satId === s.id ? 'true' : 'false'}">
 ${escapeHtml(s.label)}
 </button>`).join('');

 const serviceItems = services.map((s) => `
 <button type="button" class="cap-deep-service" data-cap-service-goto="${s.goto}" data-contact-intent="${escapeHtml(s.intent)}">
 <strong>${escapeHtml(s.stage)}</strong>
 <span>Open in Services</span>
 </button>`).join('');

 const insightItems = insights.map((item) => `
 <button type="button" class="cap-deep-insight" data-cap-insight="${escapeHtml(item.id)}">
 <span class="cap-deep-insight-cat">${escapeHtml(item.category)}</span>
 <strong>${escapeHtml(item.title)}</strong>
 <span>${escapeHtml(item.deck)}</span>
 </button>`).join('');

 const edmpBlock = d.showEdmp && deep.edmpNote ? `
 <section class="cap-deep-block glass" data-cap-edmp>
 <div class="section-kicker">EDMP</div>
 <h2>Where decision memory strengthens this pillar</h2>
 <p>${escapeHtml(deep.edmpNote)}</p>
 <button type="button" class="btn btn-secondary" data-view="edmp">Explore EDMP</button>
 </section>` : '';

 return `
 <div class="cap-deep-page" data-cap-deep-page>
 <header class="cap-deep-hero glass">
 <div class="section-kicker">Organisational AI capability</div>
 <p class="cap-deep-eyebrow">${escapeHtml(d.shortLabel || d.label)}</p>
 <h1 id="capDeepTitle">${escapeHtml(d.label)}</h1>
 <p class="cap-deep-lead">${escapeHtml(deep.heroLead || (d.tooltip && d.tooltip.body) || '')}</p>
 <div class="cap-deep-hero-actions">
 <button type="button" class="btn btn-primary btn-cta" data-cap-engage data-contact-intent="${escapeHtml(d.contactIntent)}">Discuss ${escapeHtml(d.label)}</button>
 <button type="button" class="btn btn-secondary" data-cap-return-home>View the organisational AI capability model</button>
 </div>
 </header>

 <section class="cap-deep-block glass">
 <div class="section-kicker">Why this matters</div>
 <h2>What leadership must connect</h2>
 <p>${escapeHtml(deep.whyMatters || (d.tooltip && d.tooltip.body) || '')}</p>
 </section>

 <section class="cap-deep-block glass" aria-labelledby="capDeepSystemTitle">
 <div class="section-kicker">Capability system</div>
 <h2 id="capDeepSystemTitle">${escapeHtml(d.label)} capability points</h2>
 <div class="cap-deep-sats" role="group" aria-label="${escapeHtml(d.label)} capabilities">${satButtons}</div>
 <article class="cap-deep-detail" id="capDeepDetail" tabindex="-1" aria-live="polite"></article>
 </section>

 <section class="cap-deep-block glass" data-cap-related-wrap>
 <div class="section-kicker">Cross pillar connections</div>
 <h2>Connected capabilities</h2>
 <div class="cap-deep-related" data-cap-related></div>
 </section>

 <section class="cap-deep-block glass">
 <div class="section-kicker">How AI Elevate works here</div>
 <h2>Related services</h2>
 <p>These connect to the existing consultancy journey. They are not separate pillar products.</p>
 <div class="cap-deep-services">${serviceItems || '<p>Discuss how AI Elevate can support this pillar.</p>'}</div>
 </section>

 <section class="cap-deep-block glass">
 <div class="section-kicker">Insights</div>
 <h2>Relevant thinking</h2>
 <div class="cap-deep-insights">${insightItems || '<p>Browse Insights for related perspectives.</p>'}</div>
 </section>

 ${edmpBlock}

 <section class="cap-deep-cta glass">
 <div class="section-kicker">Engagement</div>
 <h2>Continue with context</h2>
 <p>Bring the pillar and capability you explored into a focused conversation.</p>
 <div class="cap-deep-hero-actions">
 <button type="button" class="btn btn-primary btn-cta" data-cap-engage-capability>Discuss this capability</button>
 <button type="button" class="btn btn-secondary" data-cap-return-home>View the organisational AI capability model</button>
 </div>
 </section>
 </div>
 `;
 };

 CapabilityDeep.prototype.renderCapabilityDetail = function () {
 const detail = this.root.querySelector('#capDeepDetail');
 const relatedMount = this.root.querySelector('[data-cap-related]');
 if (!detail || !this.domain) return;
 const sat = (this.domain.satellites || []).find((s) => s.id === this.satId);
 if (!sat) {
 detail.innerHTML = '<p>Select a capability point.</p>';
 return;
 }
 detail.innerHTML = `
 <div class="cap-deep-detail-kicker">${escapeHtml(this.domain.label)}</div>
 <h3 id="capDeepSatTitle">${escapeHtml(sat.label)}</h3>
 <p>${escapeHtml((sat.tooltip && sat.tooltip.body) || '')}</p>
 <div class="cap-deep-qgrid">
 <div>
 <h4>Leadership question</h4>
 <p>${escapeHtml(sat.leadershipQuestion || '')}</p>
 </div>
 <div>
 <h4>When this capability is missing</h4>
 <p>${escapeHtml(sat.absenceConsequence || '')}</p>
 </div>
 </div>
 `;
 this.root.querySelectorAll('[data-cap-sat]').forEach((btn) => {
 const active = btn.getAttribute('data-cap-sat') === this.satId;
 btn.classList.toggle('is-active', active);
 btn.setAttribute('aria-pressed', active ? 'true' : 'false');
 });
 if (relatedMount) {
 const related = relatedFor(this.domain, this.satId);
 relatedMount.innerHTML = related.length ? related.map((r) => `
 <button type="button" class="cap-deep-related-btn"
 data-cap-cross-pillar="${escapeHtml(r.pillarId)}"
 data-cap-cross-sat="${escapeHtml(r.satId)}"
 data-cap-cross-route="${escapeHtml(r.route)}">
 <span class="cap-deep-related-rel">${escapeHtml(r.relLabel)}</span>
 <strong>${escapeHtml(r.label)}</strong>
 <span>${escapeHtml(r.pillarLabel)}</span>
 </button>`).join('') : '<p>Explore another capability point to see cross pillar connections.</p>';
 }
 };

 CapabilityDeep.prototype.focusActive = function () {
 const detail = this.root.querySelector('#capDeepDetail');
 if (!detail) return;
 try { detail.focus({ preventScroll: false }); } catch (_) { detail.focus(); }
 };

 CapabilityDeep.prototype.selectSat = function (satId, opts) {
 opts = opts || {};
 this.satId = satId;
 if (global.AIE_CAPABILITY) global.AIE_CAPABILITY.saveFocus(this.domain.id, satId);
 this.renderCapabilityDetail();
 track('capability_selected', { pillar: this.domain.id, capability: satId, source: opts.source || 'deep' });
 if (opts.focus !== false) this.focusActive();
 };

 CapabilityDeep.prototype.openEngage = function (withCapability) {
 const d = this.domain;
 if (!d) return;
 const sat = (d.satellites || []).find((s) => s.id === this.satId);
 global.__aieContactIntent = d.contactIntent;
 global.__aieCapabilityContext = {
 pillar: d.route || d.contactIntent || d.id,
 pillarId: d.id,
 pillarLabel: d.label,
 capability: withCapability && sat ? sat.id : null,
 capabilityLabel: withCapability && sat ? sat.label : null,
 contactContext: withCapability && sat ? (sat.contactContext || sat.label) : d.label,
 contactIntent: d.contactIntent
 };
 track('pillar_engagement_started', {
 pillar: d.id,
 capability: withCapability && sat ? sat.id : null
 });
 if (typeof global.navigateToView === 'function') global.navigateToView('contact');
 };

 CapabilityDeep.prototype.returnHome = function () {
 const d = this.domain;
 if (global.AIE_CAPABILITY) {
 global.AIE_CAPABILITY.saveFocus(d.id, this.satId);
 }
 track('capability_model_returned', { pillar: d.id, capability: this.satId });
 if (typeof global.navigateToView === 'function') {
 global.navigateToView('platform');
 }
 requestAnimationFrame(() => {
 if (typeof global.restoreCapabilityHomeState === 'function') {
 global.restoreCapabilityHomeState();
 }
 });
 };

 CapabilityDeep.prototype.bind = function () {
 const self = this;
 if (this._onClick) this.root.removeEventListener('click', this._onClick);
 this._onClick = function (e) {
 const satBtn = e.target.closest('[data-cap-sat]');
 if (satBtn) {
 self.selectSat(satBtn.getAttribute('data-cap-sat'), { source: 'deep' });
 return;
 }
 if (e.target.closest('[data-cap-return-home]')) {
 e.preventDefault();
 self.returnHome();
 return;
 }
 if (e.target.closest('[data-cap-engage-capability]')) {
 e.preventDefault();
 self.openEngage(true);
 return;
 }
 if (e.target.closest('[data-cap-engage]')) {
 e.preventDefault();
 self.openEngage(false);
 return;
 }
 const svc = e.target.closest('[data-cap-service-goto]');
 if (svc) {
 e.preventDefault();
 track('pillar_service_opened', { pillar: self.domain.id, stage: svc.textContent.trim() });
 global.__aieContactIntent = svc.getAttribute('data-contact-intent') || '';
 const goto = Number(svc.getAttribute('data-cap-service-goto'));
 if (typeof global.navigateToView === 'function') global.navigateToView('services');
 requestAnimationFrame(() => {
 requestAnimationFrame(() => {
 const btn = document.querySelector(`#services [data-svc-goto="${goto}"]`);
 if (btn) btn.click();
 });
 });
 return;
 }
 const insight = e.target.closest('[data-cap-insight]');
 if (insight) {
 e.preventDefault();
 const id = insight.getAttribute('data-cap-insight');
 track('pillar_insight_opened', { pillar: self.domain.id, insight: id });
 if (typeof global.navigateToView === 'function') global.navigateToView(id);
 return;
 }
 const cross = e.target.closest('[data-cap-cross-route]');
 if (cross) {
 e.preventDefault();
 const route = cross.getAttribute('data-cap-cross-route');
 const pillar = cross.getAttribute('data-cap-cross-pillar');
 const sat = cross.getAttribute('data-cap-cross-sat');
 if (global.AIE_CAPABILITY) global.AIE_CAPABILITY.saveFocus(pillar, sat);
 track('cross_pillar_navigation', { from: self.domain.id, to: pillar, capability: sat });
 if (typeof global.navigateToView === 'function') global.navigateToView(route);
 }
 };
 this.root.addEventListener('click', this._onClick);
 };

 function ensureViews() {
 VIEW_IDS.forEach((id) => {
 let section = document.getElementById(id);
 if (!section) {
 section = document.createElement('section');
 section.id = id;
 section.className = 'view';
 section.setAttribute('data-capability-deep-view', id);
 const main = document.querySelector('main.shell');
 if (main) main.appendChild(section);
 }
 });
 }

 function showCapabilityDeep(route) {
 ensureViews();
 const section = document.getElementById(route);
 if (!section) return false;
 if (!section._capabilityDeep) section._capabilityDeep = new CapabilityDeep(section);
 return section._capabilityDeep.mount(route);
 }

 global.CapabilityDeep = CapabilityDeep;
 global.showCapabilityDeep = showCapabilityDeep;
 global.AIE_CAPABILITY_VIEWS = VIEW_IDS;
})(typeof window !== 'undefined' ? window : globalThis);
