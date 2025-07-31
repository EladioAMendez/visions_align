const express = require('express');
const app = express();
const port = 3001; // Different port from your Next.js app

// Middleware to parse JSON payloads
app.use(express.json({ limit: '10mb' })); // Increase limit for large payloads

// CORS middleware (optional, but helpful for development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Root webhook endpoint
app.post('/', async (req, res) => {
  try {
    console.log('🎯 Webhook received at:', new Date().toISOString());
    console.log('📦 Headers:', req.headers);
    console.log('📄 Payload:', JSON.stringify(req.body, null, 2));
    
    // Extract the data from your n8n payload structure
    const { output } = req.body;
    
    if (!output) {
      console.log('❌ No output field found in payload');
      return res.status(400).json({
        success: false,
        error: 'Missing output field in payload'
      });
    }
    
    // Log specific parts of the payload
    if (output.requestMetadata) {
      console.log('📋 Request Metadata:', output.requestMetadata);
    }
    
    if (output.stakeholderPlaybook) {
      console.log('📊 Stakeholder Playbook received');
      // Don't log the full playbook as it might be very large
      console.log('📊 Playbook keys:', Object.keys(output.stakeholderPlaybook));
    }
    
    if (output.rawAnalysis) {
      console.log('🔍 Raw Analysis received');
      console.log('🔍 Analysis keys:', Object.keys(output.rawAnalysis));
    }
    
    // Transform n8n data to VisionsAlign expected format
    const visionsAlignPayload = {
      playbookId: output.requestMetadata?.playbookId || 'n8n-generated-' + Date.now(),
      playbookType: 'STAKEHOLDER', // Default to stakeholder for now
      status: 'COMPLETED',
      content: {
        stakeholder: {
          name: 'McKesson Executive', // You can extract this from metadata if available
          title: 'VP of Strategy',
          company: 'McKesson',
          influence: 'HIGH',
          relationship: 'NEUTRAL'
        },
        analysis: {
          strategist: {
            keyInsights: [
              output.rawAnalysis?.strategistBrief?.primaryBusinessObjective || 'Strategic insight from AI analysis',
              output.rawAnalysis?.strategistBrief?.keyPressurePoint || 'Key pressure point identified'
            ],
            recommendations: [
              'Leverage data-driven approach for decision making',
              'Focus on scalable frameworks and quantifiable impact'
            ]
          },
          empath: {
            emotionalProfile: output.rawAnalysis?.empathRead?.psychologicalDriver || 'Achievement-oriented executive',
            communicationStyle: output.rawAnalysis?.empathRead?.inferredCommunicationStyle || 'Direct and data-focused',
            motivations: output.rawAnalysis?.empathRead?.keywordsToUse || ['System optimization', 'Data-driven results']
          },
          communicator: {
            preferredChannels: ['Structured presentations', 'Data dashboards'],
            communicationTiming: 'Executive briefings with clear agenda',
            responsePatterns: 'Expects data-backed recommendations'
          },
          negotiator: {
            negotiationStyle: 'Analytical and systematic',
            leveragePoints: output.rawAnalysis?.empathRead?.keywordsToUse || ['Data', 'ROI', 'Scalability'],
            potentialConcerns: output.rawAnalysis?.contrarianWarning?.potentialObjections || ['Scalability questions', 'Data validation']
          }
        },
        meetingStrategy: {
          openingApproach: output.stakeholderPlaybook?.openingStatementStrategy?.example || 'Lead with data-driven insights',
          keyTalkingPoints: [
            'Present quantifiable business impact',
            'Show systematic approach to problem-solving',
            'Demonstrate scalability of proposed solutions'
          ],
          closingStrategy: 'Summarize with clear next steps and measurable outcomes'
        }
      }
    };
    
    console.log('🔄 Transformed payload for VisionsAlign:');
    console.log(JSON.stringify(visionsAlignPayload, null, 2));
    
    // Try to forward to VisionsAlign webhook (optional - for integration)
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/playbooks/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visionsAlignPayload)
      });
      
      if (response.ok) {
        console.log('✅ Successfully forwarded to VisionsAlign webhook');
        const responseData = await response.json();
        console.log('📨 VisionsAlign response:', responseData);
      } else {
        console.log('⚠️ Failed to forward to VisionsAlign webhook:', response.status);
        const errorText = await response.text();
        console.log('❌ Error details:', errorText);
      }
    } catch (forwardError) {
      console.log('⚠️ Error forwarding to VisionsAlign:', forwardError.message);
      console.log(`💡 Make sure your Next.js app is running on ${process.env.NEXTAUTH_URL}`);
    }
    
    // Return success response to n8n
    res.json({
      success: true,
      message: 'Webhook received and processed successfully',
      timestamp: new Date().toISOString(),
      dataReceived: {
        hasOutput: !!output,
        hasMetadata: !!output?.requestMetadata,
        hasPlaybook: !!output?.stakeholderPlaybook,
        hasRawAnalysis: !!output?.rawAnalysis
      }
    });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'Webhook server is running',
    timestamp: new Date().toISOString(),
    port: port
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Webhook server running on port ${port}`);
  console.log(`📡 Send POST requests to: http://localhost:${port}/`);
  console.log(`🌐 For ngrok, run: ngrok http ${port}`);
  console.log('');
  console.log('💡 To test, you can use:');
  console.log(`curl -X POST http://localhost:${port}/ -H "Content-Type: application/json" -d '{"output":{"test":"data"}}'`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down webhook server...');
  process.exit(0);
});
