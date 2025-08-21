# HayTree Web Services - Vercel Deployment Guide

## Quick Deployment Steps

### 1. Download the Project
You can download this entire project as a ZIP file from Replit or clone it to your local machine.

### 2. Prepare for Vercel

#### Option A: Deploy from GitHub (Recommended)
1. Push this code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository in Vercel dashboard
4. Vercel will automatically detect the configuration

#### Option B: Deploy using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project folder
cd haytree-web-services

# Deploy
vercel
```

### 3. Environment Variables (if needed)
If you plan to add database functionality later, you'll need to set these in Vercel:
- `DATABASE_URL` - Your PostgreSQL connection string
- Any other API keys you might add

### 4. Build Configuration
The project is already configured with:
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ Build scripts in `package.json`
- ✅ Proper routing for SPA
- ✅ Static asset handling

## Project Structure for Vercel

```
haytree-web-services/
├── client/           # React frontend
├── server/           # Express backend (for API routes)
├── shared/           # Shared types and schemas
├── vercel.json       # Vercel configuration
├── package.json      # Dependencies and scripts
└── vite.config.ts    # Build configuration
```

## What Happens on Deployment

1. **Build Process**: Vite builds the React app and Express server
2. **Static Assets**: Frontend files served from CDN
3. **API Routes**: Server functions handle `/api/*` requests
4. **SPA Routing**: All other routes serve the React app

## Post-Deployment

Your website will be available at:
- `https://your-project-name.vercel.app`
- You can add a custom domain in Vercel settings

## Troubleshooting

- **Build Fails**: Check Node.js version (should be 18+)
- **Routes Not Working**: Ensure `vercel.json` is properly configured
- **Assets Missing**: Verify build output in Vercel dashboard

## Development vs Production

- **Development**: Uses `npm run dev` with hot reloading
- **Production**: Optimized build with `/api` routes as serverless functions

The website is ready to deploy with all the tech animations and #6db33f green branding!