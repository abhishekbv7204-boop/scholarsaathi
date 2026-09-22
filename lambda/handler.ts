import {
  getScholarshipsList,
  getScholarshipById,
  checkEligibilityCore,
  handleAssistantQuery,
} from '../src/backend/apiCore';

export interface LambdaProxyEvent {
  httpMethod?: string;
  requestContext?: {
    http?: {
      method?: string;
      path?: string;
    };
  };
  path?: string;
  rawPath?: string;
  queryStringParameters?: Record<string, string> | null;
  pathParameters?: Record<string, string> | null;
  headers?: Record<string, string> | null;
  body?: string | null;
  isBase64Encoded?: boolean;
}

export interface LambdaProxyResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

/**
 * Standard AWS Lambda handler for API Gateway (REST API or HTTP API v2).
 *
 * Routes handled:
 * - GET /api/scholarships
 * - GET /api/scholarships/{id}
 * - POST /api/eligibility/check
 * - POST /api/assistant
 * - GET /api/health
 */
export async function handler(event: LambdaProxyEvent): Promise<LambdaProxyResult> {
  const method = (
    event.httpMethod ||
    event.requestContext?.http?.method ||
    'GET'
  ).toUpperCase();

  let pathname = event.path || event.rawPath || '/';

  // Strip stage prefix if present (e.g., /prod/api/... -> /api/...)
  pathname = pathname.replace(/^\/(prod|stage|dev|default)\//, '/');

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Parse Body safely
  let parsedBody: any = {};
  if (event.body) {
    try {
      const raw = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf-8')
        : event.body;
      parsedBody = JSON.parse(raw);
    } catch (e) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid JSON payload in request body' }),
      };
    }
  }

  try {
  
    if (pathname === '/api/health' || pathname === '/health') {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          status: 'ok',
          service: 'ScholarSaathi AWS Lambda Service',
          timestamp: new Date().toISOString(),
        }),
      };
    }

    // 2. GET /api/scholarships
    if (method === 'GET' && pathname === '/api/scholarships') {
      const query = event.queryStringParameters || {};
      const result = getScholarshipsList({
        state: query.state,
        category: query.category,
        course: query.course,
        query: query.q || query.query,
      });
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify(result),
      };
    }

    // 3. GET /api/scholarships/:id
    const scholarshipIdMatch = pathname.match(/^\/api\/scholarships\/([a-zA-Z0-9_-]+)$/);
    if (method === 'GET' && scholarshipIdMatch) {
      const id = scholarshipIdMatch[1] || event.pathParameters?.id;
      if (!id) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Scholarship ID required' }),
        };
      }
      const { scholarship } = getScholarshipById(id);
      if (!scholarship) {
        return {
          statusCode: 404,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Scholarship not found', id }),
        };
      }
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ scholarship }),
      };
    }

    // 4. POST /api/eligibility/check
    if (method === 'POST' && pathname === '/api/eligibility/check') {
      const studentProfile = parsedBody.studentProfile || parsedBody;
      if (!studentProfile || typeof studentProfile !== 'object') {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Missing studentProfile object in request' }),
        };
      }
      const output = checkEligibilityCore(studentProfile);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify(output),
      };
    }

    // 5. POST /api/assistant
    if (method === 'POST' && pathname === '/api/assistant') {
      const { question, studentProfile, scholarship, eligibilityResult } = parsedBody;
      if (!question || typeof question !== 'string' || !question.trim()) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Question is required' }),
        };
      }
      const answer = await handleAssistantQuery({
        question,
        studentProfile,
        scholarship,
        eligibilityResult,
      });
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ answer }),
      };
    }

    // Unmatched Route
    return {
      statusCode: 404,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Route not found',
        method,
        pathname,
      }),
    };
  } catch (error: any) {
    console.error('Lambda handler error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error?.message || 'Unknown error occurred',
      }),
    };
  }
}
