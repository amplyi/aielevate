/**
 * AI Elevate Engage — programs, Mollie links, intake forms.
 *
 * COMMERCIAL RULE: Paid deliverables are emailed after payment — never linked on the public site.
 * Free funnel assets only in `freeResources`. Operator map: scripts/commercial-funnel.txt
 *
 * Mollie redirect URL per product:
 *   https://aielevate.xyz/?payment=success&product=briefing
 *   https://aielevate.xyz/?payment=success&product=assessment
 *   https://aielevate.xyz/?payment=success&product=briefing-pack
 *   https://aielevate.xyz/?payment=success&product=decision-room
 */
window.AIE_ENGAGE_CONFIG = {
  merchant: {
    legalName: 'AvL Consultancy',
    brand: 'AI Elevate',
    email: 'info@aielevate.xyz',
    phone: '+31 6 46438478',
    vatNote: 'All prices include 21% VAT unless stated otherwise.',
    paymentMethods: 'iDEAL · Cards · Bancontact · Bank transfer',
  },
  intakeAutomation: {
    provider: 'typeform',
    setupGuide: 'scripts/engage-intake-automation.txt',
    mollieRedirectBase: 'https://aielevate.xyz/?payment=success&product=',
  },
  decisionRoom: {
    apiBase: '',
    setupGuide: 'scripts/decision-room-api-setup.txt',
  },
  /**
   * Free funnel — insight, not full products. See scripts/commercial-funnel.txt
   */
  freeResources: {
    onePager: {
      title: 'Executive One-Pager',
      subtitle: 'The 30-second board and investor case for Enterprise Decision Memory.',
      purpose: 'Interesting. Tell me more.',
      downloadUrl: 'assets/ai-elevate-edmp-executive-brief.pdf',
      requiresEmail: true,
    },
    boardPackPreview: {
      title: 'Board Briefing Pack Preview',
      subtitle: 'Cover, executive summary excerpt, and one sample chapter.',
      downloadUrl: 'assets/ai-elevate-board-briefing-pack-preview.pdf',
      purchaseProductId: 'briefing-pack',
      ctaLabel: 'Purchase full Board Briefing Pack',
    },
    quickAssessment: {
      title: 'EDMP Quick Self-Check',
      subtitle: 'Five questions across decision memory dimensions (names only — not the full maturity model).',
      ctaProductId: 'assessment',
      ctaLabel: 'Request full EDMP Readiness Assessment',
      dimensions: [
        {
          id: 'traceability',
          name: 'Decision Traceability',
          question: 'How confidently could your organization reconstruct the reasoning behind a major strategic decision made three years ago?',
        },
        {
          id: 'memory',
          name: 'Institutional Memory',
          question: 'How much critical decision knowledge would leave if two key leaders departed next quarter?',
        },
        {
          id: 'governance',
          name: 'AI Governance',
          question: 'How explainable and defensible are your AI-assisted decisions today?',
        },
        {
          id: 'rework',
          name: 'Rework Exposure',
          question: 'How often does your organization revisit decisions that were already made?',
        },
        {
          id: 'continuity',
          name: 'Executive Continuity',
          question: 'How quickly can new executives understand historical decision logic?',
        },
      ],
    },
  },
  doctrine: {
    coreInsight: 'Organizations preserve data, workflows, and AI outputs — but not how important decisions were formed.',
    investorPitch: 'As AI accelerates decision velocity, the inability to reconstruct why decisions were made becomes a governance, risk, and performance problem. EDMP preserves signal, reasoning, decision lineage, execution trace, and institutional memory.',
    valueChain: ['Signal', 'Structure', 'Decision', 'Execution Trace', 'Institutional Memory'],
    financialPillars: ['Risk reduction', 'Reduced rework', 'Executive continuity', 'AI governance'],
    funnel: 'Free insight → Board Pack → Executive Briefing → Assessment → Advisory',
  },
  products: [
    {
      id: 'briefing-pack',
      tag: 'Digital download',
      title: 'Board Briefing Pack',
      subtitle: 'The full EDMP business case for board and investor conversations — standard or lightly customized.',
      audience: 'Board members, NEDs, investors, or exec sponsors who need the category case, not a tool pitch.',
      priceLabel: '€603.79',
      priceNote: 'incl. 21% VAT · digital delivery',
      format: 'PDF pack + slide deck (standard); optional customized cover addendum',
      timeline: 'Standard pack within 24h · customized addendum within 3–5 business days if requested',
      youReceive: [
        'Full PDF pack (~40+ pages): executive problem, cost of forgetting, AI paradox, financial case, category thesis',
        'Slide deck (12 slides) with speaker notes',
        'Executive one-pager for internal forwarding',
        'Optional intake: company name on cover + sector-focused addendum (3–5 business days)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to a short intake form',
        'Intake: company, billing contact, language (NL/EN), standard vs. light customization',
        'Download links delivered by email within 24 hours',
        'If customization requested: tailored cover/addendum within 3–5 business days',
      ],
      notIncluded: 'Preview sample is free; full pack is delivered after payment only.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=briefing-pack',
    },
    {
      id: 'briefing',
      tag: 'Live session',
      title: 'Executive Briefing',
      subtitle: 'Live walkthrough of the decision-formation gap — not an AI product demo.',
      audience: 'CEO, CFO, COO, board sponsor, or governance lead who needs the business case in under 90 minutes.',
      priceLabel: '€3,025',
      priceNote: 'incl. 21% VAT · one session',
      format: '90 min live (video, NL or EN) + written summary',
      timeline: 'Session within 10 business days of completed intake',
      youReceive: [
        'Pre-read materials: the executive problem — what happened vs. why it was decided',
        'Live agenda: cost of forgetting → AI paradox → EDMP value chain → financial case → your domain',
        'Post-session findings report: your pressure domain, gaps, and recommended next-step path',
        'Facilitator materials and calendar assets (delivered to you, not published publicly)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to your intake form',
        'Intake: company, role, domain, pressure points, attendees (max 6), language (NL/EN), dates',
        'We confirm your session slot by email',
        'Live session delivered; summary PDF within 2 business days after',
      ],
      notIncluded: 'No custom cockpit build, implementation, or ongoing advisory. Runbook is facilitator IP — not a public download.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=briefing',
    },
    {
      id: 'assessment',
      tag: 'Written diagnostic',
      title: 'EDMP Readiness Assessment',
      subtitle: 'Scores your org on decision traceability, memory risk, and AI governance exposure.',
      audience: 'Teams that need evidence of where institutional decision memory is breaking before investing further.',
      priceLabel: '€1,815',
      priceNote: 'incl. 21% VAT · one report cycle',
      format: 'Questionnaire + PDF report + 30 min readout (NL or EN)',
      timeline: 'Report 5–7 business days after questionnaire submitted',
      youReceive: [
        'Full questionnaire (~30–40 min): traceability, rework, continuity, governance, signal-to-decision visibility',
        'Scored report PDF (12–18 pages): maturity scores, gap analysis, priority domains, 90-day intervention map',
        '30-minute readout call on findings and board-ready framing (Dutch or English)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to your intake form',
        'Intake: company, contact, primary domain, language preference (NL/EN)',
        'Questionnaire link sent within 1 business day; complete within 5 business days',
        'Report by email; readout call scheduled after delivery',
      ],
      notIncluded: 'Quick self-check on site shows dimension names only. Full scoring rubric and roadmaps are client deliverables.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=assessment',
    },
    {
      id: 'decision-room',
      tag: 'Interactive session',
      title: 'Decision Room Session',
      subtitle: 'A 20-minute industry scenario — experience decision pressure and traceability gaps firsthand.',
      audience: 'Executives, board sponsors, and governance leads who want experiential proof before a briefing or assessment.',
      priceLabel: '€89',
      priceNote: 'incl. 21% VAT · one session · 48h access',
      format: '6-turn simulation + EDMP-aligned debrief (web)',
      timeline: 'Access token emailed within 1 business day of payment',
      youReceive: [
        'Personalized industry and role context for your scenario',
        '6 timed decision signals with integrity, velocity, and risk tradeoffs',
        'Advisor panel and decision log showing reasoning under pressure',
        'EDMP debrief: traceability gaps, memory risks, and recommended next step',
      ],
      intake: [
        'Pay via Mollie — confirmation page explains next steps',
        'Session access token sent by email within 1 business day',
        'Enter token at aielevate.xyz/#decision-room — valid 48 hours',
      ],
      notIncluded: 'Not a consulting engagement. Access requires paid token — not open to the public.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=decision-room',
    },
  ],
};
