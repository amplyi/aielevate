/**
 * EDMP Digital Assessment Engine  preview (public) + full diagnostic (token gated).
 */
(function () {
 const STORAGE_KEY = 'aie_edmp_assessment_v1';
 const TOKEN_KEY = 'aie_edmp_assessment_token';

 let authorized = false;
 let sessionToken = '';
 let configLoaded = false;

 function previewCfg() {
 const base = window.EDMP_ASSESSMENT_PREVIEW || { dimensions: [], sampleReport: {}, sampleRecommendations: [] };
 const i18n = window.AIE_I18N;
 if (!i18n || i18n.getLocale() !== 'nl') return base;
 const pack = i18n.getPack('assessmentPreview');
 if (!pack) return base;
 const merged = JSON.parse(JSON.stringify(base));
 if (pack.title) merged.title = pack.title;
 if (pack.subtitle) merged.subtitle = pack.subtitle;
 if (Array.isArray(pack.dimensions) && Array.isArray(merged.dimensions)) {
 merged.dimensions = merged.dimensions.map((dim, index) => Object.assign({}, dim, pack.dimensions[index] || {}));
 }
 if (Array.isArray(pack.sampleRecommendations)) merged.sampleRecommendations = pack.sampleRecommendations.slice();
 if (pack.sampleReport && merged.sampleReport) Object.assign(merged.sampleReport, pack.sampleReport);
 if (Array.isArray(pack.sampleReport?.heatmap) && Array.isArray(merged.sampleReport.heatmap)) {
 merged.sampleReport.heatmap = merged.sampleReport.heatmap.map((row, index) => Object.assign({}, row, pack.sampleReport.heatmap[index] || {}));
 }
 return merged;
 }

 function ui() {
 const i18n = window.AIE_I18N;
 if (i18n && i18n.getLocale() === 'nl') return i18n.getPack('assessmentUi') || {};
 return {};
 }

 function tr(en) {
 return (window.AIE_I18N && typeof window.AIE_I18N.phrase === 'function')
 ? window.AIE_I18N.phrase(en)
 : en;
 }

 function cfg() {
 return window.EDMP_ASSESSMENT_CONFIG || { dimensions: [], exposureBands: [] };
 }

 function assessmentApi() {
 return window.AIE_ENGAGE_CONFIG?.edmpAssessment || {};
 }

 function getApiBase() {
 return (assessmentApi().apiBase || '').replace(/\/$/, '');
 }

 function $(id) {
 return document.getElementById(id);
 }

 function escapeHtml(value) {
 return String(value ?? '').replace(/[&<>"']/g, (chr) => ({
 '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
 }[chr]));
 }

 let state = {
 meta: { organisation: '', contact: '', role: '' },
 answers: {},
 step: 0,
 report: null,
 consultantNotes: '',
 };

 function loadState() {
 try {
 const raw = sessionStorage.getItem(STORAGE_KEY);
 if (raw) state = {...state,...JSON.parse(raw) };
 } catch (_) { /* ignore */ }
 }

 function saveState() {
 if (!authorized) return;
 sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
 }

 function resetState() {
 state = { meta: { organisation: '', contact: '', role: '' }, answers: {}, step: 0, report: null, consultantNotes: '' };
 sessionStorage.removeItem(STORAGE_KEY);
 }

 function readTokenFromUrl() {
 const params = new URLSearchParams(window.location.search);
 let t = params.get('token');
 if (!t && window.location.hash.includes('token=')) {
 const hashPart = window.location.hash.split('?')[1] || '';
 t = new URLSearchParams(hashPart).get('token');
 }
 if (t) {
 sessionToken = t;
 sessionStorage.setItem(TOKEN_KEY, t);
 params.delete('token');
 const q = params.toString();
 const hashBase = (window.location.hash.split('?')[0] || '#edmp-assessment');
 history.replaceState(null, '', window.location.pathname + (q ? `?${q}` : '') + hashBase);
 } else {
 sessionToken = sessionStorage.getItem(TOKEN_KEY) || '';
 }
 }

 async function validateAndLoadConfig() {
 const base = getApiBase();
 if (!base || !sessionToken) return false;

 try {
 const validateRes = await fetch(`${base}/api/edmp-assessment/validate`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: sessionToken }),
 });
 if (!validateRes.ok) return false;
 const validateData = await validateRes.json();
 if (!validateData.ok) return false;

 const configRes = await fetch(`${base}/api/edmp-assessment/config`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json', 'X-Session-Token': sessionToken },
 body: JSON.stringify({ token: sessionToken }),
 });
 if (!configRes.ok) return false;
 const configData = await configRes.json();
 if (!configData.config) return false;

 window.EDMP_ASSESSMENT_CONFIG = configData.config;
 configLoaded = true;
 authorized = true;

 const org = validateData.session?.organisation;
 if (org && !state.meta.organisation) state.meta.organisation = org;
 return true;
 } catch (_) {
 return false;
 }
 }

 function clearAuthorization() {
 authorized = false;
 configLoaded = false;
 sessionToken = '';
 sessionStorage.removeItem(TOKEN_KEY);
 delete window.EDMP_ASSESSMENT_CONFIG;
 resetState();
 }

 function allDimensions() {
 if (!authorized) return [];
 return cfg().dimensions || [];
 }

 function totalSteps() {
 return allDimensions().length + 1;
 }

 function getExposureBand(score) {
 const bands = cfg().exposureBands || [];
 const s = Math.round(score);
 return bands.find((b) => s >= b.min && s <= b.max) || bands[0];
 }

 function narrativeTier(score) {
 if (score < 50) return 'low';
 if (score < 70) return 'mid';
 if (score < 85) return 'managed';
 return 'high';
 }

 function dimensionScore(dimId) {
 const dim = allDimensions().find((d) => d.id === dimId);
 if (!dim) return 0;
 const vals = dim.questions.map((_, qi) => state.answers[`${dimId}:${qi}`]).filter((v) => v >= 1 && v <= 5);
 if (!vals.length) return 0;
 const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
 return Math.round(avg * 20);
 }

 function computeReport() {
 if (!authorized || !configLoaded) return null;

 const dimensions = allDimensions().map((dim) => {
 const score = dimensionScore(dim.id);
 const tier = narrativeTier(score);
 const narratives = cfg().narratives?.[dim.id] || {};
 return {
 id: dim.id,
 name: dim.name,
 score,
 observation: narratives[tier] || '',
 risk: cfg().risks?.[dim.id] || '',
 };
 });

 const scored = dimensions.filter((d) => d.score > 0);
 const overall = scored.length
 ? Math.round(scored.reduce((a, d) => a + d.score, 0) / scored.length)
 : 0;
 const band = getExposureBand(overall);

 const recommendations = (cfg().recommendations || [])
 .filter((rec) => {
 const dim = dimensions.find((d) => d.id === rec.dimension);
 return dim && dim.score < rec.threshold;
 })
 .map((rec) => ({...rec, gap: dimensionScore(rec.dimension) }))
 .sort((a, b) => a.gap - b.gap);

 const uniqueRecs = [];
 const seen = new Set();
 recommendations.forEach((rec) => {
 if (seen.has(rec.text)) return;
 seen.add(rec.text);
 uniqueRecs.push(rec.text);
 });

 const risks = [...dimensions]
 .sort((a, b) => a.score - b.score)
 .filter((d) => d.score < 70)
 .map((d) => ({ dimension: d.name, score: d.score, text: d.risk }));

 const weakest = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 3);
 const phases = cfg().roadmapPhases || [];
 const actions = cfg().roadmapActions || {};
 const roadmap = phases.map((phase, idx) => {
 const dim = weakest[idx];
 const item = dim && actions[dim.id] ? [actions[dim.id]] : [];
 return { phase: phase.phase, focus: phase.focus, items: item };
 });

 const weakestNames = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 2).map((d) => d.name);
 const org = state.meta.organisation || 'The organisation';
 const execSummary = (
 `${org} scores ${overall}/100 on EDMP readiness, classified as ${band.label}. ` +
 `Decision memory capability is uneven across domains. Priority exposure areas include ${weakestNames.join(' and ')}. ` +
 'Strengthening decision lineage, institutional memory, and AI accountability will reduce governance, continuity, and rework risk as decision velocity increases.'
 );

 return {
 generatedAt: new Date().toISOString(),
 meta: {...state.meta },
 overall,
 band,
 dimensions,
 executiveSummary: execSummary,
 risks: risks.slice(0, 5),
 recommendations: uniqueRecs.slice(0, 5),
 roadmap,
 consultantNotes: state.consultantNotes || '',
 };
 }

 function renderPreview() {
 const mount = $('edmpAssessFlow');
 const reportView = $('edmpReportView');
 if (!mount) return;
 mount.classList.remove('hidden');
 reportView?.classList.add('hidden');

 const p = previewCfg();
 const sample = p.sampleReport || {};
 const dims = p.dimensions || [];
 const copy = ui();

 const dimCards = dims.map((d) => `
 <article class="edmp-preview-dim glass">
 <h4>${escapeHtml(d.name)}</h4>
 <p class="edmp-preview-sample-q">${escapeHtml(d.sampleQuestion)}</p>
 <p class="edmp-preview-note">${escapeHtml(copy.fullDiagnosticNote || 'Full diagnostic: 5 scored questions in this dimension (paid session).')}</p>
 </article>
 `).join('');

 const heatmap = (sample.heatmap || []).map((row) => `
 <div class="edmp-heatmap-row edmp-preview-blur-row">
 <span class="edmp-heatmap-label">${escapeHtml(row.name)}</span>
 <div class="edmp-heatmap-bar-wrap"><div class="edmp-heatmap-bar" style="width:${row.score}%"></div></div>
 <span class="edmp-heatmap-val">${row.score}</span>
 </div>
 `).join('');

 const sampleRecs = (p.sampleRecommendations || []).map((t) => `<li>${escapeHtml(t)}</li>`).join('');

 mount.innerHTML = `
 <div class="edmp-assess-card edmp-preview-card">
 <div class="edmp-assess-kicker">${escapeHtml(p.title || 'EDMP Readiness Assessment')}</div>
 <h2>${escapeHtml(copy.previewTitle || 'Assessment preview')}</h2>
 <p class="edmp-assess-lead">${escapeHtml(p.subtitle || '')}</p>

 <div class="edmp-preview-gate glass">
 <h3>${escapeHtml(copy.fullAccessTitle || 'Full assessment access')}</h3>
 <p>${escapeHtml(copy.fullAccessCopy || 'The complete 30-question diagnostic, scoring engine, tailored recommendations, and PDF report require a paid EDMP Readiness Assessment session.')}</p>
 <label class="edmp-assess-field">
 <span>${escapeHtml(copy.tokenLabel || 'Session access token')}</span>
 <div class="edmp-token-row">
 <input id="edmpTokenInput" type="text" placeholder="${escapeHtml(copy.tokenPlaceholder || 'Paste token from your confirmation email')}" autocomplete="off" />
 <button type="button" class="edmp-assess-btn edmp-assess-btn-primary" id="edmpTokenBtn">${escapeHtml(copy.enter || 'Enter')}</button>
 </div>
 </label>
 <p id="edmpGateError" class="edmp-assess-error" role="alert"></p>
 <div class="edmp-assess-actions">
 <button type="button" class="edmp-assess-btn" id="edmpRequestAssessment" data-engage-product="assessment" data-source="assessment-preview">${escapeHtml(copy.requestAssessment || 'Request Assessment')}</button>
 </div>
 </div>

 <section class="edmp-preview-section">
 <h3>${escapeHtml(copy.sixDimensions || 'Six EDMP dimensions')}</h3>
 <div class="edmp-preview-dim-grid">${dimCards}</div>
 </section>

 <section class="edmp-preview-section edmp-preview-sample-report">
 <div class="edmp-preview-watermark">${escapeHtml(sample.watermark || 'SAMPLE')}</div>
 <h3>${escapeHtml(copy.sampleReport || 'Sample report output')}</h3>
 <p class="edmp-preview-disclaimer">${escapeHtml(copy.illustrativeScores || 'Illustrative scores only. Not generated from your organisation.')}</p>
 <div class="edmp-report-hero edmp-preview-hero">
 <div>
 <strong>${escapeHtml(sample.organisation || 'Example')}</strong>
 <p class="edmp-assess-lead">${escapeHtml(copy.boardReadyReport || 'Board ready EDMP Readiness Assessment Report')}</p>
 </div>
 <div class="edmp-report-score-block">
 <div class="edmp-report-score">${sample.overall ?? '--'}</div>
 <span class="edmp-report-band band-${sample.bandId || 'moderate'}">${escapeHtml(sample.band || '')}</span>
 </div>
 </div>
 <div class="edmp-heatmap edmp-preview-heatmap">${heatmap}</div>
 <p class="edmp-preview-disclaimer">${escapeHtml(sample.summary || '')}</p>
 </section>

 <section class="edmp-preview-section">
 <h3>${escapeHtml(copy.sampleRecsTitle || 'Sample recommendations')}</h3>
 <p class="edmp-preview-disclaimer">${escapeHtml(copy.sampleRecsNote || 'Examples of recommendation style. Full engine maps rules to your scores after payment.')}</p>
 <ul class="edmp-preview-recs">${sampleRecs}</ul>
 </section>
 </div>
 `;

 $('edmpTokenBtn')?.addEventListener('click', async () => {
 const input = $('edmpTokenInput');
 const errEl = $('edmpGateError');
 sessionToken = input?.value?.trim() || '';
 if (!sessionToken) {
 if (errEl) errEl.textContent = copy.enterToken || 'Enter your session token.';
 return;
 }
 sessionStorage.setItem(TOKEN_KEY, sessionToken);
 if (errEl) errEl.textContent = copy.validating || 'Validating session..';
 const ok = await validateAndLoadConfig();
 if (!ok) {
 if (errEl) errEl.textContent = getApiBase()
 ? tr('Invalid or expired token. Contact info@aielevate.xyz.')
 : tr('Assessment API not configured yet. Token validation will work after Vercel deploy.');
 return;
 }
 if (errEl) errEl.textContent = '';
 loadState();
 renderFlow();
 });

 $('edmpRequestAssessment')?.addEventListener('click', () => {
 if (typeof window.openEngageIntake === 'function') {
 window.openEngageIntake('assessment', 'assessment-preview');
 }
 });
 }

 function validateStep() {
 if (!authorized) return 'Assessment session required.';
 if (state.step === 0) {
 const org = $('edmpOrg')?.value?.trim();
 if (!org) return 'Enter the organisation name to continue.';
 state.meta.organisation = org;
 state.meta.contact = $('edmpContact')?.value?.trim() || '';
 state.meta.role = $('edmpRole')?.value?.trim() || '';
 return '';
 }
 const dim = allDimensions()[state.step - 1];
 if (!dim) return '';
 for (let qi = 0; qi < dim.questions.length; qi += 1) {
 const key = `${dim.id}:${qi}`;
 if (!state.answers[key] || state.answers[key] < 1) {
 return 'Please answer all five questions before continuing.';
 }
 }
 return '';
 }

 function renderScaleOptions(dimId, qIndex) {
 const labels = cfg().scaleLabels || {};
 const name = `edmp-${dimId}-${qIndex}`;
 const current = state.answers[`${dimId}:${qIndex}`];
 return [1, 2, 3, 4, 5].map((n) => `
 <label class="edmp-assess-opt">
 <input type="radio" name="${name}" value="${n}" ${current === n ? 'checked' : ''} data-dim="${dimId}" data-q="${qIndex}" />
 <strong>${n}</strong>
 <span>${escapeHtml(labels[n] || '')}</span>
 </label>
 `).join('');
 }

 function renderFlow() {
 if (!authorized) {
 renderPreview();
 return;
 }

 const mount = $('edmpAssessFlow');
 if (!mount) return;

 if (state.report) {
 mount.classList.add('hidden');
 $('edmpReportView')?.classList.remove('hidden');
 renderReport();
 return;
 }

 mount.classList.remove('hidden');
 $('edmpReportView')?.classList.add('hidden');

 const progress = Math.round((state.step / Math.max(totalSteps() - 1, 1)) * 100);
 const copy = ui();
 let body = '';

 if (state.step === 0) {
 body = `
 <div class="edmp-session-banner">Authorized assessment session active</div>
 <div class="edmp-assess-meta-grid">
 <label class="edmp-assess-field">
 <span>Organisation</span>
 <input id="edmpOrg" type="text" required placeholder="${escapeHtml(copy.companyName || 'Company name')}" value="${escapeHtml(state.meta.organisation)}" />
 </label>
 <label class="edmp-assess-field">
 <span>Contact name</span>
 <input id="edmpContact" type="text" placeholder="${escapeHtml(copy.assessmentSponsor || 'Assessment sponsor')}" value="${escapeHtml(state.meta.contact)}" />
 </label>
 <label class="edmp-assess-field">
 <span>Role / function</span>
 <input id="edmpRole" type="text" placeholder="${escapeHtml(copy.rolePlaceholder || 'CFO, Governance Lead..')}" value="${escapeHtml(state.meta.role)}" />
 </label>
 </div>
 <p class="edmp-assess-lead">30 questions across six decision memory dimensions. Your responses generate a board ready report automatically.</p>
 `;
 } else {
 const dim = allDimensions()[state.step - 1];
 const questions = dim.questions.map((q, qi) => `
 <fieldset class="edmp-assess-q">
 <legend><span class="edmp-assess-q-num">${qi + 1}</span>${escapeHtml(q)}</legend>
 <div class="edmp-assess-scale" role="radiogroup">${renderScaleOptions(dim.id, qi)}</div>
 </fieldset>
 `).join('');
 body = `
 <div class="edmp-session-banner">Authorized session</div>
 <h3 class="edmp-assess-dim-title">${escapeHtml(dim.name)}</h3>
 <p class="edmp-assess-dim-note">Rate each statement from 1 (not in place) to 5 (consistent / institutional).</p>
 ${questions}
 `;
 }

 const isLast = state.step === totalSteps() - 1;
 mount.innerHTML = `
 <div class="edmp-assess-card">
 <div class="edmp-assess-kicker">EDMP Readiness Assessment</div>
 <h2>${state.step === 0 ? 'Assessment intake' : `Dimension ${state.step} of ${allDimensions().length}`}</h2>
 <div class="edmp-assess-progress">
 <div class="edmp-assess-progress-label"><span>Progress</span><span>${progress}%</span></div>
 <div class="edmp-assess-progress-bar"><div class="edmp-assess-progress-fill" style="width:${progress}%"></div></div>
 </div>
 ${body}
 <p id="edmpAssessError" class="edmp-assess-error" role="alert"></p>
 <div class="edmp-assess-actions">
 ${state.step > 0 ? '<button type="button" class="edmp-assess-btn" id="edmpAssessBack">Back</button>' : ''}
 <button type="button" class="edmp-assess-btn edmp-assess-btn-primary" id="edmpAssessNext">
 ${isLast ? 'Generate report' : 'Continue'}
 </button>
 <button type="button" class="edmp-assess-btn" id="edmpAssessReset">Reset</button>
 <button type="button" class="edmp-assess-btn" id="edmpAssessExit">Exit session</button>
 </div>
 </div>
 `;

 mount.querySelectorAll('input[type="radio"]').forEach((input) => {
 input.addEventListener('change', () => {
 state.answers[`${input.dataset.dim}:${Number(input.dataset.q)}`] = Number(input.value);
 saveState();
 });
 });

 $('edmpAssessBack')?.addEventListener('click', () => { state.step -= 1; saveState(); renderFlow(); });
 $('edmpAssessExit')?.addEventListener('click', () => {
 if (window.confirm('End this assessment session?')) {
 clearAuthorization();
 renderPreview();
 }
 });
 $('edmpAssessNext')?.addEventListener('click', () => {
 const err = validateStep();
 const errEl = $('edmpAssessError');
 if (err) { if (errEl) errEl.textContent = err; return; }
 if (errEl) errEl.textContent = '';
 if (state.step >= totalSteps() - 1) {
 state.report = computeReport();
 saveState();
 renderFlow();
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }
 state.step += 1;
 saveState();
 renderFlow();
 });
 $('edmpAssessReset')?.addEventListener('click', () => {
 if (window.confirm('Reset answers for this session?')) {
 state.answers = {};
 state.step = 0;
 state.report = null;
 saveState();
 renderFlow();
 }
 });
 }

 function renderReport() {
 if (!authorized) { renderPreview(); return; }
 const mount = $('edmpReportPrint');
 const report = state.report;
 if (!mount || !report) return;

 const dateStr = new Date(report.generatedAt).toLocaleDateString('en-GB', {
 day: 'numeric', month: 'long', year: 'numeric',
 });

 const heatmap = report.dimensions.map((d) => `
 <div class="edmp-heatmap-row">
 <span class="edmp-heatmap-label">${escapeHtml(d.name)}</span>
 <div class="edmp-heatmap-bar-wrap"><div class="edmp-heatmap-bar" style="width:${d.score}%"></div></div>
 <span class="edmp-heatmap-val">${d.score}</span>
 </div>
 `).join('');

 const dimAnalysis = report.dimensions.map((d) => `
 <div class="edmp-dim-card">
 <div class="edmp-dim-card-head">
 <span>${escapeHtml(d.name)}</span>
 <span class="edmp-dim-score">${d.score}/100</span>
 </div>
 <p>${escapeHtml(d.observation)}</p>
 </div>
 `).join('');

 const risks = report.risks.length
 ? `<ol>${report.risks.map((r) => `<li><strong>${escapeHtml(r.dimension)} (${r.score})</strong> - ${escapeHtml(r.text)}</li>`).join('')}</ol>`
 : '<p>No elevated domain risks above threshold.</p>';

 const recs = report.recommendations.length
 ? `<ol>${report.recommendations.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ol>`
 : '<p>Maintain current decision memory practices and monitor domain drift.</p>';

 const roadmap = report.roadmap.map((phase) => `
 <div class="edmp-roadmap-phase">
 <h4>${escapeHtml(phase.phase)} - ${escapeHtml(phase.focus)}</h4>
 <ul>${(phase.items.length ? phase.items : ['Review dimension scores with executive sponsors.']).map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
 </div>
 `).join('');

 mount.innerHTML = `
 <div class="edmp-assess-card edmp-report">
 <div class="edmp-assess-kicker">EDMP Readiness Assessment Report</div>
 <div class="edmp-report-hero">
 <div>
 <h2>${escapeHtml(report.meta.organisation)}</h2>
 <p class="edmp-assess-lead">${escapeHtml(dateStr)}${report.meta.contact ? ` - ${escapeHtml(report.meta.contact)}` : ''}</p>
 </div>
 <div class="edmp-report-score-block">
 <div class="edmp-report-score">${report.overall}</div>
 <div>Overall score</div>
 <span class="edmp-report-band band-${report.band.id}">${escapeHtml(report.band.label)}</span>
 </div>
 </div>
 <section class="edmp-report-section"><h3>Executive summary</h3><p>${escapeHtml(report.executiveSummary)}</p></section>
 <section class="edmp-report-section"><h3>Exposure summary</h3><p>Classification: <strong>${escapeHtml(report.band.label)}</strong> (${report.overall}/100).</p></section>
 <section class="edmp-report-section"><h3>Dimension heatmap</h3><div class="edmp-heatmap">${heatmap}</div></section>
 <section class="edmp-report-section"><h3>Dimension analysis</h3>${dimAnalysis}</section>
 <section class="edmp-report-section"><h3>Top risks</h3>${risks}</section>
 <section class="edmp-report-section"><h3>Top recommendations</h3>${recs}</section>
 <section class="edmp-report-section"><h3>90 day roadmap</h3>${roadmap}</section>
 <section class="edmp-report-section edmp-consultant-edit">
 <h3>Consultant notes (optional)</h3>
 <label class="edmp-assess-field">
 <span>Workshop / session notes</span>
 <textarea id="edmpConsultantNotes" placeholder="${escapeHtml((ui()).facilitatorNotes || 'Facilitator observations..')}">${escapeHtml(report.consultantNotes)}</textarea>
 </label>
 </section>
 </div>
 `;

 $('edmpConsultantNotes')?.addEventListener('input', (e) => {
 state.consultantNotes = e.target.value;
 if (state.report) state.report.consultantNotes = state.consultantNotes;
 saveState();
 });

 const actions = $('edmpReportActions');
 if (actions) {
 actions.innerHTML = `
 <button type="button" class="edmp-assess-btn" id="edmpReportBack">Edit responses</button>
 <button type="button" class="edmp-assess-btn edmp-assess-btn-primary" id="edmpReportPrint">Download PDF</button>
 <button type="button" class="edmp-assess-btn" id="edmpReportNew">New assessment</button>
 `;
 $('edmpReportBack')?.addEventListener('click', () => { state.report = null; saveState(); renderFlow(); });
 $('edmpReportPrint')?.addEventListener('click', printReport);
 $('edmpReportNew')?.addEventListener('click', () => {
 if (window.confirm('Start a new assessment in this session?')) {
 state.answers = {};
 state.step = 0;
 state.report = null;
 saveState();
 renderFlow();
 }
 });
 }
 }

 function printReport() {
 if (!authorized) return;
 document.body.classList.add('edmp-assessment-print');
 window.print();
 window.addEventListener('afterprint', () => {
 document.body.classList.remove('edmp-assessment-print');
 }, { once: true });
 }

 async function onViewActive() {
 readTokenFromUrl();
 loadState();
 if (sessionToken) {
 const ok = await validateAndLoadConfig();
 if (ok) {
 renderFlow();
 return;
 }
 }
 authorized = false;
 if (state.report || Object.keys(state.answers).length) {
 resetState();
 }
 renderPreview();
 }

 function refreshLocale() {
 if (authorized) renderFlow();
 else renderPreview();
 }

 window.EdmpAssessment = { onViewActive, refreshLocale };
})();
