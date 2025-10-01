# devious.work v2.0

A professional, retro-tech themed personal website built as a single Cloudflare Worker with automatic deployment from GitHub.

## Features

- **Professional Retro-Tech Aesthetic**: Clean, polished design with CRT effects and smooth animations
- **Custom Theme System**: 6 preset themes + custom color picker for users to personalize
- **Markdown Portfolio**: Easy-to-edit portfolio system using markdown files
- **Enhanced Guestbook**: Rate-limited message system with improved UX
- **Subdomain Discovery**: Automatic or manual subdomain listing with exclusion config
- **Easter Eggs**: Hidden features scattered throughout the site (see below)
- **Single Worker Architecture**: Entire site compiles to one Cloudflare Worker file
- **Auto-Deploy**: GitHub Actions automatically deploys on push to main

## Project Structure

```
.
├── src/
│   ├── templates/          # HTML templates
│   │   ├── main.html
│   │   ├── portfolio.html
│   │   ├── vault.html
│   │   └── xok.html
│   ├── styles/             # CSS files
│   │   ├── main.css
│   │   ├── portfolio.css
│   │   └── vault.css
│   └── scripts/            # JavaScript files
│       ├── main.js
│       ├── portfolio.js
│       └── vault.js
├── portfolio/              # Portfolio markdown files
│   ├── *.md
│   └── portfolio.json
├── config/
│   └── subdomains-exclude.json
├── assets/
│   └── xok.png            # Easter egg image (put your image here)
├── build.js               # Build system
├── wrangler.toml          # Cloudflare Workers config
├── package.json
└── .github/workflows/deploy.yml
```

## Setup Instructions

### 1. Initial Setup

```bash
npm install
```

### 2. Configure Wrangler

Edit `wrangler.toml` and update:

```toml
[[kv_namespaces]]
binding = "GUESTBOOK_LOGS"
id = "YOUR_KV_NAMESPACE_ID"  # Create KV namespace: wrangler kv:namespace create "GUESTBOOK_LOGS"

[[kv_namespaces]]
binding = "RATE_LIMITER"
id = "YOUR_RATE_LIMITER_KV_ID"  # Create KV namespace: wrangler kv:namespace create "RATE_LIMITER"
```

### 3. Add xok.png

Place your `xok.png` image in the `assets/` directory for the `/xok` easter egg.

### 4. Build & Deploy Locally

```bash
# Build the worker
npm run build

# Test locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

### 5. GitHub Actions Setup

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token (with Workers edit permissions)
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

After setting up, any push to `main` branch will auto-deploy.

## Customization

### Portfolio

Add your portfolio projects by creating markdown files in `portfolio/`:

```markdown
# Project Name

**Status:** Live/In Development/Completed
**Date:** 2025-Q1
**Tech Stack:** JavaScript, React, etc.

## Overview

Your project description here.

## Key Features

- Feature 1
- Feature 2
```

Update `portfolio/portfolio.json` to set the order:

```json
{
  "order": [
    "project-1.md",
    "project-2.md"
  ]
}
```

### Subdomain Configuration

Edit `config/subdomains-exclude.json`:

```json
{
  "exclude": ["mail", "www", "admin"],
  "manualSubdomains": [
    {
      "name": "subdomain.devious.work",
      "description": "Description here"
    }
  ]
}
```

### Theme Customization

Users can customize themes via the theme button in the nav. Preset themes:
- Default (green on black)
- Amber (orange/amber aesthetic)
- Vaporwave (pink/cyan)
- Nuclear (yellow/green)
- Matrix (classic green)
- Cyberpunk (magenta/cyan)

## Easter Eggs

The site contains several hidden features. Here are the hints:

### 1. The XOK Image
- **Hint**: Look in the footer for a mysterious `?` link
- **Location**: `/xok`
- **Discovery**: Click the secret link or type "devious" anywhere on the site

### 2. Type "devious"
- **Hint**: Try typing the site name when browsing
- **Effect**: Screen flash effect + hint to the vault

### 3. The Vault
- **Hint**: Check the mystery project card - look for the partially hidden text `/v█████`
- **Location**: `/vault`
- **Description**: A genuinely creepy late 90s/early 2000s horror experience
- **Warning**: It's intentionally unsettling. Features glitchy effects, cryptic messages, fake camera feeds, and atmospheric horror vibes.

### 4. Hidden Terminal (Future)
- Currently mentioned in the main site but not yet implemented
- Will be accessible via special command or key combination

## Development

### Build System

The build system (`build.js`) compiles everything into a single `worker.js`:

1. Reads all source templates, styles, and scripts
2. Parses markdown portfolio files
3. Base64-encodes assets (like images)
4. Injects everything into the worker template
5. Outputs `worker.js`

### Adding New Pages

1. Create HTML template in `src/templates/`
2. Create CSS in `src/styles/`
3. Create JS in `src/scripts/`
4. Add route in `build.js` worker template
5. Run `npm run build`

### Local Development

```bash
# Build and run with hot reload
npm run dev
```

Visit `http://localhost:8787` to test locally.

## API Routes

- `GET /api/messages` - Fetch guestbook entries
- `POST /api/messages` - Submit guestbook entry (rate limited)
- `GET /api/subdomains` - Get list of subdomains

## Rate Limiting

Guestbook posts are rate-limited to 1 post per 60 seconds per IP address using Cloudflare KV.

## Security

- All user input is sanitized before rendering
- Rate limiting prevents spam
- No authentication required for viewing (guestbook is public)
- XSS protection via proper escaping

## Future Enhancements

- [ ] Cloudflare API integration for automatic subdomain discovery
- [ ] Search functionality across site content
- [ ] Terminal easter egg with interactive commands
- [ ] Analytics dashboard
- [ ] RSS feed for portfolio updates
- [ ] Dark/light mode toggle (in addition to themes)

## Troubleshooting

### Build fails
- Ensure all files in `src/` exist
- Check for syntax errors in templates
- Run `npm install` to ensure dependencies are installed

### Deploy fails
- Verify Cloudflare API token has correct permissions
- Check KV namespace IDs in `wrangler.toml`
- Ensure account ID is correct

### Assets not loading
- Images must be in `assets/` directory
- Build system will base64-encode them automatically
- Check browser console for errors

## License

Personal project - all rights reserved.

## Credits

Built with:
- Cloudflare Workers
- JetBrains Mono & Space Mono fonts
- Marked.js for markdown parsing
- Pure JavaScript (no frameworks)

---

devious.work © 2025

