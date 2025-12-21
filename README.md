# Matt's Blog - mattchung.com

A personal blog built with Astro, TailwindCSS, and TinaCMS.

## Overview

This is a static site blog powered by Astro with content management through TinaCMS. The site is deployed to GitHub Pages and includes a digital garden section for long-form essays and ideas.

## Tech Stack

 - **Astro 5.16.6** - Static site generator
 - **TailwindCSS 4.1.18** - Utility-first CSS framework
 - **TinaCMS 3.1.2** - Headless CMS for content management
- **Playwright** - End-to-end testing framework
- **pnpm** - Package manager

## Project Structure

```
/
├── src/
│   ├── content/          # Content files (Markdown)
│   │   ├── blog/         # Blog posts
│   │   ├── now.md        # Now page
│   │   └── people.md     # People page
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   │   ├── index.astro   # Home page
│   │   ├── blog.astro    # Blog listing
│   │   ├── garden.astro  # Digital garden
│   │   └── [...]
│   └── components/       # Reusable components
├── public/               # Static assets
├── tina/                 # TinaCMS configuration
├── .github/workflows/    # CI/CD workflows
└── package.json
```

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start dev server with TinaCMS
pnpm dev

# Server runs at http://localhost:4321
# TinaCMS admin at http://localhost:4321/admin
```

### Build & Deploy

```bash
# Build for production
pnpm build

# Preview build locally
pnpm preview
```

## Commands Reference

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server with TinaCMS at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `npm test` | Run Playwright tests for social sharing validation |
| `pnpm astro ...` | Run Astro CLI commands |

## Deployment & CI/CD

### GitHub Pages Deployment

This project uses GitHub Actions for deployment to GitHub Pages.

**Workflow File:** `.github/workflows/deploy.yml`

**Trigger Configuration:**
- **Type:** Manual only (`workflow_dispatch`)
- **Branch:** `master` (default branch)
- **No automatic deployments on push** - Full control over when the site goes live

### Manual Deployment

Deploy the site from the command line:

```bash
# Trigger workflow from command line
gh workflow run deploy.yml --ref master

# Check workflow status
gh run list --limit 5

# View detailed workflow output
gh run view <RUN_ID>
```

Or from GitHub UI:
1. Go to **Actions** tab in the repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow** button

**Deployment Process:**
1. Checks out the repository
2. Installs dependencies (auto-detects pnpm)
3. Builds the Astro site
4. Deploys to GitHub Pages

**Live Site:** https://themattchung.com

## Content Management

### Using TinaCMS

TinaCMS is integrated for easy content editing:

1. Start dev server: `pnpm dev`
2. Visit CMS admin: `http://localhost:4321/admin`
3. Edit content through the UI
4. Changes save to Markdown files in `src/content/`

### Manual Editing

All content is stored in Markdown files in `src/content/`:
- Blog posts: `src/content/blog/` (e.g., `2025-01-31-joining-dataswyft.md`)
- Pages: `src/content/now.md`, `src/content/people.md`

## Important Notes

- The repository uses `master` as the default branch (not `main`)
- GitHub Actions workflow is configured for **manual deployments only**
- All dependencies are pinned in `pnpm-lock.yaml`
- TinaCMS generates additional files (kept in `.gitignore`)

## Dark Mode

This blog features a user-controlled dark mode toggle with session-based persistence.

### Features
- **Toggle Button** - Sun/moon icon in header (mobile and desktop)
- **Session Persistence** - Theme choice persists during browsing session
- **System Preference** - Respects OS dark/light mode preference
- **Privacy Compliant** - Uses sessionStorage only (GDPR compliant, no cookies)
- **Cross-Tab Sync** - Theme syncs across tabs in same browsing session
- **Keyboard Accessible** - Fully keyboard navigable (Enter/Space to toggle)
- **WCAG Compliant** - Touch targets meet accessibility standards (44x44px)

### How It Works
1. **Initial Load**: Detects OS preference (light/dark mode)
2. **Manual Toggle**: User can override with toggle button
3. **Session Storage**: Choice saved for current browsing session
4. **New Session**: Resets to OS preference when browser reopens
5. **Privacy**: No persistent storage (localStorage/cookies) used

### Technical Details
- Session storage key: `matt-theme`
- Priority: sessionStorage → system preference → light (default)
- FOUC prevention with inline script in `<head>`
- Tailwind CSS class-based dark mode (`dark:` prefix)
- OKLCH color space for perceptually uniform colors

### Testing
- 24 Playwright tests (all passing)
- Cross-browser: Chromium, Firefox, WebKit
- Keyboard navigation validated
- ARIA labels tested

## Social Sharing

This blog implements comprehensive social sharing meta tags for rich previews on all platforms:

### Supported Platforms
- **Facebook/LinkedIn** - Open Graph protocol
- **Twitter/X** - Twitter Cards
- **Slack/Discord** - OG tags
- **LinkedIn** - Article structured data

### Features
- Rich previews with images, titles, and descriptions
- Featured image integration with TinaCMS
- Fallback images for posts without featured images
- Twitter handle integration (@themattchung)
- Article-specific meta tags (publish dates, author, sections)
- Absolute URL generation for cross-platform compatibility

### Content Authors
1. Upload featured images in TinaCMS admin
2. Add descriptive alt text for accessibility
3. Meta tags are automatically generated
4. Social media platforms will show rich previews

### Validation Tools
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TinaCMS Documentation](https://tina.io/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
