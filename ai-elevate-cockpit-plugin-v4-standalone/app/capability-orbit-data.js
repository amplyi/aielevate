/**
 * AI Elevate. Canonical organisational AI capability model
 * Source for Home pillars, Capability nav, and deep pages.
 * Not a duplicate of #homeConstellation (five domain proposition).
 */
(function (global) {
 'use strict';

 const CAPABILITY_ORBIT_DATA = {
 center: {
 id: 'centre',
 label: 'Organisational AI capability',
 logo: 'assets/ae-logo-orbit.png',
 alt: 'AI Elevate AE logo'
 },
 focusStorageKey: 'aie_capability_focus',
 domains: [
 {
 id: 'business',
 route: 'business-ready',
 contactIntent: 'business-ready',
 visualMode: 'structural',
 label: 'Business Ready',
 shortLabel: 'Business',
 accent: 'warm',
 color: '#d4a574',
 glow: 'rgba(212, 165, 116, 0.55)',
 exploreLabel: 'Explore Business Ready',
 marble: {
 highlight: '#fff6e8',
 light: '#f0d2a8',
 mid: '#d4a574',
 rich: '#b8844f',
 deep: '#6e4a2c',
 core: '#2a1a10'
 },
 orbitRadius: 380,
 baseAngle: -1.57,
 spinSpeed: 0.00011,
 tooltip: {
 title: 'Business Ready',
 body: 'Organisational AI capability starts with business readiness: priorities, decision rights, value measures and the operating conditions required for AI to create durable outcomes, not another disconnected initiative.'
 },
 deepContent: {
 heroLead: 'AI capability starts with organisational readiness.',
 whyMatters: 'Business readiness establishes why AI should exist in the organisation, where authority sits, what value means, which risks are acceptable and under what conditions capability can scale.',
 edmpNote: 'Where decision integrity and institutional memory matter, EDMP shows how signals, evidence, ownership and follow through can remain inspectable as AI increases decision velocity.'
 },
 serviceMappings: [
 { stage: 'Orient', intent: 'orientation', goto: 0 },
 { stage: 'Diagnose', intent: 'scan', goto: 1 },
 { stage: 'Design', intent: 'design', goto: 2 },
 { stage: 'Govern', intent: 'govern', goto: 3 }
 ],
 insightMappings: {
 filters: ['strategy-value', 'governance', 'operating-model'],
 insightIds: ['insight-2', 'insight-3', 'insight-5', 'insight-1']
 },
 showEdmp: true,
 satellites: [
 {
 id: 'strategy',
 label: 'Strategy',
 orbit: 128,
 phase: 0.2,
 speed: 0.00042,
 exploreLabel: 'Explore Strategy',
 tooltip: {
 title: 'Strategy',
 body: 'AI strategy only becomes executable when ambition is translated into priorities, ownership and sequenced organisational design. AI Elevate helps leadership connect intent to an implementable capability model.'
 },
 leadershipQuestion: 'Which organisational priorities should AI serve first, and who owns the sequence?',
 absenceConsequence: 'Without strategy, tools proliferate while investment, ownership and value measures stay fragmented.',
 relatedCapabilities: ['enterprise-platforms', 'value', 'governance'],
 contactContext: 'Business Ready: Strategy'
 },
 {
 id: 'governance',
 label: 'Governance',
 orbit: 128,
 phase: 1.25,
 speed: 0.00038,
 exploreLabel: 'Explore Governance',
 tooltip: {
 title: 'Governance',
 body: 'Governance must be designed with the use case, not bolted on after deployment. AI Elevate helps establish decision rights, oversight and escalation that travel with the work.'
 },
 leadershipQuestion: 'Which decisions require named oversight, evidence and escalation before AI assistance becomes routine?',
 absenceConsequence: 'Without governance, accountability blurs, risk accumulates and controls arrive as costly rework.',
 relatedCapabilities: ['human-authority', 'risk', 'decision-design'],
 contactContext: 'Business Ready: Governance'
 },
 {
 id: 'decision-design',
 label: 'Decision Design',
 orbit: 128,
 phase: 2.3,
 speed: 0.00045,
 exploreLabel: 'Explore Decision Design',
 tooltip: {
 title: 'Decision Design',
 body: 'AI changes how decisions form. AI Elevate helps organisations define which decisions AI may support, what evidence is required, and where human judgement remains decisive.'
 },
 leadershipQuestion: 'Which decisions may AI support, and where must human judgement remain decisive?',
 absenceConsequence: 'Without decision design, AI accelerates activity while ownership, thresholds and evidence stay undefined.',
 relatedCapabilities: ['agents', 'human-authority', 'governance'],
 contactContext: 'Business Ready: Decision Design'
 },
 {
 id: 'value',
 label: 'Value',
 orbit: 128,
 phase: 3.35,
 speed: 0.0004,
 exploreLabel: 'Explore Value',
 tooltip: {
 title: 'Value',
 body: 'Adoption metrics are not value. AI Elevate helps define measurable outcomes, evidence requirements and the operating rhythm that shows whether AI is improving business performance.'
 },
 leadershipQuestion: 'What observable outcomes would prove AI is creating material organisational value?',
 absenceConsequence: 'Without value measures, programmes report activity while leadership cannot defend investment or stop weak use cases.',
 relatedCapabilities: ['data', 'strategy', 'scalability'],
 contactContext: 'Business Ready: Value'
 },
 {
 id: 'risk',
 label: 'Risk',
 orbit: 128,
 phase: 4.4,
 speed: 0.00036,
 exploreLabel: 'Explore Risk',
 tooltip: {
 title: 'Risk',
 body: 'AI risk is organisational as well as technical. AI Elevate connects risk posture to architecture, accountability and escalation so exposure remains proportional as capability expands.'
 },
 leadershipQuestion: 'Which AI exposures are acceptable, and which require stronger controls before scale?',
 absenceConsequence: 'Without a risk posture, either innovation stalls under blanket restriction or exposure grows unchecked.',
 relatedCapabilities: ['governance', 'agents', 'scalability'],
 contactContext: 'Business Ready: Risk'
 },
 {
 id: 'scalability',
 label: 'Scalability',
 orbit: 128,
 phase: 5.45,
 speed: 0.00041,
 exploreLabel: 'Explore Scalability',
 tooltip: {
 title: 'Scalability',
 body: 'AI capability must remain governable as adoption expands. AI Elevate connects operating model, governance and architecture so successful AI initiatives can scale beyond isolated pilots.'
 },
 leadershipQuestion: 'What must be true before a successful pilot becomes an enterprise capability?',
 absenceConsequence: 'Without scalable design, pilots succeed locally while the organisation cannot repeat, govern or improve them.',
 relatedCapabilities: ['enterprise-platforms', 'change', 'governance'],
 contactContext: 'Business Ready: Scalability'
 }
 ]
 },
 {
 id: 'adoption',
 route: 'user-adoption',
 contactIntent: 'user-adoption',
 visualMode: 'human',
 label: 'User Adoption',
 shortLabel: 'Adoption',
 accent: 'cyan',
 color: '#8fd3ff',
 glow: 'rgba(143, 211, 255, 0.55)',
 exploreLabel: 'Explore User Adoption',
 marble: {
 highlight: '#f2fbff',
 light: '#bfe6ff',
 mid: '#8fd3ff',
 rich: '#5ba8e0',
 deep: '#2a6f9a',
 core: '#0b2438'
 },
 orbitRadius: 380,
 baseAngle: 2.62,
 spinSpeed: -0.00009,
 tooltip: {
 title: 'User Adoption',
 body: 'Sustainable adoption requires skills, change, engagement and explicit human authority, not licences alone. AI Elevate helps organisations turn tool uptake into accountable, improvable practice.'
 },
 deepContent: {
 heroLead: 'Adoption becomes capability when people can work differently with AI.',
 whyMatters: 'User adoption is the organisational ability to turn AI use into accountable and improvable practice. Licence activation is not adoption. Capability appears when roles, judgement, escalation and learning move with the tools.',
 edmpNote: null
 },
 serviceMappings: [
 { stage: 'Diagnose', intent: 'scan', goto: 1 },
 { stage: 'Accompany', intent: 'accompany', goto: 4 }
 ],
 insightMappings: {
 filters: ['operating-model', 'governance', 'strategy-value'],
 insightIds: ['insight-1', 'insight-3', 'insight-2']
 },
 showEdmp: false,
 satellites: [
 {
 id: 'enablement',
 label: 'Enablement',
 orbit: 128,
 phase: 0.4,
 speed: 0.00048,
 exploreLabel: 'Explore Enablement',
 tooltip: {
 title: 'Enablement',
 body: 'Enablement succeeds when people understand both the tools and the decisions those tools affect. AI Elevate helps design enablement that reinforces accountability and operating standards.'
 },
 leadershipQuestion: 'What must people understand about decisions, standards and escalation, not only about the tool?',
 absenceConsequence: 'Without enablement, usage rises while quality, accountability and operating standards stay uneven.',
 relatedCapabilities: ['skills', 'copilots', 'engagement'],
 contactContext: 'User Adoption: Enablement'
 },
 {
 id: 'skills',
 label: 'Skills',
 orbit: 128,
 phase: 1.45,
 speed: 0.00044,
 exploreLabel: 'Explore Skills',
 tooltip: {
 title: 'Skills',
 body: 'AI skills must include judgement, verification and escalation, not only prompting. AI Elevate helps organisations build the workforce capability needed for responsible AI supported work.'
 },
 leadershipQuestion: 'Which judgement, verification and escalation skills does the workforce need as AI assistance expands?',
 absenceConsequence: 'Without skills beyond prompting, organisations amplify output without improving decision quality.',
 relatedCapabilities: ['copilots', 'enablement', 'human-authority'],
 contactContext: 'User Adoption: Skills'
 },
 {
 id: 'change',
 label: 'Change',
 orbit: 128,
 phase: 2.5,
 speed: 0.00039,
 exploreLabel: 'Explore Change',
 tooltip: {
 title: 'Change',
 body: 'AI changes roles, workflows and decision paths. AI Elevate helps plan organisational change so adoption is sustained, governed and connected to business outcomes.'
 },
 leadershipQuestion: 'Which roles, workflows and decision paths must change for AI use to become lasting practice?',
 absenceConsequence: 'Without change design, tools arrive while the organisation keeps operating as if nothing has shifted.',
 relatedCapabilities: ['collaboration', 'scalability', 'engagement'],
 contactContext: 'User Adoption: Change'
 },
 {
 id: 'engagement',
 label: 'Engagement',
 orbit: 128,
 phase: 3.55,
 speed: 0.00043,
 exploreLabel: 'Explore Engagement',
 tooltip: {
 title: 'Engagement',
 body: 'Engagement without ownership creates activity without accountability. AI Elevate helps leaders keep people engaged while clarifying who decides, who escalates and what good looks like.'
 },
 leadershipQuestion: 'How will people stay engaged while ownership, escalation and quality standards remain explicit?',
 absenceConsequence: 'Without engaged ownership, adoption becomes activity theatre rather than accountable practice.',
 relatedCapabilities: ['automation', 'collaboration', 'human-authority'],
 contactContext: 'User Adoption: Engagement'
 },
 {
 id: 'human-authority',
 label: 'Human Authority',
 orbit: 128,
 phase: 4.6,
 speed: 0.00037,
 exploreLabel: 'Explore Human Authority',
 tooltip: {
 title: 'Human Authority',
 body: 'AI can expand organisational capability without removing human accountability. AI Elevate helps define where judgement, escalation and decision authority remain explicitly human.'
 },
 leadershipQuestion: 'Where must judgement, escalation and decision authority remain explicitly human as AI assistance grows?',
 absenceConsequence: 'Without designed human authority, AI recommendations blur responsibility and weaken defensible decision making.',
 relatedCapabilities: ['governance', 'agents', 'decision-design'],
 contactContext: 'User Adoption: Human Authority'
 },
 {
 id: 'collaboration',
 label: 'Collaboration',
 orbit: 128,
 phase: 5.65,
 speed: 0.00046,
 exploreLabel: 'Explore Collaboration',
 tooltip: {
 title: 'Collaboration',
 body: 'Cross functional collaboration is required for AI to create enterprise value. AI Elevate helps connect business, technology, risk and delivery roles around shared outcomes and decision rights.'
 },
 leadershipQuestion: 'How will business, technology, risk and delivery roles share outcomes and decision rights?',
 absenceConsequence: 'Without collaboration, AI work stays trapped in local teams while enterprise value remains unrealised.',
 relatedCapabilities: ['change', 'enterprise-platforms', 'engagement'],
 contactContext: 'User Adoption: Collaboration'
 }
 ]
 },
 {
 id: 'technologies',
 route: 'ai-technologies',
 contactIntent: 'ai-technologies',
 visualMode: 'architectural',
 label: 'AI Technologies',
 shortLabel: 'Technologies',
 accent: 'violet',
 color: '#8f9aff',
 glow: 'rgba(143, 154, 255, 0.55)',
 exploreLabel: 'Explore AI Technologies',
 marble: {
 highlight: '#f4f5ff',
 light: '#c5caff',
 mid: '#8f9aff',
 rich: '#6b74e0',
 deep: '#3c4498',
 core: '#14183a'
 },
 orbitRadius: 380,
 baseAngle: 0.52,
 spinSpeed: 0.00013,
 tooltip: {
 title: 'AI Technologies',
 body: 'Models, copilots, agents and platforms are means, not the capability itself. AI Elevate helps organisations select and govern technology choices from business requirements and organisational design.'
 },
 deepContent: {
 heroLead: 'Technology enables organisational AI capability. It does not define it.',
 whyMatters: 'AI technologies must remain subordinate to organisational purpose, architecture, governance and requirements. Vendor neutral advisory keeps platform choices connected to enterprise needs rather than to a single product roadmap.',
 edmpNote: 'EDMP is relevant where technology accelerates decisions that still need lineage, ownership continuity and accountable follow through.'
 },
 serviceMappings: [
 { stage: 'Design', intent: 'design', goto: 2 },
 { stage: 'Govern', intent: 'govern', goto: 3 }
 ],
 insightMappings: {
 filters: ['architecture', 'governance'],
 insightIds: ['insight-4', 'insight-5', 'insight-3']
 },
 showEdmp: true,
 satellites: [
 {
 id: 'models',
 label: 'Models',
 orbit: 128,
 phase: 0.1,
 speed: 0.0005,
 exploreLabel: 'Explore Models',
 tooltip: {
 title: 'Models',
 body: 'Model choice should follow use case requirements, data conditions and risk posture. AI Elevate helps keep model decisions connected to organisational priorities and governance.'
 },
 leadershipQuestion: 'Which model choices follow use case requirements, data conditions and risk posture rather than fashion?',
 absenceConsequence: 'Without model discipline, organisations accumulate tools that do not match priority decisions or controls.',
 relatedCapabilities: ['data', 'risk', 'governance'],
 contactContext: 'AI Technologies: Models'
 },
 {
 id: 'copilots',
 label: 'Copilots',
 orbit: 128,
 phase: 1.15,
 speed: 0.00047,
 exploreLabel: 'Explore Copilots',
 tooltip: {
 title: 'Copilots',
 body: 'Copilots amplify work only when roles, quality standards and escalation are designed. AI Elevate helps organisations move from licence rollout to governed, value bearing assistant use.'
 },
 leadershipQuestion: 'Where do copilots amplify valuable work, and which standards must surround that assistance?',
 absenceConsequence: 'Without designed copilots, licence rollout creates usage without lasting organisational capability.',
 relatedCapabilities: ['skills', 'enablement', 'human-authority'],
 contactContext: 'AI Technologies: Copilots'
 },
 {
 id: 'agents',
 label: 'Agents',
 orbit: 128,
 phase: 2.2,
 speed: 0.00043,
 exploreLabel: 'Explore Agents',
 tooltip: {
 title: 'Agents',
 body: 'Agents change the boundary between recommendation and action. AI Elevate helps define where agent autonomy is appropriate and how human oversight remains enforceable.'
 },
 leadershipQuestion: 'Where may agents act, and how does human oversight remain enforceable?',
 absenceConsequence: 'Without agent boundaries, autonomy expands faster than accountability and escalation design.',
 relatedCapabilities: ['decision-design', 'human-authority', 'risk'],
 contactContext: 'AI Technologies: Agents'
 },
 {
 id: 'automation',
 label: 'Automation',
 orbit: 128,
 phase: 3.25,
 speed: 0.00041,
 exploreLabel: 'Explore Automation',
 tooltip: {
 title: 'Automation',
 body: 'Automation creates leverage only when accountability and exception handling are designed with it. AI Elevate helps connect process automation to decision ownership and evidence.'
 },
 leadershipQuestion: 'Which processes should automate, and who owns exceptions when automation fails or drifts?',
 absenceConsequence: 'Without accountable automation, speed increases while ownership of exceptions disappears.',
 relatedCapabilities: ['engagement', 'value', 'governance'],
 contactContext: 'AI Technologies: Automation'
 },
 {
 id: 'data',
 label: 'Data',
 orbit: 128,
 phase: 4.3,
 speed: 0.00039,
 exploreLabel: 'Explore Data',
 tooltip: {
 title: 'Data',
 body: 'AI value depends on data quality, access and stewardship. AI Elevate helps connect data foundations to the use cases, controls and value measures that justify investment.'
 },
 leadershipQuestion: 'Which data foundations must be true before priority AI use cases can create defensible value?',
 absenceConsequence: 'Without data stewardship, models and copilots amplify weak evidence into confident error.',
 relatedCapabilities: ['value', 'models', 'governance'],
 contactContext: 'AI Technologies: Data'
 },
 {
 id: 'enterprise-platforms',
 label: 'Enterprise Platforms',
 orbit: 128,
 phase: 5.35,
 speed: 0.00045,
 exploreLabel: 'Explore Enterprise Platforms',
 tooltip: {
 title: 'Enterprise Platforms',
 body: 'Platform choices should follow organisational requirements, not reverse them. AI Elevate helps maintain strategic control across Microsoft, ERP, cloud and business application environments.'
 },
 leadershipQuestion: 'How will platform choices remain subordinate to organisational requirements across ecosystems?',
 absenceConsequence: 'Without platform independence, one vendor roadmap begins to define every organisational AI choice.',
 relatedCapabilities: ['strategy', 'scalability', 'collaboration'],
 contactContext: 'AI Technologies: Enterprise Platforms'
 }
 ]
 }
 ],
 relationships: [
 { from: 'governance', to: 'human-authority', label: 'Accountability' },
 { from: 'decision-design', to: 'agents', label: 'Authority boundary' },
 { from: 'skills', to: 'copilots', label: 'Workforce readiness' },
 { from: 'engagement', to: 'automation', label: 'Adoption with control' },
 { from: 'strategy', to: 'enterprise-platforms', label: 'Strategic control' },
 { from: 'value', to: 'data', label: 'Evidence of value' }
 ]
 };

 function findDomainByRoute(route) {
 const r = String(route || '').replace(/^#/, '').toLowerCase();
 return (CAPABILITY_ORBIT_DATA.domains || []).find((d) => d.route === r || d.id === r) || null;
 }

 function findDomainById(id) {
 return (CAPABILITY_ORBIT_DATA.domains || []).find((d) => d.id === id) || null;
 }

 function findSatellite(satId) {
 const domains = CAPABILITY_ORBIT_DATA.domains || [];
 for (let i = 0; i < domains.length; i++) {
 const sat = (domains[i].satellites || []).find((s) => s.id === satId);
 if (sat) return { domain: domains[i], satellite: sat };
 }
 return null;
 }

 function saveFocus(pillarId, capabilityId) {
 try {
 sessionStorage.setItem(CAPABILITY_ORBIT_DATA.focusStorageKey, JSON.stringify({
 pillar: pillarId || null,
 capability: capabilityId || null,
 ts: Date.now()
 }));
 } catch (_) { /* ignore */ }
 }

 function loadFocus() {
 try {
 const raw = sessionStorage.getItem(CAPABILITY_ORBIT_DATA.focusStorageKey);
 return raw ? JSON.parse(raw) : null;
 } catch (_) {
 return null;
 }
 }

 function clearFocus() {
 try {
 sessionStorage.removeItem(CAPABILITY_ORBIT_DATA.focusStorageKey);
 } catch (_) { /* ignore */ }
 }

 global.CAPABILITY_ORBIT_DATA = CAPABILITY_ORBIT_DATA;
 global.AIE_CAPABILITY = {
 findDomainByRoute: findDomainByRoute,
 findDomainById: findDomainById,
 findSatellite: findSatellite,
 saveFocus: saveFocus,
 loadFocus: loadFocus,
 clearFocus: clearFocus
 };
})(typeof window !== 'undefined' ? window : globalThis);
