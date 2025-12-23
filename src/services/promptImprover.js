/**
 * Smart rule-based prompt improver
 * No API costs - uses intelligent analysis
 */

const projectTypes = {
  ecommerce: [
    'shop',
    'store',
    'buy',
    'sell',
    'product',
    'cart',
    'payment',
    'checkout',
  ],
  saas: [
    'subscription',
    'dashboard',
    'analytics',
    'user management',
    'admin',
    'saas',
  ],
  portfolio: ['portfolio', 'showcase', 'work', 'projects', 'resume', 'cv'],
  blog: ['blog', 'article', 'post', 'content', 'cms', 'writer'],
  social: ['social', 'chat', 'message', 'friend', 'profile', 'feed', 'comment'],
  booking: ['book', 'reservation', 'appointment', 'schedule', 'calendar'],
  education: ['course', 'learn', 'education', 'tutorial', 'lesson', 'student'],
};

const techStacks = {
  ecommerce: {
    frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Stripe', 'PostgreSQL'],
    features: [
      'Product catalog',
      'Shopping cart',
      'Payment integration',
      'Order management',
    ],
  },
  saas: {
    frontend: ['Next.js', 'React', 'TypeScript', 'Shadcn UI'],
    backend: ['Node.js', 'Express', 'JWT auth', 'MongoDB'],
    features: [
      'User authentication',
      'Dashboard',
      'Subscription billing',
      'Analytics',
    ],
  },
  portfolio: {
    frontend: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'],
    backend: ['Optional - Static or Headless CMS'],
    features: [
      'Project showcase',
      'About section',
      'Contact form',
      'Responsive design',
    ],
  },
  blog: {
    frontend: ['Next.js', 'React', 'MDX', 'Tailwind CSS'],
    backend: ['Headless CMS (Contentful/Sanity)', 'or Markdown files'],
    features: [
      'Article listing',
      'Rich text editor',
      'Categories/Tags',
      'SEO optimization',
    ],
  },
  social: {
    frontend: ['Next.js', 'React', 'Socket.io client', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'Redis'],
    features: [
      'Real-time messaging',
      'User profiles',
      'Feed system',
      'Notifications',
    ],
  },
  booking: {
    frontend: ['Next.js', 'React', 'Calendar library', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'Email service'],
    features: [
      'Calendar view',
      'Booking system',
      'Email notifications',
      'Time slot management',
    ],
  },
  education: {
    frontend: ['Next.js', 'React', 'Video player', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'AWS S3'],
    features: [
      'Course catalog',
      'Video lessons',
      'Progress tracking',
      'Quizzes',
    ],
  },
};

function detectProjectType(idea) {
  const lowerIdea = idea.toLowerCase();

  for (const [type, keywords] of Object.entries(projectTypes)) {
    if (keywords.some((keyword) => lowerIdea.includes(keyword))) {
      return type;
    }
  }

  return 'general';
}

function extractFeatures(idea) {
  const features = [];
  const lowerIdea = idea.toLowerCase();

  const featureKeywords = {
    authentication: ['login', 'signup', 'auth', 'user', 'account'],
    search: ['search', 'filter', 'find'],
    payment: ['payment', 'pay', 'checkout', 'stripe', 'billing'],
    'admin panel': ['admin', 'dashboard', 'manage'],
    'responsive design': ['mobile', 'responsive', 'device'],
    'real-time updates': ['real-time', 'live', 'instant', 'notification'],
    analytics: ['analytics', 'track', 'metrics', 'statistics'],
    'social features': ['share', 'like', 'comment', 'follow'],
  };

  for (const [feature, keywords] of Object.entries(featureKeywords)) {
    if (keywords.some((keyword) => lowerIdea.includes(keyword))) {
      features.push(feature);
    }
  }

  return features;
}

