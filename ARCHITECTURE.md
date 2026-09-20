# System Architecture — ScholarSaathi

This document describes the implemented system architecture for **ScholarSaathi**, including both the local full-stack development environment and the cloud target on Amazon Web Services (AWS).

---

## 1. System Architecture Diagram

```
Student
   ↓
Amplify
   ↓
React
   ↓
API Gateway
   ↓
Lambda
├── Eligibility Engine
├── Scholarship Data
└── Optional Bedrock
```

---

## 2. Implemented AWS Services & Layer Breakdown

Only the AWS services and components actually implemented in the codebase are documented below:

### Layer 1: Client & Presentation
- **Student Device**: Web or mobile browser accessing the application.
- **AWS Amplify Hosting**: Serves the optimized static React 19 single-page application via a global Content Delivery Network (Amazon CloudFront) with automatic SSL termination.
- **React Frontend**:
  - UI pages: Landing, Multi-Step Profile, Results Dashboard, "Why This Result", Document Checklist, Browse Directory, and AI Assistant.
  - Client API Service (`src/services/apiService.ts`): Communicates with backend endpoints.
  - **Deterministic Local Fallback**: If the network is interrupted or the backend is unreachable, the client executes the local TypeScript engine (`src/services/eligibilityEngine.ts`) with zero delay and zero crash risk.

### Layer 2: API Gateway Layer
- **Amazon API Gateway**:
  - Exposes RESTful HTTP endpoints (`/api/scholarships`, `/api/scholarships/:id`, `/api/eligibility/check`, `/api/assistant`, `/api/health`).
  - Manages cross-origin resource sharing (CORS), request routing, and payload validation.
  - Forwards incoming requests to the AWS Lambda execution handler.

### Layer 3: Serverless Compute (AWS Lambda)
- **AWS Lambda Function** (`lambda/handler.ts` / `dist/lambda.cjs`):
  - **Eligibility Engine** (`src/services/eligibilityEngine.ts`): Deterministic, multi-dimensional rule evaluation engine. Computes passed, failed, and verification conditions. Evaluates income caps, marks thresholds, domicile rules, and category quotas.
  - **Scholarship Data** (`src/data/scholarships.ts`): Structured, verified schema dataset bundled directly with the application to ensure fast execution with no external database dependencies for the MVP.
  - **Optional Bedrock Integration** (`src/backend/apiCore.ts`): Optional AI explanation service using Amazon Bedrock (`anthropic.claude-3-haiku-20240307-v1:0`) via `@aws-sdk/client-bedrock-runtime`. Falls back gracefully to Google Gemini or deterministic local generation if Bedrock is not configured.

---

## 3. End-to-End Execution Flow

1. **Student Profile Input**:
   - The student enters their academic background, domicile state, annual household income, and social category.

2. **Eligibility Request (`POST /api/eligibility/check`)**:
   - The React client sends the structured `studentProfile` to Amazon API Gateway.
   - API Gateway triggers the AWS Lambda function.

3. **Deterministic Evaluation**:
   - Lambda passes the profile to `checkEligibilityCore()`, running the deterministic rules against the scholarship dataset.
   - Each scholarship returns evaluated conditions:
     - `Likely Eligible`: Satisfies all mandatory conditions.
     - `Needs Verification`: General eligibility met; college/state verification needed.
     - `Not Eligible`: At least one mandatory condition failed with clear comparative evidence.

4. **Response Delivery**:
   - Lambda returns the JSON payload (`{ results: [...] }`) with HTTP status 200.
   - React updates the Results page with transparent condition breakdowns and official portal links.

5. **AI Explanation Assistance (`POST /api/assistant`)**:
   - When the student asks questions (e.g. *"What documents do I need?"* or *"Why did I get this result?"*), the query is evaluated.
   - The assistant is strictly grounded on the deterministic result and official scheme data—never guessing or overriding the rules.

---

## 4. Key Architectural Guarantees

1. **Single Source of Truth**:
   The rule evaluation logic resides in `src/services/eligibilityEngine.ts` and is imported identically by the local dev server, the frontend fallback, and the AWS Lambda handler. No rules are duplicated.

2. **Defense Against Failures**:
   The frontend gracefully handles any backend downtime. If API Gateway returns a 5xx or fails to connect, the frontend seamlessly computes results using the in-browser engine.

3. **Zero Credential Exposure**:
   No AWS keys, Bedrock credentials, or API tokens are included in client bundles. All cloud calls use IAM roles in Lambda or server-side environment variables.
