/**
 * EDMP Assessment — public preview only. No scoring logic or full methodology.
 */
window.EDMP_ASSESSMENT_PREVIEW = {
  title: 'EDMP Readiness Assessment',
  subtitle: 'Six decision memory dimensions. Full diagnostic requires a paid assessment session.',
  dimensions: [
    {
      id: 'traceability',
      name: 'Decision Traceability',
      sampleQuestion: 'How confidently could your organization reconstruct the reasoning behind a major strategic decision made three years ago?',
    },
    {
      id: 'memory',
      name: 'Institutional Memory',
      sampleQuestion: 'How much critical decision knowledge would leave if two key leaders departed next quarter?',
    },
    {
      id: 'governance',
      name: 'AI Governance',
      sampleQuestion: 'How explainable and defensible are your AI-assisted decisions today?',
    },
    {
      id: 'rework',
      name: 'Rework Exposure',
      sampleQuestion: 'How often does your organization revisit decisions that were already made?',
    },
    {
      id: 'continuity',
      name: 'Executive Continuity',
      sampleQuestion: 'How quickly can new executives understand historical decision logic?',
    },
    {
      id: 'visibility',
      name: 'Signal-to-Decision Visibility',
      sampleQuestion: 'Can your organization connect major decisions back to the signals that triggered them?',
    },
  ],
  sampleRecommendations: [
    'Establish a minimum decision record standard for priority decisions (rationale, owner, evidence).',
    'Implement structured AI decision review and accountability procedures for high-stakes use cases.',
    'Create executive decision lineage preservation at leadership transitions.',
  ],
  sampleReport: {
    watermark: 'SAMPLE — illustrative only',
    organization: 'Example Organization',
    overall: 62,
    band: 'Moderate Exposure',
    bandId: 'moderate',
    heatmap: [
      { name: 'Decision Traceability', score: 68 },
      { name: 'Institutional Memory', score: 72 },
      { name: 'AI Governance', score: 54 },
      { name: 'Rework Exposure', score: 61 },
      { name: 'Executive Continuity', score: 81 },
      { name: 'Signal-to-Decision Visibility', score: 49 },
    ],
    summary: 'Illustrative sample only. Your organization receives a calculated report after completing the full 30-question assessment.',
  },
};
