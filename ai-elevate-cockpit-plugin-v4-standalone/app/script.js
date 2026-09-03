
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
    id: 'insight-1',
    slug: 'ai-adoption-is-not-organisational-capability',
    title: 'AI Adoption Is Not Organisational AI Capability',
    category: 'Operating model and adoption',
    filter: 'operating-model',
    deck: 'Why widespread tool use can coexist with fragmented ownership, weak controls and little measurable value.',
    summary: 'Adoption metrics show activity. Capability means the organisation can repeatedly select, govern, implement and improve valuable AI use cases.',
    relevance: 'Helps leadership distinguish licences and experiments from a repeatable organisational capability.',
    image: 'assets/insights/insight-01-organisational-capability.png',
    alt: 'Initiative landscape and capability coherence',
    focal: '50% 40%'
  },
  {
    id: 'insight-2',
    slug: 'why-ai-strategy-stalls-before-implementation',
    title: 'Why AI Strategy Stalls Before Implementation',
    category: 'Strategy and value',
    filter: 'strategy-value',
    deck: 'The missing translation from executive ambition to an executable organisational design.',
    summary: 'AI strategies rarely fail for lack of ideas. They stall when priorities, decision rights, architecture, ownership and measures are not connected.',
    relevance: 'Positions AI Elevate between boardroom intent and partner-led implementation.',
    image: 'assets/insights/insight-02-strategy-to-execution.png',
    alt: 'Strategy translated into a delivery map',
    focal: '50% 35%'
  },
  {
    id: 'insight-3',
    slug: 'who-remains-accountable-when-ai-advises',
    title: 'Who Remains Accountable When AI Advises?',
    category: 'Governance and accountability',
    filter: 'governance',
    deck: 'Human authority must be designed before consequential decisions are AI-assisted.',
    summary: 'An AI recommendation does not remove accountability. Leaders need explicit decision ownership, escalation paths and evidence requirements.',
    relevance: 'Makes governance practical without presenting AI Elevate as a legal or compliance firm.',
    image: 'assets/insights/insight-03-human-accountability.png',
    alt: 'Human decision ownership and evidence review',
    focal: '50% 45%'
  },
  {
    id: 'insight-4',
    slug: 'platform-independence-is-strategic-control',
    title: 'Platform Independence Is a Form of Strategic Control',
    category: 'Architecture and platforms',
    filter: 'architecture',
    deck: 'Why enterprise AI architecture should begin with business requirements, not a vendor catalogue.',
    summary: 'Microsoft, ERP, cloud, data and business-application ecosystems all matter. A durable AI capability connects them without allowing one product roadmap to define the organisation\u2019s choices.',
    relevance: 'Expresses AI Elevate\u2019s cross-platform background and vendor-neutral advisory role.',
    image: 'assets/insights/insight-04-platform-independence.png',
    alt: 'Connected enterprise architecture',
    focal: '50% 50%'
  },
  {
    id: 'insight-5',
    slug: 'ai-governance-cannot-be-added-after-deployment',
    title: 'AI Governance Cannot Be Added After Deployment',
    category: 'Governance and accountability',
    filter: 'governance',
    deck: 'Decision rights, evidence, oversight and escalation belong in the design.',
    summary: 'Retrofitting governance creates friction and rework. The control model must develop alongside the use case, operating model and technical architecture.',
    relevance: 'Connects governance to delivery rather than treating it as a policy exercise.',
    image: 'assets/insights/insight-05-governance-by-design.png',
    alt: 'Governance and process design before deployment',
    focal: '50% 38%'
  },
  {
    id: 'insight-6',
    slug: 'why-implementation-partners-need-independent-organisational-layer',
    title: 'Why Implementation Partners Need an Independent Organisational Layer',
    category: 'Partner delivery',
    filter: 'partner',
    deck: 'Clear complementary roles create more client value without duplicating technical delivery.',
    summary: 'Implementation partners build and integrate solutions. AI Elevate helps the client define priorities, readiness, decision rights, adoption and value realisation across the whole environment.',
    relevance: 'Makes the partner-friendly consultancy model explicit and avoids implying that partners lack capability.',
    image: 'assets/insights/insight-06-complementary-partners.png',
    alt: 'Joint client and partner transformation planning',
    focal: '50% 42%'
  }
];

const navButtons = document.querySelectorAll('.nav-btn[data-view]');
const footerNavButtons = document.querySelectorAll('.nav-btn-link[data-view]');
const jumpButtons = document.querySelectorAll('.jump-btn');
const views = document.querySelectorAll('.view');