function improvePrompt(idea) {
  const projectType = detectProjectType(idea);
  const detectedFeatures = extractFeatures(idea);
  const stack = techStacks[projectType] || techStacks.saas;

  // Build improved prompt
  let improved = `# Website Project Brief\n\n`;
  improved += `## Project Overview\n`;
  improved += `${capitalizeFirst(idea)}\n\n`;

  improved += `## Project Type\n`;
  improved += `${capitalizeFirst(projectType)} application\n\n`;

  improved += `## Core Features\n`;
  const allFeatures = [...new Set([...stack.features, ...detectedFeatures])];
  allFeatures.forEach((feature) => {
    improved += `- ${feature}\n`;
  });
  improved += `\n`;

  improved += `## Recommended Tech Stack\n\n`;
  improved += `**Frontend:**\n`;
  stack.frontend.forEach((tech) => {
    improved += `- ${tech}\n`;
  });
  improved += `\n**Backend:**\n`;
  if (Array.isArray(stack.backend)) {
    stack.backend.forEach((tech) => {
      improved += `- ${tech}\n`;
    });
  } else {
    improved += `- ${stack.backend}\n`;
  }
  improved += `\n`;

  improved += `## User Stories\n`;
  improved += `- As a user, I want to easily navigate the website so that I can find what I need quickly\n`;
  improved += `- As a user, I want the site to be responsive so that I can use it on any device\n`;
  if (detectedFeatures.includes('authentication')) {
    improved += `- As a user, I want to create an account so that I can access personalized features\n`;
  }
  if (projectType === 'ecommerce') {
    improved += `- As a customer, I want to browse products and add them to cart so that I can purchase multiple items\n`;
  }
  improved += `\n`;

  improved += `## Design Considerations\n`;
  improved += `- Modern, clean UI with intuitive navigation\n`;
  improved += `- Fast loading times and optimized performance\n`;
  improved += `- Accessible design following WCAG guidelines\n`;
  improved += `- SEO-friendly structure for better discoverability\n`;
  improved += `- Mobile-first responsive design\n\n`;

  improved += `## Development Phases\n`;
  improved += `1. **Planning & Design** - Wireframes, user flows, design system\n`;
  improved += `2. **Frontend Development** - UI components, pages, routing\n`;
  improved += `3. **Backend Development** - API, database, authentication\n`;
  improved += `4. **Integration** - Connect frontend with backend\n`;
  improved += `5. **Testing & Deployment** - QA, performance testing, launch\n`;

  return {
    original: idea,
    improved: improved,
    projectType: projectType,
    detectedFeatures: detectedFeatures,
    suggestedStack: stack,
  };
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function aiImprove(idea) {
  // If user provided a Hugging Face token + model, prefer that (has a free tier for small usage)
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  const hfModel = process.env.HUGGINGFACE_MODEL || 'google/flan-t5-small';

  if (hfKey) {
    try {
      const url = `https://api-inference.huggingface.co/models/${hfModel}`;
      const payload = {
        inputs: `Improve the following project idea and return a short project brief:\n\n${idea}`,
        parameters: { max_new_tokens: 512 },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hfKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(
          `HuggingFace inference error: ${res.status} ${errText}`
        );
      }

      const json = await res.json();
      // HF may return an array of outputs or a string; handle common shapes
      let text = '';
      if (Array.isArray(json)) {
        if (json[0] && json[0].generated_text) text = json[0].generated_text;
        else if (typeof json[0] === 'string') text = json[0];
      } else if (json.generated_text) {
        text = json.generated_text;
      } else if (typeof json === 'string') {
        text = json;
      } else if (json.error) {
        throw new Error(`HF error: ${json.error}`);
      }

      return {
        original: idea,
        improved: text || improvePrompt(idea).improved,
        projectType: detectProjectType(idea),
        detectedFeatures: extractFeatures(idea),
        suggestedStack: techStacks[detectProjectType(idea)] || techStacks.saas,
        provider: 'huggingface',
      };
    } catch (err) {
      console.error('HuggingFace AI call failed:', err);
      // fall through to try OpenAI or local fallback
    }
  }

  // Try OpenAI if key is present
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const url = 'https://api.openai.com/v1/chat/completions';
      const bodyPayload = {
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that transforms short project ideas into concise project briefs with recommended tech stacks and features.',
          },
          {
            role: 'user',
            content: `Improve the following project idea and return a short project brief:\n\n${idea}`,
          },
        ],
        max_tokens: 700,
        temperature: 0.7,
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenAI error: ${res.status} ${errText}`);
      }

      const json = await res.json();
      const message =
        json.choices &&
        json.choices[0] &&
        json.choices[0].message &&
        json.choices[0].message.content;

      return {
        original: idea,
        improved: message || improvePrompt(idea).improved,
        projectType: detectProjectType(idea),
        detectedFeatures: extractFeatures(idea),
        suggestedStack: techStacks[detectProjectType(idea)] || techStacks.saas,
        provider: 'openai',
      };
    } catch (err) {
      console.error('OpenAI call failed:', err);
      // fall through to quota exceeded message
    }
  }

  // Quota exceeded
  return {
    error: 'Quota exceeded',
    message: 'Your usage quota has been exceeded. Please try again later.',
  };
}

module.exports = { improvePrompt, aiImprove };
