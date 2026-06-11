/**
 * AI Elevate Decision Room ù gated session simulator (API proxy, no client API key).
 */
(function () {
  const TOKEN_KEY = 'aie_dr_token';
  const SETUP_KEY = 'aie_dr_setup';

  const ARCHETYPES = {
    corporate: 'A multinational organization under regulatory pressure facing a critical strategic launch.',
    government: 'A public-sector crisis management team during a fast-moving emergency.',
    regulated: 'A regulated enterprise balancing compliance, audit exposure, and operational continuity.',
    growth: 'A scaling organization at the edge of breakthrough or structural failure.',
  };

  let sessionToken = '';
  let apiBase = '';
  let state = {
    archetype: null,
    industry: '',
    role: '',
    pressure: '',
    turn: 0,
    maxTurns: 6,
    metrics: { integrity: 90, velocity: 70, risk: 20 },
    history: [],
    isLoading: false,
    scenarioContext: '',
    currentSignal: '',
    timerInterval: null,
    timerSeconds: 0,
    timerMax: 30,
  };

  function cfg() {
    return window.AIE_ENGAGE_CONFIG?.decisionRoom || {};
  }

  function getApiBase() {
    const base = cfg().apiBase || '';
    return base.replace(/\/$/, '');
  }

  function $(id) {
    return document.getElementById(id);
  }

  function show(el) {
    if (el) el.classList.remove('hidden');
  }

  function hide(el) {
    if (el) el.classList.add('hidden');
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
      const hashBase = (window.location.hash.split('?')[0] || '#decision-room');
      const clean = window.location.pathname + (q ? `?${q}` : '') + hashBase;
      history.replaceState(null, '', clean);
    } else {
      sessionToken = sessionStorage.getItem(TOKEN_KEY) || '';
    }
  }

  function buildScenarioContext() {
    const arch = ARCHETYPES[state.archetype] || ARCHETYPES.corporate;
    return (
      `You are a ${state.role || 'senior executive'} in the ${state.industry || 'enterprise'} sector. ` +
      `${arch} Pressure domain: ${state.pressure || 'governance and decision traceability'}. ` +
      'Each signal is a realistic briefing. Emphasize decision accountability, traceability, ' +
      'institutional memory, and what would be lost if key people left. ' +
      'This is an EDMP (Enterprise Decision Memory Platform) decision-pressure simulation ù not a game.'
    );
  }

  async function apiValidate(token) {
    const res = await fetch(`${apiBase}/api/decision-room/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Session validation failed');
    return data;
  }

  async function callClaude(messages, systemPrompt, type) {
    const res = await fetch(`${apiBase}/api/decision-room/claude`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Token': sessionToken,
      },
      body: JSON.stringify({ token: sessionToken, messages, system: systemPrompt, type }),
    });
    const newToken = res.headers.get('X-Session-Token');
    if (newToken) {
      sessionToken = newToken;
      sessionStorage.setItem(TOKEN_KEY, newToken);
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `API error (${res.status})`);
    return data.text;
  }

  function setGateError(msg) {
    const el = $('drGateError');
    if (el) el.textContent = msg || '';
  }

  async function onValidateToken() {
    setGateError('');
    const input = $('drTokenInput');
    sessionToken = (input?.value || '').trim() || sessionToken;
    if (!sessionToken) {
      setGateError('Enter your session access token.');
      return;
    }
    if (!apiBase) {
      setGateError('Decision Room API is not configured yet. Contact info@aielevate.xyz.');
      return;
    }
    try {
      const result = await apiValidate(sessionToken);
      sessionStorage.setItem(TOKEN_KEY, sessionToken);
      const saved = JSON.parse(sessionStorage.getItem(SETUP_KEY) || '{}');
      if (result.session?.industry) $('drIndustry').value = result.session.industry;
      if (result.session?.role) $('drRole').value = result.session.role;
      if (saved.industry) $('drIndustry').value = saved.industry;
      if (saved.role) $('drRole').value = saved.role;
      if (saved.pressure) $('drPressure').value = saved.pressure;
      hide($('drGate'));
      show($('drSetup'));
    } catch (e) {
      setGateError(e.message);
    }
  }

  function onStartSetup() {
    state.industry = ($('drIndustry')?.value || '').trim();
    state.role = ($('drRole')?.value || '').trim();
    state.pressure = ($('drPressure')?.value || '').trim();
    if (!state.industry || !state.role) {
      $('drSetupError').textContent = 'Industry and role are required.';
      return;
    }
    $('drSetupError').textContent = '';
    sessionStorage.setItem(SETUP_KEY, JSON.stringify({
      industry: state.industry,
      role: state.role,
      pressure: state.pressure,
    }));
    hide($('drSetup'));
    show($('drApp'));
    resetGameUi();
  }

  function resetGameUi() {
    state.turn = 0;
    state.metrics = { integrity: 90, velocity: 70, risk: 20 };
    state.history = [];
    state.scenarioContext = '';
    updateMetrics();
    $('drLogList').innerHTML = '<div class="dr-muted-pad">Awaiting first decision...</div>';
    $('drAdvisorMsgs').innerHTML = '';
    $('drSignalArea').innerHTML = '';
    const intro = document.createElement('div');
    intro.className = 'dr-intro-screen';
    intro.id = 'drIntroScreen';
    intro.innerHTML = `
      <div class="dr-intro-title">DECISION ROOM</div>
      <div class="dr-intro-sub">Experience how decisions form under pressure ù and what your organization would fail to reconstruct later. Select a scenario archetype.</div>
      <div class="dr-scenario-grid">
        <button type="button" class="dr-scenario-btn" data-arch="corporate"><span class="dr-sc-tag">CORPORATE</span>Regulatory pressure and strategic launch under scrutiny</button>
        <button type="button" class="dr-scenario-btn" data-arch="government"><span class="dr-sc-tag">PUBLIC SECTOR</span>Fast-moving crisis with governance visibility</button>
        <button type="button" class="dr-scenario-btn" data-arch="regulated"><span class="dr-sc-tag">REGULATED</span>Audit, compliance, and accountability tension</button>
        <button type="button" class="dr-scenario-btn" data-arch="growth"><span class="dr-sc-tag">GROWTH</span>Scaling organization at breakthrough or collapse</button>
      </div>`;
    $('drSignalArea').appendChild(intro);
    intro.querySelectorAll('[data-arch]').forEach((btn) => {
      btn.addEventListener('click', () => startScenario(btn.dataset.arch));
    });
    hide($('drOptionsArea'));
    hide($('drTimerRow'));
  }

  function startScenario(type) {
    state.archetype = type;
    state.scenarioContext = buildScenarioContext();
    state.turn = 0;
    state.metrics = { integrity: 90, velocity: 70, risk: 20 };
    state.history = [];
    updateMetrics();
    const intro = $('drIntroScreen');
    if (intro) intro.remove();
    show($('drOptionsArea'));
    $('drLogList').innerHTML = '<div class="dr-muted-pad">Awaiting first decision...</div>';
    $('drAdvisorMsgs').innerHTML = '';
    generateSignal();
  }

  function startTimer(seconds) {
    stopTimer();
    state.timerSeconds = seconds;
    state.timerMax = seconds;
    const row = $('drTimerRow');
    const bar = $('drTimerBar');
    row.classList.remove('hidden', 'dr-timer-urgent');
    bar.style.transition = 'none';
    bar.style.width = '100%';
    bar.style.background = 'var(--dr-safe)';
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.timerSeconds -= 1;
      updateTimerDisplay();
      const pct = Math.max(0, (state.timerSeconds / state.timerMax) * 100);
      bar.style.transition = 'width 1s linear, background 0.5s ease';
      bar.style.width = `${pct}%`;
      if (pct < 50) bar.style.background = 'var(--dr-warn)';
      if (pct < 20) {
        bar.style.background = 'var(--dr-danger)';
        row.classList.add('dr-timer-urgent');
      }
      if (state.timerSeconds <= 0) {
        stopTimer();
        autoChoose();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    $('drTimerRow')?.classList.add('hidden');
    $('drTimerRow')?.classList.remove('dr-timer-urgent');
  }

  function updateTimerDisplay() {
    const s = Math.max(0, state.timerSeconds);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    const label = $('drTimerLabel');
    if (label) label.textContent = `TIME: ${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  function autoChoose() {
    const btns = document.querySelectorAll('.dr-opt-btn:not(:disabled)');
    if (btns.length) btns[btns.length - 1].click();
  }

  function updateMetrics() {
    ['integrity', 'velocity', 'risk'].forEach((k) => {
      const v = Math.max(0, Math.min(100, state.metrics[k]));
      const mv = $(`drM${k.charAt(0).toUpperCase()}${k.slice(1)}`);
      const bar = $(`drBar${k.charAt(0).toUpperCase()}${k.slice(1)}`);
      if (mv) mv.textContent = v;
      if (bar) bar.style.width = `${v}%`;
    });
  }

  function setLoading(msg) {
    const area = $('drSignalArea');
    const ld = document.createElement('div');
    ld.className = 'dr-loading-dots';
    ld.id = 'drLoadingEl';
    ld.innerHTML = `<span></span><span></span><span></span><span class="dr-loading-label">${msg}</span>`;
    area.appendChild(ld);
    area.scrollTop = area.scrollHeight;
  }

  function removeLoading() {
    $('drLoadingEl')?.remove();
  }

  function addToLog(turn, choice, outcome) {
    const list = $('drLogList');
    if (turn === 1) list.innerHTML = '';
    const item = document.createElement('div');
    item.className = 'dr-log-item';
    item.innerHTML = `<div class="dr-log-turn">TURN ${turn}</div><div>${choice.substring(0, 48)}...</div><div style="font-size:10px;font-style:italic">${outcome.substring(0, 64)}...</div>`;
    list.appendChild(item);
    list.scrollTop = list.scrollHeight;
  }

  async function generateSignal() {
    state.turn += 1;
    state.isLoading = true;
    setLoading('RECEIVING SIGNAL...');
    const historyStr = state.history.length
      ? state.history.map((h, i) => `Turn ${i + 1}: Chose "${h.choice}" -> ${h.outcome}`).join('\n')
      : 'No prior decisions.';
    const systemPrompt =
      `You are the scenario engine for the AI Elevate Decision Room. Context: ${state.scenarioContext}\n\n` +
      `Turn ${state.turn} of ${state.maxTurns}. Metrics: Integrity ${state.metrics.integrity}, Velocity ${state.metrics.velocity}, Risk ${state.metrics.risk}.\n\n` +
      'Respond ONLY in this exact JSON format:\n{\n  "signal": "2-4 sentences",\n  "category": "ONE of: INTEL / CRISIS / POLITICAL / TACTICAL / ETHICAL / OPERATIONAL",\n' +
      '  "options": [{"key":"A","text":"...","integrity_delta":0,"velocity_delta":0,"risk_delta":0}, ...],\n' +
      '  "advisor_hawk": "1 sentence",\n  "advisor_dove": "1 sentence",\n  "advisor_analyst": "1 sentence"\n}\n' +
      'Deltas: integers -30 to +20. History: ' + historyStr;

    try {
      const raw = await callClaude([{ role: 'user', content: 'Generate the next signal.' }], systemPrompt, 'signal');
      removeLoading();
      const data = JSON.parse(raw.replace(/```json|```/g, '').trim());
      renderSignal(data);
    } catch (e) {
      removeLoading();
      renderError(e.message);
    }
    state.isLoading = false;
  }

  function renderSignal(data) {
    const area = $('drSignalArea');
    const card = document.createElement('div');
    card.className = 'dr-signal-card';
    card.innerHTML = `<div class="dr-signal-header"><span class="dr-signal-tag">${data.category}</span><span class="dr-signal-turn">SIGNAL ${state.turn}/${state.maxTurns}</span></div><div class="dr-signal-text">${data.signal}</div>`;
    area.appendChild(card);
    area.scrollTop = area.scrollHeight;

    $('drAdvisorMsgs').innerHTML = `
      <div class="dr-advisor-msg dr-a-hawk"><div class="dr-advisor-name">Hawk</div><div class="dr-advisor-text">${data.advisor_hawk}</div></div>
      <div class="dr-advisor-msg dr-a-dove"><div class="dr-advisor-name">Dove</div><div class="dr-advisor-text">${data.advisor_dove}</div></div>
      <div class="dr-advisor-msg dr-a-analyst"><div class="dr-advisor-name">Analyst</div><div class="dr-advisor-text">${data.advisor_analyst}</div></div>`;

    const optList = $('drOptionsList');
    optList.innerHTML = '';
    data.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dr-opt-btn';
      let badges = '';
      if (opt.integrity_delta) badges += `<span class="dr-stake-badge dr-stake-integrity">INT ${opt.integrity_delta > 0 ? '+' : ''}${opt.integrity_delta}</span>`;
      if (opt.velocity_delta) badges += `<span class="dr-stake-badge dr-stake-velocity">VEL ${opt.velocity_delta > 0 ? '+' : ''}${opt.velocity_delta}</span>`;
      if (opt.risk_delta) badges += `<span class="dr-stake-badge dr-stake-risk">RSK ${opt.risk_delta > 0 ? '+' : ''}${opt.risk_delta}</span>`;
      btn.innerHTML = `<span class="dr-opt-key">${opt.key}</span>${opt.text} ${badges}`;
      btn.addEventListener('click', () => makeChoice(opt, area));
      optList.appendChild(btn);
    });
    state.currentSignal = data.signal;
    startTimer(Math.max(20, 35 - state.turn * 3));
  }

  async function makeChoice(chosen, area) {
    if (state.isLoading) return;
    stopTimer();
    document.querySelectorAll('.dr-opt-btn').forEach((b) => { b.disabled = true; });
    state.isLoading = true;
    state.metrics.integrity = Math.max(0, Math.min(100, state.metrics.integrity + chosen.integrity_delta));
    state.metrics.velocity = Math.max(0, Math.min(100, state.metrics.velocity + chosen.velocity_delta));
    state.metrics.risk = Math.max(0, Math.min(100, state.metrics.risk + chosen.risk_delta));
    updateMetrics();
    setLoading('PROCESSING DECISION...');
    const systemPrompt =
      `You are the consequence engine for an EDMP decision simulation. Context: ${state.scenarioContext}\n` +
      'Generate the outcome in 2-3 sentences. Hint at traceability, accountability, and memory gaps. Output text only.';

    try {
      const outcome = await callClaude(
        [{
          role: 'user',
          content: `Signal: ${state.currentSignal}\nChoice: ${chosen.text}\nMetrics: INT ${state.metrics.integrity}, VEL ${state.metrics.velocity}, RSK ${state.metrics.risk}`,
        }],
        systemPrompt,
        'outcome',
      );
      removeLoading();
      const outcomeEl = document.createElement('div');
      outcomeEl.className = 'dr-outcome-card';
      outcomeEl.textContent = outcome.trim();
      area.appendChild(outcomeEl);
      state.history.push({
        choice: chosen.text,
        outcome: outcome.trim(),
        timeLeft: state.timerSeconds,
        timerMax: state.timerMax,
        intDelta: chosen.integrity_delta,
        velDelta: chosen.velocity_delta,
        rskDelta: chosen.risk_delta,
      });
      addToLog(state.turn, chosen.text, outcome.trim());
      if (state.metrics.integrity <= 0 || state.metrics.risk >= 100 || state.turn >= state.maxTurns) {
        setTimeout(endGame, 1800);
      } else {
        setTimeout(generateSignal, 2000);
      }
    } catch (e) {
      removeLoading();
      renderError(e.message);
    }
    state.isLoading = false;
  }

  async function endGame() {
    stopTimer();
    hide($('drOptionsArea'));
    setLoading('COMPILING EDMP DEBRIEF...');
    const historyStr = state.history.map((h, i) =>
      `Turn ${i + 1}: "${h.choice}" | Time: ${h.timerMax - h.timeLeft}s | Outcome: ${h.outcome}`,
    ).join('\n\n');
    const systemPrompt =
      'You are an EDMP (Enterprise Decision Memory Platform) debrief analyst. Return ONLY valid JSON:\n' +
      '{\n  "verdict": "2-word label",\n  "summary": "3-4 sentences on decision performance and traceability gaps",\n' +
      '  "scores": {"strategic_clarity":0,"decision_traceability":0,"risk_tolerance":0,"ethical_resolve":0,"decisiveness":0,"adaptability":0},\n' +
      '  "edmp_gaps": "2-3 sentences on what reasoning would be lost if key people left",\n' +
      '  "psychological_profile": "2 sentences",\n  "pressure_patterns": "2 sentences",\n' +
      '  "critical_reasoning_coaching": "3-4 sentences referencing actual choices",\n' +
      '  "emotional_flags": [{"turn":1,"flag":"label","explanation":"1 sentence"}],\n' +
      '  "strongest_moment": "Turn X - ...",\n  "weakest_moment": "Turn X - ...",\n' +
      '  "recommended_next_step": "One of: Executive Briefing / EDMP Readiness Assessment / Board Briefing Pack"\n}\n' +
      `Scores 0-100. Cover every turn in emotional_flags. Context: ${state.scenarioContext}`;

    try {
      const raw = await callClaude(
        [{ role: 'user', content: `Final metrics: INT ${state.metrics.integrity}, VEL ${state.metrics.velocity}, RSK ${state.metrics.risk}.\n\n${historyStr}` }],
        systemPrompt,
        'debrief',
      );
      removeLoading();
      let data = null;
      try {
        data = JSON.parse(raw.replace(/```json|```/g, '').trim());
      } catch (_) { /* fallback below */ }
      renderDebrief(data, raw);
    } catch (e) {
      removeLoading();
      renderError(e.message);
    }
  }

  function renderDebrief(data, rawFallback) {
    const area = $('drSignalArea');
    const failed = state.metrics.integrity <= 0 || state.metrics.risk >= 100;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'background:var(--dr-surface);border:1px solid var(--dr-border);border-radius:12px;padding:24px;margin-top:8px';
    const scores = data?.scores || {
      strategic_clarity: 50, decision_traceability: 50, risk_tolerance: 50,
      ethical_resolve: 50, decisiveness: 50, adaptability: 50,
    };
    wrap.innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-family:ui-monospace,monospace;font-size:16px;letter-spacing:0.12em;color:${failed ? 'var(--dr-danger)' : 'var(--dr-safe)'}">${failed ? 'CRITICAL FAILURE' : 'SESSION COMPLETE'}</div>
        ${data?.verdict ? `<div style="font-size:12px;color:var(--dr-muted);margin-top:6px">${data.verdict.toUpperCase()}</div>` : ''}
        <div style="margin-top:10px;font-family:ui-monospace,monospace;font-size:13px">
          <span style="color:var(--dr-safe)">INT ${state.metrics.integrity}</span> ù
          <span style="color:var(--dr-accent)">VEL ${state.metrics.velocity}</span> ù
          <span style="color:var(--dr-danger)">RSK ${state.metrics.risk}</span>
        </div>
      </div>
      ${data?.summary ? `<p style="color:var(--dr-muted);line-height:1.7;margin-bottom:16px;border-left:3px solid var(--dr-accent);padding-left:12px">${data.summary}</p>` : ''}
      ${data?.edmp_gaps ? `<p style="color:var(--dr-text);line-height:1.7;margin-bottom:16px"><strong style="color:var(--dr-accent)">Decision memory gaps:</strong> ${data.edmp_gaps}</p>` : ''}
      ${data?.critical_reasoning_coaching ? `<p style="color:var(--dr-muted);line-height:1.7;margin-bottom:16px">${data.critical_reasoning_coaching}</p>` : ''}
      ${data?.recommended_next_step ? `<p style="color:var(--dr-accent2);margin-bottom:16px">Recommended: ${data.recommended_next_step}</p>` : ''}
      <div style="text-align:center;margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button type="button" class="dr-restart-btn" id="drRestartBtn">NEW SESSION</button>
        <button type="button" class="dr-btn dr-btn-primary" id="drEngageBtn">VIEW PROGRAMS</button>
      </div>`;
    if (!data && rawFallback) {
      const pre = document.createElement('pre');
      pre.style.cssText = 'font-size:11px;color:var(--dr-muted);white-space:pre-wrap';
      pre.textContent = rawFallback.substring(0, 800);
      wrap.insertBefore(pre, wrap.firstChild);
    }
    area.appendChild(wrap);
    $('drRestartBtn')?.addEventListener('click', () => resetGameUi());
    $('drEngageBtn')?.addEventListener('click', () => {
      window.location.hash = 'engage';
      if (typeof navigateToView === 'function') navigateToView('engage');
    });
    area.scrollTop = area.scrollHeight;
  }

  function renderError(msg) {
    const area = $('drSignalArea');
    const err = document.createElement('div');
    err.style.cssText = 'padding:16px;color:var(--dr-danger);font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap';
    err.textContent = `ERROR\n${msg || 'Unknown error'}`;
    area.appendChild(err);
  }

  function showGateOnly() {
    show($('drGate'));
    hide($('drSetup'));
    hide($('drApp'));
    const input = $('drTokenInput');
    if (input && sessionToken) input.value = sessionToken;
  }

  function onViewActive() {
    apiBase = getApiBase();
    readTokenFromUrl();
    showGateOnly();
    if (sessionToken && apiBase) {
      onValidateToken().catch(() => showGateOnly());
    }
  }

  function bindUi() {
    $('drValidateBtn')?.addEventListener('click', () => onValidateToken());
    $('drTokenInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') onValidateToken();
    });
    $('drStartBtn')?.addEventListener('click', onStartSetup);
    $('drBuyBtn')?.addEventListener('click', () => {
      window.location.hash = 'engage';
      if (typeof navigateToView === 'function') navigateToView('engage');
    });
  }

  window.DecisionRoom = { onViewActive, readTokenFromUrl };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindUi);
  } else {
    bindUi();
  }
})();