const insightArticles = {
'insight-1': `
<p class="insight-article-thesis">Every organisation with an AI budget can point to adoption metrics: licences provisioned, models deployed, copilots enabled, employees trained. Yet adoption alone does not mean the organisation can repeatedly identify where AI should create value, govern its use, implement it coherently, sustain the change or demonstrate measurable outcomes. That gap between tool uptake and organisational capability is where most enterprise AI programmes quietly stall.</p>

<h2>The business problem</h2>
<p>Organisations invest heavily in AI tools and enablement. Adoption dashboards show increasing usage: more prompts, more integrations, more teams experimenting. Leaders interpret these signals as progress. Meanwhile, the organisation may still lack a shared view of which use cases deserve enterprise investment, which risks require governance, how decision rights should be allocated, and what evidence constitutes value realisation.</p>
<p>Without that structure, adoption produces activity — not capability. Teams pursue local experiments with local tooling. Governance is either absent or improvised retroactively. Success is anecdotal rather than evidenced. When a senior stakeholder asks whether AI is delivering business value, the honest answer is often that nobody can say with confidence, because nobody defined what value would look like or who would be accountable for it.</p>
<p>This is not a technology failure. It is an organisational design failure. The tools work. The organisation around them does not yet operate as a capability.</p>
<p>The distinction matters because it determines where leadership attention should go next. More licences, more models and more training will not close an organisational gap. What closes it is deliberate design: connecting AI investments to business priorities, assigning accountability, establishing governance, building evidence and creating the operating rhythm that turns experiments into a managed, improvable enterprise capability.</p>

<h2>What leaders often miss</h2>
<p>The most common oversight is treating adoption as a proxy for maturity. When a platform vendor reports that seventy percent of employees have used a copilot feature, that number describes access. It does not describe whether the organisation has prioritised its most valuable use cases, connected them to operational outcomes, established shared standards for responsible use, or built the feedback mechanisms needed to learn and improve.</p>
<p>Leaders also frequently underestimate the organisational breadth of genuine AI capability. It is not only a technology conversation. Capability requires clarity across strategy, operating model, architecture, governance, workforce readiness and evidence. Each of these domains needs intentional design, and they must be connected. A governance framework that exists on paper but is disconnected from the architecture decisions and delivery practices remains performative.</p>
<p>Another common gap is the absence of a portfolio view. Individual teams may be running capable experiments, but without a portfolio lens the organisation cannot compare, prioritise, sequence or coordinate. Duplication emerges. Conflicting assumptions go unresolved. Scarce resources — data engineering capacity, architecture oversight, change leadership — are consumed without strategic direction.</p>

<h2>What a stronger organisational response looks like</h2>
<p>Organisational AI capability begins with a deliberate view of where AI should create value, and why. That means defining a portfolio of use cases connected to business outcomes rather than technology curiosity. It means establishing decision rights: who approves new use cases, who governs risk, who owns the operating model, and who is accountable for measurable outcomes.</p>
<p>It extends into shared standards for architecture and governance. Rather than allowing each team to adopt tools independently, the organisation establishes a coherent set of principles for how AI integrates with existing systems, how data is managed, how models are evaluated, and how human oversight is maintained. This is not centralised control for its own sake — it is the minimum structure that allows distributed teams to operate with confidence, consistency and accountability.</p>
<p>Workforce development shifts from generic AI training to role-specific capability building that aligns with the organisation\u2019s actual use cases, processes and decision environment. Adoption becomes a managed change programme rather than a licence rollout. People need to understand not just how to use a tool, but how the tool connects to the processes, decisions and outcomes that matter in their domain.</p>
<p>The operating rhythm includes regular review of the portfolio, evidence-based assessment of value delivery, honest evaluation of what is and is not working, and structured escalation when assumptions change. Over time, this rhythm produces an organisation that can learn, adapt and extend its AI capability \u2014 not one that merely consumes more AI features.</p>
<p>Crucially, this capability must be visible. Leaders need to be able to see the current state of AI maturity across the enterprise, identify where progress is genuine and where it is performative, and make informed decisions about where to invest next. Without that visibility, AI strategy becomes a faith-based exercise rather than an evidence-based discipline.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>Can you articulate the five most valuable AI use cases in your organisation today — and the evidence that supports that ranking?</li>
<li>Who owns the operating model for AI across the enterprise, and what authority do they have over prioritisation, standards and governance?</li>
<li>If a material AI-related risk emerged tomorrow, is the escalation path clear, documented and exercised?</li>
<li>How does the organisation currently distinguish between AI adoption activity and measurable business capability?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate works with leadership teams to assess the full breadth of organisational AI capability — not just technology deployment. Our AI Capability Opportunity Scan and readiness assessments examine strategy clarity, portfolio coherence, operating model maturity, governance effectiveness, workforce alignment and evidence discipline. The result is a structured baseline and a clear view of where the organisation needs to invest beyond tools. We help close the gap between what has been adopted and what the organisation can actually sustain, govern and improve.</p>
`,

'insight-2': `
<p class="insight-article-thesis">Most AI strategies do not fail because the ideas are wrong. They stall because the distance between executive ambition and organisational execution is larger, more structural and more interdependent than the strategy document acknowledges. The translation from intent to implementable design — connecting priorities to decision rights, architecture constraints, organisational readiness and sequenced delivery — is where strategies quietly lose momentum.</p>

<h2>The business problem</h2>
<p>An executive team agrees that AI is strategically important. A strategy is written. It describes opportunities, outlines a vision, and may even identify priority domains. Yet three to six months later, little has changed operationally. Implementation partners are waiting for requirements that have not been defined. Architecture teams are uncertain which workloads to prioritise. Business units have competing expectations. And nobody has an actionable plan that connects the strategy to the organisation's real constraints, capabilities and decision structures.</p>
<p>The strategy was not wrong — it was incomplete. It described the destination without designing the journey. It named opportunities without sequencing them against dependencies. It assumed that existing governance, decision rights and operating models would accommodate AI without deliberate adjustment. And it did not assign clear accountability for turning strategic intent into organisational action.</p>
<p>This pattern is remarkably common. It is not caused by a lack of ambition, intelligence or investment. It is caused by a missing translation layer between what leadership wants and what the organisation can execute.</p>

<h2>What leaders often miss</h2>
<p>The first gap is the assumption that a strategy document is an implementation plan. Strategy articulates direction and priorities. Implementation requires an executable design: sequenced initiatives, defined dependencies, resource commitments, governance arrangements, architecture decisions and clear measures of progress. These are fundamentally different activities, and they require different skills.</p>
<p>The second gap is underestimating organisational friction. Every enterprise carries constraints: legacy architecture, regulatory obligations, workforce readiness, procurement cycles, existing vendor relationships and cultural norms around decision-making. A strategy that does not account for these realities will stall against them. The most common outcome is not dramatic failure but gradual loss of momentum as pilot projects proliferate without connecting back to enterprise outcomes.</p>
<p>The third gap is the absence of decision rights. AI strategy affects multiple business functions, technology domains and governance layers. When nobody has explicit authority to arbitrate competing priorities, resolve architectural trade-offs or enforce standards, the organisation defaults to consensus — which produces delay, compromise and fragmentation.</p>
<p>Finally, leaders often miss the value definition problem. Strategy documents describe aspirations. Implementation requires observable, measurable outcomes that can be tracked, reported and used to justify continued investment. Without that definition, success remains subjective and progress is difficult to demonstrate.</p>

<h2>What a stronger organisational response looks like</h2>
<p>A robust approach treats the translation from strategy to execution as its own workstream, with dedicated attention, skilled facilitation and executive sponsorship. The output is not another strategy document but an organisational design that makes implementation possible.</p>
<p>That design connects business outcomes to specific use cases, links use cases to architecture requirements, maps dependencies, sequences delivery against organisational readiness, defines decision rights and governance, and establishes clear, evidence-based measures of progress.</p>
<p>It also considers change impact honestly. AI changes processes, roles, decision-making patterns and performance expectations. These changes need to be designed, communicated and managed — not assumed. Workforce implications, including skills, capacity and willingness, must be addressed as part of the design, not as an afterthought.</p>
<p>The strongest organisations treat this translation as an iterative process. They begin with a bounded engagement \u2014 perhaps a single high-priority domain or a capability diagnosis \u2014 and use the results to refine the broader plan. This reduces risk, builds evidence and maintains organisational confidence.</p>
<p>Importantly, the translation layer must remain active throughout delivery. Strategy does not stop when implementation begins. Assumptions change, new constraints emerge, business priorities shift and the organisation learns things during delivery that were not visible during planning. A living connection between strategy and execution \u2014 with clear ownership, regular review and explicit escalation \u2014 keeps the programme aligned with its original purpose while adapting to reality.</p>
<p>Organisations that get this right find that their implementation partners are more effective, not less. When the strategic context is clear, requirements are well-defined and stakeholder alignment is maintained, delivery teams can focus on what they do best rather than navigating organisational ambiguity.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>Can you describe the three most important organisational changes required to deliver your AI strategy \u2014 beyond technology deployment?</li>
<li>Who has explicit authority to arbitrate competing AI priorities across business units and technology domains?</li>
<li>What evidence will demonstrate that strategy execution is on track \u2014 and who is responsible for collecting it?</li>
<li>If implementation stalls, what is the escalation path, and has it been tested?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate specialises in the translation between executive AI ambition and organisational execution. We help leadership teams connect strategy to implementable design through capability diagnosis, use-case prioritisation, operating model design, architecture requirements and delivery sequencing. Our Fast Lane engagement provides one structured starting point: a bounded, evidence-based assessment that reveals where the real gaps exist between intent and readiness. The result is not another aspirational document but an organisational foundation that implementation partners can build upon.</p>
`,

'insight-3': `
<p class="insight-article-thesis">When an AI model recommends, generates or ranks, a human being must remain accountable for the decision that follows. This is not a philosophical position — it is an operational requirement. Accountability cannot be delegated to a model, and it cannot be assumed to exist simply because a human was present when the output appeared. It must be designed into the decision process before consequential choices involve AI-generated input.</p>

<h2>The business problem</h2>
<p>Organisations are rapidly deploying AI capabilities that influence or directly support consequential decisions: credit assessments, recruitment screening, procurement recommendations, clinical prioritisation, investment analysis and operational planning. In many cases, the AI output is presented to a decision-maker who approves, adjusts or forwards it — but the decision process itself has not been redesigned to account for the AI involvement.</p>
<p>The result is a growing set of decisions where accountability is unclear. If the AI recommendation is wrong, who is responsible? The person who approved it, the team that configured the model, the vendor who supplied it, or the governance function that allowed its deployment? If the decision later requires explanation — to a regulator, a board, an auditor or an affected party — can the organisation reconstruct not just what was decided but how, on what basis, what the AI contributed, what the human considered, and why the final judgement was made?</p>
<p>For most organisations, the honest answer is no. Decision processes have not been updated. Ownership has not been explicitly assigned. Evidence requirements have not been defined. Escalation paths for uncertain or high-stakes AI-assisted decisions do not exist. The organisation has adopted the technology without redesigning the authority structure around it.</p>

<h2>What leaders often miss</h2>
<p>The most common oversight is assuming that human-in-the-loop means human-in-control. Placing a person at the end of an AI recommendation workflow does not automatically create meaningful oversight. If the person lacks the context, time, expertise or authority to meaningfully evaluate and challenge the AI output, approval becomes a rubber stamp. The human is present but not accountable in any substantive sense.</p>
<p>Leaders also frequently underestimate the speed at which AI decision support becomes AI decision delegation. What begins as a helpful recommendation quickly becomes the default. Over time, overriding the AI becomes the exception rather than the routine, and the skills, judgement and information needed to exercise genuine oversight atrophy.</p>
<p>Another gap is the absence of materiality thresholds. Not every AI-assisted decision requires the same level of human oversight. But without a deliberate classification of decision types by materiality, risk and consequence, organisations apply either too much oversight — creating bottlenecks — or too little, creating exposure.</p>
<p>Finally, evidence requirements are often undefined. When a consequential decision is made with AI input, what evidence should be preserved? The model output, the human evaluation, the alternatives considered, the confidence level, the data quality, the exceptions noted? Without explicit requirements, the organisation cannot reconstruct or defend its decisions after the fact.</p>

<h2>What a stronger organisational response looks like</h2>
<p>A stronger approach begins with identifying every decision process where AI plays a consequential role and classifying those decisions by materiality and risk. For each material decision type, the organisation defines: named decision owners with explicit authority; minimum evidence requirements; confidence thresholds below which human review is mandatory; escalation paths for exceptions, disagreements and edge cases; and periodic review mechanisms to assess whether the oversight model remains effective.</p>
<p>This is not bureaucracy. It is the minimum design required to maintain genuine human accountability in an environment where AI outputs are increasingly embedded in organisational workflows. The design should be proportionate — lightweight for low-risk operational decisions, rigorous for high-stakes strategic, financial, legal or people-related choices.</p>
<p>Over time, organisations that take accountability seriously also invest in decision memory: the ability to reconstruct how a decision was formed, what the AI contributed, what the human considered, and how the outcome was monitored. This is where decision lineage becomes valuable — not as a compliance exercise but as an operational capability that supports learning, audit and continuous improvement.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>For your five most consequential AI-assisted decision processes, can you name the accountable decision owner — and have they accepted that accountability?</li>
<li>What evidence would you need to reconstruct and defend an AI-influenced decision six months after it was made?</li>
<li>Are there decision processes where the AI recommendation has effectively become the decision — and is that intentional?</li>
<li>What happens when a decision-maker disagrees with the AI output — is there a supported, documented path for that?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate helps organisations design human accountability into AI-assisted decision processes. We work with leadership teams to map decision types, assign ownership, define evidence requirements, establish escalation paths and build proportionate oversight models. Where durable decision lineage is required \u2014 the ability to preserve how decisions were formed, how ownership changed and how execution aligned with intent \u2014 AI Elevate offers EDMP, our focused proposition for enterprise decision memory. The goal is not to slow decisions down but to ensure they remain accountable, defensible and improvable. Accountability is a design choice, and organisations that make it deliberately are better positioned to scale AI with confidence.</p>
`,

'insight-4': `
<p class="insight-article-thesis">Enterprise AI architecture should begin with business requirements and organisational principles, not with the feature set of a preferred vendor. The organisations that maintain strategic control over their AI capability are those that define their own requirements — for interoperability, portability, security, data sovereignty and operating ownership — before committing to platform-specific implementations. This is not anti-vendor. It is pro-organisation.</p>

<h2>The business problem</h2>
<p>Most enterprises operate complex technology environments that span multiple vendors, platforms and generations of architecture. A typical large organisation relies on Microsoft for productivity and identity, one or more ERP platforms for core business processes, multiple database technologies for different workloads, cloud infrastructure from one or more hyperscalers, data platforms for analytics and AI, and a range of specialised business applications across functions.</p>
<p>When AI enters this environment, it does not arrive in isolation. It connects to data, processes, identities, permissions, workflows and decisions that already exist across these systems. The architectural choices made about AI — where models run, how data flows, what integrates with what, and who controls the pipeline — have long-term consequences for cost, flexibility, risk and strategic independence.</p>
<p>The risk is not that organisations choose the wrong vendor. It is that they allow a vendor relationship to become an architectural dependency that constrains future choices. When the AI strategy, the data architecture, the integration model and the governance framework are all optimised for a single platform, the organisation has gained convenience at the expense of control.</p>

<h2>What leaders often miss</h2>
<p>The first oversight is conflating vendor partnership with vendor dependence. Working with Microsoft, AWS, Google or any other major platform is entirely reasonable — they offer capabilities, scale and support that most organisations cannot replicate. The issue arises when the organisation's own requirements, principles and boundaries have not been defined before the platform-specific design begins. Without independent requirements, every architecture decision defaults to whatever the vendor recommends.</p>
<p>The second gap is underestimating the breadth of the existing environment. AI does not operate only within the AI platform. It touches ERP data, CRM workflows, HR processes, financial controls, security boundaries and compliance frameworks. Architecture decisions that optimise for the AI layer alone may create problems in adjacent systems — or may require the organisation to migrate, duplicate or restructure data in ways that were not anticipated or budgeted.</p>
<p>The third oversight is assuming portability will be easy later. Platform-specific integrations, proprietary model formats, closed API dependencies and vendor-managed data pipelines accumulate quickly. Each one increases the cost and complexity of change. By the time the organisation recognises the constraint, the switching cost may be prohibitive.</p>
<p>Finally, leaders often delegate architecture decisions entirely to technology teams without ensuring that business, governance and operating-model requirements are represented. Architecture is not only a technology conversation. It determines what the organisation can do, how quickly it can change, and what it controls.</p>

<h2>What a stronger organisational response looks like</h2>
<p>A stronger approach starts with the organisation defining its own architectural principles for AI — before engaging in platform-specific design. These principles address questions such as: where must data remain under organisational control? What interoperability standards are required across business applications? How will models be evaluated, tested and replaced? What level of portability is necessary, and what is the acceptable cost of vendor transition? How are security, identity and access managed consistently across the AI and non-AI layers?</p>
<p>These requirements do not replace vendor expertise. They frame it. Implementation partners continue to design, build and optimise platform-specific solutions — but they do so within a set of enterprise requirements that protect the organisation's strategic flexibility.</p>
<p>The architecture governance model also matters. Someone in the organisation must be responsible for ensuring that individual platform decisions remain consistent with enterprise principles. Without that role, architecture coherence erodes incrementally as each project team optimises for its own scope.</p>
<p>Organisations with mature practice also build review and adaptation into their architecture governance. Vendor capabilities evolve, business needs change, and regulatory requirements shift. The architecture must be a living framework, not a one-time deliverable.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>Has your organisation defined its own architectural principles for AI, independent of any specific vendor recommendation?</li>
<li>If you needed to replace or supplement your primary AI platform in eighteen months, what would it cost — and who knows?</li>
<li>How are enterprise-wide requirements for interoperability, data sovereignty and security represented in individual AI project architecture decisions?</li>
<li>Who is accountable for the coherence of AI architecture across the enterprise — and do they have the authority and visibility to exercise that role?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate provides vendor-neutral enterprise AI architecture advisory. We help leadership teams define their own architectural principles, requirements and governance models before committing to platform-specific implementation. Our background spans Microsoft and Windows environments, ERP platforms, database landscapes, cloud infrastructure, data platforms and business applications — enabling us to address the full breadth of the enterprise technology estate. We work constructively with implementation partners, who remain responsible for platform-specific design, configuration and delivery. AI Elevate ensures that the organisation retains strategic control over its technology choices rather than inheriting them from a single vendor relationship.</p>
`,

'insight-5': `
<p class="insight-article-thesis">Governance that arrives after AI has been deployed is governance that is already behind. Decision rights, evidence requirements, oversight mechanisms and escalation paths must be designed alongside the use case, the operating model and the technical architecture — not applied retrospectively as a control layer. Organisations that treat governance as a later-stage addition consistently find that retrofitting creates more friction, cost and risk than designing it in from the beginning.</p>

<h2>The business problem</h2>
<p>The typical pattern is familiar. A team identifies a promising AI use case. Technology selection and development proceed quickly because budget has been approved, the vendor relationship is in place and delivery pressure is high. Governance is acknowledged as important but deferred — either because the governance framework does not yet exist, because the governance team is not involved in delivery, or because governance is perceived as a blocker that should be addressed after the capability is proven.</p>
<p>By the time governance attention arrives, the AI capability is operational. Decisions are being made, data is flowing, models are producing output and users are relying on the system. Introducing governance requirements at this point means changing live processes, redefining data flows, adding oversight steps that were not in the original design and renegotiating operating expectations with stakeholders who have already adapted to the ungoverned version.</p>
<p>The result is predictable: governance becomes an adversarial experience. Delivery teams resist requirements that slow them down. Governance teams lack sufficient context to design proportionate controls. And the organisation ends up with either ineffective governance — policies on paper with little operational reality — or burdensome governance that undermines the AI capability's value.</p>

<h2>What leaders often miss</h2>
<p>The most consequential oversight is treating governance as a separate workstream rather than an integrated design activity. Governance is not something that happens to a project after it is delivered. It is part of the design: which data is used, how quality is assured, what decisions the AI influences, who approves model changes, what evidence is collected, how performance is monitored, who handles exceptions, and what happens when things go wrong.</p>
<p>Leaders also frequently underestimate the variety of governance requirements. AI governance is not only about ethics or compliance. It encompasses use-case intake and prioritisation, risk assessment and tiering, data suitability evaluation, model selection and validation, testing and acceptance criteria, deployment approval, operational monitoring, incident detection and response, model retraining triggers, and eventual retirement. Each of these stages has governance implications, and neglecting any one creates an unmanaged gap.</p>
<p>Another common gap is the absence of proportionality. Not every AI use case requires the same level of governance rigour. A low-risk internal productivity tool requires different oversight than a model that influences customer pricing, credit decisions or hiring outcomes. Without a tiering model that classifies use cases by risk and consequence, organisations apply either a single heavy-weight process to everything — creating bottlenecks — or no consistent process at all.</p>
<p>Finally, many organisations confuse governance with documentation. Writing a policy does not govern anything. Governance requires operational mechanisms: intake workflows, review gates, evidence collection, monitoring dashboards, escalation procedures and periodic assurance reviews that are actually executed.</p>

<h2>What a stronger organisational response looks like</h2>
<p>Effective AI governance is designed as part of the delivery process, not added afterwards. From the earliest stages of use-case identification, governance questions are present: what is the materiality of this use case? What data does it require, and is that data suitable? What decisions will be influenced, and what are the consequences of error? Who will own the model in production, and how will it be monitored?</p>
<p>A proportionate governance framework includes: a structured intake process that classifies use cases by risk and consequence; clear criteria for data suitability, model selection and validation; defined approval gates at development, testing and deployment stages; operational monitoring with explicit thresholds for intervention; incident response procedures; scheduled reviews of model performance, data quality and governance effectiveness; and a defined process for model retirement when a use case is no longer appropriate.</p>
<p>The framework is commercially pragmatic. It protects the organisation without preventing innovation. The goal is to make it easier to deploy AI responsibly — not harder to deploy AI at all. Organisations that achieve this balance find that governance actually accelerates delivery by reducing uncertainty, preventing rework and building stakeholder confidence.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>For each active AI use case, can you describe the governance arrangements — or are they still to be defined?</li>
<li>When was the last time an AI use-case deployment was reviewed against its original risk assessment and intended outcomes?</li>
<li>Does your governance framework distinguish between high-risk and low-risk AI use cases — and are the criteria documented?</li>
<li>If an AI model in production began producing systematically biased or inaccurate output, how quickly would the organisation detect it, and who would own the response?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate helps organisations design governance that is integrated, proportionate and operational — not retrospective or performative. We work with leadership and delivery teams to define use-case intake processes, risk tiering models, data and model governance requirements, oversight mechanisms and assurance rhythms. Our governance advisory connects directly to architecture and operating model design, ensuring that governance requirements are technically feasible and organisationally sustainable. The result is a control model that develops alongside the AI capability rather than being bolted on after the fact.</p>
`,

'insight-6': `
<p class="insight-article-thesis">The value of an independent organisational AI advisory layer is not that implementation partners lack capability — it is that the organisational questions surrounding AI are growing faster than most delivery models are designed to address. Priorities, readiness, decision rights, governance, adoption and value realisation are increasingly the factors that determine whether an implementation succeeds or stalls. Addressing them requires a role that is complementary to technical delivery, not a replacement for it.</p>

<h2>The business problem</h2>
<p>Organisations typically engage implementation partners to design, configure, integrate and deploy technology solutions. These partners bring deep platform expertise, proven delivery methods, technical architecture skills and the capacity to execute at scale. The relationship is well understood and commercially established.</p>
<p>As AI matures from experimentation to enterprise capability, a new layer of complexity emerges around the implementation. Questions of organisational readiness, strategic prioritisation, operating model design, decision rights, governance arrangements, workforce adaptation and cross-domain coordination become increasingly consequential. These are not technology questions. They are organisational design questions that must be answered before — or alongside — technical delivery in order for that delivery to produce lasting value.</p>
<p>In practice, these questions often fall into a gap. The client's internal teams may lack the capacity or specialised expertise. The implementation partner's scope, commercial model and delivery timeline may not extend to organisational advisory. And without somebody explicitly owning this layer, the questions either go unaddressed or are answered implicitly through technology decisions that carry organisational consequences nobody fully anticipated.</p>

<h2>What leaders often miss</h2>
<p>The most important distinction is between building a solution and building the organisation's capability to absorb, govern, sustain and improve that solution. An implementation partner can deliver a technically sound AI platform. But if the organisation has not clarified its priorities, aligned its stakeholders, defined its governance, adapted its processes and prepared its workforce, the platform will underperform — not because the technology is wrong, but because the organisation is not ready for it.</p>
<p>Leaders also sometimes assume that strategic and organisational advisory is embedded in the implementation engagement. In some cases it is, particularly for large-scale transformation programmes. But for many engagements, the partner's scope is defined by platform delivery, and organisational readiness is treated as the client's responsibility. This is not a deficiency — it is a scope boundary. The gap exists not because the partner is unwilling but because the work is genuinely different in nature, skills and accountability.</p>
<p>Another common oversight is the timing. Organisational advisory is most valuable before and during implementation, not after. Defining requirements, decision rights, governance and change management after the platform is live creates the same retrofitting problems that characterise late-stage governance. The independent organisational layer must operate in parallel with, not after, technical delivery.</p>
<p>Finally, leaders sometimes worry that introducing an independent advisory layer will create friction with the implementation partner. In practice, the opposite is more common. When the client arrives at implementation with clear priorities, defined requirements, explicit governance, aligned stakeholders and a managed change programme, the implementation partner can focus on what it does best — and delivery is faster, cleaner and more likely to succeed.</p>

<h2>What a stronger organisational response looks like</h2>
<p>A well-designed engagement model has three clearly defined roles: the client organisation, which owns the strategy, the priorities and the outcomes; the implementation partner, which designs, builds, integrates and deploys the technology; and the independent organisational advisory, which helps the client define requirements, establish governance, manage change and assure value realisation.</p>
<p>The key is non-overlapping accountability. The independent advisory does not replicate technical delivery. The implementation partner does not carry organisational design responsibility. And the client retains ownership of both the strategic direction and the final decision authority. Hand-offs between the three roles are explicit, documented and governed.</p>
<p>This model produces several practical benefits. The client receives independent advice that is not influenced by platform economics. The implementation partner receives clearer requirements and better-prepared stakeholders. And the programme as a whole benefits from shared outcomes, reduced ambiguity and a governance structure that spans both organisational and technical delivery.</p>

<h2>Questions for the leadership team</h2>
<ul>
<li>For your current AI implementation, who is explicitly responsible for organisational readiness, governance design and value assurance — and is that role adequately resourced?</li>
<li>Does your implementation partner's scope include strategic prioritisation, operating model design and cross-domain governance — or are those the client's responsibility?</li>
<li>How are hand-offs between organisational advisory and technical delivery defined, documented and governed?</li>
<li>If the implementation delivers a technically successful solution that the organisation struggles to adopt, govern or sustain, whose accountability is that?</li>
</ul>

<h2>How AI Elevate helps</h2>
<p>AI Elevate operates as the independent organisational advisory layer alongside the client and their implementation partners. We help the client define priorities, assess readiness, establish decision rights, design governance, manage adoption and assure value realisation across the whole AI environment \u2014 not only the platform being implemented. We do not compete with implementation partners. We complement them by ensuring the organisational foundations are in place for technical delivery to succeed. The result is clearer scope, stronger executive sponsorship and implementation that remains connected to an organisational outcome.</p>
<p>This model is not theoretical. It reflects a growing recognition across the market that organisational readiness, governance design and value assurance require dedicated, independent attention \u2014 and that providing that attention strengthens rather than undermines the implementation partnership.</p>
`
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
    kicker: 'AI Elevate',
    title: 'Turn AI adoption into governed organisational capability',
    text: 'We work between executive ambition and technical implementation—connecting business value, organisational design, enterprise architecture, governance and human accountability.',
    metrics: [['Stance','Vendor-neutral'],['Focus','Organisational capability'],['Role','Independent advice'],['Legal seller','AvL Consultancy']],
    primaryLabel: 'Discuss your AI capability',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Capability%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20our%20AI%20capability.%0A%0AName%3A%0AOrganisation%3A%0A',
    secondaryLabel: 'Explore our services',
    secondaryView: 'services'
  },
  services: {
    kicker: 'Services',
    title: 'Start with a bounded question',
    text: 'Begin with the opportunity, constraint or implementation decision that currently lacks organisational clarity.',
    metrics: [['Orientation','Executive'],['Diagnosis','Capability'],['Design','Operating model'],['Assurance','Independent']],
    primaryLabel: 'Discuss your AI capability',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Capability%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20our%20AI%20capability.%0A%0AName%3A%0AOrganisation%3A%0A',
    secondaryLabel: 'Contact',
    secondaryView: 'contact'
  },
  partners: {
    kicker: 'Partners',
    title: 'Independent advice that strengthens implementation',
    text: 'AI Elevate does not replace implementation partners. We help clients define the organisational requirement and governed destination.',
    metrics: [['Compatibility','High'],['Competition','None'],['Scope','Organisational layer'],['Test','One customer case']],
    primaryLabel: 'Discuss a partnership opportunity',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Partnership%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20a%20partnership%20opportunity.%0A%0AName%3A%0AOrganisation%3A%0A',
    secondaryLabel: 'View services',
    secondaryView: 'services'
  },
  edmp: {
    kicker: 'Specialised solution',
    title: 'Enterprise Decision Memory',
    text: 'EDMP preserves how important decisions were formed, how ownership changed, and whether execution remained aligned with intent.',
    metrics: [['Programs','Live'],['Decision Room','Token-gated'],['Assessment','Preview + paid'],['Seller','AvL Consultancy']],
    primaryLabel: 'Explore EDMP programs',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20EDMP%20Inquiry&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20EDMP.%0A%0AName%3A%0AOrganisation%3A%0A',
    secondaryLabel: 'Engage',
    secondaryView: 'engage'
  },
  library: {
    kicker: 'EDMP environments',
    title: 'Use environments for decision memory',
    text: 'Explore domain environments that make reasoning, ownership and control trace visible under pressure.',
    metrics: [['Domains','06'],['Cockpits','Live'],['Activation','Local'],['Return','EDMP']],
    primaryLabel: 'Discuss EDMP',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20EDMP%20Inquiry&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20EDMP.%0A',
    secondaryLabel: 'EDMP destination',
    secondaryView: 'edmp'
  },
  cases: {
    kicker: 'EDMP cases',
    title: 'Where decision lineage becomes visible',
    text: 'Inspect reasoning, monitor drift, track precedent, assign accountability, and preserve decision continuity over time.',
    metrics: [['Decision triggers','05'],['Environments','06'],['Execution trace','Live'],['Return','EDMP']],
    primaryLabel: 'Discuss EDMP',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20EDMP%20Inquiry&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20EDMP.%0A',
    secondaryLabel: 'EDMP destination',
    secondaryView: 'edmp'
  },
  insights: {
    kicker: 'Insights',
    title: 'Thinking that supports organisational AI capability',
    text: 'Retain decision-memory doctrine while situating it within broader organisational AI, authority, architecture and learning.',
    metrics: [['Capability','Organisational'],['Authority','Human'],['Architecture','Governance'],['Memory','Decision']],
    primaryLabel: 'Discuss your AI capability',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Capability%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20our%20AI%20capability.%0A',
    secondaryLabel: 'About AI Elevate',
    secondaryView: 'about'
  },
  about: {
    kicker: 'About',
    title: 'Built for organisational questions technology alone cannot answer',
    text: 'AI Elevate is an independent, vendor-neutral consultancy founded by Anthony van Lobbrecht.',
    metrics: [['Experience','25+ years'],['Stance','Vendor-neutral'],['Focus','Capability'],['Legal','AvL Consultancy']],
    primaryLabel: 'Discuss your AI capability',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Capability%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20our%20AI%20capability.%0A',
    secondaryLabel: 'Services',
    secondaryView: 'services'
  },
  contact: {
    kicker: 'Contact',
    title: 'Discuss your AI capability',
    text: 'Tell us where AI adoption, organisational readiness, governance or implementation is creating an unresolved decision.',
    metrics: [['Response','Human'],['Entry','Conversation'],['Scan','Enquiry-based'],['Seller','AvL Consultancy']],
    primaryLabel: 'Request a focused conversation',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Capability%20Conversation&body=Hi%20AI%20Elevate%2C%0A%0AI%20would%20like%20to%20discuss%20our%20AI%20capability.%0A',
    secondaryLabel: 'Services',
    secondaryView: 'services'
  },
  engage: {
    kicker: 'EDMP programs',
    title: 'Talk to us about scope, timing, or enterprise rollout',
    text: 'Self-serve EDMP programs cover briefing, assessment, and board pack. Larger deployments need a scoped conversation first.',
    metrics: [['Response','1 business day'],['Channel','Email'],['Seller','AvL Consultancy'],['Programs','Live']],
    primaryLabel: 'Contact us',
    primaryIntake: 'contact',
    primaryHref: 'mailto:info@aielevate.xyz?subject=AI%20Elevate%20Program%20Question&body=Hi%20AI%20Elevate%2C%0A%0AI%20have%20a%20question%20before%20checkout.%0A',
    secondaryLabel: 'EDMP destination',
    secondaryView: 'edmp'
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
  primary.dataset.source = `prefooter-${viewId}`;
  primary.dataset.intakeContext = data.title;
  const consultViews = ['platform', 'services', 'partners', 'about', 'contact', 'insights'];
  if (consultViews.includes(viewId)) {
    primary.removeAttribute('data-open-intake');
    primary.dataset.view = 'contact';
  } else {
    primary.dataset.openIntake = data.primaryIntake || 'demo';
    delete primary.dataset.view;
  }
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
let engageRendered = false;
let engageSelfCheckRendered = false;

const ENGAGE_PROGRAM_IDS = ['briefing', 'assessment', 'briefing-pack'];

const ENGAGE_PROGRAM_DISPLAY = {
  briefing: {
    positioning: '90-minute executive session to understand the decision-memory gap, AI accountability paradox, and where your organization may be exposed.',
    cta: 'Request Executive Briefing',
    bullets: [
      'Live executive session (NL or EN)',
      'Pre-read on the decision-formation gap',
      'Post-session findings report',
    ],
  },
  assessment: {
    positioning: 'Structured diagnostic across six decision memory dimensions, resulting in a scored report and 90-day intervention map.',
    cta: 'Request Assessment',
    bullets: [
      'Full questionnaire across six dimensions',
      'Scored report with gap analysis',
      '30-minute readout call',
    ],
  },
  'briefing-pack': {
    positioning: 'Board-ready PDF, slide deck, and one-pager explaining the EDMP business case for internal discussion.',
    cta: 'Request Board Pack',
    bullets: [
      'Full board briefing PDF',
      'Slide deck with speaker notes',
      'Executive one-pager for forwarding',
    ],
  },
};

const ENGAGE_INTAKE_META = {
  briefing: {
    label: 'Executive Briefing',
    subject: 'AI Elevate — Executive Briefing Request',
    intro: 'Request a 90-minute executive briefing on Enterprise Decision Memory. We will follow up by email to confirm scope, attendees, and scheduling.',
    button: 'Send briefing request',
    reason: 'Executive Briefing',
  },
  assessment: {
    label: 'EDMP Readiness Assessment',
    subject: 'AI Elevate — EDMP Readiness Assessment Request',
    intro: 'Request the full EDMP Readiness Assessment. We will follow up with intake steps, questionnaire access, and readout scheduling.',
    button: 'Send assessment request',
    reason: 'EDMP Readiness Assessment',
  },
  'briefing-pack': {
    label: 'Board Briefing Pack',
    subject: 'AI Elevate — Board Briefing Pack Request',
    intro: 'Request the Board Briefing Pack for board or investor discussion. We will follow up with delivery and optional customization intake.',
    button: 'Send board pack request',
    reason: 'Board Briefing Pack',
  },
  'one-pager': {
    label: 'Executive One-Pager',
    subject: 'AI Elevate — Executive One-Pager Request',
    intro: 'Request the free executive one-pager — a short internal explainer on Enterprise Decision Memory. We will send it to your work email.',
    button: 'Request one-pager',
    reason: 'Executive One-Pager (free)',
  },
};

function ensureLibraryRendered() {
  if (libraryRendered) return;
  libraryRendered = true;
  renderLibrary();
}

function getEngageConfig() {
  return window.AIE_ENGAGE_CONFIG || { merchant: {}, products: [] };
}

let legalApplied = false;

function applyLegalMerchantInfo() {
  if (legalApplied) return;
  legalApplied = true;
  const merchant = getEngageConfig().merchant || {};
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };
  const setEmail = (id, value) => {
    const el = document.getElementById(id);
    if (!el || !value) return;
    el.textContent = value;
    el.href = `mailto:${value}`;
  };
  const setPhone = (id, value) => {
    const el = document.getElementById(id);
    if (!el || !value) return;
    el.textContent = value;
    el.href = `tel:${value.replace(/\s/g, '')}`;
  };
  setText('legalTermsBrand', merchant.brand);
  setText('legalTermsSeller', merchant.legalName);
  setText('legalPrivacyBrand', merchant.brand);
  setText('legalPrivacySeller', merchant.legalName);
  setEmail('legalTermsEmail', merchant.email);
  setEmail('legalTermsEmailFooter', merchant.email);
  setEmail('legalPrivacyEmail', merchant.email);
  setEmail('legalPrivacyEmailRights', merchant.email);
  setPhone('legalTermsPhone', merchant.phone);
  setPhone('legalPrivacyPhone', merchant.phone);
  const methods = document.getElementById('legalTermsPaymentMethods');
  if (methods && merchant.paymentMethods) {
    methods.textContent = merchant.paymentMethods.replace(/ · /g, ', ').replace(/ ·/g, ',');
  }
}

