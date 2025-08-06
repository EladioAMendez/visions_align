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
    agendaCoach: [
      'The Agenda Coach' // Goal-Oriented Playbooks for Pro tier
    ],
  },
  
  // Playbook Configuration
  playbooks: {
    maxStakeholders: {
      pro: 10,
      director: -1, // unlimited
    },
    types: {
      stakeholderAnalysis: 'STAKEHOLDER_ANALYSIS',
      goalOriented: 'GOAL_ORIENTED',
      relationshipAnalysis: 'RELATIONSHIP_ANALYSIS',
    },
    meetingGoals: {
      projectUpdate: 'PROJECT_UPDATE',
      budgetAsk: 'BUDGET_ASK',
      newIdeaPitch: 'NEW_IDEA_PITCH',
      performanceReview: 'PERFORMANCE_REVIEW',
      strategicAlignment: 'STRATEGIC_ALIGNMENT',
      problemSolving: 'PROBLEM_SOLVING',
      stakeholderAlignment: 'STAKEHOLDER_ALIGNMENT',
    },
    meetingGoalLabels: {
      PROJECT_UPDATE: 'Project Update',
      BUDGET_ASK: 'Budget Ask',
      NEW_IDEA_PITCH: 'New Idea Pitch',
      PERFORMANCE_REVIEW: 'Performance Review',
      STRATEGIC_ALIGNMENT: 'Strategic Alignment',
      PROBLEM_SOLVING: 'Problem Solving',
      STAKEHOLDER_ALIGNMENT: 'Stakeholder Alignment',
    },
  },
} as const;
