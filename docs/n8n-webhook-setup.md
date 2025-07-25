# n8n Webhook Setup Guide

This guide will help you set up the n8n webhook for processing briefs in the Nahana Brief App.

## Prerequisites

- Access to your n8n instance at https://n8n-service-pafl.onrender.com
- n8n API key (already provided)

## Step 1: Create a New Workflow

1. Log in to your n8n instance
2. Click "New Workflow"
3. Name it "Brief Processor"

## Step 2: Add Webhook Trigger

1. Add a **Webhook** node
2. Configure it:
   - **HTTP Method**: POST
   - **Path**: `brief-processor`
   - **Response Mode**: "When last node finishes"
   - **Response Data**: "All Entries"

3. Copy the webhook URL - it should be:
   ```
   https://n8n-service-pafl.onrender.com/webhook/brief-processor
   ```

## Step 3: Add Brief Processing Logic

Here's a basic workflow structure:

### Option A: Using OpenAI (Recommended)

1. Add an **OpenAI** node after the webhook
2. Configure it:
   - **Resource**: Chat
   - **Model**: gpt-3.5-turbo or gpt-4
   - **Prompt**:
   ```
   You are a professional brief writer. Format the following input into a well-structured project brief:

   {{$json["briefInput"]}}

   Include sections for:
   - Executive Summary
   - Objectives
   - Scope
   - Timeline
   - Deliverables
   - Success Criteria
   ```

3. Add a **Set** node to format the response:
   - Set `formattedBrief` to the OpenAI response

### Option B: Using Basic Text Processing

1. Add a **Code** node after the webhook
2. Add this JavaScript code:
   ```javascript
   const briefInput = $input.first().json.briefInput;
   
   const formattedBrief = `
   **PROJECT BRIEF**
   
   **Date:** ${new Date().toLocaleDateString()}
   **Submitted by:** User ${$input.first().json.userId}
   
   **Project Overview:**
   ${briefInput}
   
   **Key Components:**
   ${briefInput.split('.').map(sentence => `• ${sentence.trim()}`).join('\n')}
   
   **Next Steps:**
   1. Review and refine requirements
   2. Identify stakeholders
   3. Create detailed project plan
   4. Set up initial meetings
   `;
   
   return [{
     json: {
       formattedBrief: formattedBrief.trim()
     }
   }];
   ```

## Step 4: Return the Response

1. Make sure your final node outputs a JSON object with:
   ```json
   {
     "formattedBrief": "Your formatted brief text here..."
   }
   ```

## Step 5: Activate the Workflow

1. Click the toggle to activate your workflow
2. Test it using the webhook test feature

## Testing Your Webhook

### Using curl:
```bash
curl -X POST https://n8n-service-pafl.onrender.com/webhook/brief-processor \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: your-api-key" \
  -d '{
    "briefInput": "Test brief content",
    "userId": "test-user",
    "timestamp": "2024-01-01T00:00:00Z"
  }'
```

### Expected Response:
```json
{
  "formattedBrief": "**PROJECT BRIEF**\n\n..."
}
```

## Troubleshooting

### 404 Error
- Ensure the workflow is activated
- Check the webhook path is exactly `brief-processor`
- Verify the n8n instance URL is correct

### 401 Error
- Check if API key authentication is required
- Verify the API key in your environment variables

### 500 Error
- Check n8n workflow execution logs
- Ensure all nodes are properly configured
- Verify OpenAI API key if using AI processing

## Environment Variables

Add to your `.env.local`:
```env
N8N_WEBHOOK_URL=https://n8n-service-pafl.onrender.com/webhook/brief-processor
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
USE_N8N_TEST_MODE=false  # Set to true to use mock responses
```

## Security Considerations

1. Keep your n8n API key secure
2. Consider adding rate limiting in n8n
3. Validate input data in your workflow
4. Use HTTPS for all communications 