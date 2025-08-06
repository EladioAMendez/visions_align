# VisionsAlign Webhook Specifications

## Overview
This document defines the JSON specifications for the n8n webhook integration supporting Goal-Oriented Playbooks, enhanced tier structure, and brand positioning.

## Webhook Endpoints

### Outgoing Webhook (VisionsAlign → n8n)
**URL:** `{N8N_WEBHOOK_URL}` (from your .env file)
**Method:** POST
**Content-Type:** application/json

### Incoming Webhook (n8n → VisionsAlign)
**URL:** `{NEXTAUTH_URL}/api/playbooks/webhook` (from your .env file)
**Method:** POST
**Content-Type:** application/json
**Authentication:** Bearer token required
**Security:** Rate limited, IP whitelisting optional

---

## 1. Outgoing JSON (VisionsAlign → n8n)

This payload is sent when a user creates a playbook via `/api/playbooks/route.ts`:

```json
{
  "playbookId": "clx1a2b3c4d5e6f7g8h9i0j1",
  "user": {
    "id": "user_123456789",
    "name": "Maya Chen",
    "email": "maya.chen@techcorp.com",
    "planTier": "PRO",
    "linkedinUrl": "https://linkedin.com/in/mayachen"
  },
  "stakeholder": {
    "id": "stakeholder_987654321",
    "name": "Sarah Johnson",
    "title": "VP of Product",
    "company": "TechCorp Inc",
    "role": "Executive",
    "department": "Product",
    "influence": "HIGH",
    "relationship": "NEUTRAL",
    "notes": "Key decision maker for Q4 roadmap priorities",
    "linkedinUrl": "https://linkedin.com/in/sarahjohnson"
  },
  "playbookType": "GOAL_ORIENTED",
  "meetingGoal": "BUDGET_ASK",
  "aiPersonas": {
    "strategist": true,
    "psychologist": true,
    "diplomat": true,
    "dataAnalyst": true,
    "executiveCoach": true,
    "communicationsExpert": true,
    "agendaCoach": true,
    "connector": false
  },
  "analysisScope": {
    "contentMastery": true,
    "contextMastery": false,
    "meetingSpecific": true,
    "relationshipAnalysis": false,
    "userProfileRequired": false
  },
  "brandPositioning": {
    "tierFocus": "Tactical Mastery - Master the content of communication",
    "valueProposition": "Win the Meeting"
  }
}
```

### Field Descriptions

#### playbookType Values:
- `STAKEHOLDER_ANALYSIS` - Basic stakeholder analysis (Starter/Pro)
- `GOAL_ORIENTED` - Meeting-specific playbook (Pro tier)
- `RELATIONSHIP_ANALYSIS` - Relationship playbook with The Connector (Director tier)

#### meetingGoal Structure (only for GOAL_ORIENTED):
The `meetingGoal` field now contains a complete object with admin-configurable details:

```json
{
  "value": "PROJECT_UPDATE",
  "label": "Project Update", 
  "description": "Status reports, progress reviews, milestone check-ins"
}
```

**Admin Configurable**: Meeting goals can be managed via the admin panel at `/admin/meeting-goals`

**Admin Panel Features**:
- Add new meeting goals with custom values, labels, and descriptions
- Edit existing meeting goals (label, description, sort order)
- Activate/deactivate meeting goals without deletion
- Reorder meeting goals for UI display
- Delete unused meeting goals

**Flexible JSON Structure**: The webhook payload automatically adapts to any meeting goals configured in the admin panel. When new meeting goals are added, they immediately become available in the playbook generation modal and are included in webhook payloads with their full details.

**Default Values Available**:
- `PROJECT_UPDATE` - Project Update - Status reports, progress reviews, milestone check-ins
- `BUDGET_ASK` - Budget Ask - Resource requests, funding proposals, investment pitches
- `NEW_IDEA_PITCH` - New Idea Pitch - Innovation proposals, new initiatives, creative concepts
- `PERFORMANCE_REVIEW` - Performance Review - Performance discussions, feedback sessions, career conversations
- `STRATEGIC_ALIGNMENT` - Strategic Alignment - Strategic planning, goal setting, vision alignment
- `PROBLEM_SOLVING` - Problem Solving - Issue resolution, troubleshooting, crisis management
- `STAKEHOLDER_ALIGNMENT` - Stakeholder Alignment - Getting buy-in, consensus building, coalition formation

### Admin Panel Access

**URL**: `/admin/meeting-goals`

**Authentication**: Basic admin check - user email must contain 'admin' (enhance with proper role-based access as needed)

**API Endpoints**:
- `GET /api/admin/meeting-goals` - Fetch all meeting goals (including inactive)
- `POST /api/admin/meeting-goals` - Create new meeting goal
- `PUT /api/admin/meeting-goals` - Update existing meeting goal
- `DELETE /api/admin/meeting-goals?id={id}` - Delete meeting goal

