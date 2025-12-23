const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const improveRouter = require('./routes/improve');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', improveRouter);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vibe Coder API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
