import express from 'express';
import {
  getScholarshipsList,
  getScholarshipById,
  checkEligibilityCore,
  handleAssistantQuery,
} from '../src/backend/apiCore';

const app = express();

app.use(express.json({ limit: '1mb' }));

// 1. Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ScholarSaathi Vercel Serverless Function',
    timestamp: new Date().toISOString(),
  });
});

// 2. GET /api/scholarships
app.get('/api/scholarships', (req, res) => {
  try {
    const { state, category, course, q, query } = req.query;
    const result = getScholarshipsList({
      state: typeof state === 'string' ? state : undefined,
      category: typeof category === 'string' ? category : undefined,
      course: typeof course === 'string' ? course : undefined,
      query: typeof (q || query) === 'string' ? String(q || query) : undefined,
    });
    res.json(result);
  } catch (err: any) {
    console.error('Error fetching scholarships:', err);
    res.status(500).json({ error: 'Failed to retrieve scholarships', message: err.message });
  }
});

// 3. GET /api/scholarships/:id
app.get('/api/scholarships/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { scholarship } = getScholarshipById(id);
    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found', id });
    }
    res.json({ scholarship });
  } catch (err: any) {
    console.error('Error retrieving scholarship by id:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// 4. POST /api/eligibility/check
app.post('/api/eligibility/check', (req, res) => {
  try {
    const studentProfile = req.body.studentProfile || req.body;
    if (!studentProfile || typeof studentProfile !== 'object') {
      return res.status(400).json({ error: 'Missing studentProfile in request body' });
    }

    const output = checkEligibilityCore(studentProfile);
    res.json(output);
  } catch (err: any) {
    console.error('Error in eligibility check:', err);
    res.status(400).json({ error: 'Eligibility check failed', message: err.message });
  }
});

// 5. POST /api/assistant
app.post('/api/assistant', async (req, res) => {
  try {
    const { question, studentProfile, scholarship, eligibilityResult } = req.body || {};

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const answer = await handleAssistantQuery({
      question,
      studentProfile,
      scholarship,
      eligibilityResult,
    });

    res.json({ answer });
  } catch (err: any) {
    console.error('Error in /api/assistant:', err);
    res.json({
      answer:
        'Assistant is temporarily unavailable. You can still view the eligibility explanation and evidence above.',
    });
  }
});

export default app;
