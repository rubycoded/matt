# Matt's Blog - mattchung.com

A personal blog built with Astro, TailwindCSS, and TinaCMS.

## Overview

This is a static site blog powered by Astro with content management through TinaCMS. The site is deployed to GitHub Pages and includes a digital garden section for long-form essays and ideas.

## Tech Stack

- **Astro 5.9.0** - Static site generator
- **TailwindCSS 4.1.6** - Utility-first CSS framework
- **TinaCMS 2.7.8** - Headless CMS for content management
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

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TinaCMS Documentation](https://tina.io/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
