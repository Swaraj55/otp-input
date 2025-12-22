# Deployment Guide for Showcase Project

This guide explains how to deploy the showcase project to various hosting platforms.

## Prerequisites

1. Build the showcase project:
```bash
npm run build-showcase
```

This will create the production build in `dist/showcase/` directory.

## Deployment Options

### Option 1: GitHub Pages (Free)

#### Step 1: Update base href in index.html

For GitHub Pages, you need to set the base href to your repository name:

```html
<base href="/otp-input/">
```

Or if deploying to a custom domain:
```html
<base href="/">
```

#### Step 2: Install gh-pages package
```bash
npm install --save-dev gh-pages
```

#### Step 3: Add deploy script to package.json
```json
"deploy:gh-pages": "npm run build-showcase && npx gh-pages -d dist/showcase"
```

#### Step 4: Deploy
```bash
npm run deploy:gh-pages
```

Your showcase will be available at: `https://yourusername.github.io/otp-input/`

---

### Option 2: Netlify (Free & Easy)

#### Step 1: Create netlify.toml
Create a `netlify.toml` file in the root directory (already created).

#### Step 2: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run build-showcase
netlify deploy --prod --dir=dist/showcase
```

#### Step 3: Or Deploy via Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Set build command: `npm run build-showcase`
6. Set publish directory: `dist/showcase`
7. Click "Deploy site"

---

### Option 3: Vercel (Free & Easy)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
npm run build-showcase
cd dist/showcase
vercel --prod
```

#### Step 3: Or Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Import Project"
4. Select your repository
5. Set build command: `npm run build-showcase`
6. Set output directory: `dist/showcase`
7. Click "Deploy"

---

### Option 4: Firebase Hosting

#### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### Step 2: Initialize Firebase
```bash
firebase login
firebase init hosting
```

Select:
- Public directory: `dist/showcase`
- Single-page app: Yes
- Overwrite index.html: No

#### Step 3: Deploy
```bash
npm run build-showcase
firebase deploy
```

---

## Quick Deploy Commands

After setting up, you can use these commands:

```bash
# Build the showcase
npm run build-showcase

# For GitHub Pages
npm run deploy:gh-pages

# For Netlify (after initial setup)
netlify deploy --prod --dir=dist/showcase

# For Vercel (after initial setup)
cd dist/showcase && vercel --prod
```

## Important Notes

1. **Base Href**: Make sure to update the `<base href>` in `index.html` based on your deployment URL
2. **Routing**: If you add routing later, configure your hosting platform for SPA routing
3. **Environment Variables**: If needed, configure environment variables in your hosting platform
4. **Custom Domain**: All platforms support custom domains in their settings

## Recommended: Netlify or Vercel

For easiest deployment, we recommend **Netlify** or **Vercel** as they:
- Have free tiers
- Auto-deploy on git push
- Handle SPA routing automatically
- Provide HTTPS by default
- Have easy custom domain setup

