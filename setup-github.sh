#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up GitHub repository and Render deployment for Nahana Brief App${NC}"
echo "=================================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}GitHub CLI is not installed. Installing instructions:${NC}"
    echo "macOS: brew install gh"
    echo "Ubuntu/Debian: sudo apt install gh"
    echo "Or visit: https://cli.github.com/manual/installation"
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Nahana Brief App with Clerk auth and n8n integration"
else
    echo -e "${GREEN}Git repository already initialized${NC}"
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
    echo -e "${BLUE}Please authenticate with GitHub:${NC}"
    gh auth login
fi

# Get GitHub username
GITHUB_USER=$(gh api user --jq '.login')
echo -e "${GREEN}Authenticated as: $GITHUB_USER${NC}"

# Repository name
REPO_NAME="nahana-brief-webapp"

# Check if repository already exists
if gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
    echo -e "${RED}Repository $REPO_NAME already exists!${NC}"
    read -p "Do you want to use the existing repository? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    # Create GitHub repository
    echo -e "${BLUE}Creating GitHub repository...${NC}"
    gh repo create "$REPO_NAME" \
        --description "AI-powered brief formatting app with Clerk authentication and n8n integration" \
        --public \
        --source=. \
        --remote=origin \
        --push
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo -e "${BLUE}Creating .gitignore file...${NC}"
    cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL
    git add .gitignore
    git commit -m "Add .gitignore"
fi

# Create render.yaml for easy Render deployment
echo -e "${BLUE}Creating render.yaml configuration...${NC}"
cat > render.yaml << EOL
services:
  - type: web
    name: nahana-brief-webapp
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18.17.0
      - key: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        sync: false
      - key: CLERK_SECRET_KEY
        sync: false
      - key: NEXT_PUBLIC_CLERK_SIGN_IN_URL
        value: /sign-in
      - key: NEXT_PUBLIC_CLERK_SIGN_UP_URL
        value: /sign-up
      - key: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
        value: /
      - key: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
        value: /
      - key: N8N_API_KEY
        sync: false
      - key: N8N_WEBHOOK_URL
        value: https://n8n-service-pafl.onrender.com/webhook/brief-processor
EOL

# Create example environment file
echo -e "${BLUE}Creating .env.example file...${NC}"
cat > .env.example << EOL
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# n8n Configuration
N8N_API_KEY=your_n8n_api_key_here
N8N_WEBHOOK_URL=https://n8n-service-pafl.onrender.com/webhook/brief-processor
EOL

# Commit render configuration
git add render.yaml .env.example
git commit -m "Add Render deployment configuration"

# Push to GitHub
echo -e "${BLUE}Pushing to GitHub...${NC}"
git push -u origin main

echo -e "${GREEN}✅ GitHub repository setup complete!${NC}"
echo ""
echo -e "${BLUE}Repository URL:${NC} https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo -e "${BLUE}Next steps for Render deployment:${NC}"
echo "1. Go to https://dashboard.render.com/"
echo "2. Click 'New +' and select 'Web Service'"
echo "3. Connect your GitHub account if not already connected"
echo "4. Select the repository: $GITHUB_USER/$REPO_NAME"
echo "5. Render will detect the render.yaml file automatically"
echo "6. Add your environment variables:"
echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   - CLERK_SECRET_KEY"
echo "   - N8N_API_KEY (optional if your n8n webhook doesn't require it)"
echo "7. Click 'Create Web Service'"
echo ""
echo -e "${BLUE}Alternative: Deploy using Render Blueprint${NC}"
echo "You can also use this one-click deploy URL:"
echo "https://render.com/deploy?repo=https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo -e "${GREEN}Don't forget to:${NC}"
echo "- Set up your Clerk application at https://dashboard.clerk.com/"
echo "- Configure your n8n webhook at https://n8n-service-pafl.onrender.com/"
echo "- Add your Render URL to Clerk's allowed origins after deployment" 