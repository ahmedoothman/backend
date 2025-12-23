const express = require('express');
const { body, validationResult } = require('express-validator');
const { improvePrompt, aiImprove } = require('../services/promptImprover');

const router = express.Router();

router.post(
  '/improve',
  [
    body('idea')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Idea must be between 10 and 1000 characters'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { idea } = req.body;
      const result = await improvePrompt(idea);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error improving prompt:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to improve prompt',
      });
    }
  }
);

// AI-powered endpoint: uses Hugging Face or OpenAI if API key is available, otherwise falls back to local improver
router.post(
  '/improve/ai',
  [
    body('idea')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Idea must be between 10 and 1000 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { idea } = req.body;
      const result = await aiImprove(idea);

      // Check if quota exceeded
      if (result.error) {
        return res.status(429).json({
          success: false,
          error: result.error,
          message: result.message,
        });
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error improving prompt (AI):', error);
      res
        .status(500)
        .json({ success: false, error: 'Failed to improve prompt (AI)' });
    }
  }
);

module.exports = router;
