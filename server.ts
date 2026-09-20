import express from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  getScholarshipsList,
  getScholarshipById,
  checkEligibilityCore,
  handleAssistantQuery,
} from './src/backend/apiCore';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// 1. Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ScholarSaathi Full-Stack Server',
    environment: process.env.NODE_ENV || 'development',
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

// Vite integration / Static serving
async function setupApp() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Endpoint not found', path: req.path });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  function startListening(port: number, retries = 5) {
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`ScholarSaathi server running on http://localhost:${port}`);
    });

    httpServer.once('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        if (retries > 0) {
          console.warn(`[Port ${port} in use] Automatically trying port ${port + 1}...`);
          startListening(port + 1, retries - 1);
        } else {
          console.error(`\n[Port Error] Ports ${port - 5} through ${port} are all occupied.`);
          console.error(`Please free up a port or configure PORT in your .env file.\n`);
          process.exit(1);
        }
      } else {
        console.error('Server error:', err);
      }
    });
  }

  startListening(PORT);
}

setupApp();
