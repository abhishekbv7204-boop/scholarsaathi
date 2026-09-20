import { SCHOLARSHIPS_DATASET } from '../data/scholarships';
import { evaluateAllScholarships } from './eligibilityEngine';
import { Scholarship, ScholarshipMatch, StudentProfile } from '../types';

export interface EligibilityApiResponse {
  results: ScholarshipMatch[];
  source: 'backend_api' | 'local_engine';
  evaluatedAt: string;
  error?: string;
}

export interface ScholarshipsApiResponse {
  scholarships: Scholarship[];
  count: number;
  total: number;
  source: 'backend_api' | 'local_engine';
}

/**
 * Fetch list of scholarships from the backend API.
 * Falls back to local dataset if API is unreachable.
 */
export async function fetchScholarships(filters?: {
  state?: string;
  category?: string;
  course?: string;
  query?: string;
}): Promise<ScholarshipsApiResponse> {
  const queryParams = new URLSearchParams();
  if (filters?.state) queryParams.set('state', filters.state);
  if (filters?.category) queryParams.set('category', filters.category);
  if (filters?.course) queryParams.set('course', filters.course);
  if (filters?.query) queryParams.set('q', filters.query);

  const url = `/api/scholarships${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      scholarships: data.scholarships || SCHOLARSHIPS_DATASET,
      count: data.count || (data.scholarships?.length ?? SCHOLARSHIPS_DATASET.length),
      total: data.total || SCHOLARSHIPS_DATASET.length,
      source: 'backend_api',
    };
  } catch (err) {
    console.warn('Backend /api/scholarships unavailable; using local verified dataset fallback:', err);
    let list = [...SCHOLARSHIPS_DATASET];
    if (filters?.state) {
      const s = filters.state.toLowerCase();
      list = list.filter(
        (item) =>
          item.state?.toLowerCase() === s ||
          item.eligibleStates?.some((st) => st.toLowerCase() === s) ||
          item.state === 'All India'
      );
    }
    return {
      scholarships: list,
      count: list.length,
      total: SCHOLARSHIPS_DATASET.length,
      source: 'local_engine',
    };
  }
}

/**
 * Fetch a single scholarship by ID from the backend API.
 * Falls back to local dataset if API is unreachable.
 */
export async function fetchScholarshipById(
  id: string
): Promise<{ scholarship: Scholarship | null; source: 'backend_api' | 'local_engine' }> {
  try {
    const res = await fetch(`/api/scholarships/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      return { scholarship: data.scholarship || null, source: 'backend_api' };
    }
  } catch (err) {
    console.warn(`Backend /api/scholarships/${id} unavailable; checking local fallback:`, err);
  }

  const local = SCHOLARSHIPS_DATASET.find((s) => s.id === id) || null;
  return { scholarship: local, source: 'local_engine' };
}

/**
 * Perform deterministic eligibility evaluation.
 * Attempts POST /api/eligibility/check (AWS Lambda / Express).
 * If backend fails or is offline, falls back seamlessly to the same local engine.
 */
export async function checkEligibilityApi(
  studentProfile: StudentProfile
): Promise<EligibilityApiResponse> {
  try {
    const res = await fetch('/api/eligibility/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentProfile }),
    });

    if (!res.ok) {
      throw new Error(`API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data.results)) {
      return {
        results: data.results,
        source: 'backend_api',
        evaluatedAt: data.evaluatedAt || new Date().toISOString(),
      };
    }
  } catch (err: any) {
    console.warn('Backend /api/eligibility/check unavailable; using deterministic local engine:', err);
  }

  // Graceful local fallback calling the SAME deterministic engine
  const localResults = evaluateAllScholarships(SCHOLARSHIPS_DATASET, studentProfile);
  return {
    results: localResults,
    source: 'local_engine',
    evaluatedAt: new Date().toISOString(),
  };
}
