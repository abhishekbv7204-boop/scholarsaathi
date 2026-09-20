# ScholarSaathi

> **Transparent, Deterministic Scholarship Eligibility Matching & Rule-by-Rule Explanation for Indian Students**

[![Built with React](https://img.shields.io/badge/Frontend-React%2019-blue.svg)](https://react.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind%20CSS%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![Language-TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue.svg)](https://www.typescriptlang.org/)
[![License-Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

---

## 🔗 Live Application & Demo Links

- **Live Application URL**: https://scholarsaathi-avlg.onrender.com
- 

---

## 1. Problem

Every year, thousands of Indian students miss out on government and institutional scholarships totaling crores of rupees. The core bottlenecks include:

- **Complex & Fragmented Guidelines**: Guidelines are scattered across dozens of central and state portals (NSP, SSP, AICTE, State Welfare Departments).
- **Ambiguous Cut-offs**: Students do not know whether their household income, caste category certificate, or degree semester makes them eligible.
- **Fear of Rejection & Disqualification**: Rejections happen without explanation, leaving students confused about which specific rule was violated.
- **Unreliable Advice**: Generic AI chatbots or unofficial blogs hallucinate scholarship rules, misleading students with inaccurate criteria.

---

## 2. Solution

**ScholarSaathi** is an intelligent, rule-grounded guidance platform that:

1. Takes structured profile inputs (state domicile, degree, semester, marks %, annual income, category, and institution type).
2. Runs a **deterministic eligibility engine** against structured scholarship rules.
3. Categorizes schemes into **Likely Eligible**, **Needs Verification**, and **Not Eligible**.
4. Delivers an unmatched **Rule-by-Rule Explanation ("Why This Result?")**, showing the student value vs. required cut-off for every condition.
5. Provides a local **Document Preparation Checklist** and a grounded **AI Assistant** that answers questions strictly using verified scheme data.

---

## 3. Key Features

- **Personalized Matching**: Compares 10+ student attributes (income, caste, marks, course, year of study, accommodation) against state and national schemes.
- **Rule-by-Rule Explanation ("Why This Result")**: Complete mathematical and logical transparency for every passed, failed, or pending condition.
- **Evidence & Official Sources**: Every scholarship links to verified government circulars (SSP Karnataka, NSP Central Sector, AICTE).
- **Document Preparation Checklist**: Interactive local tracker ("2 of 5 documents prepared") to help students organize paperwork without privacy risks.
- **ScholarSaathi Grounded Assistant**: Context-aware assistant that explains rules and documents strictly from internal datasets without hallucinations.
- **One-Click Demo Mode**: Instantly populates an authentic Karnataka B.E. Computer Science student profile to demonstrate all 3 outcome tiers in seconds.
- **Mobile-Responsive UI**: Fully fluid layout optimized for smartphones, tablets, and desktops with zero horizontal scrolling.

---

## 4. Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Animation**: Motion (`motion/react`)
- **Persistence**: Browser LocalStorage for document checklist progress
- **Target Cloud Infrastructure**: AWS Amplify Hosting, Amazon API Gateway, AWS Lambda, Amazon DynamoDB, Amazon Bedrock

---

## 5. System Architecture

ScholarSaathi separates the **deterministic eligibility engine** from the UI presentation layer:

```
[Student Profile] ──► [Deterministic Eligibility Engine] ──► [Rule Evaluation]
                             │
                             ├── Income Ceiling Check (<= ₹2.5L / ₹4.5L / ₹8L)
                             ├── Minimum Academic Marks (>= 60%, 75%, 80%)
                             ├── Course & Year Cohort Verification
                             ├── Category Quotas (OBC, SC, ST, General)
                             └── Verification of Institutional Certificates
                             │
                             ▼
              [Tri-State Outcome Generation]
       🟢 Likely Eligible | 🟡 Needs Verification | 🔴 Not Eligible
```

For complete cloud deployment blueprints, consult [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 6. Local Setup & Development

To run ScholarSaathi locally:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/scholarsaathi.git
cd scholarsaathi

# 2. Install dependencies
npm install

# 3. Start local development server (binds to http://localhost:3000)
npm run dev

# 4. Build production bundle
npm run build
```

---

## 7. AWS Deployment

ScholarSaathi is ready for instant deployment to **AWS Amplify Hosting**:

1. Connect your Git repository to AWS Amplify Console.
2. Ensure the build output directory is configured as `dist`.
3. Configure the SPA rewrite rule in Amplify Console (`/*` -> `/index.html`).

Full instructions are documented in [AWS_DEPLOYMENT.md](./AWS_DEPLOYMENT.md).

---

## 8. Responsible AI & Ethical Design

- **Guidance, Not Decision**: ScholarSaathi never claims *"You are officially eligible."* Instead, it explicitly states *"You are likely eligible based on available demo rules."*
- **No Hallucinated Guidelines**: The assistant is strictly grounded in verifiable dataset records. If information is missing, it explicitly directs students to official portals.
- **Privacy by Design**: No personal identity documents (Aadhaar, income certificates, caste papers) are uploaded or stored.

---

## 9. Limitations & Future Scope

- **Demo Dataset Notice**: Current demonstration records are marked as **DEMO DATA** for hackathon testing and evaluation.
- **Manual Verification**: Institutional biometric attendance and university tier-1 accreditations require physical verification at the college level.
- **Future Scope**: Direct integration with DigiLocker for zero-effort certificate verification and multi-lingual voice prompts in regional Indian languages (Kannada, Hindi, Tamil, Telugu).
>>>>>>> a840b9d (First commit on Scholarsaathi portal)
