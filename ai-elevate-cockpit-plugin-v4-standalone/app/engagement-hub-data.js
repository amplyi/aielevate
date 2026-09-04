/**
 * AI Elevate. Engagement Hub data (Phase 1)
 * Deterministic intent → content orchestration. No fabricated URLs or projects.
 */
(function (global) {
 'use strict';

 const ENGAGEMENT_HUB_DATA = {
 contactEmail: 'info@aielevate.xyz',
 contactPhone: '+31646438478',
 contactPhoneDisplay: '+31 6 46438478',
 linkedin: {
 company: {
 label: 'AI Elevate on LinkedIn',
 href: 'https://www.linkedin.com/company/aielevate-edmp/',
 note: 'Opens LinkedIn'
 },
 anthony: {
 label: "Anthony's LinkedIn",
 href: 'https://www.linkedin.com/in/anthony-van-lobbrecht-a98b443',
 note: 'Opens LinkedIn'
 }
 },
 /** Site-wide data-contact-intent → hub intentId */
 siteIntentMap: {
 orientation: 'strategy-governance',
 direction: 'strategy-governance',
 scan: 'adoption',
 design: 'strategy-governance',
 govern: 'strategy-governance',
 accompany: 'adoption',
 partnership: 'partnership',
 challenge: 'strategy-governance',
 'business-ready': 'business-ready',
 'user-adoption': 'user-adoption',
 'ai-technologies': 'ai-technologies'
 },
 intents: [
 {
 id: 'strategy-governance',
 label: 'AI strategy or governance',
 short: 'Strategy / governance'
 },
 {
 id: 'adoption',
 label: 'AI implementation / adoption challenge',
 short: 'Adoption challenge'
 },
 {
 id: 'business-ready',
 label: 'Business Ready capability',
 short: 'Business Ready'
 },
 {
 id: 'user-adoption',
 label: 'User Adoption capability',
 short: 'User Adoption'
 },
 {
 id: 'ai-technologies',
 label: 'AI Technologies capability',
 short: 'AI Technologies'
 },
 {
 id: 'edmp',
 label: 'Explore EDMP',
 short: 'EDMP'
 },
 {
 id: 'build',
 label: 'Explore what AI Elevate is building',
 short: 'What we build'
 },
 {
 id: 'partnership',
 label: 'Partnership',
 short: 'Partnership'
 },
 {
 id: 'consultant',
 label: 'Work directly with Anthony',
 short: 'Anthony'
 },
 {
 id: 'exploring',
 label: 'Just exploring',
 short: 'Exploring'
 }
 ],
 intentState: {
 'strategy-governance': {
 featuredDomain: 'talk',
 featuredSystems: ['edmp'],
 insightFilters: ['strategy-value', 'governance'],
 insightIds: ['insight-2', 'insight-3', 'insight-5'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss AI capability', action: 'open-form', payload: { topic: 'AI strategy and governance', engage: 'AI Elevate', need: 'Executive orientation' } },
 { label: 'Read governance insights', action: 'view', payload: { view: 'insights' } },
 { label: 'Explore EDMP', action: 'view', payload: { view: 'edmp' } }
 ],
 formDefaults: {
 topic: 'AI strategy and governance',
 stage: 'Planning',
 outcome: 'Clearer direction and decision rights for AI',
 engage: 'AI Elevate',
 need: 'Executive orientation',
 next: 'Focused strategy / governance conversation'
 }
 },
 adoption: {
 featuredDomain: 'talk',
 featuredSystems: ['edmp', 'gamma'],
 insightFilters: ['operating-model', 'strategy-value'],
 insightIds: ['insight-1', 'insight-2', 'insight-6'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss adoption challenge', action: 'open-form', payload: { topic: 'AI implementation and organisational adoption', engage: 'AI Elevate', need: 'Capability diagnosis' } },
 { label: 'Read adoption insight', action: 'insight', payload: { id: 'insight-1' } },
 { label: 'Explore services', action: 'view', payload: { view: 'services' } }
 ],
 formDefaults: {
 topic: 'AI implementation and organisational adoption',
 stage: 'Implementing',
 outcome: 'Adoption that becomes lasting organisational capability',
 engage: 'AI Elevate',
 need: 'Capability diagnosis',
 next: 'Opportunity Scan / capability discussion'
 }
 },
 'business-ready': {
 featuredDomain: 'talk',
 featuredSystems: ['edmp'],
 insightFilters: ['strategy-value', 'governance', 'operating-model'],
 insightIds: ['insight-2', 'insight-3', 'insight-5'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss Business Ready', action: 'open-form', payload: { topic: 'Business Ready organisational AI capability', engage: 'AI Elevate', need: 'Executive orientation' } },
 { label: 'Read related insights', action: 'view', payload: { view: 'insights' } },
 { label: 'Explore EDMP', action: 'view', payload: { view: 'edmp' } }
 ],
 formDefaults: {
 topic: 'Business Ready organisational AI capability',
 stage: 'Planning',
 outcome: 'Clearer readiness for organisational AI capability',
 engage: 'AI Elevate',
 need: 'Executive orientation',
 next: 'Business Ready capability conversation'
 }
 },
 'user-adoption': {
 featuredDomain: 'talk',
 featuredSystems: ['edmp', 'gamma'],
 insightFilters: ['operating-model', 'governance', 'strategy-value'],
 insightIds: ['insight-1', 'insight-3', 'insight-2'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss User Adoption', action: 'open-form', payload: { topic: 'User Adoption organisational AI capability', engage: 'AI Elevate', need: 'Capability diagnosis' } },
 { label: 'Read adoption insight', action: 'insight', payload: { id: 'insight-1' } },
 { label: 'Explore services', action: 'view', payload: { view: 'services' } }
 ],
 formDefaults: {
 topic: 'User Adoption organisational AI capability',
 stage: 'Implementing',
 outcome: 'Adoption that becomes accountable organisational practice',
 engage: 'AI Elevate',
 need: 'Capability diagnosis',
 next: 'User Adoption capability conversation'
 }
 },
 'ai-technologies': {
 featuredDomain: 'talk',
 featuredSystems: ['edmp', 'gamma'],
 insightFilters: ['architecture', 'governance', 'strategy-value'],
 insightIds: ['insight-4', 'insight-5', 'insight-2'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss AI Technologies', action: 'open-form', payload: { topic: 'AI Technologies organisational capability', engage: 'AI Elevate', need: 'Executive orientation' } },
 { label: 'Read architecture insight', action: 'insight', payload: { id: 'insight-4' } },
 { label: 'Explore services', action: 'view', payload: { view: 'services' } }
 ],
 formDefaults: {
 topic: 'AI Technologies organisational capability',
 stage: 'Planning',
 outcome: 'Technology choices subordinate to organisational purpose and governance',
 engage: 'AI Elevate',
 need: 'Executive orientation',
 next: 'AI Technologies capability conversation'
 }
 },
 edmp: {
 featuredDomain: 'build',
 featuredSystems: ['edmp', 'gamma'],
 insightFilters: ['governance', 'architecture'],
 insightIds: ['insight-3', 'insight-4', 'insight-5'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Explore EDMP', action: 'view', payload: { view: 'edmp' } },
 { label: 'Request architecture walkthrough', action: 'open-form', payload: { topic: 'EDMP architecture walkthrough', engage: 'EDMP', need: 'EDMP', next: 'Architecture walkthrough' } },
 { label: 'Open assessment preview', action: 'view', payload: { view: 'edmp-assessment' } }
 ],
 formDefaults: {
 topic: 'EDMP: Enterprise Decision Memory Platform',
 stage: 'Exploring',
 outcome: 'Understand whether EDMP fits our decision memory challenge',
 engage: 'EDMP',
 need: 'EDMP',
 next: 'Architecture walkthrough'
 }
 },
 build: {
 featuredDomain: 'build',
 featuredSystems: ['edmp', 'gamma', 'symbiant'],
 insightFilters: ['architecture', 'governance'],
 insightIds: ['insight-4', 'insight-5', 'insight-3'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Inspect what we build', action: 'scroll', payload: { id: 'ehBuild' } },
 { label: 'Request a system walkthrough', action: 'open-form', payload: { topic: 'System walkthrough', engage: 'Companion Gamma', need: 'EDMP', next: 'Prototype walkthrough' } },
 { label: 'Explore EDMP', action: 'view', payload: { view: 'edmp' } }
 ],
 formDefaults: {
 topic: 'What AI Elevate is building',
 stage: 'Exploring',
 outcome: 'Understand current systems and development maturity',
 engage: 'Companion Gamma',
 need: 'EDMP',
 next: 'System walkthrough'
 }
 },
 partnership: {
 featuredDomain: 'talk',
 featuredSystems: ['edmp'],
 insightFilters: ['partner', 'strategy-value'],
 insightIds: ['insight-6', 'insight-2', 'insight-4'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss partnership', action: 'open-form', payload: { topic: 'Partnership discussion', engage: 'Partnership', need: 'Implementation partnership' } },
 { label: 'Read partner insight', action: 'insight', payload: { id: 'insight-6' } },
 { label: 'Explore partners page', action: 'view', payload: { view: 'partners' } }
 ],
 formDefaults: {
 topic: 'Partnership opportunity',
 stage: 'Exploring',
 outcome: 'Explore complementary partnership with AI Elevate',
 engage: 'Partnership',
 need: 'Implementation partnership',
 next: 'Partnership conversation'
 }
 },
 consultant: {
 featuredDomain: 'talk',
 featuredSystems: ['symbiant'],
 insightFilters: ['strategy-value', 'governance', 'operating-model'],
 insightIds: ['insight-2', 'insight-1', 'insight-3'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Discuss consultancy engagement', action: 'open-form', payload: { topic: 'Consultancy engagement with Anthony', engage: 'Anthony directly', need: 'Executive orientation' } },
 { label: 'View perspectives', action: 'scroll', payload: { id: 'ehSignals' } },
 { label: 'Contact directly', action: 'scroll', payload: { id: 'ehAnthony' } }
 ],
 formDefaults: {
 topic: 'Work directly with Anthony',
 stage: 'Planning',
 outcome: 'Experienced consultancy guidance for organisational AI capability',
 engage: 'Anthony directly',
 need: 'Executive orientation',
 next: 'Consultancy engagement discussion'
 }
 },
 exploring: {
 featuredDomain: 'explore',
 featuredSystems: ['edmp', 'gamma', 'symbiant'],
 insightFilters: ['operating-model', 'strategy-value', 'governance'],
 insightIds: ['insight-1', 'insight-2', 'insight-3', 'insight-4'],
 recommendedTitle: 'Recommended next',
 recommended: [
 { label: 'Browse Insights', action: 'view', payload: { view: 'insights' } },
 { label: 'See what we build', action: 'scroll', payload: { id: 'ehBuild' } },
 { label: 'Start a focused conversation', action: 'open-form', payload: { topic: 'General enquiry', engage: 'AI Elevate', need: 'Other' } }
 ],
 formDefaults: {
 topic: 'Exploring AI Elevate',
 stage: 'Exploring',
 outcome: 'Understand whether AI Elevate is the right next conversation',
 engage: 'AI Elevate',
 need: 'Other',
 next: 'Introductory conversation'
 }
 }
 },
 domains: [
 {
 id: 'talk',
 label: 'Talk to us',
 summary: 'Capability discussions, briefings and direct consultancy.',
 items: [
 'AI capability conversation',
 'Executive briefing',
 'Consultancy engagement',
 'Partner conversation',
 'Anthony directly'
 ]
 },
 {
 id: 'explore',
 label: 'Explore',
 summary: 'Insights, artefacts and business linked perspectives.',
 items: [
 'Insights',
 'AI Elevate LinkedIn',
 'Anthony LinkedIn',
 'EDMP',
 'Assessment preview'
 ]
 },
 {
 id: 'build',
 label: 'What we build',
 summary: 'Systems and development work you can inspect or request to walk through.',
 items: [
 'EDMP',
 'Companion Gamma',
 'Symbiant',
 'Public assessment artefacts'
 ]
 },
 {
 id: 'deeper',
 label: 'Go deeper',
 summary: 'Walkthroughs and briefings for work best explored in context.',
 items: [
 'Architecture walkthrough',
 'Prototype walkthrough',
 'EDMP briefing',
 'Executive / board briefing',
 'Partnership exploration'
 ]
 }
 ],
 systems: [
 {
 id: 'edmp',
 kicker: 'Framework',
 maturity: 'Active development',
 title: 'EDMP',
 subtitle: 'Enterprise Decision Memory Platform',
 body: 'A governed lifecycle connecting signals, evidence, integrity, decisions, actions, outcomes and institutional memory.',
 visual: 'edmp',
 primary: { label: 'Explore EDMP', action: 'view', payload: { view: 'edmp' } },
 secondary: { label: 'Request an architecture walkthrough', action: 'open-form', payload: { topic: 'EDMP architecture walkthrough', engage: 'EDMP', need: 'EDMP', next: 'Architecture walkthrough' } },
 externalUrl: null
 },
 {
 id: 'gamma',
 kicker: 'Companion Gamma',
 maturity: 'Active development',
 title: 'Companion Gamma',
 subtitle: 'First cockpit implementation of EDMP',
 body: 'A working implementation surface for EDMP, not a finished commercial SaaS product. Best explored in a focused walkthrough.',
 visual: 'gamma',
 primary: { label: 'Request a walkthrough', action: 'open-form', payload: { topic: 'Companion Gamma walkthrough', engage: 'Companion Gamma', need: 'EDMP', next: 'Prototype walkthrough' } },
 secondary: null,
 externalUrl: null
 },
 {
 id: 'symbiant',
 kicker: 'Related system',
 maturity: 'Related AI reasoning system',
 title: 'Symbiant',
 subtitle: 'Distinct reasoning / advisory system',
 body: 'A related AI reasoning system in the broader development ecosystem around AI Elevate. It retains its own identity and is not presented here as an AI Elevate product.',
 visual: 'symbiant',
 primary: { label: 'Request a Symbiant walkthrough', action: 'open-form', payload: { topic: 'Symbiant walkthrough', engage: 'Symbiant', need: 'Other', next: 'Symbiant walkthrough' } },
 secondary: null,
 /** Placeholder for a future public URL without changing the card component */
 externalUrl: null
 }
 ],
 stages: ['Exploring', 'Planning', 'Implementing', 'Scaling', 'Resolving an issue'],
 engageOptions: ['AI Elevate', 'Anthony directly', 'Partnership', 'EDMP', 'Companion Gamma', 'Symbiant'],
 anthonyCapabilities: [
 'AI strategy',
 'Organisational AI capability',
 'Governance',
 'Enterprise architecture',
 'Transformation',
 'Executive advisory',
 'Partner advisory'
 ],
 deeperActions: [
 { label: 'EDMP walkthrough', payload: { topic: 'EDMP walkthrough', engage: 'EDMP', need: 'EDMP', next: 'Architecture walkthrough' } },
 { label: 'Companion Gamma walkthrough', payload: { topic: 'Companion Gamma walkthrough', engage: 'Companion Gamma', need: 'EDMP', next: 'Prototype walkthrough' } },
 { label: 'Symbiant walkthrough', payload: { topic: 'Symbiant walkthrough', engage: 'Symbiant', need: 'Other', next: 'Symbiant walkthrough' } },
 { label: 'Executive briefing', payload: { topic: 'Executive / board briefing', engage: 'AI Elevate', need: 'Executive orientation', next: 'Executive briefing' } },
 { label: 'Partnership discussion', payload: { topic: 'Partnership discussion', engage: 'Partnership', need: 'Implementation partnership', next: 'Partnership conversation' } }
 ]
 };

 global.ENGAGEMENT_HUB_DATA = ENGAGEMENT_HUB_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
