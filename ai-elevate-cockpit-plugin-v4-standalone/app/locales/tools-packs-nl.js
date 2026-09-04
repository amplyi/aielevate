/**
 * NL packs for Engage overlays, Decision Room UI, EDMP assessment preview,
 * and ENGAGE program display strings. Loaded after locales/nl.js.
 */
(function (global) {
  'use strict';

  var packs = {
    engageUi: {
      selfCheckKicker: 'Snelle zelfcheck',
      selfCheckLead: 'Vijf vragen over dimensies van decision memory. Dit is alleen een richtinggevende zelfcheck, niet het volledige EDMP-maturiteitsmodel.',
      seeScore: 'Bekijk mijn score',
      answerAll: 'Beantwoord alle vijf vragen.',
      scoredPrefix: 'Uw organisatie scoorde:',
      scoreNote: 'Alleen een richtinggevende zelfcheck. Niet de volledige scoringsrubriek, aanbevelingen of interventieroadmap.',
      lowExposure: 'Lage exposure',
      highExposure: 'Hoge exposure',
      bands: {
        high: {
          band: 'Hoge exposure',
          detail: 'Hiaten in decision memory creëren waarschijnlijk governance-, continuïteits- of herwerkrisico.'
        },
        moderate: {
          band: 'Matige exposure',
          detail: 'Er is enige decision memory-capability, maar kritieke domeinen kunnen nog fragiel zijn.'
        },
        lower: {
          band: 'Lagere exposure',
          detail: 'Beoordeel kritieke domeinen alsnog. Dit is een richtinggevende check, geen volledige maturiteitsassessment.'
        }
      },
      secondaryNeedExplainer: 'Korte interne uitleg nodig?',
      secondaryOnePager: 'Vraag de executive one pager aan',
      secondaryBoardPreview: 'Board Pack preview (PDF)',
      secondaryDecisionRoom: 'Decision Room ervaringssessies beschikbaar na executive briefing.',
      secondaryAssessment: 'EDMP assessment preview',
      deliveryDetails: 'Leveringsdetails',
      timeline: 'Tijdlijn',
      requestProgram: 'Vraag programma aan'
    },

    engageProgramDisplay: {
      briefing: {
        positioning: 'Executive sessie van 90 minuten om de decision memory-kloof, de AI-accountabilityparadox en waar uw organisatie blootgesteld kan zijn te begrijpen.',
        cta: 'Vraag Executive Briefing aan',
        bullets: [
          'Live executive sessie (NL of EN)',
          'Voorleesmateriaal over de besluitvormingskloof',
          'Bevindingenrapport na de sessie'
        ]
      },
      assessment: {
        positioning: 'Gestructureerde diagnostiek over zes decision memory-dimensies, resulterend in een gescoord rapport en een interventiekaart van 90 dagen.',
        cta: 'Vraag Assessment aan',
        bullets: [
          'Volledige vragenlijst over zes dimensies',
          'Gescoord rapport met gap-analyse',
          'Uitleesgesprek van 30 minuten'
        ]
      },
      'briefing-pack': {
        positioning: 'Board-klaar PDF, slideck en one pager die de EDMP-businesscase uitleggen voor interne bespreking.',
        cta: 'Vraag Board Pack aan',
        bullets: [
          'Volledige board briefing PDF',
          'Slideck met sprekersnotities',
          'Executive one pager om door te sturen'
        ]
      }
    },

    engageIntakeMeta: {
      briefing: {
        label: 'Executive Briefing',
        subject: 'AI Elevate. Aanvraag Executive Briefing',
        intro: 'Vraag een executive briefing van 90 minuten aan over Enterprise Decision Memory. We nemen per e-mail contact op om scope, deelnemers en planning te bevestigen.',
        button: 'Verstuur briefingaanvraag',
        reason: 'Executive Briefing'
      },
      assessment: {
        label: 'EDMP Readiness Assessment',
        subject: 'AI Elevate. Aanvraag EDMP Readiness Assessment',
        intro: 'Vraag de volledige EDMP Readiness Assessment aan. We volgen op met intakestappen, toegang tot de vragenlijst en planning van het uitleesgesprek.',
        button: 'Verstuur assessmentaanvraag',
        reason: 'EDMP Readiness Assessment'
      },
      'briefing-pack': {
        label: 'Board Briefing Pack',
        subject: 'AI Elevate. Aanvraag Board Briefing Pack',
        intro: 'Vraag het Board Briefing Pack aan voor board- of investeerdersgesprekken. We volgen op met levering en optionele intake voor maatwerk.',
        button: 'Verstuur board pack-aanvraag',
        reason: 'Board Briefing Pack'
      },
      'decision-room': {
        label: 'Decision Room Session',
        subject: 'AI Elevate. Aanvraag Decision Room Session',
        intro: 'Vraag een Decision Room Session aan. Na betaling ontvangt u een sessietoken om de interactieve scenario-ervaring te starten.',
        button: 'Verstuur Decision Room-aanvraag',
        reason: 'Decision Room Session'
      },
      'one-pager': {
        label: 'Executive One Pager',
        subject: 'AI Elevate. Aanvraag Executive One Pager',
        intro: 'Vraag de gratis executive one pager aan. Een korte interne uitleg over Enterprise Decision Memory. We sturen deze naar uw zakelijke e-mailadres.',
        button: 'Vraag one pager aan',
        reason: 'Executive One Pager (gratis)'
      },
      'one pager': {
        label: 'Executive One Pager',
        subject: 'AI Elevate. Aanvraag Executive One Pager',
        intro: 'Vraag de gratis executive one pager aan. Een korte interne uitleg over Enterprise Decision Memory. We sturen deze naar uw zakelijke e-mailadres.',
        button: 'Vraag one pager aan',
        reason: 'Executive One Pager (gratis)'
      }
    },

    engageFreeResources: {
      onePager: {
        title: 'Executive One Pager',
        subtitle: 'De 30-seconden board- en investeerderscase voor Enterprise Decision Memory.',
        purpose: 'Interessant. Vertel me meer.'
      },
      boardPackPreview: {
        title: 'Board Briefing Pack Preview',
        subtitle: 'Omslag, excerpt van de executive summary, en één voorbeeldhoofdstuk.',
        ctaLabel: 'Koop het volledige Board Briefing Pack'
      },
      quickAssessment: {
        title: 'EDMP Quick Self Check',
        subtitle: 'Vijf vragen over decision memory-dimensies (alleen namen, niet het volledige maturiteitsmodel).',
        ctaLabel: 'Vraag volledige EDMP Readiness Assessment aan',
        dimensions: [
          {
            id: 'traceability',
            name: 'Decision Traceability',
            question: 'Hoe zeker zou uw organisatie de redenering achter een belangrijk strategisch besluit van drie jaar geleden kunnen reconstrueren?'
          },
          {
            id: 'memory',
            name: 'Institutional Memory',
            question: 'Hoeveel kritieke besluitkennis zou verdwijnen als twee sleutelpersonen volgend kwartaal vertrekken?'
          },
          {
            id: 'governance',
            name: 'AI Governance',
            question: 'Hoe uitlegbaar en verdedigbaar zijn uw AI-ondersteunde besluiten vandaag?'
          },
          {
            id: 'rework',
            name: 'Rework Exposure',
            question: 'Hoe vaak herziet uw organisatie besluiten die al waren genomen?'
          },
          {
            id: 'continuity',
            name: 'Executive Continuity',
            question: 'Hoe snel kunnen nieuwe executives historische besluitlogica begrijpen?'
          }
        ]
      }
    },

    engageProducts: {
      'briefing-pack': {
        tag: 'Digitale download',
        title: 'Board Briefing Pack',
        subtitle: 'De volledige EDMP-businesscase voor board- en investeerdersgesprekken. Standaard of licht op maat.',
        audience: 'Boardleden, NED\'s, investeerders of executive sponsors die de category case nodig hebben, geen toolpitch.',
        priceNote: 'incl. 21% btw · digitale levering',
        format: 'PDF-pack + slideck (standaard); optioneel op maat gemaakt omslagaddendum',
        timeline: 'Standaardpack binnen 24 uur · op maat gemaakt addendum binnen 3 tot 5 werkdagen indien aangevraagd',
        youReceive: [
          'Volledig PDF-pack (~40+ pagina\'s): executive probleem, kosten van vergeten, AI-paradox, financiële case, category thesis',
          'Slideck (12 slides) met sprekersnotities',
          'Executive one pager om intern door te sturen',
          'Optionele intake: bedrijfsnaam op omslag + sectorspecifiek addendum (3 tot 5 werkdagen)'
        ],
        intake: [
          'Betaal via Mollie: de bevestigingspagina linkt naar een kort intakeformulier',
          'Intake: bedrijf, factuurcontact, taal (NL/EN), standaard versus lichte maatwerk',
          'Downloadlinks per e-mail binnen 24 uur',
          'Bij maatwerk: op maat gemaakte omslag/addendum binnen 3 tot 5 werkdagen'
        ],
        notIncluded: 'Voorbeeldsample is gratis; het volledige pack wordt alleen na betaling geleverd.'
      },
      briefing: {
        tag: 'Live sessie',
        title: 'Executive Briefing',
        subtitle: 'Live walkthrough van de besluitvormingskloof, geen AI-productdemo.',
        audience: 'CEO, CFO, COO, board sponsor of governance lead die de businesscase in minder dan 90 minuten nodig heeft.',
        priceNote: 'incl. 21% btw · één sessie',
        format: '90 min live (video, NL of EN) + schriftelijke samenvatting',
        timeline: 'Sessie binnen 10 werkdagen na voltooide intake',
        youReceive: [
          'Voorleesmateriaal: het executive probleem (wat gebeurde versus waarom het werd besloten)',
          'Live agenda: kosten van vergeten → AI-paradox → EDMP-waardeketen → financiële case → uw domein',
          'Bevindingenrapport na de sessie: uw drukdomein, hiaten en aanbevolen vervolgstappen',
          'Facilitatormateriaal en agenda-assets (aan u geleverd, niet openbaar gepubliceerd)'
        ],
        intake: [
          'Betaal via Mollie: de bevestigingspagina linkt naar uw intakeformulier',
          'Intake: bedrijf, rol, domein, knelpunten, deelnemers (max. 6), taal (NL/EN), data',
          'We bevestigen uw sessieslot per e-mail',
          'Live sessie uitgevoerd; samenvatting-PDF binnen 2 werkdagen daarna'
        ],
        notIncluded: 'Geen custom cockpit build, implementatie of doorlopend advies. De runbook is facilitator-IP, geen openbare download.'
      },
      assessment: {
        tag: 'Schriftelijke diagnostiek',
        title: 'EDMP Readiness Assessment',
        subtitle: 'Scoort uw organisatie op besluitstraceerbaarheid, geheugenrisico en AI-governance-exposure.',
        audience: 'Teams die bewijs nodig hebben waar institutioneel decision memory breekt, voordat ze verder investeren.',
        priceNote: 'incl. 21% btw · één rapportcyclus',
        format: 'Vragenlijst + PDF-rapport + uitleesgesprek van 30 min (NL of EN)',
        timeline: 'Rapport 5 tot 7 werkdagen na indienen van de vragenlijst',
        youReceive: [
          'Volledige vragenlijst (~30 tot 40 min): traceerbaarheid, herwerk, continuïteit, governance, signaal-naar-besluit zichtbaarheid',
          'Gescoord rapport-PDF (12 tot 18 pagina\'s): maturiteitsscores, gap-analyse, prioriteitsdomeinen, interventiekaart van 90 dagen',
          'Uitleesgesprek van 30 minuten over bevindingen en board-klare framing (Nederlands of Engels)'
        ],
        intake: [
          'Betaal via Mollie: de bevestigingspagina linkt naar uw intakeformulier',
          'Intake: bedrijf, contact, primair domein, taalvoorkeur (NL/EN)',
          'Link naar vragenlijst binnen 1 werkdag; afronden binnen 5 werkdagen',
          'Rapport per e-mail; uitleesgesprek gepland na levering'
        ],
        notIncluded: 'De snelle zelfcheck op de site toont alleen dimensienamen. Volledige scoringsrubriek en roadmaps zijn klantdeliverables.'
      },
      'decision-room': {
        tag: 'Interactieve sessie',
        title: 'Decision Room Session',
        subtitle: 'Een industriescenario van 20 minuten. Ervaar besluitdruk en traceerbaarheidshiaten zelf.',
        audience: 'Executives, board sponsors en governance leads die experientiële bewijsvoering willen vóór een briefing of assessment.',
        priceNote: 'incl. 21% btw · één sessie · 48 uur toegang',
        format: 'Simulatie van 6 beurten + EDMP-aligned debrief (web)',
        timeline: 'Toegangstoken per e-mail binnen 1 werkdag na betaling',
        youReceive: [
          'Gepersonaliseerde industrie- en rolcontext voor uw scenario',
          '6 getimede besluitssignalen met integrity-, velocity- en risk-afwegingen',
          'Advisorpanel en besluitlog die redenering onder druk tonen',
          'EDMP-debrief: traceerbaarheidshiaten, geheugenrisico\'s en aanbevolen vervolgstap'
        ],
        intake: [
          'Betaal via Mollie: de bevestigingspagina legt de volgende stappen uit',
          'Sessietoken per e-mail binnen 1 werkdag',
          'Voer token in op aielevate.xyz/#decision-room. Geldig 48 uur'
        ],
        notIncluded: 'Geen consultingtraject. Toegang vereist betaald token, niet openbaar beschikbaar.'
      }
    },

    engageMerchant: {
      vatNote: 'Alle prijzen zijn inclusief 21% btw tenzij anders vermeld.',
      paymentMethods: 'iDEAL · Cards · Bancontact · Bank transfer'
    },

    engageDoctrine: {
      coreInsight: 'Organisaties bewaren data, workflows en AI-outputs, maar niet hoe belangrijke besluiten tot stand kwamen.',
      investorPitch: 'Naarmate AI de besluitssnelheid verhoogt, wordt het onvermogen om te reconstrueren waarom besluiten zijn genomen een governance-, risico- en prestatieprobleem. EDMP bewaart signaal, redenering, besluitlijn, uitvoeringsspoor en institutioneel geheugen.',
      valueChain: ['Signaal', 'Structuur', 'Besluit', 'Uitvoeringsspoor', 'Institutioneel geheugen'],
      financialPillars: ['Risicoreductie', 'Minder herwerk', 'Executive continuïteit', 'AI-governance'],
      funnel: 'Gratis inzicht → Board Pack → Executive Briefing → Assessment → Advisory'
    },

    assessmentPreview: {
      title: 'EDMP Readiness Assessment',
      subtitle: 'Zes decision memory-dimensies. Volledige diagnostiek vereist een betaalde assessmentsessie.',
      dimensions: [
        {
          id: 'traceability',
          name: 'Decision Traceability',
          sampleQuestion: 'Hoe zeker zou uw organisatie de redenering achter een belangrijk strategisch besluit van drie jaar geleden kunnen reconstrueren?'
        },
        {
          id: 'memory',
          name: 'Institutional Memory',
          sampleQuestion: 'Hoeveel kritieke besluitkennis zou verdwijnen als twee sleutelpersonen volgend kwartaal vertrekken?'
        },
        {
          id: 'governance',
          name: 'AI Governance',
          sampleQuestion: 'Hoe uitlegbaar en verdedigbaar zijn uw AI-ondersteunde besluiten vandaag?'
        },
        {
          id: 'rework',
          name: 'Rework Exposure',
          sampleQuestion: 'Hoe vaak herziet uw organisatie besluiten die al waren genomen?'
        },
        {
          id: 'continuity',
          name: 'Executive Continuity',
          sampleQuestion: 'Hoe snel kunnen nieuwe executives historische besluitlogica begrijpen?'
        },
        {
          id: 'visibility',
          name: 'Signal to Decision Visibility',
          sampleQuestion: 'Kan uw organisatie belangrijke besluiten terugkoppelen aan de signalen die ze triggerden?'
        }
      ],
      sampleRecommendations: [
        'Stel een minimale besluitregistratiestandaard vast voor prioriteitsbesluiten (rationale, owner, bewijs).',
        'Implementeer gestructureerde AI-besluitreview en accountabilityprocedures voor high-stakes use cases.',
        'Creëer behoud van executive besluitlijn bij leiderschapstransities.'
      ],
      sampleReport: {
        watermark: 'SAMPLE. Alleen illustratief',
        organisation: 'Voorbeeldorganisatie',
        overall: 62,
        band: 'Matige exposure',
        bandId: 'moderate',
        heatmap: [
          { name: 'Decision Traceability', score: 68 },
          { name: 'Institutional Memory', score: 72 },
          { name: 'AI Governance', score: 54 },
          { name: 'Rework Exposure', score: 61 },
          { name: 'Executive Continuity', score: 81 },
          { name: 'Signal to Decision Visibility', score: 49 }
        ],
        summary: 'Alleen illustratief voorbeeld. Uw organisatie ontvangt een berekend rapport na afronding van de volledige assessment van 30 vragen.'
      }
    },

    assessmentUi: {
      previewTitle: 'Voorbeeld assessment',
      fullAccessTitle: 'Volledige assessmenttoegang',
      fullAccessCopy: 'De complete diagnostiek van 30 vragen, scoringengine, op maat gemaakte aanbevelingen en PDF-rapport vereisen een betaalde EDMP Readiness Assessment-sessie.',
      tokenLabel: 'Sessietoegangstoken',
      tokenPlaceholder: 'Plak het token uit uw bevestigingsmail',
      enter: 'Enter',
      requestAssessment: 'Vraag Assessment aan',
      sixDimensions: 'Zes EDMP-dimensies',
      fullDiagnosticNote: 'Volledige diagnostiek: 5 gescoorde vragen in deze dimensie (betaalde sessie).',
      sampleReport: 'Voorbeeldrapportoutput',
      illustrativeScores: 'Alleen illustratieve scores. Niet gegenereerd vanuit uw organisatie.',
      boardReadyReport: 'Board-klaar EDMP Readiness Assessment Report',
      sampleRecsTitle: 'Voorbeeldaanbevelingen',
      sampleRecsNote: 'Voorbeelden van aanbevelingsstijl. De volledige engine koppelt regels aan uw scores na betaling.',
      enterToken: 'Voer uw sessietoken in.',
      validating: 'Sessie valideren..',
      companyName: 'Bedrijfsnaam',
      assessmentSponsor: 'Assessment sponsor',
      rolePlaceholder: 'CFO, Governance Lead..',
      facilitatorNotes: 'Facilitatorobservaties..',
      invalidToken: 'Ongeldig of verlopen token. Neem contact op met info@aielevate.xyz.',
      apiNotConfigured: 'Assessment-API nog niet geconfigureerd. Tokenvalidatie werkt na Vercel-deploy.',
      sessionRequired: 'Assessmentsessie vereist.',
      enterOrganisation: 'Voer de organisatienaam in om door te gaan.',
      answerAllFive: 'Beantwoord alle vijf vragen voordat u doorgaat.',
      authorisedBanner: 'Geautoriseerde assessmentsessie actief',
      authorisedSession: 'Geautoriseerde sessie',
      organisation: 'Organisatie',
      contactName: 'Contactnaam',
      roleFunction: 'Rol / functie',
      intakeLead: '30 vragen over zes decision memory-dimensies. Uw antwoorden genereren automatisch een board-klaar rapport.',
      rateEach: 'Beoordeel elke stelling van 1 (niet aanwezig) tot 5 (consistent / institutioneel).',
      assessmentIntake: 'Assessment-intake',
      dimensionOf: 'Dimensie {n} van {total}',
      progress: 'Voortgang',
      back: 'Terug',
      continue: 'Doorgaan',
      generateReport: 'Genereer rapport',
      reset: 'Reset',
      exitSession: 'Sessie afsluiten',
      confirmEndSession: 'Deze assessmentsessie beëindigen?',
      confirmResetAnswers: 'Antwoorden voor deze sessie resetten?',
      overallScore: 'Totaalscore',
      executiveSummary: 'Executive summary',
      exposureSummary: 'Exposure-samenvatting',
      classification: 'Classificatie',
      dimensionHeatmap: 'Dimensie-heatmap',
      dimensionAnalysis: 'Dimensieanalyse',
      topRisks: 'Belangrijkste risico\'s',
      topRecommendations: 'Belangrijkste aanbevelingen',
      roadmap90: 'Roadmap 90 dagen',
      consultantNotes: 'Consultantnotities (optioneel)',
      workshopNotes: 'Workshop- / sessienotities',
      editResponses: 'Antwoorden bewerken',
      downloadPdf: 'Download PDF',
      newAssessment: 'Nieuwe assessment',
      confirmNewAssessment: 'Een nieuwe assessment in deze sessie starten?',
      noElevatedRisks: 'Geen verhoogde domeinrisico\'s boven de drempel.',
      maintainPractices: 'Handhaaf huidige decision memory-praktijken en monitor domeindrift.',
      reviewWithSponsors: 'Beoordeel dimensiescores met executive sponsors.'
    },

    decisionRoomUi: {
      industryRoleRequired: 'Branche en rol zijn verplicht.',
      awaitingFirst: 'Wachten op eerste besluit..',
      tokenPlaceholder: 'Plak het token uit uw bevestigingsmail',
      newSession: 'NIEUWE SESSIE',
      viewPrograms: 'BEKIJK PROGRAMMA\'S',
      sessionComplete: 'SESSIE VOLTOOID',
      criticalFailure: 'KRITIEKE MISLUKKING',
      decisionMemoryGaps: 'Decision memory-hiaten:',
      recommended: 'Aanbevolen:',
      enterToken: 'Voer uw sessietoegangstoken in.',
      apiNotConfigured: 'Decision Room-API is nog niet geconfigureerd. Neem contact op met info@aielevate.xyz.',
      introSub: 'Ervaar hoe besluiten onder druk tot stand komen — en wat uw organisatie later niet zou kunnen reconstrueren. Selecteer een scenario-archetype.',
      scenarioCorporate: 'Regulatiedruk en strategische lancering onder toezicht',
      scenarioGovernment: 'Snel ontwikkelende crisis met governance-zichtbaarheid',
      scenarioRegulated: 'Audit-, compliance- en accountabilityspanning',
      scenarioGrowth: 'Schalende organisatie op het punt van doorbraak of ineenstorting',
      archetypes: {
        corporate: 'Een multinationale organisatie onder regulatiedruk die een kritieke strategische lancering tegemoet ziet.',
        government: 'Een publieke crisisbeheerteam tijdens een snel ontwikkelende noodsituatie.',
        regulated: 'Een gereguleerde enterprise die compliance, auditexposure en operationele continuïteit in balans houdt.',
        growth: 'Een schalende organisatie op de rand van doorbraak of structureel falen.'
      }
    }
  };

  function attach(dict) {
    if (!dict) return;
    dict.packs = dict.packs || {};
    Object.keys(packs).forEach(function (key) {
      dict.packs[key] = packs[key];
    });
  }

  attach(global.AIE_LOCALE_NL);
  if (global.AIE_I18N && global.AIE_I18N.dictionaries && global.AIE_I18N.dictionaries.nl) {
    attach(global.AIE_I18N.dictionaries.nl);
  }
})(typeof window !== 'undefined' ? window : globalThis);
