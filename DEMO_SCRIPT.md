# ScholarSaathi — 3-Minute Hackathon Demo Script

**Target Time:** 2 minutes 55 seconds - 3 minutes  
**Presenter:** Single or Pair Presenter  
**Prerequisites:** Open `http://localhost:3000` on a desktop or laptop, with mobile devtools preview ready.

---

### [0:00 - 0:20] The Problem
- **Screen:** Landing page (`/`) showing the hero headline: *"Find scholarships you may qualify for."*
- **Speaker:**
  > "Over 40 million students in India pursue higher education, yet thousands miss out on government and institutional scholarships totaling crores every year. Why? Because scholarship rules are buried inside 50-page PDFs across portals like NSP and SSP. Students have no idea whether their family income, category, or semester qualifies them—and when they're rejected, nobody tells them why."

---

### [0:20 - 0:40] The Solution
- **Screen:** Scroll gently down Landing Page to showcase the **4-step workflow**: *Profile → Match → Understand → Apply* and the **Three Pillars** (*Personalized Matching, Rule-by-Rule Explanation, Evidence & Sources*).
- **Speaker:**
  > "Meet **ScholarSaathi**—an intelligent, deterministic guidance platform built to provide absolute clarity. Unlike generic chatbots that hallucinate rules, ScholarSaathi evaluates student profiles against structured government criteria and delivers mathematical, rule-by-rule explainability with verified citations."

---

### [0:40 - 1:00] Student Profile & Demo Trigger
- **Screen:** Click **"Try Demo"** or navigate to **Student Profile** and click the **"Use Demo Student"** button.
- **Action:** Show the populated fields:
  - *State:* Karnataka, *District:* Ballari
  - *Course:* B.E. Computer Science, *Year:* 3rd
  - *Academic Marks:* 85%, *Income:* ₹1,80,000
  - *Category:* OBC, *Institution:* Government, *Accommodation:* Day Scholar
- **Speaker:**
  > "Let's test this with our demo student: a 3rd-year B.E. Computer Science student from Ballari, Karnataka, with 85% academic marks, ₹1.8 lakh family income, and OBC category. With one click on 'Find My Scholarships', our deterministic engine runs in milliseconds."

---

### [1:00 - 1:30] Scholarship Results Breakdown
- **Screen:** Results Page (`/results`).
- **Action:** Highlight the top stat counters:
  - **Potential Matches (Likely Eligible)**: Karnataka BCWD Post-Matric, Central Sector NSP Scheme
  - **Needs Verification**: AICTE Technical Merit & Biometric Grant
  - **Not Eligible**: Scheduled Caste Scheme & Pre-Matric Minority Scheme
- **Speaker:**
  > "Instantly, ScholarSaathi categorizes opportunities into three clear tiers:
  > First, **Likely Eligible**: Schemes where all criteria passed.
  > Second, **Needs Verification**: Academic cutoffs are met, but institutional paperwork like college biometric attendance is required.
  > And third, **Not Eligible**: Disqualified transparently due to category or income ceilings. Every card displays conditions passed, failed, and direct links to official government sources."

---

### [1:30 - 2:00] "Why This Result?" (Core Innovation)
- **Screen:** Click **"Why This Result?"** on *Karnataka Post-Matric Scholarship for Backward Classes (OBC)*.
- **Action:** Show the side-by-side comparison table:
  - *Family Income:* Student: ₹1,80,000 vs Required: <= ₹2,50,000 (✓ Passed)
  - *Academic Marks:* Student: 85% vs Required: >= 60% (✓ Passed)
  - *Social Category:* Student: OBC vs Required: OBC (✓ Passed)
- **Switch:** Switch dropdown to *Dr. B.R. Ambedkar Post-Matric Scholarship*.
  - Show *Category:* Student: OBC vs Required: SC (✕ Failed)
- **Speaker:**
  > "This is ScholarSaathi's centerpiece: 'Why did I get this result?' Every single condition is laid out side-by-side. You see your exact reported value, the scheme threshold, and human-readable explanation. If you failed, it doesn't leave you guessing—it tells you that the scheme is reserved for SC students while your profile is OBC. Absolute transparency."

---

### [2:00 - 2:20] Document Checklist & ScholarSaathi Assistant
- **Screen:** Switch to **Document Checklist** (`/documents`), check off an item to show *"3 of 7 documents prepared"*. Then open **AI Assistant** (`/assistant`).
- **Action:** Click the pill: *"Why did I get this result?"* and *"What documents do I need?"*
- **Speaker:**
  > "Students can track required certificates locally in our private Document Checklist—no sensitive uploads required. And our built-in ScholarSaathi Assistant is strictly grounded in our structured dataset. It never invents criteria. If asked about unsupported programs, it responsibly reminds students to consult the official portal."

---

### [2:20 - 2:40] AWS Architecture & Scalability
- **Screen:** Show the Student Dashboard (`/dashboard`) and reference the AWS architecture diagram in `ARCHITECTURE.md`.
- **Speaker:**
  > "ScholarSaathi is engineered for cloud scale. Built on React 19 and Vite, it deploys seamlessly to **AWS Amplify Hosting** via Amazon CloudFront. In production, our deterministic engine executes serverlessly on **AWS Lambda** backed by **Amazon DynamoDB** for national scheme storage, with optional grounded retrieval using **Amazon Bedrock** over audited government circulars."

---

### [2:40 - 2:55] Impact & Closing
- **Screen:** Return to Dashboard / Landing Page with the Responsible AI disclaimer visible.
- **Speaker:**
  > "ScholarSaathi transforms scholarship discovery from an anxious guessing game into an empowering, transparent roadmap for millions of deserving Indian students.
  > Deterministic rules. Total explainability. Zero hallucinations.
  > Thank you!"

---
*End of Presentation (2:55)*
