/**
 * AI Services Configuration
 * Centralized AI and external service configuration
 * Note: This config is safe for both client and server environments
 */

// Helper to safely get server-side environment variables
const getServerEnvVar = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    // Client-side: return null for server-only variables
    return null;
  }
  // Server-side: access process.env directly
  return process.env[key] || null;
};

export const aiConfig = {
  // n8n Webhook Configuration
  n8n: {
    webhookUrl: getServerEnvVar('N8N_WEBHOOK_URL'),
    timeout: 30000, // 30 seconds
    retries: 3,
  },
  
  // AI Personas Configuration
  personas: {
    core: [
      'The Strategist',
      'The Psychologist', 
      'The Diplomat',
      'The Data Analyst',
      'The Executive Coach',
      'The Communications Expert'
    ],
    premium: [
      'The Connector' // Available only for Director tier
    ],
  },
  
  // Playbook Configuration
  playbooks: {
    maxStakeholders: {
      pro: 10,
      director: -1, // unlimited
    },
    analysisTypes: {
      stakeholder: 'STAKEHOLDER',
      relationship: 'RELATIONSHIP',
    },
  },
} as const;
