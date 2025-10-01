# Cloudflare Deployment Configuration Check

## Important: Build Configuration

Your `worker.js` is **gitignored** (correctly), so Cloudflare **MUST** run the build process during deployment.

### To verify your Cloudflare GitHub integration is configured correctly:

1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Find your **devious-work** worker
3. Click **Settings** → **Builds & deployments**
4. Verify these settings:

**Build Configuration:**
- **Root directory**: `/` (or leave blank)
- **Build command**: `npm run build`
- **Build output directory**: `/` (worker.js is generated at root)

**If these aren't set:**
1. Click **Edit configuration**
2. Set **Build command** to: `npm run build`
3. **Save**

### Manual Fix (if auto-deploy isn't working):

If Cloudflare isn't building automatically, you can deploy manually:

```bash
# Build locally
npm run build

# Deploy with wrangler
npx wrangler deploy
```

### Why XOK isn't working:

The base64 encoding in the code is **correct** - that's how images are embedded in Workers. The issue is:

1. **If worker.js isn't being built** → Cloudflare deploys old code without xok.png
2. **Solution:** Make sure Cloudflare runs `npm run build` on every deployment

### Quick Test:

After fixing the build configuration:
1. Make a small change (add a space to README)
2. Commit and push
3. Watch the deployment in Cloudflare dashboard
4. You should see "Running build command: npm run build"
5. Wait for deployment to complete
6. Test `/xok` route

The xok.png file (101KB) is being base64-encoded correctly during build - it just needs to actually deploy!
