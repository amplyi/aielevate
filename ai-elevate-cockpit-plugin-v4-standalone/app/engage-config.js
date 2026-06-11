/**
 * AI Elevate Engage — programs, Mollie links, intake forms.
 *
 * Mollie redirect URL per product (set on each Payment Link):
 *   https://aielevate.xyz/?payment=success&product=briefing
 *   https://aielevate.xyz/?payment=success&product=assessment
 *   https://aielevate.xyz/?payment=success&product=briefing-pack
 *
 * Intake automation: Typeform + Make.com (see scripts/engage-intake-automation.txt)
 * Paste each intakeFormUrl after creating the Typeform.
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
  /**
   * Canonical EDMP business case (Anthony doctrine).
   * Board Pack PDF + Briefing agenda + Assessment rubric derive from this.
   * Full outline: scripts/engage-board-pack-outline.txt
   */
  doctrine: {
    coreInsight: 'Organizations preserve data, workflows, and AI outputs — but not how important decisions were formed.',
    investorPitch: 'As AI accelerates decision velocity, the inability to reconstruct why decisions were made becomes a governance, risk, and performance problem. EDMP preserves signal, reasoning, decision lineage, execution trace, and institutional memory.',
    valueChain: ['Signal', 'Structure', 'Decision', 'Execution Trace', 'Institutional Memory'],
    financialPillars: ['Risk reduction', 'Reduced rework', 'Executive continuity', 'AI governance'],
  },
  products: [
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
        'Pre-read PDF: the executive problem — what happened vs. why it was decided',
        'Live agenda: cost of forgetting → AI paradox → EDMP value chain → financial case → your domain',
        'Post-session PDF: your pressure domain, gaps, and recommended next-step path',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to your intake form',
        'Intake: company, role, domain, pressure points, attendees (max 6), language (NL/EN), dates',
        'We confirm your session slot by email',
        'Live session delivered; summary PDF within 2 business days after',
      ],
      notIncluded: 'No custom cockpit build, implementation, or ongoing advisory.',
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
        'Questionnaire (~30–40 min): traceability, rework, continuity, governance, signal-to-decision visibility',
        'Report PDF (12–18 pages): maturity scores, gap analysis, priority domains, 90-day intervention map',
        '30-minute readout call on findings and board-ready framing (Dutch or English)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to your intake form',
        'Intake: company, contact, primary domain, language preference (NL/EN)',
        'Questionnaire link sent within 1 business day; complete within 5 business days',
        'Report by email; readout call scheduled after delivery',
      ],
      notIncluded: 'No software installation, data integration, or workshop series.',
      frameworkDownloadUrl: 'assets/ai-elevate-edmp-readiness-assessment.pdf',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=assessment',
    },
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
        'PDF (~25–35 pages): executive problem, cost of forgetting, AI paradox, financial case, category thesis',
        'Slide deck (10–12 slides): board-ready version of the same narrative',
        'One-pager: 30-second investor/board pitch you can forward internally',
        'Optional intake: company name on cover + sector-focused addendum (3–5 business days)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to a short intake form',
        'Intake: company, billing contact, language (NL/EN), standard vs. light customization',
        'Standard pack: download links within 24 hours',
        'If customization requested: tailored cover/addendum within 3–5 business days',
      ],
      notIncluded: 'Not a full bespoke strategy engagement — light customization only.',
      downloadUrl: 'assets/ai-elevate-board-briefing-pack.pdf',
      deckDownloadUrl: 'assets/ai-elevate-board-briefing-deck.pdf',
      briefDownloadUrl: 'assets/ai-elevate-edmp-executive-brief.pdf',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=briefing-pack',
    },
  ],
};
