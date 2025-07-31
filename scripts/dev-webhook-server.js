// Simple development webhook server to simulate n8n responses
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Mock n8n webhook endpoint for development
app.post('/webhook/playbook', async (req, res) => {
  console.log('📥 Received webhook from VisionsAlign:', req.body);
  
  const { playbookId, user, stakeholder, playbookType } = req.body;
  
  // Simulate processing delay
  setTimeout(async () => {
    // Mock response based on tier
    const mockResponse = playbookType === 'RELATIONSHIP' ? {
      playbookId,
      playbookType: 'RELATIONSHIP',
      status: 'COMPLETED',
      content: {
        stakeholder: {
          name: stakeholder.name,
          title: stakeholder.title,
          company: stakeholder.company,
          influence: stakeholder.influence,
          relationship: stakeholder.relationship
        },
        user: {
          name: user.name,
          linkedinUrl: user.linkedinUrl
        },
        analysis: {
          strategist: {
            keyInsights: ["Strategic insight 1", "Strategic insight 2"],
            recommendations: ["Strategic recommendation 1", "Strategic recommendation 2"]
          },
          connector: {
            relationshipAnalysis: {
              commonalities: ["Mock commonality 1", "Mock commonality 2"],
              communicationSynergies: ["Mock synergy 1", "Mock synergy 2"],
              potentialFrictionPoints: ["Mock friction point 1"]
            },
            rapportBuilding: ["Mock rapport building tip 1", "Mock rapport building tip 2"],
            strategicPositioning: ["Mock positioning 1", "Mock positioning 2"]
          }
        },
        meetingStrategy: {
          openingApproach: "Mock opening approach",
          keyTalkingPoints: ["Mock talking point 1", "Mock talking point 2"],
          closingStrategy: "Mock closing strategy"
        },
        relationshipDevelopment: {
          shortTerm: "Mock short term strategy",
          mediumTerm: "Mock medium term strategy", 
          longTerm: "Mock long term strategy"
        }
      }
    } : {
      playbookId,
      playbookType: 'STAKEHOLDER',
      status: 'COMPLETED',
      content: {
        stakeholder: {
          name: stakeholder.name,
          title: stakeholder.title,
          company: stakeholder.company,
          influence: stakeholder.influence,
          relationship: stakeholder.relationship
        },
        analysis: {
          strategist: {
            keyInsights: ["Strategic insight 1", "Strategic insight 2"],
            recommendations: ["Strategic recommendation 1", "Strategic recommendation 2"]
          },
          empath: {
            emotionalProfile: "Mock emotional profile",
            communicationStyle: "Mock communication style",
            motivations: ["Mock motivation 1", "Mock motivation 2"]
          }
        },
        meetingStrategy: {
          openingApproach: "Mock opening approach",
          keyTalkingPoints: ["Mock talking point 1", "Mock talking point 2"],
          closingStrategy: "Mock closing strategy"
        }
      }
    };

    // Send response back to VisionsAlign webhook
    try {
      const response = await fetch('http://localhost:3000/api/playbooks/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockResponse)
      });
      
      if (response.ok) {
        console.log('✅ Successfully sent mock response to VisionsAlign');
      } else {
        console.error('❌ Failed to send response:', response.status);
      }
    } catch (error) {
      console.error('❌ Error sending response:', error.message);
    }
  }, 2000); // 2 second delay to simulate processing

  res.json({ message: 'Webhook received, processing...' });
});

app.listen(port, () => {
  console.log(`🚀 Development webhook server running at http://localhost:${port}`);
  console.log(`📡 Use this URL in your .env: N8N_WEBHOOK_URL=http://localhost:${port}/webhook/playbook`);
});