**Database Model**: `MeetingGoalOption` table with fields:
- `id` (String, primary key)
- `value` (String, unique) - Internal code (e.g., "PROJECT_UPDATE")
- `label` (String) - Display name (e.g., "Project Update")
- `description` (String) - Help text for users
- `isActive` (Boolean) - Whether goal appears in dropdown
- `sortOrder` (Int) - Display order in UI
- `createdAt`, `updatedAt` (DateTime)

#### planTier Values:
- `STARTER` - Free tier (basic analysis only)
- `PRO` - $29/month (Goal-Oriented Playbooks)
- `DIRECTOR` - $49/month (Relationship Analysis with The Connector)

---

## 2. Incoming JSON (n8n → VisionsAlign)

This payload should be sent to complete the playbook processing.

### Security Headers Required:
```http
Authorization: Bearer YOUR_WEBHOOK_SECRET
Content-Type: application/json
X-Webhook-Signature: sha256=HMAC_SIGNATURE (optional)
```

```json
{
  "playbookId": "clx1a2b3c4d5e6f7g8h9i0j1",
  "status": "COMPLETED",
  "content": {
    "playbookType": "GOAL_ORIENTED",
    "meetingGoal": "BUDGET_ASK",
    "stakeholder": {
      "name": "Sarah Johnson",
      "title": "VP of Product",
      "psychologyProfile": {
        "communicationStyle": "Direct and data-driven",
        "decisionMaking": "Collaborative but decisive",
        "motivations": ["ROI optimization", "Team efficiency", "Strategic alignment"],
        "concerns": ["Resource allocation", "Timeline feasibility", "Cross-team dependencies"]
      }
    },
    "insights": {
      "strategist": "Focus on strategic alignment with Q4 OKRs and competitive positioning",
      "psychologist": "Sarah values transparency and appreciates when team members come prepared with solutions, not just problems",
      "diplomat": "Frame budget request as investment in team capability rather than cost center",
      "dataAnalyst": "Present 3-scenario analysis: conservative, recommended, aggressive with clear ROI projections",
      "executiveCoach": "Use confident body language and pause for questions - Sarah respects thorough preparation",
      "communicationsExpert": "Lead with the business impact, then dive into specifics. Use her language: 'north-star metrics', 'runway', 'velocity'"
    },
    "agendaCoach": {
      "meetingStructure": {
        "opening": "Thank Sarah for the time and confirm the 27-minute agenda",
        "context": "Briefly recap current project status and upcoming milestone",
        "request": "Present the budget ask with 3-scenario framework",
        "discussion": "Address questions and concerns with prepared responses",
        "closing": "Confirm next steps and timeline for decision"
      },
      "keyTalkingPoints": [
        "This investment accelerates our Q4 velocity by 40% based on similar team expansions",
        "Conservative scenario maintains current trajectory, recommended scenario enables stretch goals",
        "ROI becomes positive by month 3 based on efficiency gains and reduced contractor costs"
      ],
      "anticipatedQuestions": [
        {
          "question": "What happens if we don't approve this budget?",
          "suggestedResponse": "We'll hit our committed goals but miss the opportunity to exceed them. The competitive analysis shows our rivals are investing heavily in this area."
        },
        {
          "question": "How does this align with other team requests?",
          "suggestedResponse": "I've coordinated with [relevant teams] to ensure no overlap. This actually enables better collaboration by reducing their bottlenecks."
        }
      ]
    },
    "brandAlignment": {
      "tierValue": "This Goal-Oriented Playbook helps you master the content of your communication",
      "nextSteps": "Consider upgrading to Director tier for relationship-building strategies with Sarah"
    }
  }
}
```

### Required Fields:
- `playbookId` - Must match the original request
- `status` - Must be "COMPLETED", "FAILED", or "PENDING"
- `content` - The AI-generated playbook content (null for FAILED status)

---

## 3. Playbook Type Variations

### Relationship Analysis (Director Tier)
```json
{
  "playbookType": "RELATIONSHIP_ANALYSIS",
  "meetingGoal": null,
  "aiPersonas": {
    "strategist": true,
    "psychologist": true,
    "diplomat": true,
    "dataAnalyst": true,
    "executiveCoach": true,
    "communicationsExpert": true,
    "agendaCoach": false,
    "connector": true
  },
  "analysisScope": {
    "contentMastery": false,
    "contextMastery": true,
    "meetingSpecific": false,
    "relationshipAnalysis": true,
    "userProfileRequired": true
  },
  "brandPositioning": {
    "tierFocus": "Relational Mastery - Master the context and connection",
    "valueProposition": "Win the Promotion"
  }
}
```

