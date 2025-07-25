# Nahana Brief App

A modern web application that transforms your ideas into professionally formatted briefs using AI powered by n8n automation.

## Features

- 🔐 Secure authentication with Clerk
- 📝 Brief input form with real-time processing
- 🤖 AI-powered brief formatting via n8n webhook
- 💅 Beautiful and responsive UI
- 📋 Copy formatted briefs to clipboard

## Prerequisites

- Node.js 18+ and npm
- Clerk account for authentication
- n8n instance with webhook automation
- Render.com account for deployment

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nahana-brief-webapp
npm install
```

### 2. Set up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your API keys from the API Keys page

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# n8n Configuration
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYTkyNTE1OS05NzIzLTQ2OTgtYmI3NS00NTQ2NzI2ZWE1OGQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzUzNDUyMjExLCJleHAiOjE3NTYwMDgwMDB9.dyZqG_NgTD82xrhohOYmv_Q3EqEIrzeV5s_AGMxcRVg
N8N_WEBHOOK_URL=https://n8n-service-pafl.onrender.com/webhook/brief-processor
```

### 4. Set up n8n Webhook Automation

1. In your n8n instance, create a new workflow
2. Add a Webhook trigger node
3. Set the HTTP Method to POST
4. Copy the webhook URL and update `N8N_WEBHOOK_URL` in your `.env.local`
5. Add your brief processing logic (e.g., OpenAI API integration)
6. Return the formatted brief in the response

Example n8n webhook response format:
```json
{
  "formattedBrief": "Your professionally formatted brief text here..."
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment to Render.com

### 1. Prepare for Deployment

1. Push your code to a GitHub repository
2. Make sure all environment variables are properly configured

### 2. Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: `nahana-brief-webapp`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables in the Environment tab
6. Click "Create Web Service"

### 3. Configure Clerk for Production

1. In Clerk Dashboard, add your Render URL to allowed origins
2. Update your production instance settings
3. Ensure webhook endpoints are accessible

## Project Structure

```
nahana-brief-webapp/
├── app/
│   ├── api/
│   │   └── brief/
│   │       └── route.ts        # API endpoint for n8n webhook
│   ├── components/
│   │   └── BriefForm.tsx       # Brief submission form
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx        # Sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx        # Sign-up page
│   ├── layout.tsx              # Root layout with Clerk provider
│   └── page.tsx                # Home page
├── middleware.ts               # Clerk authentication middleware
└── package.json
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **Backend Integration**: n8n webhooks
- **Deployment**: Render.com

## Troubleshooting

### Clerk Authentication Issues
- Ensure your API keys are correctly set in `.env.local`
- Check that middleware.ts is properly configured
- Verify your sign-in/sign-up URLs match the configuration

### n8n Webhook Issues
- Verify the webhook URL is accessible
- Check n8n workflow is active
- Ensure proper response format from n8n

### Deployment Issues
- Verify all environment variables are set in Render
- Check build logs for any errors
- Ensure Node.js version compatibility

## License

MIT
