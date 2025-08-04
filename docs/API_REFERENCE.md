# API Reference

This document provides comprehensive documentation for all API endpoints in the VisionsAlign application.

## 🔐 **Authentication**

Most API endpoints require authentication. Include the session token in your requests.

### **Authentication Methods**
- **Session-based**: NextAuth.js sessions via cookies
- **Admin routes**: Require admin email verification
- **Public routes**: No authentication required

## 📋 **API Endpoints**

### **🎯 Playbooks API**

#### **POST /api/playbooks**
Create a new playbook for the authenticated user.

**Authentication**: Required  
**Rate Limit**: 10 requests per hour

**Request Body**:
```json
{
  "stakeholderName": "John Doe",
  "stakeholderLinkedIn": "https://linkedin.com/in/johndoe",
  "meetingContext": "Quarterly review meeting",
  "meetingObjective": "Secure budget approval for Q2 initiatives",
  "additionalContext": "Previous meeting went well, but need to address concerns about timeline"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "playbook_123",
    "status": "PENDING",
    "stakeholderName": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z",
    "estimatedCompletion": "2024-01-15T10:35:00Z"
  }
}
```

**Error Responses**:
- `401`: Unauthorized - User not authenticated
- `403`: Insufficient credits - User has no playbook credits remaining
- `422`: Validation error - Invalid LinkedIn URL or missing required fields
- `429`: Rate limit exceeded - Too many requests

#### **GET /api/playbooks**
Retrieve all playbooks for the authenticated user.

**Authentication**: Required

**Query Parameters**:
- `status` (optional): Filter by status (`PENDING`, `COMPLETED`, `FAILED`)
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response**:
```json
{
  "success": true,
  "data": {
    "playbooks": [
      {
        "id": "playbook_123",
        "stakeholderName": "John Doe",
        "status": "COMPLETED",
        "createdAt": "2024-01-15T10:30:00Z",
        "completedAt": "2024-01-15T10:35:00Z",
        "meetingContext": "Quarterly review meeting"
      }
    ],
    "total": 15,
    "hasMore": true
  }
}
```

#### **GET /api/playbooks/[id]**
Retrieve a specific playbook by ID.

**Authentication**: Required (must own the playbook)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "playbook_123",
    "stakeholderName": "John Doe",
    "stakeholderLinkedIn": "https://linkedin.com/in/johndoe",
    "status": "COMPLETED",
    "content": "# Meeting Playbook\n\n## Stakeholder Analysis...",
    "createdAt": "2024-01-15T10:30:00Z",
    "completedAt": "2024-01-15T10:35:00Z"
  }
}
```

#### **DELETE /api/playbooks/[id]**
Delete a specific playbook.

**Authentication**: Required (must own the playbook)

**Response**:
```json
{
  "success": true,
  "message": "Playbook deleted successfully"
}
```

#### **POST /api/playbooks/webhook**
Internal webhook endpoint for n8n playbook completion.

**Authentication**: Webhook secret validation  
**Internal Use Only**

### **💳 Stripe Integration**

#### **POST /api/stripe/customer-portal**
Create a Stripe customer portal session for billing management.

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://billing.stripe.com/session/..."
  }
}
```

#### **POST /api/webhook/stripe**
Handle Stripe webhook events for payment processing.

**Authentication**: Stripe webhook signature validation  
**Internal Use Only**

**Supported Events**:
- `checkout.session.completed`: New subscription
- `customer.subscription.deleted`: Subscription cancelled
- `invoice.paid`: Recurring payment
- `invoice.payment_failed`: Payment failure

### **📧 Beta Access API**

#### **POST /api/beta-access**
Submit beta access request (pre-beta mode only).