function scrollToEngageSelfCheck() {
  const block = document.getElementById('engageSelfCheck');
  if (block) block.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function interpretQuickScore(score) {
  if (score <= 39) {
    return { band: 'High exposure', detail: 'Decision memory gaps are likely creating governance, continuity, or rework risk.' };
  }
  if (score <= 69) {
    return { band: 'Moderate exposure', detail: 'Some decision memory capability exists, but critical domains may still be fragile.' };
  }
  return { band: 'Lower exposure', detail: 'Still review critical domains — this is a directional check, not a full maturity assessment.' };
}

function openEngageIntake(productId, source = 'engage') {
  const meta = ENGAGE_INTAKE_META[productId];
  if (!meta) return;
  openOverlay(intakeFormHTML({
    type: 'contact',
    engageProduct: productId,
    source,
    context: meta.reason,
  }));
  window.setTimeout(() => enforceSelectContrast(overlayContent), 0);
}
window.openEngageIntake = openEngageIntake;

function renderEngageSelfCheck() {
  if (engageSelfCheckRendered) return;
  engageSelfCheckRendered = true;

  const mount = document.getElementById('engageSelfCheck');
  const quick = getEngageConfig().freeResources?.quickAssessment || {};
  const dims = quick.dimensions || [];
  if (!mount || !dims.length) return;

  const quickQuestions = dims.map((dim, index) => `
    <fieldset class="engage-quick-q" data-quick-q="${dim.id}">
      <legend><span class="engage-quick-num">${index + 1}</span> ${dim.name}</legend>
      <p>${dim.question}</p>
      <div class="engage-quick-scale" role="radiogroup" aria-label="${dim.name}">
        ${[1, 2, 3, 4, 5].map((n) => `
          <label class="engage-quick-opt">
            <input type="radio" name="quick-${dim.id}" value="${n}" />
            <span>${n}</span>
          </label>`).join('')}
      </div>
      <div class="engage-quick-scale-labels"><span>Low exposure</span><span>High exposure</span></div>
    </fieldset>
  `).join('');

  mount.innerHTML = `
    <div class="engage-check-shell glass">
      <div class="section-kicker">Quick self-check</div>
      <h3>${quick.title || 'EDMP Quick Self-Check'}</h3>
      <p class="engage-check-lead">Five questions across decision memory dimensions. This is a directional self-check only — not the full EDMP maturity model.</p>
      <form id="engageQuickForm" class="engage-quick-form">${quickQuestions}</form>
      <div class="engage-quick-actions">
        <button type="button" class="btn btn-secondary" id="engageQuickScoreBtn">See my score</button>
      </div>
      <div id="engageQuickResult" class="engage-quick-result hidden" aria-live="polite"></div>
    </div>
  `;

  document.getElementById('engageQuickScoreBtn')?.addEventListener('click', () => {
    let sum = 0;
    let answered = 0;
    for (const dim of dims) {
      const picked = mount.querySelector(`input[name="quick-${dim.id}"]:checked`);
      if (!picked) continue;
      sum += Number(picked.value);
      answered += 1;
    }
    const result = document.getElementById('engageQuickResult');
    if (!result) return;
    if (answered < dims.length) {
      result.classList.remove('hidden');
      result.innerHTML = '<p class="engage-quick-warning">Please answer all five questions.</p>';
      return;
    }
    const score = Math.round((sum / (dims.length * 5)) * 100);
    const interp = interpretQuickScore(score);
    result.classList.remove('hidden');
    result.innerHTML = `
      <p class="engage-quick-score">Your organization scored: <strong>${score}/100</strong></p>
      <p class="engage-quick-band"><strong>${interp.band}</strong> — ${interp.detail}</p>
      <p class="engage-quick-score-note">Directional self-check only. Not the full scoring rubric, recommendations, or intervention roadmap.</p>
      <button type="button" class="btn btn-primary btn-cta" data-engage-product="assessment" data-source="engage-self-check">${quick.ctaLabel || 'Request full EDMP Readiness Assessment'}</button>
    `;
    result.querySelector('[data-engage-product]')?.addEventListener('click', (e) => {
      openEngageIntake(e.currentTarget.dataset.engageProduct, e.currentTarget.dataset.source);
    });
  });
}

function renderEngageSecondaryLinks() {
  const mount = document.getElementById('engageSecondaryLinks');
  const free = getEngageConfig().freeResources || {};
  if (!mount) return;
  const previewUrl = free.boardPackPreview?.downloadUrl || '#';
  mount.innerHTML = `
    <span>Need a short internal explainer? <button type="button" class="engage-secondary-link" data-engage-product="one-pager" data-source="engage-secondary">Request the executive one-pager</button>.</span>
    <span><a class="engage-secondary-link" href="${previewUrl}" download>Board Pack preview (PDF)</a></span>
    <span class="engage-secondary-muted">Decision Room experiential sessions available after executive briefing.</span>
    <span><button type="button" class="engage-secondary-link" data-open-assessment-preview>EDMP assessment preview</button></span>
  `;
  mount.querySelector('[data-open-assessment-preview]')?.addEventListener('click', () => navigateToView('edmp-assessment'));
  mount.querySelectorAll('[data-engage-product]').forEach((btn) => {
    btn.addEventListener('click', () => openEngageIntake(btn.dataset.engageProduct, btn.dataset.source));
  });
}

function renderEngage() {
  renderEngageSelfCheck();
  if (engageRendered) return;
  engageRendered = true;
  applyLegalMerchantInfo();

  const config = getEngageConfig();
  const grid = document.getElementById('engageGrid');
  if (!grid) return;

  const productsById = Object.fromEntries((config.products || []).map((p) => [p.id, p]));
  const programs = ENGAGE_PROGRAM_IDS.map((id) => productsById[id]).filter(Boolean);

  grid.innerHTML = programs.map((product) => {
    const display = ENGAGE_PROGRAM_DISPLAY[product.id] || {};
    const bullets = (display.bullets || (product.youReceive || []).slice(0, 3))
      .map((item) => `<li>${item}</li>`).join('');
    const intakeDetails = (product.intake || [])
      .map((item, index) => `<li><span class="engage-step-num">${index + 1}</span>${item}</li>`).join('');
    const audience = product.audience
      ? `<p class="engage-product-audience">${product.audience}</p>` : '';
    const positioning = display.positioning || product.subtitle;
    const cta = display.cta || 'Request program';
    const notIncluded = product.notIncluded
      ? `<p class="engage-product-scope-note">${product.notIncluded.split('.')[0]}.</p>` : '';
    return `
      <article class="engage-product-card glass engage-product-card-clean" data-engage-product-card="${product.id}">
        <div class="engage-product-head">
          <h3>${product.title}</h3>
          <p class="engage-product-positioning">${positioning}</p>
          ${audience}
        </div>
        <div class="engage-product-price">
          <strong>${product.priceLabel}</strong>
          <span>${product.priceNote}</span>
        </div>
        <ul class="engage-product-list engage-product-list-compact">${bullets}</ul>
        <p class="engage-product-timeline"><span>Timeline</span> ${product.timeline}</p>
        ${notIncluded}
        <details class="engage-product-details">
          <summary>Delivery details</summary>
          <ol class="engage-intake-list">${intakeDetails}</ol>
        </details>
        <div class="engage-product-actions">
          <button type="button" class="btn btn-primary btn-cta" data-engage-product="${product.id}" data-source="engage-program">${cta}</button>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-engage-product]').forEach((btn) => {
    btn.addEventListener('click', () => openEngageIntake(btn.dataset.engageProduct, btn.dataset.source));
  });

  renderEngageSecondaryLinks();

  document.querySelectorAll('[data-scroll-engage-check]').forEach((btn) => {
    btn.addEventListener('click', scrollToEngageSelfCheck);
  });
  document.querySelectorAll('#engageFinalCta [data-engage-product]').forEach((btn) => {
    btn.addEventListener('click', () => openEngageIntake(btn.dataset.engageProduct, btn.dataset.source));
  });
}

function getPaidProductId() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('payment') !== 'success') return null;
  return params.get('product') || null;
}

function updateEngageThankYou() {
  const productId = getPaidProductId();
  const config = getEngageConfig();
  const product = productId ? (config.products || []).find(p => p.id === productId) : null;

  const title = document.getElementById('engageThankYouTitle');
  const body = document.getElementById('engageThankYouBody');
  const intakeBtn = document.getElementById('engageThankYouIntake');
  const emailLink = document.getElementById('engageThankYouEmail');
  const merchantEmail = config.merchant?.email || 'info@aielevate.xyz';

  if (emailLink) {
    emailLink.href = `mailto:${merchantEmail}`;
    emailLink.textContent = merchantEmail;
  }

  if (product && title) {
    title.textContent = `Thank you — ${product.title} is being activated`;
  } else if (title) {
    title.textContent = 'Thank you — your program is being activated';
  }

  if (product && body) {
    if (product.id === 'decision-room') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      body.textContent = token
        ? `Payment confirmed for ${product.title}. Your access token is ready — enter the Decision Room below.`
        : `Payment confirmed for ${product.title}. Your session access token will be emailed within 1 business day. ${product.timeline}.`;
    } else {
      body.textContent = `Payment confirmed for ${product.title}. Complete the intake form to start delivery. ${product.timeline}.`;
    }
  } else if (body) {
    body.textContent = `We received your payment. You will hear from ${merchantEmail} within one business day.`;
  }

  if (intakeBtn) {
    const params = new URLSearchParams(window.location.search);
    const roomToken = params.get('token');
    if (product?.id === 'decision-room' && roomToken) {
      intakeBtn.href = `${window.location.pathname}?token=${encodeURIComponent(roomToken)}#decision-room`;
      intakeBtn.classList.remove('hidden');
      intakeBtn.textContent = 'Enter Decision Room';
    } else if (product?.id === 'assessment' && roomToken) {
      intakeBtn.href = `${window.location.pathname}?token=${encodeURIComponent(roomToken)}#edmp-assessment`;
      intakeBtn.classList.remove('hidden');
      intakeBtn.textContent = 'Enter EDMP Assessment';
    } else if (product?.intakeFormUrl) {
      intakeBtn.href = product.intakeFormUrl;
      intakeBtn.classList.remove('hidden');
      intakeBtn.textContent = 'Complete intake form';
    } else {
      intakeBtn.classList.add('hidden');
      intakeBtn.removeAttribute('href');
      if (product && product.id !== 'decision-room' && body) {
        body.textContent += ` Intake form link will be emailed from ${merchantEmail} within 1 business day (Typeform URL not configured yet).`;
      }
    }
  }
}

function setEngageThankYouVisible(show) {
  const banner = document.getElementById('engageThankYou');
  if (!banner) return;
  if (show) updateEngageThankYou();
  banner.classList.toggle('hidden', !show);
}

function isEngageThankYouRoute() {
  const hash = (window.location.hash || '').replace('#', '').toLowerCase();
  if (hash === 'engage-thanks') return true;
  const params = new URLSearchParams(window.location.search);
  return params.get('payment') === 'success';
}

function handleStaticRoute() {
  const hash = (window.location.hash || '').replace('#', '').toLowerCase();
  const thankYou = isEngageThankYouRoute();
  if (hash === 'engage' || hash === 'engage-thanks' || thankYou) {
    renderEngage();
    showView('engage');
    setEngageThankYouVisible(thankYou);
    if (thankYou) window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }
  if (hash === 'privacy' || hash === 'terms') {
    applyLegalMerchantInfo();
    showView(hash);
    return true;
  }
  if (hash === 'decision-room') {
    showView('decision-room');
    return true;
  }
  if (hash === 'edmp-assessment') {
    showView('edmp-assessment');
    return true;
  }
  const insightMatch = insights.find(i => i.id === hash || i.slug === hash);
  if (insightMatch) {
    history.replaceState(null, '', '#' + insightMatch.id);
    openInsightArticle(insightMatch.id);
    return true;
  }
  const consultancyHashes = ['services', 'partners', 'edmp', 'about', 'contact', 'home', 'insights', 'library', 'cases'];
  if (consultancyHashes.includes(hash)) {
    showView(hash === 'home' ? 'platform' : hash);
    return true;
  }
  setEngageThankYouVisible(false);
  return false;
}

function showView(viewId) {
  if (viewId === 'library') ensureLibraryRendered();
  if (viewId === 'engage') {
    renderEngage();
    if (!isEngageThankYouRoute()) setEngageThankYouVisible(false);
  } else {
    setEngageThankYouVisible(false);
  }

  document.body.classList.toggle('decision-room-mode', viewId === 'decision-room');
  document.body.classList.toggle('edmp-assessment-mode', viewId === 'edmp-assessment');
  if (viewId === 'decision-room' && window.DecisionRoom) {
    window.DecisionRoom.onViewActive();
  }
  if (viewId === 'edmp-assessment' && window.EdmpAssessment) {
    window.EdmpAssessment.onViewActive();
  }

  views.forEach(view => view.classList.toggle('active-view', view.id === viewId));
  const edmpCluster = ['edmp', 'library', 'cases', 'engage', 'decision-room', 'edmp-assessment'];
  const insightsCluster = ['insights', 'insight-article'];
  navButtons.forEach(btn => {
    if (btn.dataset.view === 'platform') {
      btn.classList.toggle('active', viewId === 'platform');
    } else if (btn.dataset.view === 'edmp') {
      btn.classList.toggle('active', edmpCluster.includes(viewId));
    } else if (btn.dataset.view === 'insights') {
      btn.classList.toggle('active', insightsCluster.includes(viewId));
    } else {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    }
  });
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
  const prefooterShell = document.querySelector('.prefooter-shell');
  if (prefooterShell) {
    prefooterShell.style.display = ['engage', 'privacy', 'terms', 'decision-room', 'edmp-assessment', 'insight-article'].includes(viewId) ? 'none' : '';
  }

  const target = document.getElementById(viewId);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function navigateToView(viewId) {
  const hashRoutes = {
    platform: '#',
    services: '#services',
    partners: '#partners',
    edmp: '#edmp',
    about: '#about',
    contact: '#contact',
    insights: '#insights',
    engage: '#engage',
    privacy: '#privacy',
    terms: '#terms',
    'decision-room': '#decision-room',
    'edmp-assessment': '#edmp-assessment',
    library: '#library',
    cases: '#cases',
    'insight-1': '#insight-1',
    'insight-2': '#insight-2',
    'insight-3': '#insight-3',
    'insight-4': '#insight-4',
    'insight-5': '#insight-5',
    'insight-6': '#insight-6',
  };
  const insightItem = insights.find(i => i.id === viewId);
  if (insightItem) {
    history.pushState(null, '', '#' + insightItem.id);
    openInsightArticle(insightItem.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (hashRoutes[viewId] === '#') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  } else if (hashRoutes[viewId]) {
    history.replaceState(null, '', hashRoutes[viewId]);
  } else if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  if (viewId === 'privacy' || viewId === 'terms') applyLegalMerchantInfo();
  if (viewId === 'contact') {
    const intent = window.__aieContactIntent;
    const need = document.getElementById('consultNeed');
    if (intent === 'scan' && need) need.value = 'Capability diagnosis';
    if (intent === 'partnership' && need) need.value = 'Implementation partnership';
    window.__aieContactIntent = '';
  }
  showView(viewId);
  closeOverlayPanel();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.navigateToView = navigateToView;
navButtons.forEach(btn => btn.addEventListener('click', () => navigateToView(btn.dataset.view)));
footerNavButtons.forEach(btn => btn.addEventListener('click', () => navigateToView(btn.dataset.view)));
jumpButtons.forEach(btn => btn.addEventListener('click', () => navigateToView(btn.dataset.view)));

document.addEventListener('click', (event) => {
  const intentBtn = event.target.closest('[data-contact-intent]');
  if (intentBtn) {
    window.__aieContactIntent = intentBtn.dataset.contactIntent || '';
  }
  const btn = event.target.closest('[data-view]');
  if (!btn) return;
  if (btn.matches('.nav-btn, .jump-btn, .nav-btn-link')) return;
  const viewId = btn.dataset.view;
  if (!viewId) return;
  event.preventDefault();
  navigateToView(viewId);
});

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
  if (!overlay) return;
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  if (overlayContent) overlayContent.innerHTML = '';
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
  const engageProduct = options.engageProduct || '';
  const engageMeta = engageProduct ? ENGAGE_INTAKE_META[engageProduct] : null;
  const meta = engageMeta
    ? {
      label: engageMeta.label,
      subject: engageMeta.subject,
      intro: engageMeta.intro,
      button: engageMeta.button,
    }
    : (intakeTypeMeta[type] || intakeTypeMeta.contact);
  const domain = options.domain || '';
  const context = options.context || engageMeta?.reason || '';
  const source = options.source || 'site';
  const challengePlaceholder = type === 'demo'
    ? 'Describe the operating pressure, decision bottleneck, or cockpit you want to see live.'
    : 'Describe the challenge, cockpit interest, or reason for contacting AI Elevate.';
  const heading = engageMeta
    ? `Request ${engageMeta.label}`
    : (type === 'demo' ? 'Request an executive briefing' : 'Start an EDMP conversation');
  const reasonOptions = engageMeta
    ? `<option value="${escapeHtml(engageMeta.reason)}" selected>${escapeHtml(engageMeta.reason)}</option>`
    : (type === 'demo' ? `
                <option value="Live cockpit walkthrough">Live cockpit walkthrough</option>
                <option value="Use-case specific demo">Use-case specific demo</option>
                <option value="Case journey review">Case journey review</option>
                <option value="Executive operating model review">Executive operating model review</option>
              ` : `
                <option value="Discuss a cockpit">Discuss a cockpit</option>
                <option value="Explore a use case">Explore a use case</option>
                <option value="Partnership / design inquiry">Partnership / design inquiry</option>
                <option value="General inquiry">General inquiry</option>
              `);
  return `
    <div class="intake-form-shell">
      <div class="form-meta">${meta.label} · EDMP intake</div>
      <h2>${heading}</h2>
      <p>${meta.intro}</p>
      <div class="intake-helper">The form stays local and opens a prefilled email draft to <strong>info@aielevate.xyz</strong>. This keeps the experience usable today and ready for future backend or CRM connection.</div>
      <form id="intakeForm" data-intake-form="${type}" data-source="${escapeHtml(source)}" data-context="${escapeHtml(context)}"${engageProduct ? ` data-engage-product="${escapeHtml(engageProduct)}"` : ''}>
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
              ${reasonOptions}
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
        <div class="form-disclaimer">Source: ${escapeHtml(source)}${engageProduct ? ` · Product: ${escapeHtml(engageProduct)}` : ''}${context ? ` · Context: ${escapeHtml(context)}` : ''}</div>
      </form>
    </div>
  `;
}

function resolveDomainLabel(domainAttr) {
  if (!domainAttr) return '';
  const byId = cockpitData.find(entry => entry.id === domainAttr);
  if (byId) return byId.domain;
  return domainAttr;
}

function resolveDomainKey(domainAttr) {
  if (!domainAttr) {
    return typeof getCurrentTopDomainKey === 'function' ? getCurrentTopDomainKey() : 'governance';
  }
  const byId = cockpitData.find(entry => entry.id === domainAttr);
  if (byId) return byId.id;
  const byLabel = cockpitData.find(entry => entry.domain === domainAttr);
  if (byLabel) return byLabel.id;
  return 'governance';
}

function getNavLabel(el) {
  return (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function goToCases(domainKey) {
  const key = domainKey || resolveDomainKey();
  navigateToView('cases');
  if (typeof selectCase === 'function') selectCase(key);
  const journey = document.querySelector('.journey-panel') || document.getElementById('cases');
  if (journey) {
    window.setTimeout(() => journey.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

function goToLibrary(domainKey) {
  if (domainKey) {
    navigateToDomain(domainKey);
    return;
  }
  navigateToView('library');
  const grid = document.getElementById('cockpitGrid') || document.getElementById('library');
  if (grid) window.setTimeout(() => grid.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function initNavigationIntegrity() {
  document.addEventListener('click', (event) => {
    const el = event.target.closest('a, button');
    if (!el || el.closest('#engage')) return;

    const label = getNavLabel(el);

    if (label === 'explore edmp') {
      event.preventDefault();
      event.stopPropagation();
      if (el.dataset.view === 'edmp') navigateToView('edmp');
      else goToLibrary();
      return;
    }

    if (label === 'see use environments') {
      event.preventDefault();
      event.stopPropagation();
      const domainKey = el.id === 'domainLiveBtn' ? getCurrentTopDomainKey() : null;
      goToLibrary(domainKey);
      return;
    }

    if (label === 'review the architecture' || label === 'review architecture') {
      event.preventDefault();
      event.stopPropagation();
      goToCases(resolveDomainKey(el.dataset.domain));
      return;
    }
  }, true);

  document.querySelectorAll('a.btn-primary.btn-cta, a.btn-primary#conceptDemoBtn').forEach(el => {
    if (getNavLabel(el) === 'request executive briefing' && !el.dataset.openIntake) {
      el.dataset.openIntake = 'demo';
      if (!el.dataset.source) el.dataset.source = 'site';
    }
  });
}

function openIntakeFromTrigger(trigger) {
  const type = trigger.dataset.openIntake || 'contact';
  const domain = resolveDomainLabel(trigger.dataset.domain || '');
  const context = trigger.dataset.intakeContext || trigger.textContent.trim();
  const source = trigger.dataset.source || 'site';
  openOverlay(intakeFormHTML({ type, domain, context, source }));
  window.setTimeout(() => enforceSelectContrast(overlayContent), 0);
}

function submitIntakeForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const type = form.dataset.intakeForm || 'contact';
  const engageProduct = form.dataset.engageProduct || '';
  const engageMeta = engageProduct ? ENGAGE_INTAKE_META[engageProduct] : null;
  const meta = engageMeta
    ? { subject: engageMeta.subject }
    : (intakeTypeMeta[type] || intakeTypeMeta.contact);
  const lines = [
    'Hi AI Elevate,',
    '',
    engageMeta
      ? `I would like to request: ${engageMeta.label}.`
      : (type === 'demo' ? 'I would like to request a demo.' : 'I would like to get in touch.'),
    '',
    ...(engageProduct ? [`Product: ${engageProduct}`, `Program: ${engageMeta?.label || engageProduct}`, ''] : []),
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

if (closeOverlay) closeOverlay.addEventListener('click', closeOverlayPanel);
if (overlay) overlay.addEventListener('click', (event) => {
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

if (overlayContent) overlayContent.addEventListener('submit', (event) => {
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
  const grid = document.getElementById('insightGrid');
  if (!grid) return;
  grid.innerHTML = insights.map(item => `
    <article class="insight-card glass" data-insight="${item.id}" data-filter="${item.filter}">
      <div class="insight-card-media"><img src="${item.image}" alt="${item.alt}" style="object-position:${item.focal}" loading="lazy" /></div>
      <div class="insight-card-body">
        <span class="insight-card-cat">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <span class="insight-card-relevance">${item.relevance}</span>
        <button class="card-link" type="button">Read insight</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-insight]').forEach(card => {
    card.addEventListener('click', () => {
      const item = insights.find(e => e.id === card.dataset.insight);
      if (item) navigateToView(item.id);
    });
  });

  document.querySelectorAll('.insight-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.insight-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      grid.querySelectorAll('.insight-card').forEach(c => {
        c.style.display = (f === 'all' || c.dataset.filter === f) ? '' : 'none';
      });
    });
  });
}

function openInsightArticle(insightId) {
  const item = insights.find(e => e.id === insightId);
  if (!item) return;
  const article = insightArticles[insightId];
  if (!article) return;
  const hero = document.getElementById('insightArticleHero');
  const cat = document.getElementById('insightArticleCat');
  const titleEl = document.getElementById('insightArticleTitle');
  const deckEl = document.getElementById('insightArticleDeck');
  const body = document.getElementById('insightArticleBody');
  if (hero) hero.style.backgroundImage = 'url(' + item.image + ')';
  if (hero) hero.style.backgroundPosition = item.focal;
  if (cat) cat.textContent = item.category;
  if (titleEl) titleEl.textContent = item.title;
  if (deckEl) deckEl.textContent = item.deck;
  if (body) body.innerHTML = article;
  showView('insight-article');
}


function applyHardDomFixes() {
  document.querySelectorAll('.footer-cockpit-link[data-domain-jump]').forEach(btn => {
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
  const footerBtn = event.target.closest('.footer-cockpit-link[data-domain-jump]');
  if (footerBtn) {
    event.preventDefault();
    event.stopPropagation();
    navigateToDomain(footerBtn.dataset.domainJump);
  }
});


window.addEventListener('hashchange', () => {
  if (handleStaticRoute()) return;
  const hash = (window.location.hash || '').replace('#', '');
  if (hash.startsWith('env-')) {
    navigateToDomain(hash.replace('env-', ''));
  }
});

window.addEventListener('load', () => {
  enforceSelectContrast(document);
  applyHardDomFixes();
  const hash = (window.location.hash || '').replace('#', '');
  applyLegalMerchantInfo();
  if (handleStaticRoute()) return;
  showView('platform');
  if (hash && hash.startsWith('env-')) {
    navigateToDomain(hash.replace('env-', ''));
  }
});


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
      goToLibrary(getCurrentTopDomainKey());
    });
  }
}

function initBrandHome() {
  const brandHome = document.querySelector('.brand-home');
  if (!brandHome) return;

  brandHome.addEventListener('click', () => {
    closeOverlayPanel();
    setEngageThankYouVisible(false);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    showView('platform');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const topbar = document.querySelector('.topbar');
    const toggle = document.getElementById('mobileMenuToggle');
    if (topbar?.classList.contains('menu-open')) {
      topbar.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

window.addEventListener('load', () => {
  initNavigationIntegrity();
  initMobileHeaderBehavior();
  bindRouteIntegrity();
  initBrandHome();
  initConsultContactForm();
});

window.navigateToView = navigateToView;
window.showView = showView;
window.handleStaticRoute = handleStaticRoute;

function initConsultContactForm() {
  const form = document.getElementById('consultContactForm');
  if (!form) return;
  const errorEl = document.getElementById('consultContactError');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (errorEl) errorEl.textContent = '';
    const name = (document.getElementById('consultName')?.value || '').trim();
    const org = (document.getElementById('consultOrg')?.value || '').trim();
    const role = (document.getElementById('consultRole')?.value || '').trim();
    const email = (document.getElementById('consultEmail')?.value || '').trim();
    const situation = (document.getElementById('consultSituation')?.value || '').trim();
    const need = (document.getElementById('consultNeed')?.value || '').trim();
    const next = (document.getElementById('consultNext')?.value || '').trim();
    if (!name || !org || !role || !email || !situation || !need) {
      if (errorEl) errorEl.textContent = 'Please complete all required fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errorEl) errorEl.textContent = 'Please enter a valid business email.';
      return;
    }
    const subject = encodeURIComponent(`AI Elevate enquiry — ${need}`);
    const body = encodeURIComponent(
      `Hi AI Elevate,\n\nI would like to request a focused conversation.\n\nName: ${name}\nOrganisation: ${org}\nRole: ${role}\nBusiness email: ${email}\nPrimary need: ${need}\nPreferred next step: ${next || 'n/a'}\n\nCurrent situation:\n${situation}\n`
    );
    window.location.href = `mailto:info@aielevate.xyz?subject=${subject}&body=${body}`;
  });
}
