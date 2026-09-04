/**
 * AI Elevate. Engagement Hub (Phase 1)
 * Frontend-only contextual orchestration for #contact
 */
(function (global) {
 'use strict';

 function aieTrack(eventName, payload) {
 try {
 global.dispatchEvent(new CustomEvent('aie:analytics', {
 detail: Object.assign({ eventName: eventName }, payload || {})
 }));
 } catch (_) { /* ignore */ }
 }

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

 function EngagementHub(root, data) {
 this.root = root;
 this.data = data;
 this.intentId = 'exploring';
 this.formOpen = false;
 this.formStarted = false;
 this.bound = false;
 }

 EngagementHub.prototype.init = function () {
 if (!this.root || !this.data) return;
 this.root.classList.add('engagement-hub');
 this.root.innerHTML = this.template();
 this.cacheEls();
 this.bind();
 this.applyIntent(this.intentId, { silent: true });
 this.bound = true;
 if (typeof global.refreshSectionRail === 'function') global.refreshSectionRail();
 };

 EngagementHub.prototype.cacheEls = function () {
 this.el = {
 intents: this.root.querySelector('[data-eh-intents]'),
 recommended: this.root.querySelector('[data-eh-recommended]'),
 domains: this.root.querySelector('[data-eh-domains]'),
 systems: this.root.querySelector('[data-eh-systems]'),
 signals: this.root.querySelector('[data-eh-signals]'),
 panel: this.root.querySelector('[data-eh-panel]'),
 form: this.root.querySelector('#ehEngagementForm'),
 error: this.root.querySelector('#ehFormError'),
 submitLayer: this.root.querySelector('[data-eh-submit-layer]')
 };
 };

 EngagementHub.prototype.template = function () {
 const d = this.data;
 const t = (key, fallback) => (global.AIE_I18N && typeof global.AIE_I18N.t === 'function')
 ? global.AIE_I18N.t(key, fallback)
 : (fallback || key);
 const intents = d.intents.map((intent) => (
 `<button type="button" class="eh-intent" data-eh-intent="${escapeHtml(intent.id)}" aria-pressed="false">` +
 `<span class="eh-intent-label">${escapeHtml(intent.label)}</span>` +
 `</button>`
 )).join('');

 const domains = d.domains.map((domain) => (
 `<article class="eh-domain" data-eh-domain="${escapeHtml(domain.id)}">` +
 `<div class="eh-domain-kicker">${escapeHtml(domain.label)}</div>` +
 `<p>${escapeHtml(domain.summary)}</p>` +
 `<ul>${domain.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` +
 `</article>`
 )).join('');

 const systems = d.systems.map((sys) => this.systemCard(sys)).join('');

 const deeper = d.deeperActions.map((action) => (
 `<button type="button" class="btn btn-secondary eh-deeper-btn" data-eh-open-form='${escapeHtml(JSON.stringify(action.payload))}'>` +
 `${escapeHtml(action.label)}` +
 `</button>`
 )).join('');

 const caps = d.anthonyCapabilities.map((c) => `<li>${escapeHtml(c)}</li>`).join('');

 const anthonyDefaults = (d.intentState && d.intentState.consultant && d.intentState.consultant.formDefaults) || {
 topic: 'Consultancy engagement with Anthony',
 engage: 'Anthony directly',
 need: 'Executive orientation',
 next: 'Consultancy engagement discussion'
 };
 const anthonyPayload = escapeHtml(JSON.stringify({
 topic: anthonyDefaults.topic,
 engage: anthonyDefaults.engage,
 need: anthonyDefaults.need,
 next: anthonyDefaults.next
 }));

 return `
 <div class="eh-atmosphere" aria-hidden="true">
 <span class="eh-pulse eh-pulse-a"></span>
 <span class="eh-pulse eh-pulse-b"></span>
 <svg class="eh-net" viewBox="0 0 1200 400" preserveAspectRatio="none" focusable="false">
 <path class="eh-net-path" d="M40 220 C220 80, 380 320, 560 180 S860 60, 1160 210" />
 <path class="eh-net-path eh-net-path-b" d="M80 300 C300 200, 480 360, 720 240 S980 140, 1180 280" />
 </svg>
 </div>

 <header class="eh-hero" id="ehHero" data-rail-section="Start">
 <div class="section-kicker">${escapeHtml(t('hub.kicker', 'Engagement'))}</div>
 <h2>${escapeHtml(t('hub.title', 'Where do you want to go next?'))}</h2>
 <p class="eh-hero-lead">${escapeHtml(t('hub.lead', 'Explore our thinking, inspect what we are building, or start a focused conversation.'))}</p>
 <p class="eh-hero-support">${escapeHtml(t('hub.support', 'Tell us what brought you here and AI Elevate will surface the most relevant path, insight, system or conversation.'))}</p>
 </header>

 <section class="eh-navigator" id="ehIntent" data-rail-section="Intent" aria-labelledby="ehNavigatorTitle">
 <h3 id="ehNavigatorTitle" class="eh-section-title">${escapeHtml(t('hub.navigatorTitle', 'What brings you here?'))}</h3>
 <div class="eh-intent-row" data-eh-intents role="group" aria-label="${escapeHtml(t('hub.intentAria', 'Engagement intent'))}">${intents}</div>
 </section>

 <section class="eh-recommended glass" id="ehRecommended" data-rail-section="Path" data-eh-recommended aria-live="polite" aria-atomic="true"></section>

 <section class="eh-domains-wrap" id="ehDomains" data-rail-section="Domains" aria-labelledby="ehDomainsTitle">
 <div class="eh-section-head">
 <h3 id="ehDomainsTitle" class="eh-section-title">${escapeHtml(t('hub.domainsTitle', 'Engagement domains'))}</h3>
 <p>${escapeHtml(t('hub.domainsLead', 'Four connected paths: talk, explore, build and go deeper.'))}</p>
 </div>
 <div class="eh-domains" data-eh-domains>${domains}</div>
 </section>

 <section class="eh-build" id="ehBuild" data-rail-section="Build" aria-labelledby="ehBuildTitle">
 <div class="eh-section-head">
 <h3 id="ehBuildTitle" class="eh-section-title">${escapeHtml(t('hub.buildTitle', 'What we build'))}</h3>
 <p>${escapeHtml(t('hub.buildLead', 'Public systems and related development work, with honest maturity, not product theatre.'))}</p>
 </div>
 <div class="eh-systems" data-eh-systems>${systems}</div>
 </section>

 <section class="eh-signals" id="ehSignals" data-rail-section="Signals" aria-labelledby="ehSignalsTitle">
 <div class="eh-section-head">
 <h3 id="ehSignalsTitle" class="eh-section-title">${escapeHtml(t('hub.signalsTitle', 'Signals from AI Elevate'))}</h3>
 <p>${escapeHtml(t('hub.signalsLead', 'Insights and business linked perspectives relevant to your intent.'))}</p>
 </div>
 <div class="eh-signal-grid" data-eh-signals></div>
 </section>

 <section class="eh-anthony glass" id="ehAnthony" data-rail-section="Anthony" aria-labelledby="ehAnthonyTitle">
 <div class="eh-section-kicker">${escapeHtml(t('hub.anthonyKicker', 'Direct engagement'))}</div>
 <h3 id="ehAnthonyTitle">${escapeHtml(t('hub.anthonyTitle', 'Work directly with Anthony'))}</h3>
 <p>${escapeHtml(t('hub.anthonyLead', 'For organisations that need experienced guidance across strategy, governance, architecture, transformation and organisational AI capability.'))}</p>
 <ul class="eh-cap-list">${caps}</ul>
 <div class="eh-anthony-actions">
 <button type="button" class="btn btn-primary btn-cta" data-eh-open-form='${anthonyPayload}'>${escapeHtml(t('hub.anthonyCta', 'Discuss a consultancy engagement'))}</button>
 <a class="btn btn-secondary" href="mailto:${escapeHtml(d.contactEmail)}">${escapeHtml(t('hub.email', 'Email'))}</a>
 <a class="btn btn-secondary" href="tel:${escapeHtml(d.contactPhone)}">${escapeHtml(t('hub.call', 'Call'))}</a>
 <a class="btn btn-secondary" href="${escapeHtml(d.linkedin.anthony.href)}" target="_blank" rel="noopener noreferrer" data-eh-linkedin="anthony">${escapeHtml(d.linkedin.anthony.label)} <span class="eh-ext">${escapeHtml(t('hub.opensLinkedIn', '(opens LinkedIn)'))}</span></a>
 </div>
 <p class="eh-anthony-meta">${escapeHtml(d.contactEmail)} · ${escapeHtml(d.contactPhoneDisplay)}</p>
 </section>

 <section class="eh-deeper glass" id="ehDeeper" data-rail-section="Deeper" aria-labelledby="ehDeeperTitle">
 <div class="eh-section-kicker">${escapeHtml(t('hub.deeperKicker', 'Context over publication'))}</div>
 <h3 id="ehDeeperTitle">${escapeHtml(t('hub.deeperTitle', 'Go deeper'))}</h3>
 <p>${escapeHtml(t('hub.deeperLead', 'Some of our architecture, working prototypes and developing systems are best explored in context. Request a focused walkthrough when you want to move beyond the public layer.'))}</p>
 <p class="eh-deeper-note">${escapeHtml(t('hub.deeperNote', 'Some work is intentionally explored in context rather than fully published on the public website.'))}</p>
 <div class="eh-deeper-actions">${deeper}</div>
 </section>

 <section class="eh-panel glass" id="ehPanel" data-rail-section="Engage" data-eh-panel data-open="false" aria-labelledby="ehPanelTitle">
 <div class="eh-panel-head">
 <div>
 <div class="eh-section-kicker">${escapeHtml(t('hub.panelKicker', 'Engagement request'))}</div>
 <h3 id="ehPanelTitle">${escapeHtml(t('hub.panelTitle', 'Start a focused conversation'))}</h3>
 <p>${escapeHtml(t('hub.panelLead', 'Intent first. Identity when you are ready to engage.'))}</p>
 </div>
 <button type="button" class="btn btn-secondary" data-eh-toggle-panel>${escapeHtml(t('hub.openPanel', 'Open panel'))}</button>
 </div>
 <div class="eh-panel-body" hidden>
 <form id="ehEngagementForm" class="eh-form" novalidate>
 <fieldset class="eh-step">
 <legend>${escapeHtml(t('hub.legendTopic', 'What would you like to discuss?'))}</legend>
 <label class="edmp-assess-field"><span>${escapeHtml(t('hub.labelTopic', 'Topic'))}</span><input id="ehTopic" name="topic" type="text" required placeholder="${escapeHtml(t('hub.phTopic', 'e.g. EDMP walkthrough, adoption challenge'))}" /></label>
 </fieldset>
 <fieldset class="eh-step">
 <legend>${escapeHtml(t('hub.legendStage', 'Where are you today?'))}</legend>
 <div class="eh-chip-row" role="group" aria-label="${escapeHtml(t('hub.stageAria', 'Current stage'))}" data-eh-stages>
 ${d.stages.map((s) => `<button type="button" class="eh-chip" data-eh-stage="${escapeHtml(s)}" aria-pressed="false">${escapeHtml(s)}</button>`).join('')}
 </div>
 <input type="hidden" id="ehStage" name="stage" value="" />
 </fieldset>
 <fieldset class="eh-step">
 <legend>${escapeHtml(t('hub.legendOutcome', 'What outcome do you need?'))}</legend>
 <label class="edmp-assess-field"><span>${escapeHtml(t('hub.labelOutcome', 'Desired outcome'))}</span><textarea id="ehOutcome" name="outcome" rows="2" required placeholder="${escapeHtml(t('hub.phOutcome', 'What would a successful next step look like?'))}"></textarea></label>
 </fieldset>
 <fieldset class="eh-step">
 <legend>${escapeHtml(t('hub.legendEngage', 'Who / what do you want to engage with?'))}</legend>
 <div class="eh-chip-row" role="group" aria-label="${escapeHtml(t('hub.engageAria', 'Engage with'))}" data-eh-engage-opts>
 ${d.engageOptions.map((s) => `<button type="button" class="eh-chip" data-eh-engage="${escapeHtml(s)}" aria-pressed="false">${escapeHtml(s)}</button>`).join('')}
 </div>
 <input type="hidden" id="ehEngage" name="engage" value="" />
 </fieldset>
 <fieldset class="eh-step">
 <legend>${escapeHtml(t('hub.legendContact', 'Contact details'))}</legend>
 <div class="consult-form-grid">
 <label class="edmp-assess-field consult-field"><span>${escapeHtml(t('hub.labelName', 'Name'))}</span><input id="ehName" name="name" type="text" required autocomplete="name" /></label>
 <label class="edmp-assess-field consult-field"><span>${escapeHtml(t('hub.labelOrg', 'Organisation'))}</span><input id="ehOrg" name="organisation" type="text" required autocomplete="organisation" /></label>
 <label class="edmp-assess-field consult-field"><span>${escapeHtml(t('hub.labelRole', 'Role'))}</span><input id="ehRole" name="role" type="text" required autocomplete="organisation-title" /></label>
 <label class="edmp-assess-field consult-field"><span>${escapeHtml(t('hub.labelEmail', 'Business email'))}</span><input id="ehEmail" name="email" type="email" required autocomplete="email" /></label>
 <label class="edmp-assess-field consult-field consult-field-full"><span>${escapeHtml(t('hub.labelContext', 'Context'))}</span><textarea id="ehSituation" name="situation" required placeholder="${escapeHtml(t('hub.phContext', 'Add any context that helps us prepare'))}"></textarea></label>
 <label class="edmp-assess-field consult-field consult-field-full"><span>${escapeHtml(t('hub.labelNext', 'Preferred next step'))}</span><input id="ehNext" name="next" type="text" placeholder="${escapeHtml(t('hub.phNext', 'e.g. walkthrough, briefing, partner call'))}" /></label>
 <input type="hidden" id="ehNeed" name="need" value="" />
 </div>
 </fieldset>
 <p class="consult-privacy-line">${escapeHtml(t('hub.privacyBefore', 'Your information is used only to assess and respond to your enquiry via email. Nothing is stored on this page. See our '))}<button class="footer-link engage-inline-link" type="button" data-view="privacy">${escapeHtml(t('hub.privacyLink', 'Privacy Policy'))}</button>${escapeHtml(t('hub.privacyAfter', '.'))}</p>
 <p id="ehFormError" class="edmp-assess-error" role="alert"></p>
 <div class="hero-actions" data-eh-submit-layer>
 <button class="btn btn-primary btn-cta" type="submit">${escapeHtml(t('hub.submit', 'Request a focused conversation'))}</button>
 <button class="btn btn-secondary" type="button" data-eh-toggle-panel>${escapeHtml(t('hub.close', 'Close'))}</button>
 </div>
 </form>
 </div>
 </section>
 `;
 };

 EngagementHub.prototype.systemCard = function (sys) {
 const primary = sys.primary
 ? `<button type="button" class="btn btn-primary btn-cta" data-eh-action='${escapeHtml(JSON.stringify(sys.primary))}'>${escapeHtml(sys.primary.label)}</button>`
 : '';
 const secondary = sys.secondary
 ? `<button type="button" class="btn btn-secondary" data-eh-action='${escapeHtml(JSON.stringify(sys.secondary))}'>${escapeHtml(sys.secondary.label)}</button>`
 : '';
 const external = sys.externalUrl
 ? `<a class="btn btn-secondary" href="${escapeHtml(sys.externalUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml((global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.visitSite', 'Visit site') : 'Visit site')} <span class="eh-ext">${escapeHtml((global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.external', '(external)') : '(external)')}</span></a>`
 : '';
 return `
 <article class="eh-system" data-eh-system="${escapeHtml(sys.id)}">
 <div class="eh-system-visual" data-visual="${escapeHtml(sys.visual)}" aria-hidden="true">${this.visualMarkup(sys.visual)}</div>
 <div class="eh-system-meta">
 <span class="eh-system-kicker">${escapeHtml(sys.kicker)}</span>
 <span class="eh-maturity">${escapeHtml(sys.maturity)}</span>
 </div>
 <h4>${escapeHtml(sys.title)}</h4>
 <p class="eh-system-sub">${escapeHtml(sys.subtitle)}</p>
 <p>${escapeHtml(sys.body)}</p>
 <div class="eh-system-actions">${primary}${secondary}${external}</div>
 </article>
 `;
 };

 EngagementHub.prototype.visualMarkup = function (type) {
 if (type === 'edmp') {
 return `
 <svg viewBox="0 0 320 72" class="eh-flow-svg" focusable="false">
 <defs>
 <linearGradient id="ehFlowGrad" x1="0" y1="0" x2="1" y2="0">
 <stop offset="0%" stop-color="#8fd3ff" stop-opacity="0.2" />
 <stop offset="50%" stop-color="#8fd3ff" stop-opacity="0.9" />
 <stop offset="100%" stop-color="#8f9aff" stop-opacity="0.2" />
 </linearGradient>
 </defs>
 <path class="eh-flow-line" d="M8 36 H312" stroke="url(#ehFlowGrad)" />
 <g class="eh-flow-nodes">
 <circle cx="16" cy="36" r="4" /><text x="16" y="58">Signal</text>
 <circle cx="64" cy="36" r="4" /><text x="64" y="58">Evidence</text>
 <circle cx="118" cy="36" r="4" /><text x="118" y="58">Integrity</text>
 <circle cx="172" cy="36" r="4" /><text x="172" y="58">Decision</text>
 <circle cx="222" cy="36" r="4" /><text x="222" y="58">Action</text>
 <circle cx="268" cy="36" r="4" /><text x="268" y="58">Outcome</text>
 <circle cx="308" cy="36" r="4" /><text x="308" y="58">Memory</text>
 </g>
 <circle class="eh-flow-pulse" cx="16" cy="36" r="3" />
 </svg>`;
 }
 if (type === 'gamma') {
 return `
 <svg viewBox="0 0 320 90" class="eh-topo-svg" focusable="false">
 <rect class="eh-topo-box" x="110" y="8" width="100" height="28" rx="6" />
 <text x="160" y="26" text-anchor="middle">EDMP Runtime</text>
 <path class="eh-topo-line" d="M160 36 V54" />
 <rect class="eh-topo-box eh-topo-box-accent" x="96" y="54" width="128" height="28" rx="6" />
 <text x="160" y="72" text-anchor="middle">Companion Gamma</text>
 <circle class="eh-topo-node" cx="64" cy="68" r="5" />
 <circle class="eh-topo-node" cx="256" cy="68" r="5" />
 <path class="eh-topo-line" d="M96 68 H69 M224 68 H251" />
 </svg>`;
 }
 return `
 <svg viewBox="0 0 320 90" class="eh-sym-svg" focusable="false">
 <circle class="eh-sym-node" cx="60" cy="45" r="18" />
 <text x="60" y="49" text-anchor="middle">Human</text>
 <path class="eh-sym-link" d="M82 45 H140" />
 <circle class="eh-sym-node eh-sym-node-mid" cx="160" cy="45" r="20" />
 <text x="160" y="49" text-anchor="middle">AI</text>
 <path class="eh-sym-link" d="M180 45 H238" />
 <circle class="eh-sym-node" cx="260" cy="45" r="18" />
 <text x="260" y="49" text-anchor="middle">Decision</text>
 </svg>`;
 };

 EngagementHub.prototype.bind = function () {
 const self = this;
 if (!this._rootBound) {
 this._rootBound = true;
 this.root.addEventListener('click', (e) => {
 const intentBtn = e.target.closest('[data-eh-intent]');
 if (intentBtn) {
 self.applyIntent(intentBtn.getAttribute('data-eh-intent'));
 return;
 }

 const toggle = e.target.closest('[data-eh-toggle-panel]');
 if (toggle) {
 self.setPanelOpen(!self.formOpen);
 return;
 }

 const openForm = e.target.closest('[data-eh-open-form]');
 if (openForm) {
 let payload = {};
 try { payload = JSON.parse(openForm.getAttribute('data-eh-open-form') || '{}'); } catch (_) {}
 self.openForm(payload);
 aieTrack(openForm.closest('.eh-deeper') ? 'deep_access_requested' : 'recommended_action_clicked', { source: 'cta' });
 return;
 }

 const actionBtn = e.target.closest('[data-eh-action]');
 if (actionBtn) {
 let action = null;
 try { action = JSON.parse(actionBtn.getAttribute('data-eh-action') || 'null'); } catch (_) {}
 if (action) {
 const sys = actionBtn.closest('[data-eh-system]');
 if (sys) aieTrack('system_explored', { system: sys.getAttribute('data-eh-system') });
 self.runAction(action);
 }
 return;
 }

 const stage = e.target.closest('[data-eh-stage]');
 if (stage) {
 self.selectChip(self.root.querySelector('[data-eh-stages]'), '[data-eh-stage]', stage, 'ehStage');
 self.markFormStarted();
 return;
 }

 const engage = e.target.closest('[data-eh-engage]');
 if (engage) {
 self.selectChip(self.root.querySelector('[data-eh-engage-opts]'), '[data-eh-engage]', engage, 'ehEngage');
 self.markFormStarted();
 return;
 }

 const linkedin = e.target.closest('[data-eh-linkedin]');
 if (linkedin) {
 aieTrack('linkedin_clicked', { target: linkedin.getAttribute('data-eh-linkedin') });
 }

 const insight = e.target.closest('[data-eh-insight]');
 if (insight) {
 const id = insight.getAttribute('data-eh-insight');
 aieTrack('insight_opened', { id: id });
 if (typeof global.navigateToView === 'function') global.navigateToView(id);
 }
 });
 }

 if (this.el.form) {
 this.el.form.addEventListener('focusin', () => self.markFormStarted());
 this.el.form.addEventListener('submit', (e) => self.submitForm(e));
 }
 };

 EngagementHub.prototype.selectChip = function (row, selector, btn, hiddenId) {
 if (!row || !btn) return;
 row.querySelectorAll(selector).forEach((el) => {
 el.setAttribute('aria-pressed', el === btn ? 'true' : 'false');
 });
 const hidden = document.getElementById(hiddenId);
 if (!hidden) return;
 if (hiddenId === 'ehStage') hidden.value = btn.getAttribute('data-eh-stage') || '';
 if (hiddenId === 'ehEngage') hidden.value = btn.getAttribute('data-eh-engage') || '';
 };

 EngagementHub.prototype.markFormStarted = function () {
 if (this.formStarted) return;
 this.formStarted = true;
 aieTrack('form_started', { intent: this.intentId });
 };

 EngagementHub.prototype.applyIntent = function (intentId, opts) {
 opts = opts || {};
 if (!this.data.intentState[intentId]) intentId = 'exploring';
 this.intentId = intentId;
 const state = this.data.intentState[intentId];

 this.root.setAttribute('data-intent', intentId);
 this.root.querySelectorAll('[data-eh-intent]').forEach((btn) => {
 const on = btn.getAttribute('data-eh-intent') === intentId;
 btn.classList.toggle('is-active', on);
 btn.setAttribute('aria-pressed', on ? 'true' : 'false');
 });

 this.root.querySelectorAll('[data-eh-domain]').forEach((el) => {
 el.classList.toggle('is-featured', el.getAttribute('data-eh-domain') === state.featuredDomain);
 el.classList.toggle('is-dimmed', state.featuredDomain && el.getAttribute('data-eh-domain') !== state.featuredDomain);
 });

 this.root.querySelectorAll('[data-eh-system]').forEach((el) => {
 const id = el.getAttribute('data-eh-system');
 const featured = (state.featuredSystems || []).indexOf(id) !== -1;
 el.classList.toggle('is-featured', featured);
 el.classList.toggle('is-dimmed', !featured);
 });

 this.renderRecommended(state);
 this.renderSignals(state);
 this.applyFormDefaults(state.formDefaults || {});

 if (!opts.silent) {
 aieTrack('engagement_intent_selected', { intent: intentId });
 if (intentId === 'consultant') aieTrack('consultant_selected', {});
 }
 };

 EngagementHub.prototype.renderRecommended = function (state) {
 const el = this.el.recommended;
 if (!el) return;
 const actions = (state.recommended || []).map((item) => (
 `<button type="button" class="eh-rec-action" data-eh-action='${escapeHtml(JSON.stringify(item))}'>${escapeHtml(item.label)}</button>`
 )).join('');
 el.innerHTML = `
 <div class="eh-rec-kicker">${escapeHtml(state.recommendedTitle || 'Recommended next')}</div>
 <div class="eh-rec-actions">${actions}</div>
 `;
 if (!prefersReducedMotion()) {
 el.classList.remove('is-flash');
 void el.offsetWidth;
 el.classList.add('is-flash');
 }
 };

 EngagementHub.prototype.renderSignals = function (state) {
 const mount = this.el.signals;
 if (!mount) return;
 const list = (typeof global.insights !== 'undefined' && Array.isArray(global.insights))
 ? global.insights
 : [];
 const byId = new Map(list.map((i) => [i.id, i]));
 let items = (state.insightIds || []).map((id) => byId.get(id)).filter(Boolean);
 if (!items.length && state.insightFilters) {
 items = list.filter((i) => state.insightFilters.indexOf(i.filter) !== -1).slice(0, 4);
 }
 items = items.slice(0, 4);

 const insightCards = items.map((item) => `
 <article class="eh-signal eh-signal-insight">
 <div class="eh-signal-type">Insight · ${escapeHtml(item.category)}</div>
 <h4>${escapeHtml(item.title)}</h4>
 <p>${escapeHtml(item.deck || item.summary || '')}</p>
 <button type="button" class="home-text-link" data-eh-insight="${escapeHtml(item.id)}">Open insight →</button>
 </article>
 `).join('');

 const social = `
 <article class="eh-signal eh-signal-social">
 <div class="eh-signal-type">Perspective</div>
 <h4>AI Elevate on LinkedIn</h4>
 <p>Follow the company channel for perspectives on organisational AI capability and EDMP.</p>
 <a class="home-text-link" href="${escapeHtml(this.data.linkedin.company.href)}" target="_blank" rel="noopener noreferrer" data-eh-linkedin="company">${escapeHtml(this.data.linkedin.company.label)} <span class="eh-ext">(opens LinkedIn)</span></a>
 </article>
 <article class="eh-signal eh-signal-social">
 <div class="eh-signal-type">Perspective</div>
 <h4>Anthony's perspective</h4>
 <p>Professional updates and consultancy perspectives from Anthony van Lobbrecht.</p>
 <a class="home-text-link" href="${escapeHtml(this.data.linkedin.anthony.href)}" target="_blank" rel="noopener noreferrer" data-eh-linkedin="anthony">${escapeHtml(this.data.linkedin.anthony.label)} <span class="eh-ext">(opens LinkedIn)</span></a>
 </article>
 `;

 mount.innerHTML = insightCards + social;
 };

 EngagementHub.prototype.applyFormDefaults = function (defaults) {
 const set = (id, val) => {
 const el = document.getElementById(id);
 if (el && val != null) el.value = val;
 };
 set('ehTopic', defaults.topic || '');
 set('ehOutcome', defaults.outcome || '');
 set('ehNext', defaults.next || '');
 set('ehNeed', defaults.need || '');
 set('ehStage', defaults.stage || '');
 set('ehEngage', defaults.engage || '');

 this.root.querySelectorAll('[data-eh-stage]').forEach((btn) => {
 const on = btn.getAttribute('data-eh-stage') === (defaults.stage || '');
 btn.setAttribute('aria-pressed', on ? 'true' : 'false');
 });
 this.root.querySelectorAll('[data-eh-engage]').forEach((btn) => {
 const on = btn.getAttribute('data-eh-engage') === (defaults.engage || '');
 btn.setAttribute('aria-pressed', on ? 'true' : 'false');
 });
 };

 EngagementHub.prototype.setPanelOpen = function (open) {
 this.formOpen = !!open;
 const panel = this.el.panel;
 if (!panel) return;
 panel.setAttribute('data-open', this.formOpen ? 'true' : 'false');
 const body = panel.querySelector('.eh-panel-body');
 if (body) body.hidden = !this.formOpen;
 panel.querySelectorAll('[data-eh-toggle-panel]').forEach((btn) => {
 if (btn.classList.contains('btn-secondary') && btn.closest('.eh-panel-head')) {
 const t = (key, fallback) => (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t(key, fallback) : fallback;
 btn.textContent = this.formOpen ? t('hub.closePanel', 'Close panel') : t('hub.openPanel', 'Open panel');
 }
 });
 if (this.formOpen) {
 this.markFormStarted();
 const first = document.getElementById('ehTopic');
 if (first) first.focus({ preventScroll: true });
 const mobile = global.matchMedia('(max-width: 820px)').matches;
 panel.scrollIntoView({
 behavior: prefersReducedMotion() ? 'auto' : 'smooth',
 block: mobile ? 'start' : 'nearest'
 });
 }
 };

 EngagementHub.prototype.openForm = function (payload) {
 payload = payload || {};
 const base = (this.data.intentState[this.intentId] && this.data.intentState[this.intentId].formDefaults) || {};
 const merged = Object.assign({}, base);
 Object.keys(payload).forEach((key) => {
 if (payload[key] != null && payload[key] !== '') merged[key] = payload[key];
 });
 this.applyFormDefaults(merged);
 if (merged.engage === 'Anthony directly') aieTrack('consultant_selected', { source: 'form_open' });
 this.setPanelOpen(true);
 };

 EngagementHub.prototype.runAction = function (action) {
 if (!action) return;
 if (action.action === 'open-form') {
 this.openForm(action.payload || {});
 aieTrack('recommended_action_clicked', { action: 'open-form' });
 return;
 }
 if (action.action === 'view' && action.payload && action.payload.view) {
 aieTrack('recommended_action_clicked', { action: 'view', view: action.payload.view });
 if (typeof global.navigateToView === 'function') global.navigateToView(action.payload.view);
 return;
 }
 if (action.action === 'insight' && action.payload && action.payload.id) {
 aieTrack('insight_opened', { id: action.payload.id });
 if (typeof global.navigateToView === 'function') global.navigateToView(action.payload.id);
 return;
 }
 if (action.action === 'scroll' && action.payload && action.payload.id) {
 const target = document.getElementById(action.payload.id);
 if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
 aieTrack('recommended_action_clicked', { action: 'scroll', id: action.payload.id });
 }
 };

 /**
 * Isolated submit layer. Mailto now; swap implementation later for Contact API / CRM.
 */
 EngagementHub.prototype.buildMailto = function (payload) {
 const t = (key, fallback) => (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t(key, fallback) : fallback;
 const subject = `${t('hub.mailSubject', 'AI Elevate enquiry')}: ${payload.need || payload.topic || 'Engagement'}`;
 const body =
 `${t('hub.mailIntro', 'Hi AI Elevate,\n\nI would like to request a focused conversation.\n\n')}` +
 `${t('hub.mailName', 'Name')}: ${payload.name}\n` +
 `${t('hub.mailOrg', 'Organisation')}: ${payload.org}\n` +
 `${t('hub.mailRole', 'Role')}: ${payload.role}\n` +
 `${t('hub.mailEmail', 'Business email')}: ${payload.email}\n` +
 `${t('hub.mailTopic', 'Topic')}: ${payload.topic}\n` +
 `${t('hub.mailStage', 'Current stage')}: ${payload.stage || 'n/a'}\n` +
 `${t('hub.mailOutcome', 'Desired outcome')}: ${payload.outcome}\n` +
 `${t('hub.mailEngage', 'Engage with')}: ${payload.engage || 'n/a'}\n` +
 `${t('hub.mailNeed', 'Primary need')}: ${payload.need || 'n/a'}\n` +
 `${t('hub.mailNext', 'Preferred next step')}: ${payload.next || 'n/a'}\n` +
 `${t('hub.mailIntent', 'Hub intent')}: ${payload.intent || 'n/a'}\n\n` +
 `${t('hub.mailContext', 'Context')}:\n${payload.situation}\n`;
 return `mailto:${this.data.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 };

 EngagementHub.prototype.submitEngagement = function (payload) {
 // Phase 1: mailto. Future: POST Contact API / CRM here.
 global.location.href = this.buildMailto(payload);
 };

 EngagementHub.prototype.submitForm = function (event) {
 event.preventDefault();
 if (this.el.error) this.el.error.textContent = '';
 const payload = {
 name: (document.getElementById('ehName')?.value || '').trim(),
 org: (document.getElementById('ehOrg')?.value || '').trim(),
 role: (document.getElementById('ehRole')?.value || '').trim(),
 email: (document.getElementById('ehEmail')?.value || '').trim(),
 situation: (document.getElementById('ehSituation')?.value || '').trim(),
 topic: (document.getElementById('ehTopic')?.value || '').trim(),
 outcome: (document.getElementById('ehOutcome')?.value || '').trim(),
 stage: (document.getElementById('ehStage')?.value || '').trim(),
 engage: (document.getElementById('ehEngage')?.value || '').trim(),
 need: (document.getElementById('ehNeed')?.value || '').trim(),
 next: (document.getElementById('ehNext')?.value || '').trim(),
 intent: this.intentId
 };

 if (!payload.name || !payload.org || !payload.role || !payload.email || !payload.situation || !payload.topic || !payload.outcome) {
 if (this.el.error) this.el.error.textContent = (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.errRequired', 'Please complete all required fields.') : 'Please complete all required fields.';
 return;
 }
 if (!payload.stage) {
 if (this.el.error) this.el.error.textContent = (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.errStage', 'Please select where you are today.') : 'Please select where you are today.';
 return;
 }
 if (!payload.engage) {
 if (this.el.error) this.el.error.textContent = (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.errEngage', 'Please select who or what you want to engage with.') : 'Please select who or what you want to engage with.';
 return;
 }
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
 if (this.el.error) this.el.error.textContent = (global.AIE_I18N && global.AIE_I18N.t) ? global.AIE_I18N.t('hub.errEmail', 'Please enter a valid business email.') : 'Please enter a valid business email.';
 return;
 }

 aieTrack('form_submitted', { intent: this.intentId, engage: payload.engage });
 this.submitEngagement(payload);
 };

 EngagementHub.prototype.refreshLocale = function () {
 const intentId = this.intentId || 'exploring';
 const wasOpen = this.formOpen;
 this.bound = false;
 this.root.innerHTML = this.template();
 this.cacheEls();
 this.bind();
 this.applyIntent(intentId, { silent: true });
 this.bound = true;
 if (wasOpen) this.setPanelOpen(true);
 if (typeof global.refreshSectionRail === 'function') global.refreshSectionRail();
 };

 EngagementHub.prototype.setIntentFromSite = function (siteIntent) {
 const map = this.data.siteIntentMap || {};
 const hubIntent = map[siteIntent] || siteIntent;
 if (this.data.intentState[hubIntent]) {
 this.applyIntent(hubIntent);
 return hubIntent;
 }
 this.applyIntent('exploring');
 return 'exploring';
 };

 /**
 * Apply optional pillar / capability context from deep pages or Home explore.
 * Context shape: { pillar, pillarLabel, capability, capabilityLabel, contactContext }
 */
 EngagementHub.prototype.applyCapabilityContext = function (ctx) {
 if (!ctx || typeof ctx !== 'object') return;
 this.capabilityContext = ctx;
 const rawPillar = String(ctx.pillar || ctx.contactIntent || '').toLowerCase();
 const pillarIntent = (rawPillar === 'business' || rawPillar === 'business-ready') ? 'business-ready'
 : (rawPillar === 'adoption' || rawPillar === 'user-adoption') ? 'user-adoption'
 : (rawPillar === 'technologies' || rawPillar === 'ai-technologies') ? 'ai-technologies'
 : null;
 if (pillarIntent && this.data.intentState[pillarIntent]) {
 this.applyIntent(pillarIntent, { silent: true });
 }
 const topic = ctx.contactContext
 || (ctx.capabilityLabel && ctx.pillarLabel
 ? (ctx.pillarLabel + ': ' + ctx.capabilityLabel)
 : (ctx.pillarLabel || ctx.capabilityLabel || ''));
 if (topic) {
 this.openForm({
 topic: topic,
 outcome: ctx.capabilityLabel
 ? ('Discuss ' + ctx.capabilityLabel + ' within organisational AI capability')
 : ('Discuss ' + (ctx.pillarLabel || 'organisational AI capability')),
 engage: 'AI Elevate',
 need: 'Capability diagnosis',
 next: 'Capability conversation'
 });
 }
 };

 function initEngagementHub() {
 const root = document.getElementById('engagementHubRoot') || document.querySelector('[data-engagement-hub]');
 const data = global.ENGAGEMENT_HUB_DATA;
 if (!root || !data) return null;
 if (global.__aieEngagementHub) return global.__aieEngagementHub;
 const hub = new EngagementHub(root, data);
 hub.init();
 global.__aieEngagementHub = hub;
 return hub;
 }

 global.aieTrack = aieTrack;
 global.initEngagementHub = initEngagementHub;
 global.EngagementHub = EngagementHub;
})(typeof window !== 'undefined' ? window : globalThis);
