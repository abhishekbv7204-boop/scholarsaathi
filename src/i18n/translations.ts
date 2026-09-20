export type SupportedLanguage = 'en' | 'kn';

export interface Translations {
  nav: {
    portalName: string;
    portalSubtitle: string;
    home: string;
    findScholarships: string;
    scholarships: string;
    myMatches: string;
    requiredDocuments: string;
    howItWorks: string;
    help: string;
    assistant: string;
    loadDemo: string;
    editProfile: string;
    checkEligibility: string;
    skipToContent: string;
    highContrast: string;
    highContrastOn: string;
    fontSize: string;
    menu: string;
    closeMenu: string;
    kannadaActiveNotice: string;
  };
  buttons: {
    checkEligibility: string;
    browseScholarships: string;
    tryDemo: string;
    loadDemoData: string;
    continue: string;
    back: string;
    evaluating: string;
    evaluateMatches: string;
    viewScholarship: string;
    whyThisResult: string;
    officialSource: string;
    officialSourceUnavailable: string;
    showEvidence: string;
    hideEvidence: string;
    resetChecklist: string;
    viewAllSchemes: string;
    editStudentProfile: string;
    applyNow: string;
    askAssistant: string;
    send: string;
    clear: string;
    filter: string;
    all: string;
    ready: string;
    notReady: string;
    close: string;
    search: string;
    resetFilters: string;
  };
  status: {
    likelyEligible: string;
    likelyEligibleBadge: string;
    needsVerification: string;
    needsVerificationBadge: string;
    notEligible: string;
    notEligibleBadge: string;
    totalChecked: string;
    totalCheckedDesc: string;
    meetsRules: string;
    proofRequired: string;
    criteriaNotMatched: string;
    passedRequirements: string;
    requiringVerification: string;
    failed: string;
    demoData: string;
    verifiedSource: string;
    stateDomicile: string;
    nationalScheme: string;
    audited: string;
    pass: string;
    fail: string;
    needsVerificationRule: string;
  };
  form: {
    candidateDataEntry: string;
    studentProfileTitle: string;
    studentProfileDesc: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    stepNumber: string;
    section1Heading: string;
    section2Heading: string;
    section3Heading: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    ageLabel: string;
    agePlaceholder: string;
    stateLabel: string;
    selectState: string;
    districtLabel: string;
    districtPlaceholder: string;
    courseLabel: string;
    selectCourse: string;
    branchLabel: string;
    branchPlaceholder: string;
    yearLabel: string;
    yearPlaceholder: string;
    marksLabel: string;
    marksPlaceholder: string;
    marksHelp: string;
    institutionTypeLabel: string;
    accommodationLabel: string;
    annualIncomeLabel: string;
    annualIncomePlaceholder: string;
    incomeHelp: string;
    incomePerYear: string;
    categoryLabel: string;
    verifiedCandidateSummary: string;
    year1: string;
    year2: string;
    year3: string;
    year4: string;
    instGovt: string;
    instAided: string;
    instPrivate: string;
    instOther: string;
    dayScholar: string;
    hosteller: string;
    catGeneral: string;
    catOBC: string;
    catSC: string;
    catST: string;
    catOther: string;
  };
  errors: {
    stateRequired: string;
    districtRequired: string;
    ageInvalid: string;
    courseRequired: string;
    branchRequired: string;
    marksInvalid: string;
    incomeInvalid: string;
    categoryRequired: string;
  };
  results: {
    resultsHeaderBadge: string;
    resultsTitle: string;
    resultsSubtitle: string;
    filterResults: string;
    noSchemesMatch: string;
    noSchemesMatchDesc: string;
    assessmentNoteHeading: string;
    likelyEligibleNote: string;
    needsVerificationNote: string;
    notEligibleNote: string;
    docsRequiredHeading: string;
    advisoryNoticeHeading: string;
    advisoryNoticeBody: string;
  };
  why: {
    whyHeaderBadge: string;
    whyTitle: string;
    whySubtitle: string;
    selectSchemeLabel: string;
    auditTrailHeading: string;
    studentReported: string;
    schemeCriteria: string;
    ruleEvaluation: string;
    ruleJustification: string;
    mandatoryRequirement: string;
    conditionalVerification: string;
    fullCriteriaAudited: string;
    nextStepsHeading: string;
    stepCheckDocs: string;
    stepCheckDocsDesc: string;
    stepVisitPortal: string;
    stepVisitPortalDesc: string;
    noProfileFound: string;
    noProfileFoundDesc: string;
  };
  documents: {
    docHeaderBadge: string;
    docTitle: string;
    docSubtitle: string;
    readinessStatus: string;
    docsReadyCount: string;
    complete: string;
    allDocsReadyNote: string;
    tickDocsNote: string;
    filterByScheme: string;
    filterAllSchemes: string;
    markAsReady: string;
    markAsNotReady: string;
    privacyNoticeHeading: string;
    privacyNoticeBody: string;
  };
  help: {
    helpTitle: string;
    helpSubtitle: string;
    howItWorksHeading: string;
    howItWorksIntro: string;
    faqsHeading: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    faq4Q: string;
    faq4A: string;
    faq5Q: string;
    faq5A: string;
  };
  disclaimer: {
    officialDisclaimerHeading: string;
    officialDisclaimerText: string;
    demoDatasetActive: string;
  };
  footer: {
    importantDeclaration: string;
    importantDeclarationText: string;
    quickLinks: string;
    infoCompliance: string;
    contactInquiries: string;
    copyright: string;
  };
  hero: {
    title: string;
    subtitle: string;
    checkEligibility: string;
    browseScholarships: string;
    tryDemo: string;
    tagline: string;
  };
  landingSearch: {
    searchTitle: string;
    searchSubtitle: string;
    searchPlaceholder: string;
    popularCategories: string;
    searchButton: string;
  };
  journey: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  auditTable: {
    criteria: string;
    yourData: string;
    officialRule: string;
    status: string;
  };
  docs: {
    title: string;
    subtitle: string;
    resetChecklist: string;
    readinessStatus: string;
    ready: string;
    notReady: string;
    privacyNotice: string;
  };
  trust: {
    heading: string;
    subheading: string;
    rule1Title: string;
    rule1Desc: string;
    rule2Title: string;
    rule2Desc: string;
    rule3Title: string;
    rule3Desc: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    nav: {
      portalName: 'ScholarSaathi',
      portalSubtitle: 'Student Scholarship Discovery Portal',
      home: 'Home',
      findScholarships: 'Find Scholarships',
      scholarships: 'Scholarships',
      myMatches: 'My Matches',
      requiredDocuments: 'Required Documents',
      howItWorks: 'How It Works',
      help: 'Help',
      assistant: 'Guidance Assistant',
      loadDemo: 'Load Demo Profile',
      editProfile: 'Edit Profile',
      checkEligibility: 'Check Eligibility',
      skipToContent: 'Skip to Main Content',
      highContrast: 'High Contrast',
      highContrastOn: 'High Contrast: ON',
      fontSize: 'Font Size',
      menu: 'Open menu',
      closeMenu: 'Close menu',
      kannadaActiveNotice: 'ಕನ್ನಡ ಭಾಷಾಂತರ ಸಕ್ರಿಯವಾಗಿದೆ (Kannada language active).',
    },
    buttons: {
      checkEligibility: 'Check Eligibility',
      browseScholarships: 'Browse Scholarships',
      tryDemo: 'Try Demo Student',
      loadDemoData: 'Load Demo Student Data',
      continue: 'Continue',
      back: 'Back',
      evaluating: 'Evaluating Deterministic Rules...',
      evaluateMatches: 'Evaluate Scholarship Matches',
      viewScholarship: 'View Scholarship',
      whyThisResult: 'Why This Result',
      officialSource: 'Official Source',
      officialSourceUnavailable: 'Official source not available',
      showEvidence: 'Show Evidence & Audit',
      hideEvidence: 'Hide Evidence Audit',
      resetChecklist: 'Reset Checklist',
      viewAllSchemes: 'View All Schemes',
      editStudentProfile: 'Edit Student Profile',
      applyNow: 'Go to Official Portal to Apply',
      askAssistant: 'Ask Guidance Assistant',
      send: 'Send',
      clear: 'Clear',
      filter: 'Filter Assessment Results:',
      all: 'All',
      ready: 'Ready',
      notReady: 'Not ready',
      close: 'Close',
      search: 'Search',
      resetFilters: 'Reset Filters',
    },
    status: {
      likelyEligible: 'Likely Eligible',
      likelyEligibleBadge: '✓ Likely Eligible',
      needsVerification: 'Needs Verification',
      needsVerificationBadge: '⚠ Needs Verification',
      notEligible: 'Not Eligible',
      notEligibleBadge: '✕ Not Eligible',
      totalChecked: 'Total Checked',
      totalCheckedDesc: 'Scholarship schemes audited against your profile.',
      meetsRules: 'Meets currently checkable rules',
      proofRequired: 'Institutional proof required',
      criteriaNotMatched: 'Criteria did not match',
      passedRequirements: 'Passed Requirements',
      requiringVerification: 'Requiring Verification',
      failed: 'Failed',
      demoData: 'Demo Data',
      verifiedSource: 'Verified Official Source',
      stateDomicile: 'State Domicile',
      nationalScheme: 'National / Central Scheme',
      audited: 'Audited',
      pass: 'PASS',
      fail: 'FAIL',
      needsVerificationRule: 'VERIFICATION NEEDED',
    },
    form: {
      candidateDataEntry: 'Candidate Data Entry',
      studentProfileTitle: 'Student Eligibility Profile',
      studentProfileDesc:
        'Provide your authentic educational and family details for deterministic matching against scholarship rules.',
      step1Title: 'Location & Identity',
      step2Title: 'Course & College',
      step3Title: 'Income & Category',
      stepNumber: 'Step',
      section1Heading: 'Section 1: Personal & Geographic Information',
      section2Heading: 'Section 2: Academic Program & College Details',
      section3Heading: 'Section 3: Family Income & Reservation Category',
      fullNameLabel: 'Full Name (as per Secondary Marks Card)',
      fullNamePlaceholder: 'e.g. Abhishek V.',
      ageLabel: 'Age (Completed Years)',
      agePlaceholder: 'e.g. 21',
      stateLabel: 'State of Permanent Domicile',
      selectState: 'Select State',
      districtLabel: 'Home District',
      districtPlaceholder: 'e.g. Ballari, Bengaluru Urban, Mysuru',
      courseLabel: 'Enrolled Course / Degree',
      selectCourse: 'Select Degree Program',
      branchLabel: 'Branch / Department Specialization',
      branchPlaceholder: 'e.g. Computer Science, Mechanical, Commerce',
      yearLabel: 'Current Year of Study',
      yearPlaceholder: 'Select Year',
      marksLabel: 'Academic Score / Percentage (%)',
      marksPlaceholder: 'e.g. 85.0',
      marksHelp: 'Aggregate marks of previous academic semester/year',
      institutionTypeLabel: 'Institution Management Type',
      accommodationLabel: 'Accommodation Mode',
      annualIncomeLabel: 'Annual Family Income (in INR ₹)',
      annualIncomePlaceholder: 'e.g. 180000',
      incomeHelp: 'As per Revenue Authority Income Certificate',
      incomePerYear: 'year',
      categoryLabel: 'Social Reservation Category',
      verifiedCandidateSummary: 'Verified Candidate Summary:',
      year1: '1st Year',
      year2: '2nd Year',
      year3: '3rd Year',
      year4: '4th Year',
      instGovt: 'Government Institution',
      instAided: 'Government-aided Institution',
      instPrivate: 'Private Institution',
      instOther: 'Other Institution',
      dayScholar: 'Day Scholar',
      hosteller: 'Hosteller',
      catGeneral: 'General',
      catOBC: 'OBC',
      catSC: 'SC',
      catST: 'ST',
      catOther: 'Other',
    },
    errors: {
      stateRequired: 'State is required',
      districtRequired: 'District is required',
      ageInvalid: 'Enter a valid age (14-60)',
      courseRequired: 'Please select a course',
      branchRequired: 'Branch / Specialization is required',
      marksInvalid: 'Enter percentage between 0 and 100',
      incomeInvalid: 'Enter valid annual family income in INR',
      categoryRequired: 'Please select category',
    },
    results: {
      resultsHeaderBadge: 'Automated Deterministic Assessment Results',
      resultsTitle: 'Scholarships You May Qualify For',
      resultsSubtitle:
        'Evaluated against state and central scholarship schemes using verifiable rule matching.',
      filterResults: 'Filter Assessment Results:',
      noSchemesMatch: 'No schemes match the selected filter',
      noSchemesMatchDesc: 'Select "All" to view all evaluated state and central schemes.',
      assessmentNoteHeading: 'Assessment Note:',
      likelyEligibleNote:
        'You appear likely to meet the currently checkable requirements based on self-reported profile attributes.',
      needsVerificationNote:
        'Some conditions require verification against institutional records or revenue certificates.',
      notEligibleNote: 'This scholarship does not match one or more currently checkable requirements.',
      docsRequiredHeading: 'Documents Required',
      advisoryNoticeHeading: 'Advisory Guidance Notice:',
      advisoryNoticeBody:
        'ScholarSaathi provides automated deterministic guidance based on the available codified rules. We do not issue final scholarship approvals. You appear likely to meet the currently checkable requirements where indicated. Always verify the latest official notification before applying.',
    },
    why: {
      whyHeaderBadge: 'Transparent Deterministic Evaluation Engine',
      whyTitle: 'Why did ScholarSaathi give me this result?',
      whySubtitle:
        'Every scholarship assessment is determined by deterministic rule comparison against codified statutory criteria. Below is the line-by-line audit trail disclosing your reported profile values, official thresholds, pass/fail status, and justifications.',
      selectSchemeLabel: 'Select Evaluated Scholarship Scheme:',
      auditTrailHeading: 'Detailed Statutory Rule Audit Trail',
      studentReported: 'Student Reported Value',
      schemeCriteria: 'Official Scheme Threshold',
      ruleEvaluation: 'Deterministic Result',
      ruleJustification: 'Justification & Evidence',
      mandatoryRequirement: 'Mandatory Requirement',
      conditionalVerification: 'Subject to Institutional Verification',
      fullCriteriaAudited: 'Rules Audited',
      nextStepsHeading: 'Recommended Next Steps for this Scheme',
      stepCheckDocs: 'Prepare Required Certificates',
      stepCheckDocsDesc: 'Use our Checklist tool to verify income and category documents.',
      stepVisitPortal: 'Visit the Designated Official Scholarship Portal',
      stepVisitPortalDesc: 'Submit your official application on the designated state or national portal (e.g. SSP Karnataka, NSP, AICTE).',
      noProfileFound: 'No Evaluated Profile Found',
      noProfileFoundDesc:
        'Please complete your student profile or click "Try Demo Student" to generate eligibility evaluations.',
    },
    documents: {
      docHeaderBadge: 'Applicant Readiness & Documentation',
      docTitle: 'Documents You May Need',
      docSubtitle:
        'Keep track of required revenue certificates, academic scorecards, and institutional proofs locally.',
      readinessStatus: 'Readiness Status',
      docsReadyCount: 'documents ready',
      complete: 'Complete',
      allDocsReadyNote:
        'All documents marked as ready. Ensure all certificates possess active revenue validity dates.',
      tickDocsNote:
        'Tick each document as Ready once you have verified your physical certificate or DigiLocker copy.',
      filterByScheme: 'Filter Documents by Scholarship Scheme:',
      filterAllSchemes: 'All Evaluated Scholarships',
      markAsReady: 'Mark as ready',
      markAsNotReady: 'Mark as not ready',
      privacyNoticeHeading: 'Local-Only Checklist:',
      privacyNoticeBody:
        'This tracker stores checklist states strictly on your browser using localStorage. ScholarSaathi never requests, uploads, or stores your confidential documents or certificates.',
    },
    help: {
      helpTitle: 'How ScholarSaathi Works & FAQs',
      helpSubtitle:
        'Understanding our deterministic matching engine, student privacy guarantees, and official portals.',
      howItWorksHeading: 'How ScholarSaathi Evaluates Eligibility',
      howItWorksIntro:
        'ScholarSaathi operates on an unambiguous, rule-by-rule deterministic evaluation engine. We eliminate guesswork by directly comparing your verified inputs against codified statutory guidelines.',
      faqsHeading: 'Frequently Asked Questions',
      faq1Q: 'Is ScholarSaathi an official Government of India portal?',
      faq1A:
        'No. ScholarSaathi is an independent, student-focused hackathon project created to simplify scholarship discovery. It does not issue scholarships, process government disbursements, or represent any central or state government ministry.',
      faq2Q: 'Why does ScholarSaathi not ask for Aadhaar or certificate uploads?',
      faq2A:
        'Privacy by design. ScholarSaathi only evaluates self-reported criteria to determine potential eligibility. We never collect or store sensitive government identity documents or revenue certificates on any server.',
      faq3Q: 'How often are the scholarship rules updated?',
      faq3A:
        'Our demo dataset records include audit timestamps corresponding to official state and national guidelines from SSP Karnataka, NSP Central Sector, and AICTE circulars.',
      faq4Q: 'Can I directly submit my scholarship application through ScholarSaathi?',
      faq4A:
        'No. Once you verify your eligibility and prepare required certificates using our checklist, you must submit your final application on the official designated government portal (such as National Scholarship Portal or State Scholarship Portal).',
      faq5Q: 'What should I do if my annual income exceeds the stated ceiling?',
      faq5A:
        'Scholarships strictly enforce family income ceilings based on the certificate issued by your local Revenue Department (Tehsildar/SDM). If your family income exceeds the scheme cap, that specific scheme will be marked "Not Eligible", but other merit or corporate schemes with higher or no income caps may still be available.',
    },
    disclaimer: {
      officialDisclaimerHeading: 'Official Disclaimer:',
      officialDisclaimerText:
        'ScholarSaathi provides guidance based on its available dataset. Always verify final eligibility and requirements with the official scholarship authority.',
      demoDatasetActive: 'DEMO DATASET ACTIVE',
    },
    footer: {
      importantDeclaration: 'Important Declaration:',
      importantDeclarationText:
        'ScholarSaathi is an independent hackathon demonstration project created to assist students in discovering scholarship schemes. ScholarSaathi is NOT an official Government of India or State Government website, does not issue grants or official decisions, and is not affiliated with any ministry.',
      quickLinks: 'Quick Links',
      infoCompliance: 'Information & Compliance',
      contactInquiries: 'Contact & Project Inquiries',
      copyright: 'ScholarSaathi. Built as an independent student welfare portal.',
    },
    hero: {
      title: 'Find Scholarships You Actually Qualify For — Fast, Fair, and Verifiable.',
      subtitle:
        'A deterministic, rules-based scholarship discovery platform for students in India. Transparent eligibility checking with official audit trails and zero guesswork.',
      checkEligibility: 'Check Your Eligibility',
      browseScholarships: 'Browse Scholarships',
      tryDemo: 'Try Demo Student',
      tagline: 'Direct, deterministic rule verification • Local private data • No Aadhaar required',
    },
    landingSearch: {
      searchTitle: 'Search Karnataka & National Scholarships',
      searchSubtitle:
        'Quickly lookup active schemes by caste, academic qualification, scheme provider, or course level.',
      searchPlaceholder: 'Search by scheme name, category (e.g. OBC, SC, ST), course, or authority...',
      popularCategories: 'Popular Searches',
      searchButton: 'Search Schemes',
    },
    journey: {
      title: 'How ScholarSaathi Works for Students',
      subtitle:
        'From entering basic academic and financial criteria to verifying physical documents and applying on official portals.',
      step1Title: 'Enter Student Details',
      step1Desc: 'Provide basic academic marks, annual family income, category, and state of domicile.',
      step2Title: 'Deterministic Rule Match',
      step2Desc: 'Our engine computes strict compliance against codified statutory scheme requirements.',
      step3Title: 'Transparent Status & Audit',
      step3Desc: 'Review line-by-line justification explaining exactly why you qualified or did not qualify.',
      step4Title: 'Prepare Physical Documents',
      step4Desc: 'Track necessary certificates locally using our digital document preparation checklist.',
      step5Title: 'Apply on Official Portals',
      step5Desc: 'Navigate directly to authorized State (SSP) or Central (NSP) portals to submit your claim.',
    },
    auditTable: {
      criteria: 'Requirement Criteria',
      yourData: 'Your Information',
      officialRule: 'Official Scheme Rule',
      status: 'Deterministic Result',
    },
    docs: {
      title: 'Documents You May Need',
      subtitle: 'Keep track of required revenue certificates, academic scorecards, and institutional proofs locally.',
      resetChecklist: 'Reset Checklist',
      readinessStatus: 'Readiness Status',
      ready: 'Ready',
      notReady: 'Pending',
      privacyNotice: 'This tracker stores checklist states strictly on your browser using localStorage. ScholarSaathi never requests, uploads, or stores your confidential documents or certificates.',
    },
    trust: {
      heading: 'Evidence-based scholarship discovery',
      subheading: 'Eligibility results are based on structured rules and should be verified against the latest official scholarship notification.',
      rule1Title: '1. Structured Logical Rules',
      rule1Desc: 'Evaluates family income caps, minimum mark percentages, social categories, and state domiciles deterministically without guesswork.',
      rule2Title: '2. Clear & Auditable Outcomes',
      rule2Desc: 'Classifies every scheme as Likely Eligible, Needs Verification, or Not Eligible with an explicit rule-by-rule condition breakdown.',
      rule3Title: '3. Official Circular Citations',
      rule3Desc: 'Links directly to designated official portal circulars and application portals (SSP Karnataka, NSP, AICTE) for student verification.',
    },
  },
  kn: {
    nav: {
      portalName: 'ಸ್ಫಾಲರ್ ಸಾಥಿ',
      portalSubtitle: 'ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಶೋಧನಾ ಪೋರ್ಟಲ್',
      home: 'ಮುಖಪುಟ',
      findScholarships: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಹುಡುಕಿ',
      scholarships: 'ಯೋಜನೆಗಳು',
      myMatches: 'ನನ್ನ ಹೊಂದಾಣಿಕೆಗಳು',
      requiredDocuments: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
      howItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
      help: 'ಸಹಾಯ',
      assistant: 'ಮಾರ್ಗದರ್ಶಿ ಸಹಾಯಕ',
      loadDemo: 'ಡೆಮೊ ಪ್ರೊಫೈಲ್ ಲೋಡ್ ಮಾಡಿ',
      editProfile: 'ಪ್ರೊಫೈಲ್ ತಿದ್ದಿ',
      checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
      skipToContent: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ',
      highContrast: 'ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್',
      highContrastOn: 'ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್: ಆನ್',
      fontSize: 'ಅಕ್ಷರದ ಗಾತ್ರ',
      menu: 'ಮೆನು ತೆರೆಯಿರಿ',
      closeMenu: 'ಮೆನು ಮುಚ್ಚಿ',
      kannadaActiveNotice: 'ಕನ್ನಡ ಭಾಷಾಂತರ ಸಕ್ರಿಯವಾಗಿದೆ. ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ.',
    },
    buttons: {
      checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
      browseScholarships: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      tryDemo: 'ಡೆಮೊ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಯತ್ನಿಸಿ',
      loadDemoData: 'ಡೆಮೊ ವಿದ್ಯಾರ್ಥಿ ವಿವರ ಲೋಡ್ ಮಾಡಿ',
      continue: 'ಮುಂದುವರಿಯಿರಿ',
      back: 'ಹಿಂದೆ',
      evaluating: 'ನಿಯಮಗಳ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      evaluateMatches: 'ಅರ್ಹತೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ',
      viewScholarship: 'ಯೋಜನೆಯ ವಿವರ ನೋಡಿ',
      whyThisResult: 'ಈ ಫಲಿತಾಂಶ ಏಕೆ?',
      officialSource: 'ಅಧಿಕೃತ ಮೂಲ',
      officialSourceUnavailable: 'ಅಧಿಕೃತ ಮೂಲ ಲಭ್ಯವಿಲ್ಲ',
      showEvidence: 'ಆಡಿಟ್ ಮತ್ತು ನಿಯಮ ವಿವರಗಳನ್ನು ತೋರಿಸಿ',
      hideEvidence: 'ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ',
      resetChecklist: 'ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ಮರುಹೊಂದಿಸಿ',
      viewAllSchemes: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
      editStudentProfile: 'ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳನ್ನು ತಿದ್ದಿ',
      applyNow: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',
      askAssistant: 'ಸಹಾಯಕರನ್ನು ಕೇಳಿ',
      send: 'ಕಳುಹಿಸಿ',
      clear: 'ತೆರವುಗೊಳಿಸಿ',
      filter: 'ಫಲಿತಾಂಶಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ:',
      all: 'ಎಲ್ಲವೂ',
      ready: 'ಸಿದ್ಧವಾಗಿದೆ',
      notReady: 'ಸಿದ್ಧವಾಗಿಲ್ಲ',
      close: 'ಮುಚ್ಚಿ',
      search: 'ಹುಡುಕಿ',
      resetFilters: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
    },
    status: {
      likelyEligible: 'ಅರ್ಹತೆಯ ಸಾಧ್ಯತೆ ಇದೆ',
      likelyEligibleBadge: '✓ ಅರ್ಹತೆಯ ಸಾಧ್ಯತೆ ಇದೆ',
      needsVerification: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
      needsVerificationBadge: '⚠ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
      notEligible: 'ಅರ್ಹರಲ್ಲ',
      notEligibleBadge: '✕ ಅರ್ಹರಲ್ಲ',
      totalChecked: 'ಒಟ್ಟು ಪರಿಶೀಲಿಸಿದ ಯೋಜನೆಗಳು',
      totalCheckedDesc: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ವಿರುದ್ಧ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾದ ಒಟ್ಟು ಯೋಜನೆಗಳು.',
      meetsRules: 'ಪ್ರಸ್ತುತ ನಿಯಮಗಳನ್ನು ಪೂರೈಸುತ್ತದೆ',
      proofRequired: 'ಕಾಲೇಜು / ದಾಖಲೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ',
      criteriaNotMatched: 'ಮಾನದಂಡಗಳು ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ',
      passedRequirements: 'ಹೊಂದಾಣಿಕೆಯಾದ ನಿಯಮಗಳು',
      requiringVerification: 'ಪರಿಶೀಲನೆ ಬೇಕಾದ ನಿಯಮಗಳು',
      failed: 'ಹೊಂದಿಕೆಯಾಗದ ನಿಯಮಗಳು',
      demoData: 'ಡೆಮೊ ಡೇಟಾ',
      verifiedSource: 'ದೃಢೀಕೃತ ಅಧಿಕೃತ ಮೂಲ',
      stateDomicile: 'ರಾಜ್ಯ ನಿವಾಸಿ',
      nationalScheme: 'ರಾಷ್ಟ್ರೀಯ / ಕೇಂದ್ರ ಯೋಜನೆ',
      audited: 'ಪರಿಶೀಲಿಸಿದ ದಿನಾಂಕ',
      pass: 'ಉತ್ತೀರ್ಣ',
      fail: 'ಅನುತ್ತೀರ್ಣ',
      needsVerificationRule: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯ',
    },
    form: {
      candidateDataEntry: 'ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ ನಮೂದು',
      studentProfileTitle: 'ವಿದ್ಯಾರ್ಥಿ ಅರ್ಹತಾ ಪ್ರೊಫೈಲ್',
      studentProfileDesc:
        'ವಿದ್ಯಾರ್ಥಿವೇತನ ನಿಯಮಗಳ ನಿಖರ ಹೊಂದಾಣಿಕೆಗಾಗಿ ನಿಮ್ಮ ಅಧಿಕೃತ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಕುಟುಂಬದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.',
      step1Title: 'ಸ್ಥಳ ಮತ್ತು ವೈಯಕ್ತಿಕ ವಿವರ',
      step2Title: 'ಕೋರ್ಸ್ ಮತ್ತು ಕಾಲೇಜು',
      step3Title: 'ಆದಾಯ ಮತ್ತು ಪ್ರವರ್ಗ',
      stepNumber: 'ಹಂತ',
      section1Heading: 'ವಿಭಾಗ ೧: ವೈಯಕ್ತಿಕ ಮತ್ತು ಭೌಗೋಳಿಕ ಮಾಹಿತಿ',
      section2Heading: 'ವಿಭಾಗ ೨: ಶೈಕ್ಷಣಿಕ ಕೋರ್ಸ್ ಮತ್ತು ಕಾಲೇಜು ವಿವರಗಳು',
      section3Heading: 'ವಿಭಾಗ ೩: ಕುಟುಂಬದ ಆದಾಯ ಮತ್ತು ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
      fullNameLabel: 'ಪೂರ್ಣ ಹೆಸರು (ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ ಅಂಕಪಟ್ಟಿಯಂತೆ)',
      fullNamePlaceholder: 'ಉದಾ. ಅಭಿಷೇಕ್ ವಿ.',
      ageLabel: 'ವಯಸ್ಸು (ಪೂರ್ಣಗೊಂಡ ವರ್ಷಗಳು)',
      agePlaceholder: 'ಉದಾ. 21',
      stateLabel: 'ಖಾಯಂ ನಿವಾಸದ ರಾಜ್ಯ',
      selectState: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      districtLabel: 'ಸ್ವಂತ ಜಿಲ್ಲೆ',
      districtPlaceholder: 'ಉದಾ. ಬಳ್ಳಾರಿ, ಬೆಂಗಳೂರು ನಗರ, ಮೈಸೂರು',
      courseLabel: 'ದಾಖಲಾಗಿರುವ ಕೋರ್ಸ್ / ಪದವಿ',
      selectCourse: 'ಪದವಿ ಕೋರ್ಸ್ ಆಯ್ಕೆಮಾಡಿ',
      branchLabel: 'ಶಾಖೆ / ವಿಭಾಗ',
      branchPlaceholder: 'ಉದಾ. ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್, ಮೆಕ್ಯಾನಿಕಲ್, ಕಾಮರ್ಸ್',
      yearLabel: 'ಪ್ರಸ್ತುತ ವ್ಯಾಸಂಗದ ವರ್ಷ',
      yearPlaceholder: 'ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ',
      marksLabel: 'ಶೈಕ್ಷಣಿಕ ಅಂಕ / ಶೇಕಡಾವಾರು (%)',
      marksPlaceholder: 'ಉದಾ. 85.0',
      marksHelp: 'ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್ / ಶೈಕ್ಷಣಿಕ ವರ್ಷದ ಒಟ್ಟು ಅಂಕಗಳ ಶೇಕಡಾವಾರು',
      institutionTypeLabel: 'ಕಾಲೇಜು ಆಡಳಿತ ವರ್ಗ',
      accommodationLabel: 'ವಸತಿ ವಿಧ',
      annualIncomeLabel: 'ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ (ರೂಪಾಯಿಗಳಲ್ಲಿ ₹)',
      annualIncomePlaceholder: 'ಉದಾ. 180000',
      incomeHelp: 'ಕಂದಾಯ ಇಲಾಖೆಯ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರಕಾರ',
      incomePerYear: 'ವರ್ಷಕ್ಕೆ',
      categoryLabel: 'ಸಾಮಾಜಿಕ ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
      verifiedCandidateSummary: 'ದೃಢೀಕರಿಸಿದ ವಿದ್ಯಾರ್ಥಿ ಸಾರಾಂಶ:',
      year1: '೧ನೇ ವರ್ಷ (1st Year)',
      year2: '೨ನೇ ವರ್ಷ (2nd Year)',
      year3: '೩ನೇ ವರ್ಷ (3rd Year)',
      year4: '೪ನೇ ವರ್ಷ (4th Year)',
      instGovt: 'ಸರ್ಕಾರಿ ಕಾಲೇಜು (Government)',
      instAided: 'ಅನುದಾನಿತ ಕಾಲೇಜು (Government-aided)',
      instPrivate: 'ಖಾಸಗಿ ಕಾಲೇಜು (Private)',
      instOther: 'ಇತರ ಕಾಲೇಜು (Other)',
      dayScholar: 'ದಿನದ ವಿದ್ಯಾರ್ಥಿ (Day Scholar)',
      hosteller: 'ಹಾಸ್ಟೆಲರ್ (Hosteller)',
      catGeneral: 'ಸಾಮಾನ್ಯ (General)',
      catOBC: 'ಹಿಂದುಳಿದ ವರ್ಗ (OBC)',
      catSC: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ (SC)',
      catST: 'ಪರಿಶಿಷ್ಟ ಪಂಗಡ (ST)',
      catOther: 'ಇತರ (Other)',
    },
    errors: {
      stateRequired: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆ ಮಾಡುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ',
      districtRequired: 'ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ',
      ageInvalid: 'ಮಾನ್ಯವಾದ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ (14 ರಿಂದ 60 ರವರೆಗೆ)',
      courseRequired: 'ದಯವಿಟ್ಟು ಕೋರ್ಸ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      branchRequired: 'ಶಾಖೆ ಅಥವಾ ವಿಭಾಗವನ್ನು ನಮೂದಿಸುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ',
      marksInvalid: '0 ರಿಂದ 100 ರ ನಡುವೆ ಶೇಕಡಾವಾರು ಅಂಕಗಳನ್ನು ನಮೂದಿಸಿ',
      incomeInvalid: 'ಮಾನ್ಯವಾದ ವಾರ್ಷಿಕ ಕುಟುಂಬ ಆದಾಯವನ್ನು ರೂಪಾಯಿಗಳಲ್ಲಿ ನಮೂದಿಸಿ',
      categoryRequired: 'ದಯವಿಟ್ಟು ಪ್ರವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    },
    results: {
      resultsHeaderBadge: 'ಸ್ವಯಂಚಾಲಿತ ನಿಖರ ಅರ್ಹತಾ ಫಲಿತಾಂಶಗಳು',
      resultsTitle: 'ನೀವು ಅರ್ಹತೆ ಹೊಂದಬಹುದಾದ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
      resultsSubtitle:
        'ಅಧಿಕೃತ ಅರ್ಹತಾ ನಿಯಮಗಳ ವಿರುದ್ಧ ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಯೋಜನೆಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ.',
      filterResults: 'ಫಲಿತಾಂಶಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ:',
      noSchemesMatch: 'ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಯೋಜನೆಗಳು ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ',
      noSchemesMatchDesc: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು "ಎಲ್ಲವೂ" ಆಯ್ಕೆಮಾಡಿ.',
      assessmentNoteHeading: 'ಮೌಲ್ಯಮಾಪನ ಟಿಪ್ಪಣಿ:',
      likelyEligibleNote:
        'ನೀವು ನಮೂದಿಸಿದ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ ಪ್ರಸ್ತುತ ಪರಿಶೀಲಿಸಬಹುದಾದ ನಿಯಮಗಳನ್ನು ಪೂರೈಸುವ ಸಾಧ್ಯತೆಯಿದೆ.',
      needsVerificationNote:
        'ಕೆಲವು ನಿಯಮಗಳಿಗೆ ಕಾಲೇಜು ದಾಖಲೆಗಳು ಅಥವಾ ಕಂದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳ ಅಧಿಕೃತ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.',
      notEligibleNote:
        'ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವು ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಕಡ್ಡಾಯ ನಿಯಮಗಳನ್ನು ಪೂರೈಸುತ್ತಿಲ್ಲ.',
      docsRequiredHeading: 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು',
      advisoryNoticeHeading: 'ಸಲಹಾ ಮಾರ್ಗದರ್ಶನ ಸೂಚನೆ:',
      advisoryNoticeBody:
        'ScholarSaathi ಲಭ್ಯವಿರುವ ನಿಯಮಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ವಯಂಚಾಲಿತ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ. ಇದು ಸರ್ಕಾರದ ಅಂತಿಮ ಅನುಮೋದನೆಯಲ್ಲ. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಧಿಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    },
    why: {
      whyHeaderBadge: 'ಪಾರದರ್ಶಕ ನಿಯಮ ಮೌಲ್ಯಮಾಪನ ಎಂಜಿನ್',
      whyTitle: 'ScholarSaathi ನನಗೆ ಈ ಫಲಿತಾಂಶವನ್ನು ಏಕೆ ನೀಡಿತು?',
      whySubtitle:
        'ಪ್ರತಿಯೊಂದು ವಿದ್ಯಾರ್ಥಿವೇತನ ಮೌಲ್ಯಮಾಪನವನ್ನು ನಿಗದಿತ ಅರ್ಹತಾ ನಿಯಮಗಳ ವಿರುದ್ಧ ನೇರ ಹೋಲಿಕೆಯ ಮೂಲಕ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ, ಅಧಿಕೃತ ಮಾನದಂಡಗಳು ಮತ್ತು ನಿಯಮದ ವಿವರಣೆಗಳನ್ನು ಕೆಳಗೆ ನೀಡಲಾಗಿದೆ.',
      selectSchemeLabel: 'ಮೌಲ್ಯಮಾಪನ ಮಾಡಿದ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
      auditTrailHeading: 'ವಿವರವಾದ ಅಧಿಕೃತ ನಿಯಮಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
      studentReported: 'ವಿದ್ಯಾರ್ಥಿ ನಮೂದಿಸಿದ ವಿವರ',
      schemeCriteria: 'ಅಧಿಕೃತ ಯೋಜನೆಯ ಮಾನದಂಡ',
      ruleEvaluation: 'ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶ',
      ruleJustification: 'ವಿವರಣೆ ಮತ್ತು ಸಾಕ್ಷಿ',
      mandatoryRequirement: 'ಕಡ್ಡಾಯ ನಿಯಮ',
      conditionalVerification: 'ಕಾಲೇಜು / ದಾಖಲೆ ಪರಿಶೀಲನೆಗೆ ಒಳಪಟ್ಟಿದೆ',
      fullCriteriaAudited: 'ಪರಿಶೀಲಿಸಿದ ನಿಯಮಗಳು',
      nextStepsHeading: 'ಮುಂದಿನ ಕ್ರಮಗಳು',
      stepCheckDocs: 'ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ',
      stepCheckDocsDesc: 'ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ನಮ್ಮ ದಾಖಲೆ ಪಟ್ಟಿ ಬಳಸಿ.',
      stepVisitPortal: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',
      stepVisitPortalDesc: 'ರಾಜ್ಯ (SSP) ಅಥವಾ ಕೇಂದ್ರ (NSP) ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.',
      noProfileFound: 'ಯಾವುದೇ ಪ್ರೊಫೈಲ್ ಕಂಡುಬಂದಿಲ್ಲ',
      noProfileFoundDesc:
        'ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ ಅಥವಾ "ಡೆಮೊ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಯತ್ನಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',
    },
    documents: {
      docHeaderBadge: 'ಅರ್ಜಿದಾರರ ದಾಖಲೆಗಳ ಸಿದ್ಧತೆ',
      docTitle: 'ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು',
      docSubtitle:
        'ಅಗತ್ಯವಿರುವ ಕಂದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳು, ಅಂಕಪಟ್ಟಿಗಳು ಮತ್ತು ಕಾಲೇಜು ದಾಖಲೆಗಳನ್ನು ಇಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
      readinessStatus: 'ಸಿದ್ಧತೆ ಸ್ಥಿತಿ',
      docsReadyCount: 'ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ',
      complete: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      allDocsReadyNote:
        'ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ. ಪ್ರಮಾಣಪತ್ರಗಳ ಮಾನ್ಯತೆ ಚಾಲ್ತಿಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      tickDocsNote:
        'ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಡಿಜಿಲಾಕರ್ ಪ್ರತಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ ನಂತರ ಪ್ರತಿ ದಾಖಲೆಯನ್ನು ಸಿದ್ಧವಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ.',
      filterByScheme: 'ಯೋಜನೆಯ ಆಧಾರದ ಮೇಲೆ ದಾಖಲೆಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ:',
      filterAllSchemes: 'ಎಲ್ಲಾ ಮೌಲ್ಯಮಾಪನಗೊಂಡ ಯೋಜನೆಗಳು',
      markAsReady: 'ಸಿದ್ಧವಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
      markAsNotReady: 'ಸಿದ್ಧವಾಗಿಲ್ಲ ಎಂದು ಗುರುತಿಸಿ',
      privacyNoticeHeading: 'ಸ್ಥಳೀಯ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ:',
      privacyNoticeBody:
        'ಈ ಟ್ರ್ಯಾಕರ್ ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ localStorage ನಲ್ಲಿ ಮಾತ್ರ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸುತ್ತದೆ. ScholarSaathi ಎಂದಿಗೂ ನಿಮ್ಮ ರಹಸ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕೇಳುವುದಿಲ್ಲ.',
    },
    help: {
      helpTitle: 'ScholarSaathi ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ & ಪ್ರಶ್ನೋತ್ತರಗಳು',
      helpSubtitle:
        'ನಮ್ಮ ನಿಖರ ನಿಯಮ ಹೊಂದಾಣಿಕೆ ಎಂಜಿನ್, ವಿದ್ಯಾರ್ಥಿ ಗೌಪ್ಯತೆ ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳ ವಿವರಣೆ.',
      howItWorksHeading: 'ScholarSaathi ಅರ್ಹತೆಯನ್ನು ಹೇಗೆ ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ',
      howItWorksIntro:
        'ScholarSaathi ಯಾವುದೇ ಊಹೆಗಳಿಲ್ಲದೆ, ಅಧಿಕೃತ ಸರ್ಕಾರಿ ನಿಯಮಗಳೊಂದಿಗೆ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೇರವಾಗಿ ಹೋಲಿಸಿ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.',
      faqsHeading: 'ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
      faq1Q: 'ScholarSaathi ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಆಗಿದೆಯೇ?',
      faq1A:
        'ಇಲ್ಲ. ScholarSaathi ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಾಹಿತಿ ತಿಳಿಯಲು ನೆರವಾಗುವ ಸ್ವತಂತ್ರ ಶೈಕ್ಷಣಿಕ ಪೋರ್ಟಲ್ ಆಗಿದೆ. ಇದು ಯಾವುದೇ ಸರ್ಕಾರಿ ಇಲಾಖೆಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ.',
      faq2Q: 'ScholarSaathi ಆಧಾರ್ ಅಥವಾ ಪ್ರಮಾಣಪತ್ರಗಳ ಅಪ್‌ಲೋಡ್ ಏಕೆ ಕೇಳುವುದಿಲ್ಲ?',
      faq2A:
        'ಗೌಪ್ಯತೆಯ ರಕ್ಷಣೆಗಾಗಿ. ScholarSaathi ನೀವು ನಮೂದಿಸುವ ವಿವರಗಳನ್ನು ಮಾತ್ರ ನಿಯಮಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸುತ್ತದೆ. ನಿಮ್ಮ ಯಾವುದೇ ಸೂಕ್ಷ್ಮ ದಾಖಲೆಗಳನ್ನು ಸರ್ವರ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ.',
      faq3Q: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ನಿಯಮಗಳನ್ನು ಎಷ್ಟು ಬಾರಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ?',
      faq3A:
        'ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP), ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್ (NSP) ಮತ್ತು AICTE ಅಧಿಸೂಚನೆಗಳ ಪ್ರಕಾರ ನಿಯಮಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
      faq4Q: 'ScholarSaathi ಮೂಲಕ ನೇರವಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದೇ?',
      faq4A:
        'ಇಲ್ಲ. ಇಲ್ಲಿ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ ದಾಖಲೆ ಸಿದ್ಧಪಡಿಸಿದ ನಂತರ, ನೀವು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿಯೇ (SSP ಅಥವಾ NSP) ಅಂತಿಮ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಬೇಕು.',
      faq5Q: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ನಿಗದಿತ ಮಿತಿಗಿಂತ ಹೆಚ್ಚಿದ್ದರೆ ಏನು ಮಾಡಬೇಕು?',
      faq5A:
        'ಸರ್ಕಾರಿ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ಕಂದಾಯ ಇಲಾಖೆಯ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಕಡ್ಡಾಯ. ಮಿತಿ ಮೀರಿದರೆ ಆ ಯೋಜನೆಗೆ "ಅರ್ಹರಲ್ಲ" ಎಂದು ಬರುತ್ತದೆ. ಆದರೆ ಮೆರಿಟ್ ಆಧಾರಿತ ಇತರ ಯೋಜನೆಗಳು ಲಭ್ಯವಿರಬಹುದು.',
    },
    disclaimer: {
      officialDisclaimerHeading: 'ಅಧಿಕೃತ ಹಕ್ಕುತ್ಯಾಗ:',
      officialDisclaimerText:
        'ScholarSaathi ಲಭ್ಯವಿರುವ ಮಾಹಿತಿ ಪ್ರಕಾರ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಅಂತಿಮ ಅರ್ಹತೆ ಮತ್ತು ನಿಯಮಗಳನ್ನು ಅಧಿಕೃತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪ್ರಾಧಿಕಾರದಿಂದಲೇ ದೃಢೀಕರಿಸಿಕೊಳ್ಳಿ.',
      demoDatasetActive: 'ಡೆಮೊ ಡೇಟಾಸೆಟ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    },
    footer: {
      importantDeclaration: 'ಪ್ರಮುಖ ಘೋಷಣೆ:',
      importantDeclarationText:
        'ScholarSaathi ಸ್ವತಂತ್ರ ವಿದ್ಯಾರ್ಥಿ ಕಲ್ಯಾಣ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಯೋಜನೆಯಾಗಿದೆ. ಇದು ಭಾರತ ಸರ್ಕಾರ ಅಥವಾ ಯಾವುದೇ ರಾಜ್ಯ ಸರ್ಕಾರದ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ.',
      quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
      infoCompliance: 'ಮಾಹಿತಿ ಮತ್ತು ಮಾನದಂಡಗಳು',
      contactInquiries: 'ಸಂಪರ್ಕ ಮತ್ತು ವಿಚಾರಣೆ',
      copyright: 'ScholarSaathi. ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಾರ್ಗದರ್ಶನ ಪೋರ್ಟಲ್.',
    },
    hero: {
      title: 'ನೀವು ನಿಜವಾಗಿಯೂ ಅರ್ಹರಾಗಿರುವ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಸುಲಭವಾಗಿ ಮತ್ತು ಪಾರದರ್ಶಕವಾಗಿ ಕಂಡುಕೊಳ್ಳಿ.',
      subtitle:
        'ಭಾರತೀಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ನಿಖರ, ನಿಯಮ-ಆಧಾರಿತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅನ್ವೇಷಣಾ ವೇದಿಕೆ. ಯಾವುದೇ ಊಹೆಗಳಿಲ್ಲದೆ, ಅಧಿಕೃತ ಆಡಿಟ್ ಟ್ರಯಲ್‌ನೊಂದಿಗೆ ಪಾರದರ್ಶಕ ಅರ್ಹತಾ ಪರಿಶೀಲನೆ.',
      checkEligibility: 'ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
      browseScholarships: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      tryDemo: 'ಡೆಮೊ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಯತ್ನಿಸಿ',
      tagline: 'ನೇರ, ನಿಖರ ನಿಯಮ ಪರಿಶೀಲನೆ • ಖಾಸಗಿ ಸ್ಥಳೀಯ ಡೇಟಾ • ಆಧಾರ್ ಕಡ್ಡಾಯವಿಲ್ಲ',
    },
    landingSearch: {
      searchTitle: 'ಕರ್ನಾಟಕ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಹುಡುಕಿ',
      searchSubtitle:
        'ಜಾತಿ, ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ, ಇಲಾಖೆ ಅಥವಾ ಕೋರ್ಸ್ ಹಂತದ ಪ್ರಕಾರ ಸಕ್ರಿಯ ಯೋಜನೆಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಹುಡುಕಿ.',
      searchPlaceholder: 'ಯೋಜನೆಯ ಹೆಸರು, ಪ್ರವರ್ಗ (OBC, SC, ST), ಕೋರ್ಸ್ ಅಥವಾ ಇಲಾಖೆ ಮೂಲಕ ಹುಡುಕಿ...',
      popularCategories: 'ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು',
      searchButton: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
    },
    journey: {
      title: 'ScholarSaathi ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಹೇಗೆ ನೆರವಾಗುತ್ತದೆ?',
      subtitle:
        'ಮೂಲ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಆರ್ಥಿಕ ವಿವರಗಳ ನಮೂದಿನಿಂದ ಹಿಡಿದು, ಭೌತಿಕ ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವವರೆಗಿನ ಹಂತಗಳು.',
      step1Title: 'ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
      step1Desc: 'ಶೈಕ್ಷಣಿಕ ಅಂಕಗಳು, ವಾರ್ಷಿಕ ಕುಟುಂಬ ಆದಾಯ, ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ ಮತ್ತು ವಾಸಸ್ಥಳದ ರಾಜ್ಯವನ್ನು ನಮೂದಿಸಿ.',
      step2Title: 'ನಿಖರ ನಿಯಮಗಳ ಮೌಲ್ಯಮಾಪನ',
      step2Desc: 'ನಮ್ಮ ಸಿಸ್ಟಮ್ ಅಧಿಕೃತ ಶಾಸನಬದ್ಧ ನಿಯಮಗಳ ಪ್ರಕಾರ ನೇರವಾಗಿ ಅನುಸರಣೆಯನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.',
      step3Title: 'ಪಾರದರ್ಶಕ ಫಲಿತಾಂಶ ಮತ್ತು ಆಡಿಟ್',
      step3Desc: 'ನೀವು ಏಕೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ ಅಥವಾ ಇಲ್ಲ ಎಂಬುದನ್ನು ವಿವರಿಸುವ ಪ್ರತಿಯೊಂದು ನಿಯಮದ ವಿವರವನ್ನು ಪರಿಶೀಲಿಸಿ.',
      step4Title: 'ಭೌತಿಕ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ',
      step4Desc: 'ನಮ್ಮ ಡಿಜಿಟಲ್ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ಬಳಸಿ ಅಗತ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      step5Title: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
      step5Desc: 'ನಿಮ್ಮ ಅಂತಿಮ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ರಾಜ್ಯ (SSP) ಅಥವಾ ರಾಷ್ಟ್ರೀಯ (NSP) ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.',
    },
    auditTable: {
      criteria: 'ಅರ್ಹತಾ ಮಾನದಂಡ',
      yourData: 'ನಿಮ್ಮ ಮಾಹಿತಿ',
      officialRule: 'ಅಧಿಕೃತ ನಿಯಮ',
      status: 'ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶ',
    },
    docs: {
      title: 'ನಿಮಗೆ ಬೇಕಾಗಬಹುದಾದ ದಾಖಲೆಗಳು',
      subtitle: 'ಅಗತ್ಯ ಕಂದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳು, ಶೈಕ್ಷಣಿಕ ಅಂಕಪಟ್ಟಿಗಳು ಮತ್ತು ಕಾಲೇಜು ದಾಖಲೆಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
      resetChecklist: 'ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ಮರುಹೊಂದಿಸಿ',
      readinessStatus: 'ದಾಖಲೆ ಸಿದ್ಧತೆಯ ಸ್ಥಿತಿ',
      ready: 'ಸಿದ್ಧವಾಗಿದೆ',
      notReady: 'ಬಾಕಿ ಇದೆ',
      privacyNotice: 'ಈ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ localStorage ನಲ್ಲಿ ಮಾತ್ರ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸುತ್ತದೆ. ScholarSaathi ನಿಮ್ಮ ಖಾಸಗಿ ದಾಖಲೆಗಳನ್ನು ಎಂದಿಗೂ ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದಿಲ್ಲ.',
    },
    trust: {
      heading: 'ಪುರಾವೆ ಆಧಾರಿತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಶೋಧನೆ',
      subheading: 'ಅರ್ಹತಾ ಫಲಿತಾಂಶಗಳು ರಚನಾತ್ಮಕ ನಿಯಮಗಳನ್ನು ಆಧರಿಸಿವೆ ಮತ್ತು ಇತ್ತೀಚಿನ ಅಧಿಕೃತ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಧಿಸೂಚನೆಯೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲ್ಪಡಬೇಕು.',
      rule1Title: '೧. ರಚನಾತ್ಮಕ ತಾರ್ಕಿಕ ನಿಯಮಗಳು',
      rule1Desc: 'ಕುಟುಂಬದ ಆದಾಯ ಮಿತಿ, ಕನಿಷ್ಠ ಅಂಕಗಳ ಶೇಕಡಾವಾರು, ಸಾಮಾಜಿಕ ವರ್ಗ ಮತ್ತು ರಾಜ್ಯ ನಿವಾಸದ ನಿಯಮಗಳನ್ನು ನಿಖರವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.',
      rule2Title: '೨. ಸ್ಪಷ್ಟ ಮತ್ತು ಪಾರದರ್ಶಕ ಸ್ಥಿತಿ',
      rule2Desc: 'ಪ್ರತಿಯೊಂದು ಯೋಜನೆಯನ್ನು ಅರ್ಹತೆಯ ಸಾಧ್ಯತೆ, ಪರಿಶೀಲನೆ ಅಗತ್ಯ, ಅಥವಾ ಅರ್ಹರಲ್ಲ ಎಂದು ಸ್ಪಷ್ಟ ಕಾರಣಗಳೊಂದಿಗೆ ವರ್ಗೀಕರಿಸುತ್ತದೆ.',
      rule3Title: '೩. ಅಧಿಕೃತ ಅಧಿಸೂಚನೆಗಳ ಕೊಂಡಿಗಳು',
      rule3Desc: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ವಿದ್ಯಾರ್ಥಿಗಳು ಪರಿಶೀಲಿಸಲು SSP ಕರ್ನಾಟಕ, NSP, AICTE ಮುಂತಾದ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ ನೇರ ಕೊಂಡಿಗಳನ್ನು ನೀಡುತ್ತದೆ.',
    },
  },
};

/**
 * Standard Document Names Dictionary for Kannada Localization
 */
export const DOCUMENT_TRANSLATIONS: Record<string, { en: string; kn: string; categoryKn?: string; noteKn?: string }> = {
  'marks card': {
    en: 'Marks card',
    kn: 'ಅಂಕಪಟ್ಟಿ (Marks card)',
    categoryKn: 'ಶೈಕ್ಷಣಿಕ',
    noteKn: 'ಹಿಂದಿನ ತೇರ್ಗಡೆಯಾದ ಪರೀಕ್ಷೆ ಅಥವಾ ಸೆಮಿಸ್ಟರ್ ಅಂಕಪಟ್ಟಿಯ ದೃಢೀಕೃತ ಪ್ರತಿ.',
  },
  'previous semester marks card / scorecard': {
    en: 'Previous Semester Marks Card / Scorecard',
    kn: 'ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್ ಅಂಕಪಟ್ಟಿ (Marks Card)',
    categoryKn: 'ಶೈಕ್ಷಣಿಕ',
    noteKn: 'ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್ ಪರೀಕ್ಷೆಯ ದೃಢೀಕೃತ ಅಂಕಪಟ್ಟಿ.',
  },
  'previous qualifying exam marks card': {
    en: 'Previous Qualifying Exam Marks Card',
    kn: 'ಹಿಂದಿನ ಪರೀಕ್ಷಾ ಅಂಕಪಟ್ಟಿ (Qualifying Exam Marks Card)',
    categoryKn: 'ಶೈಕ್ಷಣಿಕ',
    noteKn: 'ಕೋರ್ಸ್‌ಗೆ ಅರ್ಹತೆ ನೀಡಿದ ಪರೀಕ್ಷೆಯ ಅಂಕಪಟ್ಟಿ.',
  },
  'income certificate': {
    en: 'Income certificate',
    kn: 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (Income certificate)',
    categoryKn: 'ಹಣಕಾಸು',
    noteKn: 'ಕಂದಾಯ ಇಲಾಖೆಯ ತಹಸೀಲ್ದಾರ್ ನೀಡಿದ ಚಾಲ್ತಿ ಸಾಲಿನ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (RD ಸಂಖ್ಯೆ ಸಹಿತ).',
  },
  'caste/category certificate': {
    en: 'Caste/category certificate',
    kn: 'ಜಾತಿ / ಪ್ರವರ್ಗ ಪ್ರಮಾಣಪತ್ರ (Caste certificate)',
    categoryKn: 'ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
    noteKn: 'ಕಂದಾಯ ಪ್ರಾಧಿಕಾರ ನೀಡಿದ ಖಾಯಂ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (RD ಸಂಖ್ಯೆ ಸಹಿತ).',
  },
  'caste certificate': {
    en: 'Caste Certificate',
    kn: 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (Caste Certificate)',
    categoryKn: 'ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
    noteKn: 'ಅರ್ಜಿದಾರರ ಜಾತಿ ಮತ್ತು ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ ದೃಢೀಕರಿಸುವ ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ.',
  },
  'college id': {
    en: 'College ID',
    kn: 'ಕಾಲೇಜು ಗುರುತಿನ ಚೀಟಿ (College ID)',
    categoryKn: 'ಕಾಲೇಜು ದಾಖಲೆ',
    noteKn: 'ಪ್ರಸ್ತುತ ಕಾಲೇಜಿನಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಬಗ್ಗೆ ಪ್ರಾಂಶುಪಾಲರ ಸಹಿ ಸಹಿತ ಗುರುತಿನ ಚೀಟಿ.',
  },
  'college id card / bonafide student certificate': {
    en: 'College ID Card / Bonafide Student Certificate',
    kn: 'ಕಾಲೇಜು ಐಡಿ ಕಾರ್ಡ್ / ಬೋನಫೈಡ್ ಪ್ರಮಾಣಪತ್ರ',
    categoryKn: 'ಕಾಲೇಜು ದಾಖಲೆ',
    noteKn: 'ಕಾಲೇಜಿನ ಪ್ರಾಂಶುಪಾಲರಿಂದ ಪಡೆದ ಬೋನಫೈಡ್ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಅಧಿಕೃತ ಐಡಿ ಕಾರ್ಡ್.',
  },
  'bonafide student certificate': {
    en: 'Bonafide Student Certificate',
    kn: 'ಬೋನಫೈಡ್ ಪ್ರಮಾಣಪತ್ರ (Bonafide Certificate)',
    categoryKn: 'ಕಾಲೇಜು ದಾಖಲೆ',
    noteKn: 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರಸ್ತುತ ಸಂಸ್ಥೆಯಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಬಗ್ಗೆ ಕಾಲೇಜು ದೃಢೀಕರಣ ಪತ್ರ.',
  },
  'bank details': {
    en: 'Bank details',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ / ವಿವರಗಳು (Bank passbook)',
    categoryKn: 'ಬ್ಯಾಂಕಿಂಗ್',
    noteKn: 'ವಿದ್ಯಾರ್ಥಿಯ ಸ್ವಂತ ಹೆಸರಿನಲ್ಲಿರುವ ಉಳಿತಾಯ ಖಾತೆ ಮತ್ತು ಆಧಾರ್/NPCI ಜೋಡಣೆಯಾದ ವಿವರ.',
  },
  'bank passbook copy': {
    en: 'Bank Passbook Copy',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ (Bank Passbook Copy)',
    categoryKn: 'ಬ್ಯಾಂಕಿಂಗ್',
    noteKn: 'ಖಾತೆ ಸಂಖ್ಯೆ ಮತ್ತು IFSC ಕೋಡ್ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವ ಪಾಸ್‌ಬುಕ್ ಮುಖಪುಟದ ಪ್ರತಿ.',
  },
  'residence / domicile certificate': {
    en: 'Residence / Domicile Certificate',
    kn: 'ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ (Domicile certificate)',
    categoryKn: 'ಗುರುತಿನ ಚೀಟಿ',
    noteKn: 'ಕರ್ನಾಟಕ ಅಥವಾ ಸಂಬಂಧಪಟ್ಟ ರಾಜ್ಯದ ಖಾಯಂ ನಿವಾಸಿ ಎಂಬುದನ್ನು ದೃಢೀಕರಿಸುವ ಪತ್ರ.',
  },
  'domicile certificate of karnataka': {
    en: 'Domicile Certificate of Karnataka',
    kn: 'ಕರ್ನಾಟಕ ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ (Karnataka Domicile)',
    categoryKn: 'ಗುರುತಿನ ಚೀಟಿ',
    noteKn: 'ಕನಿಷ್ಠ ೭ ವರ್ಷ ಕರ್ನಾಟಕದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡಿದ ಬಗ್ಗೆ ಅಧ್ಯಯನ ಪ್ರಮಾಣಪತ್ರ.',
  },
  'fee receipt of current year': {
    en: 'Fee Receipt of Current Year',
    kn: 'ಪ್ರಸ್ತುತ ಸಾಲಿನ ಕಾಲೇಜು ಶುಲ್ಕ ರಶೀದಿ (Fee receipt)',
    categoryKn: 'ಕಾಲೇಜು ದಾಖಲೆ',
    noteKn: 'ಪ್ರಸ್ತುತ ಸಾಲಿನ ಕಾಲೇಜು ಶುಲ್ಕ ಪಾವತಿಸಿದ ಅಧಿಕೃತ ರಶೀದಿ.',
  },
  'hostel bonafide certificate': {
    en: 'Hostel Bonafide Certificate',
    kn: 'ಹಾಸ್ಟೆಲ್ ಬೋನಫೈಡ್ ಪ್ರಮಾಣಪತ್ರ (Hostel Bonafide)',
    categoryKn: 'ವಸತಿ ದಾಖಲೆ',
    noteKn: 'ಹಾಸ್ಟೆಲ್ ವಾರ್ಡನ್ ನೀಡಿರುವ ಅಧಿಕೃತ ವಸತಿ ದೃಢೀಕರಣ ಪತ್ರ.',
  },
  'aadhaar card / uidai document': {
    en: 'Aadhaar Card / UIDAI Document',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (Aadhaar Card)',
    categoryKn: 'ಗುರುತಿನ ಚೀಟಿ',
    noteKn: 'UIDAI ನೀಡಿದ ಅಧಿಕೃತ ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ.',
  },
  'aadhaar card': {
    en: 'Aadhaar Card',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (Aadhaar Card)',
    categoryKn: 'ಗುರುತಿನ ಚೀಟಿ',
    noteKn: 'UIDAI ನೀಡಿದ ಅಧಿಕೃತ ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ.',
  },
  'k-cet / neet admission order': {
    en: 'K-CET / NEET Admission Order',
    kn: 'ಕೆ-ಸಿಇಟಿ / ನೀಟ್ ಪ್ರವೇಶ ಪತ್ರ (Admission Order)',
    categoryKn: 'ಪ್ರವೇಶ ಪತ್ರ',
    noteKn: 'KEA ಅಥವಾ NEET ಕೌನ್ಸಿಲಿಂಗ್ ಮೂಲಕ ಸೀಟು ಹಂಚಿಕೆಯಾದ ಅಧಿಕೃತ ಆದೇಶ ಪತ್ರ.',
  },
  'disability / pwd certificate': {
    en: 'Disability / PwD Certificate',
    kn: 'ಅಂಗವಿಕಲತೆ ಪ್ರಮಾಣಪತ್ರ (UDID / Disability Certificate)',
    categoryKn: 'ವಿಶೇಷ ಮೀಸಲಾತಿ',
    noteKn: 'ಜಿಲ್ಲಾ ವೈದ್ಯಾಧಿಕಾರಿ ಅಥವಾ UDID ಪೋರ್ಟಲ್ ನೀಡಿದ ಕನಿಷ್ಠ 40% ಅಂಗವಿಕಲತೆ ದೃಢೀಕರಣ ಪತ್ರ.',
  },
  'minority community certificate': {
    en: 'Minority Community Certificate',
    kn: 'ಅಲ್ಪಸಂಖ್ಯಾತ ಸಮುದಾಯ ಪ್ರಮಾಣಪತ್ರ (Minority Certificate)',
    categoryKn: 'ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
    noteKn: 'ಅಧಿಕೃತ ಕಂದಾಯ ಇಲಾಖೆ ನೀಡಿದ ಅಲ್ಪಸಂಖ್ಯಾತ ಧಾರ್ಮಿಕ ಸಮುದಾಯ ಪ್ರಮಾಣಪತ್ರ.',
  },
  'recent passport size photographs': {
    en: 'Recent Passport Size Photographs',
    kn: 'ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು',
    categoryKn: 'ಫೋಟೋ',
    noteKn: 'ಬಿಳಿ ಹಿನ್ನೆಲೆಯುಳ್ಳ ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಸೈಜ್ ಫೋಟೋಗಳು.',
  },
};

/**
 * Helper to translate document names seamlessly
 */
export function translateDocName(docName: string, lang: SupportedLanguage): string {
  if (lang === 'en') return docName;
  const key = docName.trim().toLowerCase();
  if (DOCUMENT_TRANSLATIONS[key]) {
    return DOCUMENT_TRANSLATIONS[key].kn;
  }
  return docName;
}

/**
 * Helper to translate document categories
 */
export function translateDocCategory(category: string, lang: SupportedLanguage): string {
  if (lang === 'en') return category;
  const map: Record<string, string> = {
    Academic: 'ಶೈಕ್ಷಣಿಕ',
    Financial: 'ಹಣಕಾಸು',
    Category: 'ಮೀಸಲಾತಿ ಪ್ರವರ್ಗ',
    Institutional: 'ಕಾಲೇಜು ದಾಖಲೆ',
    Banking: 'ಬ್ಯಾಂಕಿಂಗ್',
    Identity: 'ಗುರುತಿನ ಚೀಟಿ',
    Accommodation: 'ವಸತಿ ದಾಖಲೆ',
    'Official Requirement': 'ಅಧಿಕೃತ ದಾಖಲೆ',
    'Official Document': 'ಅಧಿಕೃತ ದಾಖಲೆ',
  };
  return map[category] || category;
}
