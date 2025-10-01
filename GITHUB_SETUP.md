# GitHub Auto-Deploy Setup

## Step 1: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: devious.work v2.0"

# Create repo on GitHub, then:
git remote add origin https://github.com/Daolyap/devious.work.git
git branch -M main
git push -u origin main
```

## Step 2: Get Cloudflare Credentials

### Get API Token:
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Click "Continue to summary"
5. Click "Create Token"
6. **Copy the token** (you won't see it again)

### Get Account ID:
1. Go to https://dash.cloudflare.com/
2. Click "Workers & Pages" in the left sidebar
3. Copy your **Account ID** from the right sidebar

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repo: https://github.com/Daolyap/devious.work
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these two secrets:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: [paste your API token from Step 2]

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: [paste your Account ID from Step 2]

## Step 4: Test Auto-Deploy

Make any small change and push:

```bash
# Make a change (or just rebuild)
npm run build

# Commit and push
git add .
git commit -m "Test auto-deploy"
git push
```

## Step 5: Verify Deployment

1. Go to your repo → **Actions** tab
2. You should see the workflow running
3. Wait for green checkmark ✅
4. Visit your site at devious.work

## How It Works

Every time you push to `main` branch:
1. GitHub Actions runs
2. Installs dependencies
3. Runs `npm run build`
4. Deploys to Cloudflare Workers using your secrets

## Future Workflow

To update your site:
1. Edit files locally
2. Test with `npm run dev`
3. Commit changes
4. Push to GitHub
5. Auto-deploys automatically

That's it! No manual deployment needed anymore.
