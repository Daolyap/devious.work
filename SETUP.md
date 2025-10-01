# Quick Setup Guide

## Immediate Next Steps

### 1. Add Your XOK Image
Place your `xok.png` file in the `assets/` directory:
```
assets/xok.png
```

### 2. Set Up Cloudflare KV Namespaces
```bash
# Create KV namespaces
wrangler kv:namespace create "GUESTBOOK_LOGS"
wrangler kv:namespace create "RATE_LIMITER"
```

Copy the IDs and update them in `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "GUESTBOOK_LOGS"
id = "YOUR_NAMESPACE_ID_HERE"

[[kv_namespaces]]
binding = "RATE_LIMITER"
id = "YOUR_NAMESPACE_ID_HERE"
```

### 3. Test Locally
```bash
npm run dev
```

Visit http://localhost:8787

### 4. Deploy to Cloudflare
```bash
npm run deploy
```

### 5. Set Up GitHub Auto-Deploy

Add these secrets to your GitHub repo (Settings → Secrets → Actions):

**CLOUDFLARE_API_TOKEN**
- Go to Cloudflare Dashboard → My Profile → API Tokens
- Create token with "Edit Cloudflare Workers" template
- Copy token

**CLOUDFLARE_ACCOUNT_ID**
- Go to Cloudflare Dashboard → Workers & Pages
- Copy your Account ID from the right sidebar

After adding secrets, push to `main` branch to trigger auto-deployment.

## Easter Eggs Reference

### Easter Egg #1: Secret Link
- **Location**: Footer - look for the `?` link
- **Action**: Clicking reveals a hint about typing "devious"
- **Subtlety**: The link has low opacity

### Easter Egg #2: Type "devious"
- **Location**: Anywhere on the main site
- **Action**: Type the word "devious" (without any input field focused)
- **Effect**: Screen flashes colors, then shows hint about /vault
- **Subtlety**: No visual indication this exists

### Easter Egg #3: /xok
- **Location**: `/xok` route
- **Discovery**: Via secret link or "devious" easter egg
- **Effect**: Displays your xok.png with glitch effects
- **Subtlety**: Linked from both previous easter eggs

### Easter Egg #4: The Vault (/vault)
- **Location**: `/vault` route
- **Discovery**: Mystery project card has hint: `/v█████`
- **Effect**: Full horror experience - late 90s creepy website aesthetic
- **Features**:
  - Warning countdown on entry
  - Glitchy effects and screen corruption
  - Fake camera feeds with static
  - Countdown timer to nothing
  - Cryptic messages and logs
  - Visitor tracking (fake)
  - Random screen shakes
  - Title changes to creepy messages
  - Type "help" for secret message
  - Console messages for devs
- **Subtlety**: Partial text in project card is discoverable by observant users

## Portfolio Customization

Replace the example projects in `portfolio/`:

1. Delete `example-project-1.md` and `example-project-2.md`
2. Create your own markdown files with your projects
3. Update `portfolio/portfolio.json` with the new filenames in your preferred order

Example structure:
```markdown
# Project Name

**Status:** Live
**Date:** 2025-Q1
**Tech Stack:** List, of, technologies

## Overview
Description here

## Technical Details
More info here
```

## Subdomain Configuration

Edit `config/subdomains-exclude.json`:

- **exclude**: Array of subdomain names to hide from discovery
- **manualSubdomains**: Array of subdomains to always show

## Theme System

Users can customize themes via the ◐ button in navigation:
- 6 preset themes (default, amber, vaporwave, nuclear, matrix, cyberpunk)
- Custom theme builder with color pickers
- Themes persist in localStorage

## What Got Built

### Main Features
✅ Professional retro-tech homepage with CRT effects
✅ Boot sequence animation
✅ Smooth section reveals on scroll
✅ Theme customization system
✅ Enhanced guestbook with rate limiting
✅ Subdomain network map
✅ Markdown-based portfolio system
✅ 4 hidden easter eggs with subtle hints

### Pages
- `/` - Main homepage
- `/portfolio` - Portfolio showcase
- `/xok` - Easter egg image display
- `/vault` - Horror experience

### API Routes
- `GET /api/messages` - Fetch guestbook
- `POST /api/messages` - Submit to guestbook (rate limited)
- `GET /api/subdomains` - Get subdomain list

### Build System
- Compiles all HTML, CSS, JS into single worker.js
- Parses markdown portfolio files
- Base64-encodes assets
- Ready for Cloudflare Workers deployment

## File Structure Overview

```
devious.work/
├── src/                    # Source files
│   ├── templates/          # HTML templates
│   ├── styles/             # CSS files
│   └── scripts/            # JavaScript files
├── portfolio/              # Your portfolio markdown files
├── config/                 # Configuration
├── assets/                 # Images (put xok.png here)
├── build.js               # Build system
├── worker.js              # Generated worker (git ignored)
├── wrangler.toml          # Cloudflare config
└── .github/workflows/     # Auto-deploy config
```

## Development Commands

```bash
npm run build    # Build worker.js
npm run dev      # Build + run locally
npm run deploy   # Build + deploy to Cloudflare
```

## Tips

1. The vault is genuinely creepy - warn users if needed
2. All easter eggs have subtle hints scattered throughout
3. The site is fully functional without xok.png (it just won't show)
4. Portfolio markdown supports full markdown syntax
5. Rate limiting uses IP address (60 second cooldown)
6. Build system must run before deploy (auto-run by npm scripts)

## Troubleshooting

**Build fails**: Run `npm install` first
**No xok image**: Place xok.png in assets/ and rebuild
**Deploy fails**: Check wrangler.toml KV namespace IDs
**Guestbook doesn't work**: Verify KV namespaces are created and configured

---

Everything is ready to go! Just add your xok.png, configure KV namespaces, and deploy.
