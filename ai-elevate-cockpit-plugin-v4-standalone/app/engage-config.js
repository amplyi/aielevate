/**
 * AI Elevate Engage — Mollie Payment Link URLs (Phase 1)
 * Paste each URL from Mollie Dashboard → Betaallinks after creating the link.
 * Leave empty until links are ready; checkout buttons show a setup notice.
 *
 * Mollie redirect URL (profile must be approved): https://aielevate.xyz/?payment=success
 * Hash redirects (#engage-thanks) are often rejected during profile review.
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
      tag: 'Executive session',
      title: 'Executive Briefing',
      subtitle: '90-minute EDMP executive session for your leadership team.',
      priceLabel: '€3,025',
      priceNote: 'incl. 21% VAT',
      timeline: 'Scheduled within 5 business days',
      deliverables: [
        'Live EDMP category briefing',
        'Decision pressure and domain review',
        'Recommended next-step program path',
      ],
      mollieUrl: '',
    },
    {
      id: 'assessment',
      tag: 'Diagnostic',
      title: 'EDMP Readiness Assessment',
      subtitle: 'Structured diagnostic with written findings for your operating environment.',
      priceLabel: '€1,815',
      priceNote: 'incl. 21% VAT',
      timeline: 'Report delivered in 5–7 business days',
      deliverables: [
        'Structured assessment questionnaire',
        'Written EDMP readiness report',
        'Priority domains and intervention map',
      ],
      mollieUrl: '',
    },
    {
      id: 'briefing-pack',
      tag: 'Digital',
      title: 'Board Briefing Pack',
      subtitle: 'Digital doctrine pack for board and executive stakeholders.',
      priceLabel: '€603.79',
      priceNote: 'incl. 21% VAT',
      timeline: 'Delivered by email within 24 hours',
      deliverables: [
        'Curated AI Elevate briefing materials',
        'EDMP category and governance framing',
        'Shareable executive narrative assets',
      ],
      mollieUrl: '',
    },
  ],
};