### Basic Stakeholder Analysis (Starter Tier)
```json
{
  "playbookType": "STAKEHOLDER_ANALYSIS",
  "meetingGoal": null,
  "aiPersonas": {
    "strategist": true,
    "psychologist": true,
    "diplomat": true,
    "dataAnalyst": true,
    "executiveCoach": true,
    "communicationsExpert": true,
    "agendaCoach": false,
    "connector": false
  },
  "analysisScope": {
    "contentMastery": true,
    "contextMastery": false,
    "meetingSpecific": false,
    "relationshipAnalysis": false,
    "userProfileRequired": false
  },
  "brandPositioning": {
    "tierFocus": "Prove ROI on your most urgent stakeholder challenge",
    "valueProposition": "Decode stakeholder psychology"
  }
}
```

---

## 4. Error Response Format

If processing fails, send this format:

```json
{
  "playbookId": "clx1a2b3c4d5e6f7g8h9i0j1",
  "status": "FAILED",
  "error": {
    "code": "AI_PROCESSING_ERROR",
    "message": "Unable to analyze stakeholder LinkedIn profile",
    "details": "LinkedIn profile appears to be private or inaccessible"
  }
}
```

### Common Error Codes:
- `AI_PROCESSING_ERROR` - General AI processing failure
- `LINKEDIN_ACCESS_ERROR` - Cannot access LinkedIn profile
- `INVALID_STAKEHOLDER_DATA` - Insufficient stakeholder information
- `TIMEOUT_ERROR` - Processing took too long
- `RATE_LIMIT_ERROR` - API rate limits exceeded

---

## 5. Testing & Development

### Environment-Based URLs:

**Local Development:**
```
{NEXTAUTH_URL}/api/playbooks/webhook
# Example: http://localhost:3000/api/playbooks/webhook
```

**Production:**
```
{NEXTAUTH_URL}/api/playbooks/webhook
# Example: https://visionsalign.com/api/playbooks/webhook
```

**Environment Variables Required:**
- `NEXTAUTH_URL` - Your application's base URL
- `N8N_WEBHOOK_URL` - Your n8n webhook endpoint URL
- `WEBHOOK_SECRET` - Secret key for webhook authentication
- `WEBHOOK_ALLOWED_IPS` - (Optional) Comma-separated list of allowed IP addresses

### Test Payload:
Use the Goal-Oriented Playbook example above with a valid `playbookId` from your database.

---

## 6. Brand Alignment Guidelines

### Pro Tier Focus:
- Emphasize "content mastery" and "tactical preparation"
- Include meeting-specific guidance via `agendaCoach`
- Value proposition: "Win the Meeting"

### Director Tier Focus:
- Emphasize "context mastery" and "relationship building"
- Include comparative analysis via `connector`
- Value proposition: "Win the Promotion"

### Starter Tier Focus:
- Basic stakeholder psychology analysis
- Prove ROI before investment
- Value proposition: "Decode stakeholder psychology"

---

## 6. Security Implementation

### Required Security Headers:
```javascript
// In your n8n HTTP Request node
{
  "method": "POST",
  "url": "https://visionsalign.com/api/playbooks/webhook",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_WEBHOOK_SECRET"
  },
  "body": {
    "playbookId": "...",
    "status": "COMPLETED",
    "content": {...}
  }
}
```

### Environment Variables Setup:
```bash
# Generate secure webhook secret
WEBHOOK_SECRET=bo8Vr+Olp7bliQ4QqaejPX/nsB1o7iu7VFDM2Z4C8kw=

# Optional: Restrict to specific IPs
WEBHOOK_ALLOWED_IPS=1.2.3.4,5.6.7.8

# Your n8n webhook URL
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/visionsalign-playbooks
```

### Security Features:
- **API Key Authentication**: Bearer token required
- **Rate Limiting**: 10 requests per minute per IP
- **IP Whitelisting**: Optional restriction to specific IPs
- **Request Signature**: Optional HMAC-SHA256 validation
- **Detailed Logging**: All security violations logged

### Security Responses:
- `401 Unauthorized` - Missing or invalid API key
- `403 Forbidden` - IP not whitelisted
- `429 Too Many Requests` - Rate limit exceeded

---

## 7. Notes for n8n Development

1. **Authentication**: Always include `Authorization: Bearer YOUR_WEBHOOK_SECRET` header
2. **Timeout Handling**: Set reasonable timeouts (30-60 seconds)
3. **Error Handling**: Always send status updates, even for failures
4. **Logging**: Log processing steps for debugging
5. **Rate Limiting**: Respect API rate limits for external services
6. **IP Whitelisting**: Consider restricting webhook to your n8n server's IP

---

*Last Updated: January 5, 2025*
*Version: 2.0 (Goal-Oriented Playbooks Update)*
