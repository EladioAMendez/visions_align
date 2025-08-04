import { env } from '../env';

/**
 * AI Services Configuration
 * Centralized AI and external service configuration
 */
export const aiConfig = {
  // OpenAI Configuration (optional - only if using direct OpenAI integration)
  openai: {
    apiKey: env.OPENAI_API_KEY || null,
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4-turbo-preview',
    maxTokens: 4096,
    temperature: 0.7,
    enabled: !!env.OPENAI_API_KEY,
  },
  
  // n8n Webhook Configuration
  n8n: {
    webhookUrl: env.N8N_WEBHOOK_URL,
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