**Authentication**: None required  
**Rate Limit**: 5 requests per hour per IP

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "Jane Smith",
  "company": "TechCorp Inc",
  "role": "Senior Product Manager",
  "useCase": "I need help preparing for executive meetings and stakeholder alignment."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Beta access request submitted successfully"
}
```

**Error Responses**:
- `400`: Invalid email format or missing required fields
- `409`: Email already submitted
- `429`: Rate limit exceeded

### **👤 User Management**

#### **GET /api/user/profile**
Get current user profile information.

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Jane Smith",
    "planTier": "PRO",
    "playbookCredits": 8,
    "hasAccess": true,
    "linkedinUrl": "https://linkedin.com/in/janesmith",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### **PUT /api/user/profile**
Update user profile information.

**Authentication**: Required

**Request Body**:
```json
{
  "name": "Jane Smith",
  "linkedinUrl": "https://linkedin.com/in/janesmith"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Jane Smith",
    "linkedinUrl": "https://linkedin.com/in/janesmith"
  }
}
```

### **🔧 Utility APIs**

#### **GET /api/dropdown-options**
Get dropdown options for forms (meeting types, objectives, etc.).

**Authentication**: None required

**Response**:
```json
{
  "success": true,
  "data": {
    "meetingTypes": [
      "One-on-one",
      "Team meeting",
      "Board presentation",
      "Client meeting",
      "Investor pitch"
    ],
    "objectives": [
      "Secure approval",
      "Build alignment",
      "Present results",
      "Negotiate terms",
      "Gather feedback"
    ]
  }
}
```

## 🛡️ **Error Handling**

### **Standard Error Response**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid LinkedIn URL format",
    "details": {
      "field": "stakeholderLinkedIn",
      "received": "invalid-url"
    }
  }
}
```

### **Common Error Codes**
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `VALIDATION_ERROR`: Request validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INSUFFICIENT_CREDITS`: No playbook credits remaining
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `INTERNAL_ERROR`: Server error

## 🔄 **Rate Limiting**

Rate limits are applied per user (authenticated) or IP address (public endpoints):

- **Playbooks**: 10 requests per hour
- **Beta Access**: 5 requests per hour per IP
- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 20 requests per hour

**Rate Limit Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642275600
```

## 📊 **Pagination**

List endpoints support pagination:

**Query Parameters**:
- `limit`: Number of items (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

**Response Format**:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 150,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}
```

## 🧪 **Testing**

### **Development Environment**
```bash
# Start development server
npm run dev

# API available at http://localhost:3000/api
```

### **Authentication Testing**
For testing authenticated endpoints, you need a valid session. Use the development login flow or create test sessions.

### **Webhook Testing**
Use Stripe CLI for webhook testing:
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## 📝 **API Client Examples**

### **JavaScript/TypeScript**
```typescript
// Create playbook
const response = await fetch('/api/playbooks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    stakeholderName: 'John Doe',
    stakeholderLinkedIn: 'https://linkedin.com/in/johndoe',
    meetingContext: 'Quarterly review',
    meetingObjective: 'Secure budget approval'
  })
});

const result = await response.json();
if (result.success) {
  console.log('Playbook created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### **cURL**
```bash
# Create playbook
curl -X POST http://localhost:3000/api/playbooks \
  -H "Content-Type: application/json" \
  -d '{
    "stakeholderName": "John Doe",
    "stakeholderLinkedIn": "https://linkedin.com/in/johndoe",
    "meetingContext": "Quarterly review",
    "meetingObjective": "Secure budget approval"
  }'
```

## 🔍 **Monitoring & Logging**

### **Request Logging**
All API requests are logged with:
- Request ID
- User ID (if authenticated)
- Endpoint and method
- Response status
- Response time

### **Error Tracking**
Errors are tracked with full stack traces in development and sanitized in production.

### **Performance Monitoring**
API response times and success rates are monitored for performance optimization.

## 🚀 **Deployment**

### **Environment Variables**
Ensure all required environment variables are set in production. See [`ENVIRONMENT.md`](./ENVIRONMENT.md) for details.

### **Health Check**
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```
