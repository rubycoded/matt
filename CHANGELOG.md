# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Dark mode toggle implementation (2024-12-21)
  - User-controlled theme toggle button in header (mobile and desktop)
  - Session-based theme persistence using sessionStorage (GDPR compliant)
  - System preference detection and respect (prefers-color-scheme)
  - Cross-tab theme synchronization
  - Keyboard accessible toggle (Enter/Space keys)
  - Dynamic ARIA labels for screen readers
  - FOUC (Flash of Unstyled Content) prevention
  - Touch target size meets WCAG 2.1 AA standards (44x44px)
  - Comprehensive Playwright test suite (24 tests, all passing)
  - Responsive toggle placement (mobile + desktop variants)
  - **Note**: Toggle verified working in automated tests; production deployment for live validation

### Security
- Fixed 10 dependency vulnerabilities (2024-12-21)
  - Applied comprehensive pnpm overrides to address critical, high, moderate, and low severity issues
  - Updated jsonpath-plus to fix Remote Code Execution (CVE-2024-21534, CVE-2025-1302)
  - Updated dompurify to fix XSS bypasses (CVE-2024-45801, CVE-2025-26791)
  - Updated mermaid to address bundled DOMPurify vulnerabilities
  - Updated esbuild to fix CORS bypass in development server
  - Updated vite to fix file serving security issues
  - Updated devalue to fix prototype pollution (CVE-2025-57820)
  - All vulnerabilities now resolved according to `pnpm audit`

### Added
- Social sharing meta tags implementation (2024-12-21)
  - Added Open Graph (OG) protocol support for rich Facebook/LinkedIn previews
  - Added Twitter Card support for rich Twitter/X previews
  - Created SEO.astro component with complete meta tag generation
  - Added centralized SEO configuration in seo.config.ts
  - Generated default OG images (og-default.jpg, og-home.jpg, og-blog.jpg)
  - Comprehensive Playwright testing suite for social sharing validation
  - Support for article-specific meta tags (published_time, author, section)
  - Absolute URL generation for images and canonical links
  - Fallback logic for missing featured images
- TinaCMS featured image support with alt text and caption fields (2024-12-20)
  - Added `featuredImage` field (image path) to blog post schema
  - Added `featuredImageAlt` field for accessibility and SEO
  - Added `featuredImageCaption` field for optional image captions
  - TinaCMS admin interface now shows image previews in media library
  - Flat field structure maintains image preview functionality in TinaCMS

### Changed
- Restructured featured image implementation from nested object to flat fields (2024-12-20)
  - Changed from `featuredImage: { src, alt, caption }` to separate fields
  - This ensures TinaCMS image preview functionality works correctly

### Technical Details
- Updated `tina/config.ts` with flat featured image fields
- Updated `src/content/config.ts` Astro content schema to match
- Blog listing page and post templates remain unchanged (no featured image display)
- All existing blog posts remain compatible (fields are optional)
