const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger ─────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Management API is running',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Task Management API Server`);
  console.log(`   Running on: http://localhost:${PORT}`);
  console.log(`   Health:     http://localhost:${PORT}/api/health`);
  console.log(`   Tasks API:  http://localhost:${PORT}/api/tasks`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
