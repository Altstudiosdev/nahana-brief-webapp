# n8n Workflow Import Instructions

This folder contains pre-built n8n workflows that you can import directly into your n8n instance.

## Available Workflows

1. **n8n-brief-processor.json** - Basic workflow using JavaScript code for formatting
2. **n8n-brief-processor-openai.json** - Advanced workflow using OpenAI for AI-powered formatting

## How to Import

### Step 1: Access Your n8n Instance
1. Go to https://n8n-service-pafl.onrender.com
2. Log in with your credentials

### Step 2: Import the Workflow
1. Click on "Workflows" in the left sidebar
2. Click the "+" button or "Add workflow"
3. Click on the three dots menu (⋮) in the top right
4. Select "Import from File"
5. Choose one of the workflow files:
   - `n8n-brief-processor.json` (for basic formatting)
   - `n8n-brief-processor-openai.json` (for AI formatting)

### Step 3: Configure the Workflow

#### For Basic Workflow:
- No additional configuration needed
- The workflow is ready to use immediately

#### For OpenAI Workflow:
1. Click on the "OpenAI Format Brief" node
2. Click on "Credentials"
3. Create new OpenAI credentials:
   - Add your OpenAI API key
   - Save the credentials
4. You can adjust the model (gpt-3.5-turbo or gpt-4)

### Step 4: Activate the Workflow
1. Toggle the "Active" switch in the top right
2. Your webhook is now live!

### Step 5: Test the Webhook

Copy this webhook URL:
```
https://n8n-service-pafl.onrender.com/webhook/brief-processor
```

Test with curl:
```bash
curl -X POST https://n8n-service-pafl.onrender.com/webhook/brief-processor \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTkyNTE1OS05NzIzLTQ2OTgtYmI3NS00NTQ2NzI2ZWE1OGQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzUzNDUyMjExLCJleHAiOjE3NTYwMDgwMDB9.dyZqG_NgTD82xrhohOYmv_Q3EqEIrzeV5s_AGMxcRVg" \
  -d '{
    "briefInput": "Create a mobile app for tracking fitness goals",
    "userId": "test-user",
    "timestamp": "2024-01-01T00:00:00Z"
  }'
```

## Troubleshooting

### Webhook Path Already Exists
If you get an error about the webhook path already existing:
1. Check your existing workflows
2. Either delete the old one or change the path in the webhook node

### Import Errors
If the import fails:
1. Make sure you're using a recent version of n8n
2. Try copying the JSON content and pasting it in the workflow editor

### Credentials Error (OpenAI workflow)
1. Make sure you've added your OpenAI API key
2. Check that the API key has sufficient credits
3. Verify the API key permissions

## Customization

Feel free to modify these workflows:
- Change the formatting structure
- Add additional processing steps
- Integrate with other services
- Add error handling or logging

The workflows are fully customizable to meet your specific needs! 