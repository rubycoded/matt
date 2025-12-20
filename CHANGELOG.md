# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
