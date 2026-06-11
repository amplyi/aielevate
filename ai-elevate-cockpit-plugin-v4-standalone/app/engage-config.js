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
  products: [
    {
      id: 'briefing',
      tag: 'Live session',
      title: 'Executive Briefing',
      subtitle: 'Fixed-scope live session for up to 6 leaders — Dutch or English.',
      audience: 'CEO, CFO, COO, board sponsor, or transformation lead exploring EDMP.',
      priceLabel: '€3,025',
      priceNote: 'incl. 21% VAT · one session',
      format: '90 min live (video, NL or EN) + written summary',
      timeline: 'Session within 10 business days of completed intake',
      youReceive: [
        'Pre-read: 1-page EDMP executive brief (PDF, language of your choice)',
        'Live 90-minute briefing on EDMP and your stated decision-pressure domain',
        'Post-session: 2-page executive summary with recommended next-step path (PDF)',
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
      subtitle: 'Questionnaire + written report + 30-minute readout call included.',
      audience: 'Teams that need a structured EDMP readiness view before a larger program.',
      priceLabel: '€1,815',
      priceNote: 'incl. 21% VAT · one report cycle',
      format: 'Questionnaire + PDF report + 30 min readout (NL or EN)',
      timeline: 'Report 5–7 business days after questionnaire submitted',
      youReceive: [
        'Structured EDMP readiness questionnaire (online, ~30–40 minutes)',
        'Written report (PDF, 12–18 pages): scores, gaps, priority domains, 90-day map',
        '30-minute readout call to walk through findings (Dutch or English)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to your intake form',
        'Intake: company, contact, primary domain, language preference (NL/EN)',
        'Questionnaire link sent within 1 business day; complete within 5 business days',
        'Report by email; readout call scheduled after delivery',
      ],
      notIncluded: 'No software installation, data integration, or workshop series.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=assessment',
    },
    {
      id: 'briefing-pack',
      tag: 'Digital download',
      title: 'Board Briefing Pack',
      subtitle: 'Standard pack by email within 24 hours — optional light customization via intake.',
      audience: 'Board members, NEDs, or exec sponsors who need shareable EDMP framing fast.',
      priceLabel: '€603.79',
      priceNote: 'incl. 21% VAT · digital delivery',
      format: 'PDF pack + slide deck (standard); optional customized cover addendum',
      timeline: 'Standard pack within 24h · customized addendum within 3–5 business days if requested',
      youReceive: [
        'Standard board briefing PDF (~25–35 pages): EDMP category, governance frame, domain primers',
        'Executive slide deck (10–12 slides) for board or committee use',
        'One-page “why now” narrative for internal forwarding',
        'Optional: company name on cover + sector-focused addendum (requested in intake)',
      ],
      intake: [
        'Pay via Mollie — confirmation page links to a short intake form',
        'Intake: company, billing contact, language (NL/EN), standard vs. light customization',
        'Standard pack: download links within 24 hours',
        'If customization requested: tailored cover/addendum within 3–5 business days',
      ],
      notIncluded: 'Not a full bespoke strategy engagement — light customization only.',
      intakeFormUrl: '',
      mollieUrl: '',
      mollieRedirect: 'https://aielevate.xyz/?payment=success&product=briefing-pack',
    },
  ],
};
