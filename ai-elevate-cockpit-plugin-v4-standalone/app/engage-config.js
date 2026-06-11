/**
 * AI Elevate Engage — programs, Mollie links, and buyer-facing delivery copy.
 * Paste each mollieUrl from Mollie Dashboard → Betaallinks after profile approval.
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
  products: [
    {
      id: 'briefing',
      tag: 'Live session',
      title: 'Executive Briefing',
      subtitle: 'A fixed-scope live session for up to 6 leaders — not a software build or retainer.',
      audience: 'CEO, CFO, COO, board sponsor, or transformation lead exploring EDMP.',
      priceLabel: '€3,025',
      priceNote: 'incl. 21% VAT · one session',
      format: '90 min live (video) + written summary',
      timeline: 'Session within 10 business days of completed intake',
      youReceive: [
        'Pre-read: 1-page EDMP executive brief (PDF, before the session)',
        'Live 90-minute briefing on EDMP and your stated decision-pressure domain',
        'Post-session: 2-page executive summary with recommended next-step path (PDF)',
      ],
      intake: [
        'Pay via Mollie — you receive confirmation immediately',
        'We email an intake form within 1 business day (company, role, domain, pressure points, attendees, dates)',
        'You return the intake — we confirm the session slot',
        'Session delivered live; summary PDF within 2 business days after',
      ],
      notIncluded: 'No custom cockpit build, implementation, or ongoing advisory.',
      mollieUrl: '',
    },
    {
      id: 'assessment',
      tag: 'Written diagnostic',
      title: 'EDMP Readiness Assessment',
      subtitle: 'Async questionnaire + written report — a diagnostic, not a deployed platform.',
      audience: 'Teams that need a structured view of EDMP readiness before a larger program.',
      priceLabel: '€1,815',
      priceNote: 'incl. 21% VAT · one report cycle',
      format: 'Questionnaire + PDF report + 30 min readout call',
      timeline: 'Report 5–7 business days after you submit the questionnaire',
      youReceive: [
        'Structured EDMP readiness questionnaire (online, ~30–40 minutes)',
        'Written report (PDF, typically 12–18 pages): scores, gaps, priority domains, 90-day map',
        '30-minute readout call to walk through findings',
      ],
      intake: [
        'Pay via Mollie — you receive confirmation immediately',
        'We email the questionnaire link within 1 business day',
        'You complete it within 5 business days',
        'Report delivered by email; readout call scheduled after delivery',
      ],
      notIncluded: 'No software installation, data integration, or workshop series.',
      mollieUrl: '',
    },
    {
      id: 'briefing-pack',
      tag: 'Digital download',
      title: 'Board Briefing Pack',
      subtitle: 'Ready-made materials to brief your board or exec committee on EDMP.',
      audience: 'Board members, NEDs, or exec sponsors who need shareable framing fast.',
      priceLabel: '€603.79',
      priceNote: 'incl. 21% VAT · instant digital delivery',
      format: 'PDF pack + slide deck (download links by email)',
      timeline: 'Download links within 24 hours of payment',
      youReceive: [
        'Board briefing PDF (~25–35 pages): EDMP category, governance frame, domain primers',
        'Executive slide deck (10–12 slides) for board or committee presentation',
        'One-page “why now” narrative you can forward internally',
      ],
      intake: [
        'Pay via Mollie — you receive confirmation immediately',
        'We email secure download links within 24 hours (no lengthy intake required)',
        'Invoice/receipt included for your records',
      ],
      notIncluded: 'Not customized to your company name or internal data — standard AI Elevate pack.',
      mollieUrl: '',
    },
  ],
};
