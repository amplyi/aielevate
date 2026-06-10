

const topDomainProfiles = {
  finance: {title:'Executive Capital Decisions',copy:'Choose the enterprise environment where reasoning, ownership, and accountability must remain visible under capital pressure.',liveLabel:'Discuss this cockpit',chip:'Executive Capital Decisions',stateLabel:'Capital decision environment',stateTitle:'Make capital reasoning, ownership continuity, and intervention thresholds visible before exposure escalates.',stateCopy:'EDMP helps finance teams preserve how capital decisions, scenario shifts, and ownership changes evolve over time.',pills:['Capital logic preserved','Scenario shifts linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['CFO','Finance Director','FP&A Lead','Treasury Owner'],insight:'Relevant to capital allocation, forecast discipline, scenario pressure, and board defensibility.'},
  sales: {title:'Commercial Decision Flow',copy:'Choose the enterprise environment where commercial reasoning, sponsor movement, and accountable next-step logic must remain visible under pressure.',liveLabel:'Discuss this cockpit',chip:'Commercial Decision Flow',stateLabel:'Commercial decision environment',stateTitle:'Make stalled deals, sponsor gaps, and next-step ownership visible before revenue slips.',stateCopy:'EDMP helps commercial teams preserve how account pressure, intervention decisions, and ownership shifts evolve over time.',pills:['Commercial logic preserved','Stakeholder movement linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['CRO','VP Sales','Commercial Director','Strategic Account Owner'],insight:'Relevant to pipeline discipline, sponsor pressure, intervention timing, and revenue accountability.'},
  governance: {title:'AI Decision Oversight',copy:'Choose the enterprise environment where reasoning, ownership, and accountability must remain visible under pressure.',liveLabel:'Discuss this cockpit',chip:'AI Decision Oversight',stateLabel:'Oversight environment',stateTitle:'Make decision logic, ownership, and control trace visible before failure.',stateCopy:'EDMP allows governance teams to preserve how policy exceptions, evidence gaps, control issues, and remediation paths evolve over time.',pills:['Control logic preserved','Evidence linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['AI Governance Lead','Risk Owner','Control Owner','Compliance Sponsor'],insight:'AI oversight, control traceability, evidence posture, board defensibility, intervention logic, and decision accountability.'},
  recruitment: {title:'Talent & Hiring Decisions',copy:'Choose the enterprise environment where hiring reasoning, ownership, and accountability must remain visible under pressure.',liveLabel:'Discuss this cockpit',chip:'Talent & Hiring Decisions',stateLabel:'Talent decision environment',stateTitle:'Make role urgency, candidate flow, and hiring ownership visible before critical roles stall.',stateCopy:'EDMP helps hiring teams preserve how role pressure, interview decisions, and ownership shifts evolve over time.',pills:['Hiring logic preserved','Candidate movement linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['Talent Lead','Head of Recruitment','Hiring Manager','People Operations Sponsor'],insight:'Relevant to hiring leadership, candidate movement, decision speed, and accountability.'},
  legal: {title:'Legal Decision Defensibility',copy:'Choose the enterprise environment where legal reasoning, ownership, and defensibility must remain visible under pressure.',liveLabel:'Discuss this cockpit',chip:'Legal Decision Defensibility',stateLabel:'Legal decision environment',stateTitle:'Make matter pressure, deadline risk, and remediation ownership visible before issues escalate.',stateCopy:'EDMP helps legal teams preserve how matters, due dates, ownership, and intervention paths evolve over time.',pills:['Legal logic preserved','Evidence linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['General Counsel','Legal Operations Lead','Senior Counsel','Risk Owner'],insight:'Relevant to legal operations, matter visibility, deadline discipline, and board defensibility.'},
  procurement: {title:'Procurement & Vendor Decisions',copy:'Choose the enterprise environment where sourcing reasoning, ownership, and continuity accountability must remain visible under pressure.',liveLabel:'Discuss this cockpit',chip:'Procurement & Vendor Decisions',stateLabel:'Procurement decision environment',stateTitle:'Make supplier risk, sourcing pressure, and continuity ownership visible before disruption escalates.',stateCopy:'EDMP helps procurement teams preserve how supplier exposure, mitigation logic, and ownership shifts evolve over time.',pills:['Vendor logic preserved','Evidence linked to decision state','Ownership continuity visible','Intervention history retained'],fit:['CPO','Procurement Director','Sourcing Lead','Supply Continuity Owner'],insight:'Relevant to supplier continuity, sourcing pressure, mitigation logic, and accountability.'}
};

function renderTopDomainState(domainKey) {
  const data = topDomainProfiles[domainKey];
  if (!data) return;
  const byId = (id) => document.getElementById(id);
  if (byId('domainEntryTitle')) byId('domainEntryTitle').textContent = data.title;
  if (byId('domainEntryCopy')) byId('domainEntryCopy').textContent = data.copy;
  if (byId('domainLiveBtn')) byId('domainLiveBtn').textContent = data.liveLabel;
  if (byId('domainChip')) byId('domainChip').textContent = data.chip;
  if (byId('domainStateLabel')) byId('domainStateLabel').textContent = data.stateLabel;
  if (byId('domainStateTitle')) byId('domainStateTitle').textContent = data.stateTitle;
  if (byId('domainStateCopy')) byId('domainStateCopy').textContent = data.stateCopy;
  if (byId('domainStatePills')) byId('domainStatePills').innerHTML = data.pills.map(item => '<span class="state-pill">'+item+'</span>').join('');
  if (byId('domainFitChips')) byId('domainFitChips').innerHTML = data.fit.map(item => '<span class="fit-chip">'+item+'</span>').join('');
  if (byId('domainInsightCopy')) byId('domainInsightCopy').textContent = data.insight;
  document.querySelectorAll('.domain-switch-card[data-domain]').forEach(function(btn){
    btn.classList.toggle('is-active', btn.dataset.domain === domainKey);
  });
}


const cockpitData = [
  {
    id: 'finance',
    title: 'Executive Capital Decisions',
    domain: 'Executive Capital Decisions',
    image: 'assets/4.png',
    badge: 'FIN',
    description: 'An EDMP environment for preserving capital reasoning, ownership continuity, and accountable execution under financial pressure.',
    summary: 'A decision memory environment designed to preserve reasoning, ownership, and accountable follow-through under capital pressure.',
    facts: [
      ['Signal flow', 'Live'],
      ['Scenario views', '8'],
      ['Board framing', 'Ready'],
      ['Action pace', 'Fast']
    ],
    blocks: {
      signals: ['Cash exposure and forecast shifts', 'Margin compression and spend anomalies', 'Capital allocation pressure by scenario'],
      structure: ['KPI strip, scenario stack, risk posture, owner trail', 'Decision windows linked to thresholds', 'Outcome memory for board reviews'],
      actions: ['Escalate critical deviations', 'Launch finance-led action packages', 'Preserve decision history and rationale']
    }
  },
  {
    id: 'sales',
    title: 'Commercial Decision Flow',
    domain: 'Commercial Decision Flow',
    image: 'assets/2.png',
    badge: 'REV',
    description: 'An EDMP environment for preserving commercial reasoning, sponsor movement, and next-step accountability under revenue pressure.',
    summary: 'A decision memory environment designed to preserve reasoning, ownership, and accountable follow-through under commercial pressure.',
    facts: [
      ['Deal motion', 'Active'],
      ['Scenario views', '14'],
      ['Exec framing', 'Ready'],
      ['Next move', 'Queued']
    ],
    blocks: {
      signals: ['Stage stagnation and outreach silence', 'Executive sponsor gaps', 'Account momentum and meeting conversion'],
      structure: ['Pipeline board by pressure and likelihood', 'Relationship map with ownership', 'Next-action engine per stage'],
      actions: ['Prioritize executive intervention', 'Sequence follow-up plans', 'Track movement from signal to meeting to deal']
    }
  },
  {
    id: 'governance',
    title: 'AI Decision Oversight',
    domain: 'AI Decision Oversight',
    image: 'assets/1.png',
    badge: 'GOV',
    description: 'An EDMP environment for preserving AI oversight logic, evidence posture, and accountable remediation over time.',
    summary: 'A decision memory environment designed to preserve reasoning, ownership, and accountable follow-through under oversight pressure.',
    facts: [
      ['Control state', 'Tracked'],
      ['Evidence packs', '12'],
      ['Risk posture', 'Visible'],
      ['Review pace', 'Weekly']
    ],
    blocks: {
      signals: ['Model usage anomalies and policy exceptions', 'Control gaps and evidence shortfalls', 'Risk scoring by domain and owner'],
      structure: ['Control mapping and responsibility grid', 'Threshold-led escalation design', 'Board-safe evidence pack'],
      actions: ['Trigger reviews and attestations', 'Assign remediation owners', 'Keep unresolved governance matters visible']
    }
  },
  {
    id: 'recruitment',
    title: 'Talent & Hiring Decisions',
    domain: 'Talent & Hiring Decisions',
    image: 'assets/3.png',
    badge: 'TAL',
    description: 'An EDMP environment for preserving hiring reasoning, ownership continuity, and accountable follow-through under talent pressure.',
    summary: 'A decision memory environment designed to preserve reasoning, ownership, and accountable follow-through under hiring pressure.',
    facts: [
      ['Candidate flow', 'Live'],
      ['Shortlists', '6'],
      ['Hiring frame', 'Ready'],
      ['Response pace', '2.1d']
    ],
    blocks: {
      signals: ['Role urgency and pipeline gaps', 'Candidate quality and drop-off risk', 'Interview friction and response delays'],
      structure: ['Demand-supply board by urgency', 'Decision cues by stage', 'Ownership across recruiter and hiring lead'],
      actions: ['Prioritize outreach and interviews', 'Escalate stalled roles', 'Create visible next-step ownership']
    }
  },
  {
    id: 'legal',
    title: 'Legal Decision Defensibility',
    domain: 'Legal Decision Defensibility',
    image: 'assets/6.png',
    badge: 'LEG',
    description: 'An EDMP environment for preserving legal reasoning, precedent use, ownership continuity, and defensible follow-through.',
    summary: 'A decision memory environment designed to preserve reasoning, ownership, and accountable follow-through under legal pressure.',
    facts: [
      ['Matter intake', 'Live'],
      ['Scenario views', '5'],
      ['Counsel frame', 'Ready'],
      ['Deadline pace', 'Tight']
    ],
    blocks: {
      signals: ['Matter intake and deadline pressure', 'Priority shifts and unresolved obligations', 'Lessons learned and precedent relevance'],
      structure: ['Matter board with risk and due-date logic', 'History, lessons, team, and detail drawers', 'Escalation paths without clutter'],
      actions: ['Assign interventions and owners', 'Track updates against due dates', 'Export and preserve resolution history']
    }
  },
  {
    id: 'procurement',
    title: 'Procurement & Vendor Decisions',
    domain: 'Procurement & Vendor Decisions',
    image: 'assets/5.png',
    badge: 'SUP',
    description: 'For procurement leaders that need supplier pressure, sourcing options, contract timing, and continuity risk in one place.',
    summary: 'A procurement cockpit that makes supplier friction, continuity risk, and sourcing actions visible early enough to act.',
    facts: [
      ['Supplier pulse', 'Live'],
      ['Alternate paths', '9'],
      ['Risk framing', 'Ready'],
      ['Action pace', 'Fast']
    ],
    blocks: {
      signals: ['Supplier dependency and contract expiry', 'Lead-time risk and cost volatility', 'Single-point failures in sourcing'],
      structure: ['Supplier board by continuity risk', 'Scenario view across alternatives', 'Action queue with owners and dates'],
      actions: ['Renegotiate or reroute sourcing', 'Escalate continuity threats', 'Protect savings and delivery continuity']
    }
  }
];

const caseData = {
  finance: {
    image: 'assets/4.png',
    summary: 'Finance leaders use the cockpit to structure exposure movement, forecast variance, and capital trade-offs into one stable decision stance.',
    metrics: [
      ['Scenario recovery', '+14%'],
      ['Liquidity clarity', '97%'],
      ['Board turnaround', '36h'],
      ['Capital actions', '11']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'Forecast deviations, liquidity pressure, and spend anomalies enter one qualified queue.'],
      ['🧱', 'Reasoning structured (PDE)', 'Signals are translated into thresholds, scenario options, cash implications, and owner-ready finance context.'],
      ['🧠', 'Decision memory created', 'Leadership chooses the financial stance, trade-off, and execution path with explicit board-ready trade-offs.'],
      ['⚙️', 'Execution trace monitored', 'Actions move into budget adjustment, controls, stakeholder communication, and monitoring.'],
      ['✅', 'Institutional memory retained', 'Finance gains faster response, cleaner ownership, and stronger board readiness.']
    ]
  },
  sales: {
    image: 'assets/2.png',
    summary: 'Commercial teams use the cockpit to track account pressure, relationship movement, and stalled opportunities before drift hardens into lost revenue.',
    metrics: [
      ['Pipeline regained', '28%'],
      ['Executive interventions', '17'],
      ['Stakeholders mapped', '49'],
      ['Cycle time reduced', '31%']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'Silence, stage delays, sponsor gaps, and account shifts surface as commercial signals.'],
      ['🧱', 'Reasoning structured (PDE)', 'The team maps pressure, stakeholder gaps, buying intent, and executive access by account.'],
      ['🧠', 'Decision memory created', 'Sales decides where to intervene, which leaders should engage, and what commercial posture to take.'],
      ['⚙️', 'Execution trace monitored', 'Outreach, follow-up, and account actions move forward with ownership.'],
      ['✅', 'Institutional memory retained', 'Priority deals regain movement and commercial focus becomes measurable.']
    ]
  },
  governance: {
    image: 'assets/1.png',
    summary: 'Governance teams use the cockpit to make AI control pressure visible and link risk to named ownership, evidence, and remediation action.',
    metrics: [
      ['Controls linked', '36'],
      ['Policy drift', '-42%'],
      ['Review speed', '+39%'],
      ['Traceability', '96%']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'Usage exceptions, policy events, evidence gaps, and unresolved control issues are captured as governance signals.'],
      ['🧱', 'Reasoning structured (PDE)', 'Signals are grouped by model, owner, risk type, evidence status, and control need.'],
      ['🧠', 'Decision memory created', 'Leaders determine control posture, remediation sequence, and escalation logic before drift spreads.'],
      ['⚙️', 'Execution trace monitored', 'Reviews, attestations, and remediation actions move through accountable owners.'],
      ['✅', 'Institutional memory retained', 'Governance becomes visible, calmer, and easier to defend at board level.']
    ]
  },
  recruitment: {
    image: 'assets/3.png',
    summary: 'Recruitment teams use the cockpit to align role pressure, candidate flow, and hiring action inside one execution view.',
    metrics: [
      ['Time to shortlist', '-34%'],
      ['Drop-off reduced', '21%'],
      ['Critical roles', '12'],
      ['Decision latency', '2.1d']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'Role demand, candidate fit, response lag, and interview friction are surfaced in one queue.'],
      ['🧱', 'Reasoning structured (PDE)', 'Supply and demand are organized by urgency, fit, hiring owner, and blocker type.'],
      ['🧠', 'Decision memory created', 'Recruiters and hiring leaders choose who to fast-track and where to intervene.'],
      ['⚙️', 'Execution trace monitored', 'Interviews, outreach, and assignments move with named owners and dates.'],
      ['✅', 'Institutional memory retained', 'Hiring flow becomes faster, more transparent, and more reliable.']
    ]
  },
  legal: {
    image: 'assets/8.png',
    summary: 'Legal operations use the cockpit to keep matters visible, deadlines protected, and responsibility connected from intake to closure.',
    metrics: [
      ['Matters resolved', '83'],
      ['Due misses', '-57%'],
      ['Lessons captured', '24'],
      ['Cycle time', '6.8d']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'New matters, escalations, and deadline-sensitive work enter one visible legal queue.'],
      ['🧱', 'Reasoning structured (PDE)', 'Context, precedent, owner logic, due dates, and priority posture are organized clearly.'],
      ['🧠', 'Decision memory created', 'Counsel or operations define stance, action package, and ownership.'],
      ['⚙️', 'Execution trace monitored', 'Tasks, updates, and communication proceed against visible obligation pressure.'],
      ['✅', 'Institutional memory retained', 'Resolution history improves and future handling gets stronger through memory.']
    ]
  },
  procurement: {
    image: 'assets/5.png',
    summary: 'Procurement leaders use the cockpit to act earlier on supplier risk, sourcing pressure, and continuity threats.',
    metrics: [
      ['Issues averted', '14'],
      ['Savings protected', '€1.1M'],
      ['Lead-time risk', '-26%'],
      ['Contract actions', '33']
    ],
    steps: [
      ['📡', 'Decision trigger captured', 'Supplier issues, contract deadlines, lead-time risk, and cost volatility enter the system.'],
      ['🧱', 'Reasoning structured (PDE)', 'Teams map continuity risk, sourcing alternatives, contract timing, and operational dependency.'],
      ['🧠', 'Decision memory created', 'Procurement chooses mitigation, renegotiation, or alternate sourcing routes.'],
      ['⚙️', 'Execution trace monitored', 'Supplier actions move forward through owners, dates, and communication paths.'],
      ['✅', 'Institutional memory retained', 'Continuity improves while cost and dependency pressure stay controlled.']
    ]
  }
};


const cockpitDepth = {
  finance: {
    overview: [['Primary pressure','Liquidity, forecast, capital posture'],['Ownership layer','CFO, FP&A, treasury'],['Execution horizon','24h to 90d'],['Escalation mode','Threshold-led']],
    metrics: [['Pressure index','72'],['Decision readiness','91%'],['Scenario count','08'],['Drift watch','Low']],
    activity: ['Forecast variance breached board threshold','Treasury owner confirmed contingency stance','Scenario pack refreshed for Monday board view'],
    chart: [58, 64, 61, 74, 68, 79],
    relevance: 'Built for finance leaders who need one operating surface for exposure, scenario movement, owner accountability, and board framing.'
  },
  sales: {
    overview: [['Primary pressure','Pipeline drag, stakeholder drift'],['Ownership layer','Revenue leadership, account owners'],['Execution horizon','Same week to quarter'],['Escalation mode','Deal-stage led']],
    metrics: [['Pressure index','67'],['Decision readiness','86%'],['Scenario count','14'],['Drift watch','Medium']],
    activity: ['Executive sponsor gap flagged on top account','Next action sequence updated across 3 stalled deals','Commercial posture shifted to intervention mode'],
    chart: [41, 53, 49, 57, 65, 71],
    relevance: 'Designed for revenue teams that need to make silence, relationship movement, and next-action discipline visible before revenue slips.'
  },
  governance: {
    overview: [['Primary pressure','Control gaps, evidence posture'],['Ownership layer','Risk, control owners, AI governance'],['Execution horizon','Weekly to quarterly'],['Escalation mode','Policy-led']],
    metrics: [['Pressure index','76'],['Decision readiness','89%'],['Scenario count','12'],['Drift watch','Elevated']],
    activity: ['Evidence trail refreshed for high-risk model use','Control exception linked to named remediation owner','Policy review queue reprioritized by risk tier'],
    chart: [62, 66, 71, 69, 74, 82],
    relevance: 'For organizations that need AI control pressure, evidence integrity, and remediation ownership visible without governance theatre.'
  },
  recruitment: {
    overview: [['Primary pressure','Role urgency, drop-off risk'],['Ownership layer','Talent lead, hiring manager'],['Execution horizon','2d to 6w'],['Escalation mode','Role criticality-led']],
    metrics: [['Pressure index','63'],['Decision readiness','88%'],['Scenario count','06'],['Drift watch','Low']],
    activity: ['Critical role moved into fast-track lane','Candidate quality signal improved after panel reset','Hiring manager response delay escalated'],
    chart: [49, 55, 52, 60, 57, 69],
    relevance: 'Created for hiring environments that need demand, candidate quality, and human judgment connected inside one accountable flow.'
  },
  legal: {
    overview: [['Primary pressure','Matter load, due-date risk'],['Ownership layer','Counsel, legal ops'],['Execution horizon','Same day to 30d'],['Escalation mode','Deadline-led']],
    metrics: [['Pressure index','70'],['Decision readiness','92%'],['Scenario count','05'],['Drift watch','Medium']],
    activity: ['Matter queue reprioritized by due-date exposure','Precedent note attached to high-risk item','Escalation owner confirmed for contract dispute'],
    chart: [54, 59, 65, 61, 73, 77],
    relevance: 'For legal teams that need matters, deadlines, precedents, and owner responsibility linked in one visible system.'
  },
  procurement: {
    overview: [['Primary pressure','Supplier continuity, cost volatility'],['Ownership layer','Procurement lead, supplier owner'],['Execution horizon','48h to 120d'],['Escalation mode','Continuity-led']],
    metrics: [['Pressure index','69'],['Decision readiness','87%'],['Scenario count','09'],['Drift watch','Medium']],
    activity: ['Alternate supplier path moved to ready state','Contract timing alert escalated to sourcing lead','Continuity watch shifted for single-source category'],
    chart: [46, 52, 58, 63, 60, 72],
    relevance: 'Helps procurement leaders act earlier on supplier friction, sourcing options, and continuity threats before they hit operations.'
  }
};

const caseDepth = {
  finance: {
    context: 'Forecast volatility above baseline across liquidity and margin views.',
    status: [['System confidence','High'],['Operational visibility','97%'],['Action maturity','Board-ready']],
    annotation: 'Capital posture review anchored to explicit trade-off framing.'
  },
  sales: {
    context: 'Stakeholder momentum is fragmenting across strategic accounts.',
    status: [['System confidence','Medium-high'],['Operational visibility','93%'],['Action maturity','Intervention active']],
    annotation: 'Executive sponsor paths reopened before opportunity stall hardened.'
  },
  governance: {
    context: 'Control pressure is rising where evidence trails remain incomplete.',
    status: [['System confidence','High'],['Operational visibility','96%'],['Action maturity','Remediation live']],
    annotation: 'Ownership and evidence remain linked through every remediation step.'
  },
  recruitment: {
    context: 'Critical roles are exposed to response lag and panel friction.',
    status: [['System confidence','High'],['Operational visibility','94%'],['Action maturity','Fast-track ready']],
    annotation: 'Hiring urgency stays visible without losing human judgment.'
  },
  legal: {
    context: 'Deadline-sensitive matters require tighter precedent-aware handling.',
    status: [['System confidence','High'],['Operational visibility','95%'],['Action maturity','Counsel aligned']],
    annotation: 'Matter history, responsibility, and due-date pressure remain connected.'
  },
  procurement: {
    context: 'Supplier dependency and continuity risk are rising across key categories.',
    status: [['System confidence','Medium-high'],['Operational visibility','92%'],['Action maturity','Mitigation running']],
    annotation: 'Alternative paths are visible before operational continuity slips.'
  }
};


const insights = [
  {
    id: 'story',
    title: 'The Billion-Dollar Prompt',
    tag: 'Category Note',
    image: 'assets/1.png',
    description: 'Who Really Controls the AI Economy?',
    detail: 'AI is now embedded in finance, energy, governance, and defense. This briefing examines who truly controls the AI economy.',
    type: 'story'
  },
  {
    id: 'doctrine',
    title: 'Why AI Increases Decision Drift',
    tag: 'Doctrine',
    image: 'assets/8.png',
    description: 'AI increased decision velocity. It did not increase decision accountability.',
    type: 'article',
    body: `
      <div class="overlay-meta"><span>Doctrine</span><span>EDMP</span></div>
      <h2>Why AI Increases Decision Drift</h2>
      <p>Organizations already preserve data, workflow, and AI output. They still do not preserve how meaningful decisions are formed, changed, and executed.</p>
      <p>EDMP closes that gap. It preserves decision lineage, reasoning structure, ownership continuity, and accountable follow-through across AI-assisted and human-led environments.</p>
      <p>Systems of record exist. Systems of decision memory do not. Reasoning should remain visible after execution begins.</p>
    `
  },
  {
    id: 'architecture',
    title: 'Why Decision Traceability Will Become a Board Requirement',
    tag: 'Governance Thesis',
    image: 'assets/7.png',
    description: 'Decision traceability will become a board requirement across multiple enterprise environments.',
    type: 'article',
    body: `
      <div class="overlay-meta"><span>Governance Thesis</span><span>EDMP</span></div>
      <h2>Why Decision Traceability Will Become a Board Requirement</h2>
      <p>A strong EDMP environment does not start from a different logic every time. It begins with one stable architecture: signal intake, PDE structure, decision memory, execution trace, and institutional memory.</p>
      <p>That consistency is what makes EDMP valuable across domains. Teams do not need to relearn how decisions are preserved and inspected. They only need the domain-specific signals, thresholds, and outputs adjusted for their environment.</p>
      <p>The result is a category-defining enterprise layer for preserving how organizations think.</p>
    `
  }
];

const navButtons = document.querySelectorAll('.nav-btn[data-view]');
const footerNavButtons = document.querySelectorAll('.nav-btn-link[data-view]');
const jumpButtons = document.querySelectorAll('.jump-btn');
const views = document.querySelectorAll('.view');

const insightDepth = {
  story: { priority: 'Category Note', why: 'Maps the power structures, paradoxes, and control points shaping the AI economy.' },
  doctrine: { priority: 'Doctrine', why: 'Explains why AI increases decision drift when organizations do not preserve reasoning.' },
  architecture: { priority: 'Governance Thesis', why: 'Shows why decision traceability will become a board requirement across domains.' }
};

const cockpitGrid = document.getElementById('cockpitGrid');
const caseTabs = document.getElementById('caseTabs');
const caseMobilePicker = document.getElementById('caseMobilePicker');
const insightGrid = document.getElementById('insightGrid');
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlayContent');
const closeOverlay = document.getElementById('closeOverlay');


const prefooterContent = {
  platform: {
    kicker: 'Platform',
    title: 'Turn decision-making into a persistent, accountable system',
    text: 'EDMP connects signals, reasoning, ownership, and execution into one continuous enterprise memory layer.',
    metrics: [['Decisions tracked','124'],['Active decision cycles','08'],['Governance visibility layers','06'],['Decision integrity status','Stable']],
    primaryLabel: 'Request Executive Briefing',
    primaryIntake: 'demo',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Executive%20Briefing%20Request&body=Hi%20AI%20Elevate%2C%0A%0AI%27d%20like%20to%20request%20an%20executive%20briefing.%0A%0AName%3A%0ACompany%3A%0AUse%20environment%3A%0A',
    secondaryLabel: 'Review the Architecture',
    secondaryView: 'insights'
  },
  library: {
    kicker: 'EDMP stack',
    title: 'A new enterprise layer for preserving how organizations think',
    text: 'EDMP, Cognitive Trace Architecture, EDM Protocol, PDE Method, and Decision Room operate as one enterprise layer.',
    metrics: [['EDMP','Platform'],['CTA','Reasoning engine'],['EDM Protocol','Governance standard'],['PDE','Operating logic']],
    primaryLabel: 'Explore EDMP',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20EDMP%20Inquiry&body=Hi%20AI%20Elevate%2C%0A%0AI%27d%20like%20to%20discuss%20EDMP.%0A%0AName%3A%0ACompany%3A%0AEnvironment%3A%0A',
    secondaryLabel: 'See Use Environments',
    secondaryView: 'cases'
  },
  cases: {
    kicker: 'Decision Room',
    title: 'Where decision lineage becomes visible',
    text: 'Inspect reasoning, monitor drift, track precedent, assign accountability, and preserve decision continuity over time.',
    metrics: [['Decision triggers','05'],['EDMP environments','06'],['Execution trace','Live'],['Institutional memory','Active']],
    primaryLabel: 'See EDMP in your environment',
    primaryIntake: 'demo',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20EDMP%20Environment%20Request&body=Hi%20AI%20Elevate%2C%0A%0AI%27d%20like%20to%20see%20EDMP%20in%20my%20environment.%0A%0AName%3A%0ACompany%3A%0AEnvironment%3A%0A',
    secondaryLabel: 'Review the Architecture',
    secondaryView: 'library'
  },
  insights: {
    kicker: 'Operating doctrine',
    title: 'Without decision memory, organizations repeat error at scale',
    text: 'A decision is not a moment. It is a memory-bearing object that evolves over time.',
    metrics: [['Doctrine','Live'],['Signal briefs','03'],['Board relevance','High'],['Category','EDMP']],
    primaryLabel: 'Discuss a Use Case',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Use%20Case%20Discussion&body=Hi%20AI%20Elevate%2C%0A%0AI%27d%20like%20to%20discuss%20a%20use%20case.%0A%0AName%3A%0ACompany%3A%0A',
    secondaryLabel: 'See EDMP in your environment',
    secondaryView: 'contact'
  },
  contact: {
    kicker: 'Final CTA',
    title: 'See EDMP in your environment',
    text: 'Review how Enterprise Decision Memory applies to your organization’s decision pressure, governance requirements, and operating model.',
    metrics: [['Inquiry path','Direct'],['Response mode','Human'],['Category','EDMP'],['Next step','Briefing']],
    primaryLabel: 'Request Executive Briefing',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Executive%20Briefing%20Request&body=Hi%20AI%20Elevate%2C%0A%0AI%27d%20like%20to%20review%20EDMP%20for%20my%20environment.%0A%0AName%3A%0ACompany%3A%0A',
    secondaryLabel: 'Review the Architecture',
    secondaryView: 'platform'
  }
};

function updatePrefooter(viewId) {
  const data = prefooterContent[viewId] || prefooterContent.platform;
  const kicker = document.getElementById('prefooterKicker');
  const title = document.getElementById('prefooterTitle');
  const text = document.getElementById('prefooterText');
  const metrics = document.getElementById('prefooterMetrics');
  const primary = document.getElementById('prefooterPrimary');
  const secondary = document.getElementById('prefooterSecondary');
  if (!kicker || !title || !text || !metrics || !primary || !secondary) return;
  kicker.textContent = data.kicker;
  title.textContent = data.title;
  text.textContent = data.text;
  metrics.innerHTML = data.metrics.map(([label, value]) => `
    <div class="prefooter-metric"><span>${label}</span><strong>${value}</strong></div>
  `).join('');
  primary.textContent = data.primaryLabel;
  primary.href = data.primaryHref;
  primary.dataset.openIntake = data.primaryIntake || 'demo';
  primary.dataset.source = `prefooter-${viewId}`;
  primary.dataset.intakeContext = data.title;
  secondary.textContent = data.secondaryLabel;
  secondary.dataset.view = data.secondaryView;
}

function moveLibraryOnlyBlocks() {
  return;
}

function getCockpitDomainLabel(domainKey) {
  const item = cockpitData.find(entry => entry.id === domainKey);
  if (item && item.domain) return item.domain;
  const profile = topDomainProfiles[domainKey];
  return profile ? profile.chip : '';
}

function navigateToDomain(domainKey) {
  if (!domainKey) return;
  showView('library');
  renderTopDomainState(domainKey);
  if (typeof selectCase === 'function') {
    selectCase(domainKey);
  }
  const switchCard = document.querySelector(`.domain-switch-card[data-domain="${domainKey}"]`);
  const cockpitCard = document.querySelector(`[data-cockpit="${domainKey}"]`);
  const target = cockpitCard || switchCard || document.getElementById('library');
  if (switchCard) {
    switchCard.classList.add('jump-focus');
    window.setTimeout(() => switchCard.classList.remove('jump-focus'), 1800);
  }
  if (target) {
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('jump-focus');
      window.setTimeout(() => target.classList.remove('jump-focus'), 1800);
    }, 60);
  }
  window.location.hash = 'library';
}
window.navigateToDomain = navigateToDomain;

function openDomainContactIntake(domainKey, source = 'library', context = 'Cockpit discussion') {
  const domain = getCockpitDomainLabel(domainKey);
  openOverlay(intakeFormHTML({ type: 'contact', domain, context, source }));
  window.setTimeout(() => enforceSelectContrast(overlayContent), 0);
}

let libraryRendered = false;

function ensureLibraryRendered() {
  if (libraryRendered) return;
  libraryRendered = true;
  renderLibrary();
}

function showView(viewId) {
  if (viewId === 'library') ensureLibraryRendered();

  views.forEach(view => view.classList.toggle('active-view', view.id === viewId));
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewId));
  footerNavButtons.forEach(btn => btn.classList.toggle('active-link', btn.dataset.view === viewId));
  updatePrefooter(viewId);

  moveLibraryOnlyBlocks();
  const decisionActivationShell = document.querySelector('.decision-activation-shell');
  if (decisionActivationShell) {
    decisionActivationShell.style.display = viewId === 'library' ? '' : 'none';
  }
  const trustStrip = document.querySelector('.trust-strip');
  if (trustStrip) {
    trustStrip.style.display = viewId === 'library' ? '' : 'none';
  }

  const target = document.getElementById(viewId);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

navButtons.forEach(btn => btn.addEventListener('click', () => { showView(btn.dataset.view); closeOverlay(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
footerNavButtons.forEach(btn => btn.addEventListener('click', () => { showView(btn.dataset.view); closeOverlay(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
jumpButtons.forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

document.querySelectorAll('[data-domain-jump]').forEach(btn => {
  btn.addEventListener('click', () => navigateToDomain(btn.dataset.domainJump));
});

document.addEventListener('click', (event) => {
  const jump = event.target.closest('[data-domain-jump]');
  if (!jump) return;
  event.preventDefault();
  navigateToDomain(jump.dataset.domainJump);
});

enforceSelectContrast(document);

function openOverlay(html) {
  overlayContent.innerHTML = html;
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeOverlayPanel() {
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  overlayContent.innerHTML = '';
  document.body.style.overflow = '';
}

let currentCaseId = 'governance';

const intakeTypeMeta = {
  demo: {
    label: 'Request Executive Briefing',
    subject: 'AI Elevate Demo Request',
    intro: 'Use the structured demo request below so AI Elevate can start from your operating pressure, domain, and timing.',
    button: 'Send executive briefing request'
  },
  contact: {
    label: 'Explore EDMP',
    subject: 'AI Elevate Inquiry',
    intro: 'Use the inquiry intake to describe the domain, operating challenge, and conversation you want to have with AI Elevate.',
    button: 'Send EDMP inquiry'
  }
};


function enforceSelectContrast(root = document) {
  const selects = root.querySelectorAll('select');
  selects.forEach(select => {
    const apply = () => {
      select.style.appearance = 'auto';
      select.style.opacity = '1';
      select.style.background = '#ffffff';
      select.style.backgroundColor = '#ffffff';
      select.style.color = '#0b1120';
      select.style.webkitTextFillColor = '#0b1120';
      select.style.border = '1px solid rgba(120,150,190,0.42)';
      select.style.colorScheme = 'light';
      select.style.fontWeight = '600';
      Array.from(select.options || []).forEach(option => {
        option.style.backgroundColor = '#0b1120';
        option.style.background = '#ffffff';
        option.style.color = '#0b1120';
        option.style.webkitTextFillColor = '#0b1120';
        option.style.fontWeight = '600';
        option.disabled = false;
      });
    };
    apply();
    ['focus','mousedown','click','change','input','mouseenter'].forEach(evt => select.addEventListener(evt, apply));
  });
}


function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, chr => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[chr]));
}

function buildDirectMailto(subject, body) {
  return `mailto:info@aielevate.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function intakeFormHTML(options = {}) {
  const type = options.type || 'contact';
  const meta = intakeTypeMeta[type] || intakeTypeMeta.contact;
  const domain = options.domain || '';
  const context = options.context || '';
  const source = options.source || 'site';
  const challengePlaceholder = type === 'demo'
    ? 'Describe the operating pressure, decision bottleneck, or cockpit you want to see live.'
    : 'Describe the challenge, cockpit interest, or reason for contacting AI Elevate.';
  return `
    <div class="intake-form-shell">
      <div class="form-meta">${meta.label} · EDMP intake</div>
      <h2>${type === 'demo' ? 'Request an executive briefing' : 'Start an EDMP conversation'}</h2>
      <p>${meta.intro}</p>
      <div class="intake-helper">The form stays local and opens a prefilled email draft to <strong>info@aielevate.xyz</strong>. This keeps the experience usable today and ready for future backend or CRM connection.</div>
      <form id="intakeForm" data-intake-form="${type}" data-source="${escapeHtml(source)}" data-context="${escapeHtml(context)}">
        <div class="form-grid">
          <div class="field">
            <label for="intakeName">Name</label>
            <input id="intakeName" name="name" type="text" placeholder="Your name" required>
          </div>
          <div class="field">
            <label for="intakeCompany">Company</label>
            <input id="intakeCompany" name="company" type="text" placeholder="Company name" required>
          </div>
          <div class="field">
            <label for="intakeEmail">Work email</label>
            <input id="intakeEmail" name="email" type="email" placeholder="name@company.com" required>
          </div>
          <div class="field">
            <label for="intakeRole">Role / function</label>
            <input id="intakeRole" name="role" type="text" placeholder="CFO, COO, Governance Lead..." required>
          </div>
          <div class="field">
            <label for="intakeDomain">Primary domain of interest</label>
            <select id="intakeDomain" name="domain" required>
              <option value="">Select a domain</option>
              ${cockpitData.map(item => `<option value="${item.domain}" ${item.domain === domain ? 'selected' : ''}>${item.domain}</option>`).join('')}
              <option value="Cross-domain">Cross-domain / multiple functions</option>
            </select>
          </div>
          <div class="field">
            <label for="intakeReason">${type === 'demo' ? 'What do you want to see?' : 'Reason for contacting'}</label>
            <select id="intakeReason" name="reason" required>
              ${type === 'demo' ? `
                <option value="Live cockpit walkthrough">Live cockpit walkthrough</option>
                <option value="Use-case specific demo">Use-case specific demo</option>
                <option value="Case journey review">Case journey review</option>
                <option value="Executive operating model review">Executive operating model review</option>
              ` : `
                <option value="Discuss a cockpit">Discuss a cockpit</option>
                <option value="Explore a use case">Explore a use case</option>
                <option value="Partnership / design inquiry">Partnership / design inquiry</option>
                <option value="General inquiry">General inquiry</option>
              `}
            </select>
          </div>
          <div class="field field-full">
            <label for="intakeChallenge">Main challenge / use case</label>
            <textarea id="intakeChallenge" name="challenge" placeholder="${escapeHtml(challengePlaceholder)}" required></textarea>
          </div>
          <div class="field">
            <label for="intakeTiming">Timing</label>
            <select id="intakeTiming" name="timing">
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="This quarter">This quarter</option>
              <option value="Exploring / no fixed timing">Exploring / no fixed timing</option>
            </select>
          </div>
          <div class="field">
            <label for="intakeVisibility">Who needs visibility?</label>
            <input id="intakeVisibility" name="visibility" type="text" placeholder="Board, leadership team, operators, risk owners...">
          </div>
        </div>
        <div class="inline-form-actions">
          <button class="btn btn-primary btn-cta" type="submit">${meta.button}</button>
          <a class="btn btn-secondary" href="${buildDirectMailto(meta.subject, 'Hi AI Elevate,\n\nI would like to continue the conversation.\n')}">Use direct email instead</a>
        </div>
        <div class="form-disclaimer">Source: ${escapeHtml(source)}${context ? ` · Context: ${escapeHtml(context)}` : ''}</div>
      </form>
    </div>
  `;
}

function openIntakeFromTrigger(trigger) {
  const type = trigger.dataset.openIntake || 'contact';
  const domain = trigger.dataset.domain || '';
  const context = trigger.dataset.intakeContext || trigger.textContent.trim();
  const source = trigger.dataset.source || 'site';
  openOverlay(intakeFormHTML({ type, domain, context, source }));
  window.setTimeout(() => enforceSelectContrast(overlayContent), 0);
}

function submitIntakeForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const type = form.dataset.intakeForm || 'contact';
  const meta = intakeTypeMeta[type] || intakeTypeMeta.contact;
  const lines = [
    'Hi AI Elevate,',
    '',
    type === 'demo' ? 'I would like to request a demo.' : 'I would like to get in touch.',
    '',
    `Name: ${data.name || ''}`,
    `Company: ${data.company || ''}`,
    `Work email: ${data.email || ''}`,
    `Role / function: ${data.role || ''}`,
    `Primary domain: ${data.domain || ''}`,
    `${type === 'demo' ? 'What I want to see' : 'Reason for contacting'}: ${data.reason || ''}`,
    `Main challenge / use case: ${data.challenge || ''}`,
    `Timing: ${data.timing || ''}`,
    `Who needs visibility: ${data.visibility || ''}`,
    `Source: ${form.dataset.source || ''}`,
    `Context: ${form.dataset.context || ''}`
  ];
  window.location.href = buildDirectMailto(meta.subject, lines.join('\n'));
}

closeOverlay.addEventListener('click', closeOverlayPanel);
overlay.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeOverlayPanel();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) closeOverlayPanel();
});

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-intake]');
  if (!trigger) return;
  event.preventDefault();
  openIntakeFromTrigger(trigger);
});

overlayContent.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-intake-form]');
  if (!form) return;
  event.preventDefault();
  submitIntakeForm(form);
});

function miniBars(values) {
  const max = Math.max(...values, 1);
  return values.map((value, index) => `
    <div class="mini-bar-row">
      <span>W${index + 1}</span>
      <em><i style="width:${Math.max(14, (value / max) * 100)}%"></i></em>
      <strong>${value}</strong>
    </div>
  `).join('');
}

function cockpitOverlay(item) {
  const depth = cockpitDepth[item.id];
  return `
    <div class="overlay-meta"><span>Domain</span><span>EDMP environment</span><span>Monitoring active</span></div>
    <h2>${item.title}</h2>
    <p>${item.summary}</p>
    <div class="embed-shell overlay-hero-image" style="margin-top:16px;"><img src="${item.image}" alt="${item.title}" style="width:100%;max-height:320px;object-fit:cover;display:block;"></div>
    <div class="overlay-depth-shell">
      <div class="overlay-block overlay-overview-block">
        <div class="overlay-block-kicker">System overview</div>
        <div class="overlay-overview-grid">
          ${depth.overview.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}
        </div>
      </div>
      <div class="overlay-metrics-strip">
        ${depth.metrics.map(([label, value]) => `<div class="overlay-metric-pill"><span>${label}</span><strong>${value}</strong></div>`).join('')}
      </div>
      <div class="overlay-grid overlay-grid-v4">
        <div class="overlay-block">
          <div class="overlay-block-kicker">System overview</div>
          <h3>What enters this environment</h3>
          <ul>${item.blocks.signals.map(v => `<li>${v}</li>`).join('')}</ul>
        </div>
        <div class="overlay-block">
          <div class="overlay-block-kicker">Trace posture</div>
          <h3>How pressure is organized</h3>
          <ul>${item.blocks.structure.map(v => `<li>${v}</li>`).join('')}</ul>
        </div>
        <div class="overlay-block">
          <div class="overlay-block-kicker">Governance posture</div>
          <h3>What moves next</h3>
          <ul>${item.blocks.actions.map(v => `<li>${v}</li>`).join('')}</ul>
        </div>
        <div class="overlay-block overlay-feed-block">
          <div class="overlay-block-kicker">Mini activity feed</div>
          <h3>Live system movement</h3>
          <div class="overlay-activity-feed">
            ${depth.activity.map((entry, index) => `<div><span>0${index + 1}</span><strong>${entry}</strong></div>`).join('')}
          </div>
        </div>
        <div class="overlay-block overlay-chart-block">
          <div class="overlay-block-kicker">Mini visualization</div>
          <h3>Pressure movement preview</h3>
          <div class="mini-bars">${miniBars(depth.chart)}</div>
        </div>
        <div class="overlay-block overlay-relevance-block">
          <div class="overlay-block-kicker">Domain relevance</div>
          <h3>Where this cockpit fits</h3>
          <p>${depth.relevance}</p>
        </div>
      </div>
      <div class="overlay-cta-row">
        <button class="btn btn-primary btn-cta" data-open-intake="demo" data-source="cockpit-overlay" data-domain="${item.domain}" data-intake-context="${item.title} demo">See the system live</button>
        <button class="btn btn-secondary" data-open-intake="contact" data-source="cockpit-overlay" data-domain="${item.domain}" data-intake-context="${item.title} discussion">Discuss this cockpit</button>
        <span class="overlay-cta-note">Use a structured intake to carry the domain, challenge, and timing into the next conversation.</span>
      </div>
    </div>
  `;
}

function renderLibrary() {
  cockpitGrid.innerHTML = cockpitData.map((item, index) => `
    <article class="domain-card glass" data-cockpit="${item.id}">
      <div class="domain-visual">
        <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async">
        <div class="holo-icon"><span>${item.badge}</span></div>
      </div>
      <div class="domain-content">
        <div class="domain-header">
          <span class="card-tag">${item.domain}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <div class="domain-stats">
          ${item.facts.map(([label, value]) => `
            <div class="domain-stat">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `).join('')}
        </div>
        <div class="domain-actions">
          <span class="domain-index">0${index + 1} / 06</span>
          <button class="card-link" data-cockpit-open="${item.id}">View cockpit logic</button>
        </div>
      </div>
    </article>
  `).join('');

  cockpitGrid.querySelectorAll('.domain-card').forEach(card => {
    const item = cockpitData.find(c => c.id === card.dataset.cockpit);
    if (!item) return;
    card.addEventListener('click', (event) => {
      if (event.target.closest('button')) return;
      openOverlay(cockpitOverlay(item));
    });
  });

  cockpitGrid.querySelectorAll('[data-cockpit-open]').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const item = cockpitData.find(c => c.id === button.dataset.cockpitOpen);
      if (!item) return;
      openOverlay(cockpitOverlay(item));
    });
  });
}

function renderCases() {
  caseTabs.innerHTML = cockpitData.map((item, index) => `
    <button class="case-tab" role="tab" aria-selected="false" data-case-tab="${item.id}">
      <span class="case-tab-index">0${index + 1}</span>
      <span class="case-tab-copy">
        <strong>${item.domain}</strong>
        <small>${item.title}</small>
      </span>
    </button>
  `).join('');

  if (caseMobilePicker) {
    caseMobilePicker.innerHTML = cockpitData.map(item => `<option value="${item.id}">${item.domain}</option>`).join('');
    enforceSelectContrast(document);
    caseMobilePicker.addEventListener('change', () => selectCase(caseMobilePicker.value));
  }

  caseTabs.querySelectorAll('[data-case-tab]').forEach(button => {
    button.addEventListener('click', () => selectCase(button.dataset.caseTab));
  });

  selectCase('governance');
}

let caseStageInterval;
function selectCase(caseId) {
  const data = caseData[caseId];
  const depth = caseDepth[caseId];
  if (!data) return;
  currentCaseId = caseId;

  if (caseMobilePicker) caseMobilePicker.value = caseId;

  document.querySelectorAll('.case-tab').forEach(tab => {
    const active = tab.dataset.caseTab === caseId;
    tab.classList.toggle('is-selected', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  document.getElementById('journeyTitle').textContent = cockpitData.find(c => c.id === caseId)?.title || caseId;
  document.getElementById('journeySummary').textContent = data.summary;
  const imageEl = document.getElementById('journeyImage');
  imageEl.src = data.image;
  imageEl.alt = `${caseId} journey visual`;

  document.getElementById('journeyMetrics').innerHTML = data.metrics.map(([label, value]) => `
    <div class="metric-box">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('');

  const journeyContext = document.getElementById('journeyContext');
  if (journeyContext) {
    journeyContext.innerHTML = `
      <span class="journey-context-kicker">Decision context note</span>
      <strong>${depth.context}</strong>
      <small>${depth.annotation}</small>
    `;
  }

  const journeyStatus = document.getElementById('journeyStatus');
  if (journeyStatus) {
    journeyStatus.innerHTML = depth.status.map(([label, value]) => `
      <div class="journey-status-pill"><span>${label}</span><strong>${value}</strong></div>
    `).join('');
  }

  document.getElementById('flowchartSteps').innerHTML = data.steps.map(([icon, title, description], index) => `
    <div class="flow-step ${index === 0 ? 'is-live' : ''}">
      <div class="step-icon">${icon}</div>
      <span class="card-tag">${index < 4 ? 'Signal arrow active' : 'Outcome locked'}</span>
      <h4>${title}</h4>
      <p>${description}</p>
      <div class="step-state">${index === 2 ? 'Decision confidence visible' : index === 3 ? 'Owner actions running' : 'State monitored'}</div>
    </div>
  `).join('');

  const currentDomain = cockpitData.find(c => c.id === caseId)?.domain || caseId;
  const caseDemoBtn = document.getElementById('caseDemoBtn');
  const caseInquiryBtn = document.getElementById('caseInquiryBtn');
  if (caseDemoBtn) {
    caseDemoBtn.dataset.domain = currentDomain;
    caseDemoBtn.dataset.intakeContext = `${currentDomain} case journey demo`;
  }
  if (caseInquiryBtn) {
    caseInquiryBtn.dataset.domain = currentDomain;
    caseInquiryBtn.dataset.intakeContext = `${currentDomain} case journey inquiry`;
  }

  if (caseStageInterval) clearInterval(caseStageInterval);
  const steps = Array.from(document.querySelectorAll('#flowchartSteps .flow-step'));
  let activeIndex = 0;
  caseStageInterval = setInterval(() => {
    steps.forEach((step, index) => step.classList.toggle('is-live', index === activeIndex));
    activeIndex = (activeIndex + 1) % steps.length;
  }, 2200);
}

function renderInsights() {
  insightGrid.innerHTML = insights.map(item => {
    const depth = insightDepth[item.id] || { priority: 'Insight', why: 'Strategic context.' };
    return `
    <article class="insight-card glass" data-insight="${item.id}">
      <div class="card-media"><img src="${item.image}" alt="${item.title}"></div>
      <div class="card-body">
        <span class="card-tag">${item.tag}</span>
        <div class="insight-priority">${depth.priority}</div>
        <h3>${item.title}</h3>
        <p>${item.id === 'story' ? (item.detail || item.description) : item.description}</p>
        <div class="insight-why">Why it matters: ${depth.why}</div>
        <button class="card-link">Open briefing</button>
      </div>
    </article>
  `}).join('');

  insightGrid.querySelectorAll('[data-insight]').forEach(card => {
    card.addEventListener('click', () => {
      const item = insights.find(entry => entry.id === card.dataset.insight);
      if (!item) return;

      if (item.type === 'story') {
        const localMode = window.location.protocol === 'file:';
        openOverlay(`
          <div class="overlay-meta"><span>Executive story</span><span>AI Elevate</span></div>
          <h2>The Billion-Dollar Prompt</h2>
          <p>Who Really Controls the AI Economy?</p><p>In 2026, the global economy is no longer defined by capital alone, but by the ability to deploy intelligence at scale. Artificial intelligence has moved beyond experimentation — it is now embedded in decision-making across finance, energy, governance, and defense. This story examines the forces, paradoxes, and power structures that will determine who truly controls the AI economy — and what is at stake for the rest of the world.</p>
          <div class="embed-shell">
            ${localMode ? `
              <div class="local-fallback">
                <h3>Host this site to view the embedded story</h3>
                <p>You are opening this build from a local file path. To view the full embedded story, run it from a local server or hosted environment.</p>
              </div>
            ` : `<iframe src="https://gamma.app/embed/82magnbutrz9ak0" title="The Billion-Dollar Prompt" allowfullscreen loading="lazy"></iframe>`}
          </div>
          <div class="overlay-cta-row">
            <button class="btn btn-primary btn-cta" data-open-intake="demo" data-source="insight-story" data-intake-context="Executive story walkthrough">See EDMP in your environment</button>
            <button class="btn btn-secondary" data-open-intake="contact" data-source="insight-story" data-intake-context="Executive story discussion">Discuss a Use Case</button>
            <span class="overlay-cta-note">Translate the story into a cockpit view, a use case, or a domain conversation.</span>
          </div>
        `);
      } else {
        openOverlay(`${item.body}
          <div class="overlay-cta-row">
            <button class="btn btn-primary btn-cta" data-open-intake="contact" data-source="insight-article" data-intake-context="${item.title} discussion">Discuss a Use Case</button>
            <button class="btn btn-secondary" data-open-intake="demo" data-source="insight-article" data-intake-context="${item.title} translated into a cockpit">Review the Architecture</button>
            <span class="overlay-cta-note">Use the structured intake to connect the narrative to your environment, domain, and next step.</span>
          </div>`);
      }
    });
  });
}


function applyHardDomFixes() {
  const storyTitle = 'The Billion-Dollar Prompt';
  const storyDesc = 'Who Really Controls the AI Economy?';
  const storyDetail = 'AI is now embedded across finance, energy, governance, and defense.';
  document.querySelectorAll('.insight-card[data-insight="story"]').forEach(card => {
    const tag = card.querySelector('.card-tag');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    const why = card.querySelector('.insight-why');
    const link = card.querySelector('.card-link');
    if (tag) tag.textContent = 'Category Note';
    if (title) title.textContent = storyTitle;
    if (desc) desc.textContent = `${storyDesc}`;
    if (why) why.textContent = 'Why it matters: A board-level briefing on power, control, and the AI economy.';
    if (link) link.textContent = 'Open briefing';
    card.setAttribute('data-insight-title', storyTitle);
    card.innerHTML = card.innerHTML.replace(/Gamma Story/gi, storyTitle).replace(/gamma story/gi, storyTitle).replace(/gamma/gi, storyTitle);
  });

  document.querySelectorAll('.footer-chip-btn[data-domain-jump]').forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.setAttribute('role', 'link');
    btn.setAttribute('tabindex', '0');
    const fire = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      navigateToDomain(btn.dataset.domainJump);
      return false;
    };
    btn.onclick = fire;
    btn.addEventListener('click', fire, true);
    btn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') fire(event);
    });
  });

  document.querySelectorAll('.library-only-block').forEach(block => {
    block.style.display = document.getElementById('library')?.classList.contains('active-view') ? '' : 'none';
  });

  enforceSelectContrast(document);
}

const platformPulseStates = [
  ['126 decisions tracked', 'Decision trace refreshed 11s ago', 'High', 'Fast'],
  ['132 active cycles', 'Cross-domain memory scan refreshed 9s ago', 'Elevated', 'Fast'],
  ['128 preserved traces', 'Decision posture synchronized 7s ago', 'High', 'Controlled']
];
let pulseIndex = 0;
setInterval(() => {
  pulseIndex = (pulseIndex + 1) % platformPulseStates.length;
  const [value, sub, readiness, execution] = platformPulseStates[pulseIndex];
  const pulse = document.getElementById('platformPulseValue');
  const pulseSub = document.getElementById('platformPulseSub');
  const readinessEl = document.getElementById('depthReadiness');
  const executionEl = document.getElementById('depthExecution');
  if (pulse) pulse.textContent = value;
  if (pulseSub) pulseSub.textContent = sub;
  if (readinessEl) readinessEl.textContent = readiness;
  if (executionEl) executionEl.textContent = execution;
}, 2800);


const startupSplash = document.getElementById('startupSplash');
if (startupSplash) {
  window.setTimeout(() => {
    startupSplash.classList.add('is-hidden');
  }, 3000);
}

renderCases();
renderInsights();
applyHardDomFixes();

updatePrefooter('platform');


document.querySelectorAll('.domain-switch-card[data-domain]').forEach(function(btn){
  btn.addEventListener('click', function(){
    renderTopDomainState(this.dataset.domain);
  });
});
renderTopDomainState('governance');



/* V6.2 Decision Activation Layer */
const DECISION_STORAGE_KEY = 'aielevate-decision-activation-v62';
let decisionState = { items: [], activeId: null };

function getCurrentTopDomainKey() {
  const activeBtn = document.querySelector('.domain-switch-card.is-active[data-domain]');
  return activeBtn ? activeBtn.dataset.domain : 'governance';
}

function getCurrentTopDomainProfile() {
  if (typeof topDomainProfiles !== 'undefined') {
    return topDomainProfiles[getCurrentTopDomainKey()] || topDomainProfiles.governance;
  }
  return null;
}

function loadDecisionState() {
  try {
    const raw = window.localStorage.getItem(DECISION_STORAGE_KEY);
    if (raw) decisionState = JSON.parse(raw);
  } catch (e) {}
  if (!decisionState || !Array.isArray(decisionState.items)) {
    decisionState = { items: [], activeId: null };
  }
}

function saveDecisionState() {
  try {
    window.localStorage.setItem(DECISION_STORAGE_KEY, JSON.stringify(decisionState));
  } catch (e) {}
}

function slugifyValue(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function makeSignalId() {
  return 'sig-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}

function createSignalFromPill(pillEl) {
  const text = (pillEl.textContent || '').trim();
  if (!text) return;

  const domainKey = getCurrentTopDomainKey();
  const profile = getCurrentTopDomainProfile();
  const existing = decisionState.items.find(item => item.domainKey === domainKey && item.title === text);
  if (existing) {
    openDecisionDrawer(existing.id);
    return;
  }

  const dueDate = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  const item = {
    id: makeSignalId(),
    title: text,
    why: profile ? profile.copy + ' This signal is now visible for structured follow-through.' : 'Signal created from cockpit state.',
    owner: (profile && profile.fit && profile.fit[0]) ? profile.fit[0] : '',
    priority: 'High',
    dueDate,
    status: 'signal',
    domain: profile ? profile.chip : 'AI Governance',
    domainKey
  };
  decisionState.items.unshift(item);
  decisionState.activeId = item.id;
  saveDecisionState();
  renderDecisionBoards();
  refreshCreatedPills();
  openDecisionDrawer(item.id);
}

function getDecisionItem(id) {
  return decisionState.items.find(item => item.id === id);
}

function renderDecisionBoards() {
  const liveBoard = document.getElementById('liveSignalBoard');
  const executionBoard = document.getElementById('executionBoard');
  const pendingCount = document.getElementById('pendingSignalCount');
  const executionCount = document.getElementById('executionSignalCount');
  if (!liveBoard || !executionBoard) return;

  const pending = decisionState.items.filter(item => item.status !== 'execution');
  const execution = decisionState.items.filter(item => item.status === 'execution');

  if (pendingCount) pendingCount.textContent = `${pending.length} live`;
  if (executionCount) executionCount.textContent = `${execution.length} active`;

  const cardHTML = (item, isExecution=false) => `
    <button class="signal-card ${isExecution ? 'is-execution' : ''}" data-signal-id="${item.id}">
      <div class="signal-card-top">
        <div class="signal-card-title">${item.title}</div>
        <span class="signal-badge ${isExecution ? 'blue' : ''}">${isExecution ? 'Execution trace monitored' : item.priority}</span>
      </div>
      <div class="signal-card-meta">
        <span><strong>Domain:</strong> ${item.domain}</span>
        <span><strong>Owner:</strong> ${item.owner || 'Unassigned'}</span>
        <span><strong>Due:</strong> ${item.dueDate || 'Open'}</span>
      </div>
    </button>
  `;

  liveBoard.classList.toggle('empty-state', pending.length === 0);
  executionBoard.classList.toggle('empty-state', execution.length === 0);

  liveBoard.innerHTML = pending.length ? pending.map(item => cardHTML(item, false)).join('') : '<div class="board-empty-copy">Click a state pill above to create a signal.</div>';
  executionBoard.innerHTML = execution.length ? execution.map(item => cardHTML(item, true)).join('') : '<div class="board-empty-copy">Activated decisions will appear here in blue.</div>';

  [...liveBoard.querySelectorAll('[data-signal-id]'), ...executionBoard.querySelectorAll('[data-signal-id]')].forEach(btn => {
    btn.addEventListener('click', () => openDecisionDrawer(btn.dataset.signalId));
  });
}

function refreshCreatedPills() {
  const currentDomain = getCurrentTopDomainKey();
  const titles = new Set(decisionState.items.filter(item => item.domainKey === currentDomain).map(item => item.title));
  document.querySelectorAll('#domainStatePills .state-pill').forEach(pill => {
    pill.classList.toggle('is-created', titles.has((pill.textContent || '').trim()));
  });
}

function openDecisionDrawer(signalId) {
  const item = getDecisionItem(signalId);
  const drawer = document.getElementById('decisionDrawer');
  if (!item || !drawer) return;
  decisionState.activeId = signalId;

  const byId = id => document.getElementById(id);
  if (byId('drawerSignalTitle')) byId('drawerSignalTitle').textContent = item.title;
  if (byId('drawerSignalWhy')) byId('drawerSignalWhy').textContent = item.why;
  if (byId('drawerOwner')) byId('drawerOwner').value = item.owner || '';
  if (byId('drawerPriority')) byId('drawerPriority').value = item.priority || 'Medium';
  if (byId('drawerDueDate')) byId('drawerDueDate').value = item.dueDate || '';
  if (byId('drawerStatus')) byId('drawerStatus').textContent = item.status === 'execution' ? 'Execution trace monitored' : 'Signal';
  if (byId('drawerDomain')) byId('drawerDomain').textContent = item.domain || '';
  drawer.classList.remove('hidden');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDecisionDrawer() {
  const drawer = document.getElementById('decisionDrawer');
  if (!drawer) return;
  drawer.classList.add('hidden');
  drawer.setAttribute('aria-hidden', 'true');
}

function syncActiveSignalFromDrawer() {
  const item = getDecisionItem(decisionState.activeId);
  if (!item) return null;
  const byId = id => document.getElementById(id);
  item.owner = byId('drawerOwner') ? byId('drawerOwner').value : item.owner;
  item.priority = byId('drawerPriority') ? byId('drawerPriority').value : item.priority;
  item.dueDate = byId('drawerDueDate') ? byId('drawerDueDate').value : item.dueDate;
  saveDecisionState();
  renderDecisionBoards();
  return item;
}

function activateCurrentDecision() {
  const item = syncActiveSignalFromDrawer();
  if (!item) return;
  item.status = 'execution';
  saveDecisionState();
  renderDecisionBoards();
  refreshCreatedPills();
  openDecisionDrawer(item.id);
}

document.addEventListener('click', function(event) {
  const pill = event.target.closest('#domainStatePills .state-pill');
  if (pill) {
    createSignalFromPill(pill);
    return;
  }
  if (event.target.matches('[data-close-drawer]')) {
    closeDecisionDrawer();
  }
});

const saveBtn = document.getElementById('drawerSaveBtn');
if (saveBtn) saveBtn.addEventListener('click', function() {
  syncActiveSignalFromDrawer();
  closeDecisionDrawer();
});

const activateBtn = document.getElementById('drawerActivateBtn');
if (activateBtn) activateBtn.addEventListener('click', function() {
  activateCurrentDecision();
});

['drawerOwner','drawerPriority','drawerDueDate'].forEach(function(id){
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', syncActiveSignalFromDrawer);
});

loadDecisionState();
renderDecisionBoards();
refreshCreatedPills();

const _originalRenderTopDomainState = typeof renderTopDomainState === 'function' ? renderTopDomainState : null;
if (_originalRenderTopDomainState) {
  renderTopDomainState = function(domainKey) {
    _originalRenderTopDomainState(domainKey);
    refreshCreatedPills();
  };
}


const initialDecisionActivationShell = document.querySelector('.decision-activation-shell');
if (initialDecisionActivationShell) {
  initialDecisionActivationShell.style.display = 'none';
}


document.addEventListener('click', (event) => {
  const footerBtn = event.target.closest('.footer-chip-btn[data-domain-jump]');
  if (footerBtn) {
    event.preventDefault();
    event.stopPropagation();
    navigateToDomain(footerBtn.dataset.domainJump);
  }
});


window.addEventListener('hashchange', () => {
  const hash = (window.location.hash || '').replace('#', '');
  if (hash.startsWith('env-')) {
    navigateToDomain(hash.replace('env-', ''));
  }
});

window.addEventListener('load', () => { enforceSelectContrast(document); showView('platform'); applyHardDomFixes(); const hash=(window.location.hash||'').replace('#',''); if(hash && hash.startsWith('env-')){ const domain=hash.replace('env-',''); navigateToDomain(domain); } });


/* v61 mobile nav and route consistency */
function initMobileHeaderBehavior() {
  const topbar = document.querySelector('.topbar');
  const toggle = document.getElementById('mobileMenuToggle');
  if (!topbar || !toggle) return;

  const closeMenu = () => {
    topbar.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    topbar.classList.add('menu-open');
    topbar.classList.remove('is-hidden-mobile');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    if (topbar.classList.contains('menu-open')) closeMenu();
    else openMenu();
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 820) return;
    if (!topbar.contains(event.target)) closeMenu();
  });

  [...document.querySelectorAll('.nav-btn, .header-actions .btn, .jump-btn')].forEach(el => {
    el.addEventListener('click', () => {
      if (window.innerWidth <= 820) closeMenu();
    });
  });

  let lastY = window.scrollY || 0;
  let ticking = false;
  const onScroll = () => {
    if (window.innerWidth > 820) {
      topbar.classList.remove('is-hidden-mobile');
      return;
    }
    if (topbar.classList.contains('menu-open')) return;
    const y = window.scrollY || 0;
    const delta = y - lastY;
    if (y <= 30 || delta < -8) topbar.classList.remove('is-hidden-mobile');
    else if (delta > 8) topbar.classList.add('is-hidden-mobile');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      topbar.classList.remove('is-hidden-mobile');
      topbar.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function bindRouteIntegrity() {
  document.querySelectorAll('a,button').forEach(el => {
    const label = (el.textContent || '').trim().toLowerCase();
    if (label === 'explore edmp') {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        showView('library');
        const library = document.getElementById('library');
        if (library) library.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  const domainCaseBtn = document.getElementById('domainCaseBtn');
  if (domainCaseBtn) {
    domainCaseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const activeDomain = getCurrentTopDomainKey();
      showView('cases');
      if (typeof selectCase === 'function') selectCase(activeDomain);
      const journey = document.querySelector('.journey-panel') || document.getElementById('cases');
      if (journey) journey.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const domainLiveBtn = document.getElementById('domainLiveBtn');
  if (domainLiveBtn) {
    domainLiveBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const activeDomain = getCurrentTopDomainKey();
      openDomainContactIntake(activeDomain, 'library-top', `${getCockpitDomainLabel(activeDomain)} discussion`);
    });
  }

  const libraryStripSecondary = document.querySelector('.sales-cta-strip .btn.btn-secondary.jump-btn[data-view="cases"]');
  if (libraryStripSecondary) {
    libraryStripSecondary.dataset.view = 'library';
    libraryStripSecondary.textContent = 'See Use Environments';
    libraryStripSecondary.addEventListener('click', (event) => {
      event.preventDefault();
      const grid = document.getElementById('cockpitGrid') || document.getElementById('library');
      showView('library');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

window.addEventListener('load', () => {
  initMobileHeaderBehavior();
  bindRouteIntegrity();
});
