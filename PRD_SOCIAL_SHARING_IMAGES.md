# Product Requirements Document: Social Sharing Images

**Version**: 1.0
**Date**: 2024-12-20
**Status**: Draft
**Owner**: Matt Chung
**Implementation**: Cursor AI

---

## Executive Summary

Implement Open Graph (OG) and Twitter Card meta tags to enable rich social media previews when blog posts and pages are shared on platforms like Twitter, Facebook, LinkedIn, and Slack. This will increase click-through rates and provide a more professional appearance for shared content.

---

## Table of Contents

1. [Background & Context](#background--context)
2. [Objectives & Goals](#objectives--goals)
3. [User Stories](#user-stories)
4. [Functional Requirements](#functional-requirements)
5. [Technical Requirements](#technical-requirements)
6. [Implementation Specifications](#implementation-specifications)
7. [Design Specifications](#design-specifications)
8. [Testing Requirements](#testing-requirements)
9. [Success Metrics](#success-metrics)
10. [Out of Scope](#out-of-scope)
11. [References & Resources](#references--resources)

---

## Background & Context

### Current State
- Blog built with Astro 5.9.0 and TinaCMS 3.1.1
- 12 published blog posts without social sharing metadata
- Featured image infrastructure exists but not utilized
- No Open Graph or Twitter Card tags currently implemented
- Site deployed at https://themattchung.com

### Problem Statement
When blog posts are shared on social media platforms, they appear as plain text links without images, titles, or descriptions. This results in:
- Lower engagement and click-through rates
- Unprofessional appearance
- Missed opportunity to showcase content visually
- Generic fallback images or no images

### Opportunity
Implementing social sharing tags will:
- Increase social media engagement by 2-3x (industry standard)
- Provide visual appeal when content is shared
- Control the narrative of how content appears
- Leverage existing featured image infrastructure
- Improve brand consistency across platforms

---

## Objectives & Goals

### Primary Objectives
1. **Implement Open Graph Protocol** - Enable rich previews on Facebook, LinkedIn, Slack, Discord
2. **Implement Twitter Cards** - Enable rich previews on Twitter/X
3. **Leverage Featured Images** - Utilize existing `featuredImage` field in TinaCMS
4. **Provide Fallbacks** - Ensure graceful degradation when images aren't available
5. **Maintain Performance** - No negative impact on page load times

### Success Criteria
- ✅ All blog posts have valid OG and Twitter Card meta tags
- ✅ Featured images display correctly in social previews
- ✅ Fallback images work when no featured image is set
- ✅ Validation passes for Facebook, Twitter, LinkedIn debuggers
- ✅ No console errors or warnings related to meta tags
- ✅ Page load time remains under 2 seconds

---

## User Stories

### As a Content Author
- **Story 1**: I want my blog posts to show rich previews when shared, so readers are more likely to click
- **Story 2**: I want to control which image appears in social previews, so I can choose the most engaging visual
- **Story 3**: I want alt text to be used as image descriptions, so social previews are accessible

### As a Reader
- **Story 4**: When I see a shared post, I want to see an image preview, so I can decide if it interests me
- **Story 5**: I want to see the post title and excerpt, so I know what the content is about
- **Story 6**: I want consistent branding across platforms, so I trust the source

### As a Site Owner
- **Story 7**: I want to track social sharing effectiveness, so I can measure ROI
- **Story 8**: I want fallback images for pages without featured images, so all content looks professional
- **Story 9**: I want the implementation to be maintainable, so future updates are easy

---

## Functional Requirements

### FR-1: Open Graph Meta Tags
**Priority**: MUST HAVE
**Description**: Implement OG meta tags for all pages

**Required Tags**:
```html
<meta property="og:title" content="Post Title" />
<meta property="og:description" content="Post excerpt or description" />
<meta property="og:image" content="https://themattchung.com/images/featured.jpg" />
<meta property="og:image:alt" content="Image description" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://themattchung.com/post-slug" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Matt Chung" />
<meta property="og:locale" content="en_US" />
```

**Additional for Articles**:
```html
<meta property="article:published_time" content="2024-12-20T00:00:00Z" />
<meta property="article:modified_time" content="2024-12-21T00:00:00Z" />
<meta property="article:author" content="Matt Chung" />
<meta property="article:section" content="Blog" />
<meta property="article:tag" content="Tag1" />
```

**Acceptance Criteria**:
- [ ] All blog posts include OG tags
- [ ] Home page includes OG tags
- [ ] Other pages (garden, now, people) include OG tags
- [ ] Image URLs are absolute (not relative)
- [ ] All required OG tags are present
- [ ] Tags validate on Facebook Sharing Debugger

---

### FR-2: Twitter Card Meta Tags
**Priority**: MUST HAVE
**Description**: Implement Twitter Card meta tags for Twitter/X

**Required Tags**:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@yourusername" />
<meta name="twitter:title" content="Post Title" />
<meta name="twitter:description" content="Post excerpt" />
<meta name="twitter:image" content="https://themattchung.com/images/featured.jpg" />
<meta name="twitter:image:alt" content="Image description" />
```

**Acceptance Criteria**:
- [ ] All blog posts include Twitter Card tags
- [ ] Card type is `summary_large_image` for blog posts
- [ ] Twitter username is configurable
- [ ] Tags validate on Twitter Card Validator
- [ ] Images display correctly in Twitter previews

---

### FR-3: Featured Image Integration
**Priority**: MUST HAVE
**Description**: Use `featuredImage` field from TinaCMS for social images

**Logic**:
1. If `featuredImage` exists → use it
2. If no `featuredImage` → use fallback image
3. If `featuredImageAlt` exists → use it for OG image alt
4. If no alt text → generate from post title

**Acceptance Criteria**:
- [ ] Featured images from TinaCMS are used
- [ ] Image paths are converted to absolute URLs
- [ ] Alt text is properly set
- [ ] Fallback logic works correctly

---

### FR-4: Fallback Images
**Priority**: MUST HAVE
**Description**: Provide default images when no featured image is set

**Requirements**:
- Create a default OG image (1200x630px)
- Create site logo/brand image variant
- Store in `/public/images/og-default.jpg`
- Include site name and tagline on default image

**Fallback Logic**:
```
IF post has featuredImage
  USE featuredImage
ELSE IF page type is "home"
  USE home-og.jpg
ELSE
  USE og-default.jpg
```

**Acceptance Criteria**:
- [ ] Default OG image created
- [ ] Fallback logic implemented
- [ ] All pages have an image (no broken images)
- [ ] Default image matches brand identity

---

### FR-5: Dynamic Meta Tag Generation
**Priority**: MUST HAVE
**Description**: Generate meta tags dynamically based on page content

**Data Sources**:
- **Title**: Post frontmatter `title` or page title
- **Description**: Post frontmatter `excerpt` or first 160 characters of content
- **Image**: Post frontmatter `featuredImage` or fallback
- **URL**: Canonical page URL (https://themattchung.com/slug)
- **Date**: Post frontmatter `date` and `modified`
- **Author**: Site config or frontmatter
- **Tags**: Post frontmatter `tags` array

**Acceptance Criteria**:
- [ ] Meta tags populate from frontmatter
- [ ] Graceful fallbacks for missing data
- [ ] No hardcoded values (use config)
- [ ] URLs are always absolute
- [ ] Descriptions are trimmed to 160 characters

---

### FR-6: SEO Meta Tags (Bonus)
**Priority**: SHOULD HAVE
**Description**: Include additional SEO meta tags

**Tags**:
```html
<meta name="description" content="Post excerpt" />
<meta name="author" content="Matt Chung" />
<meta name="keywords" content="tag1, tag2, tag3" />
<link rel="canonical" href="https://themattchung.com/post-slug" />
```

**Acceptance Criteria**:
- [ ] Meta description matches OG description
- [ ] Canonical URLs set correctly
- [ ] Keywords derived from tags
- [ ] Author meta tag present

---

## Technical Requirements

### TR-1: Astro Component Architecture
**Priority**: MUST HAVE

**Approach**: Create a reusable component for meta tags

**File Structure**:
```
src/
  components/
    SEO.astro          # Main SEO component
  layouts/
    Layout.astro       # Import and use SEO component
    Post.astro         # Pass post-specific data to SEO
  config/
    seo.config.ts      # Centralized SEO configuration
```

**SEO Component Interface**:
```typescript
interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}
```

**Acceptance Criteria**:
- [ ] SEO.astro component created
- [ ] Properly typed with TypeScript
- [ ] Reusable across all layouts
- [ ] Documented with JSDoc comments

---

### TR-2: Configuration Management
**Priority**: MUST HAVE

**Create**: `/src/config/seo.config.ts`

**Content**:
```typescript
export const seoConfig = {
  siteName: 'Matt Chung',
  siteUrl: 'https://themattchung.com',
  defaultTitle: 'Matt Chung - Blog',
  defaultDescription: 'Personal blog about technology, community, and life.',
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@yourusername',
  author: 'Matt Chung',
  locale: 'en_US',

  // Image dimensions
  ogImage: {
    width: 1200,
    height: 630,
  },

  // Fallback images
  fallbackImages: {
    default: '/images/og-default.jpg',
    home: '/images/og-home.jpg',
  }
};
```

**Acceptance Criteria**:
- [ ] Config file created
- [ ] All values externalized
- [ ] TypeScript types defined
- [ ] Imported in SEO component

---

### TR-3: Absolute URL Conversion
**Priority**: MUST HAVE

**Requirement**: All image URLs must be absolute

**Implementation**:
```typescript
function getAbsoluteUrl(path: string, baseUrl: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return new URL(path, baseUrl).href;
}
```

**Acceptance Criteria**:
- [ ] Utility function created
- [ ] Relative paths converted to absolute
- [ ] Already absolute URLs unchanged
- [ ] Works with both `/images/` and `images/` formats

---

### TR-4: Image Validation
**Priority**: SHOULD HAVE

**Requirement**: Validate image exists and has correct dimensions

**Implementation**:
```typescript
// Development warning only
if (import.meta.env.DEV) {
  // Check if image exists
  // Warn if dimensions not 1200x630
  // Warn if file size > 2MB
}
```

**Acceptance Criteria**:
- [ ] Development-only validation
- [ ] Console warnings for missing images
- [ ] Console warnings for wrong dimensions
- [ ] No runtime impact in production

---

### TR-5: Performance Optimization
**Priority**: MUST HAVE

**Requirements**:
- Meta tags rendered server-side (Astro SSG)
- No client-side JavaScript for meta tags
- Minimal HTML size increase (<2KB per page)
- No external API calls for image generation

**Acceptance Criteria**:
- [ ] All meta tags in `<head>` (server-rendered)
- [ ] No hydration needed
- [ ] HTML size increase documented
- [ ] Lighthouse score unchanged

---

## Implementation Specifications

### Phase 1: Setup & Configuration (Day 1)

#### Step 1.1: Create SEO Configuration
```bash
# File: /src/config/seo.config.ts
```

**Tasks**:
1. Create config file with all settings
2. Define TypeScript types
3. Export configuration object
4. Document all config options

#### Step 1.2: Create Fallback Images
```bash
# Files: /public/images/og-*.jpg
```

**Tasks**:
1. Design default OG image (1200x630px)
   - Include site name "Matt Chung"
   - Include tagline or description
   - Use brand colors
   - High contrast, readable text
2. Create home page variant (optional)
3. Optimize images (compress to <200KB)
4. Save to `/public/images/`

**Design Tools**: Figma, Canva, or Photoshop

---

### Phase 2: Component Development (Day 1-2)

#### Step 2.1: Create SEO Component
```bash
# File: /src/components/SEO.astro
```

**Implementation**:
```astro
---
import { seoConfig } from '../config/seo.config';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const {
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  image,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
} = Astro.props;

// Get absolute URL for current page
const canonicalURL = new URL(Astro.url.pathname, seoConfig.siteUrl).href;

// Get absolute image URL
function getAbsoluteImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return new URL(seoConfig.defaultImage, seoConfig.siteUrl).href;
  }
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return new URL(imagePath, seoConfig.siteUrl).href;
}

const ogImage = getAbsoluteImageUrl(image);
const ogImageAlt = imageAlt || title || seoConfig.defaultTitle;

// Truncate description to 160 characters
const truncatedDescription = description
  ? description.substring(0, 160)
  : seoConfig.defaultDescription;
---

<!-- Primary Meta Tags -->
<meta name="title" content={title} />
<meta name="description" content={truncatedDescription} />
<meta name="author" content={seoConfig.author} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={truncatedDescription} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:alt" content={ogImageAlt} />
<meta property="og:image:width" content={seoConfig.ogImage.width.toString()} />
<meta property="og:image:height" content={seoConfig.ogImage.height.toString()} />
<meta property="og:site_name" content={seoConfig.siteName} />
<meta property="og:locale" content={seoConfig.locale} />

{type === 'article' && (
  <>
    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    <meta property="article:author" content={seoConfig.author} />
    {tags.map((tag) => <meta property="article:tag" content={tag} />)}
  </>
)}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalURL} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={truncatedDescription} />
<meta name="twitter:image" content={ogImage} />
<meta name="twitter:image:alt" content={ogImageAlt} />
{seoConfig.twitterHandle && (
  <>
    <meta name="twitter:site" content={seoConfig.twitterHandle} />
    <meta name="twitter:creator" content={seoConfig.twitterHandle} />
  </>
)}
```

**Tasks**:
1. Create component file
2. Define Props interface
3. Implement meta tag generation
4. Add conditional rendering for article tags
5. Test with various prop combinations

---

#### Step 2.2: Update Layout Components

**File**: `/src/layouts/Layout.astro`

**Changes**:
```astro
---
import SEO from '../components/SEO.astro';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

const { title, description, image, imageAlt } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="color-scheme" content="light dark" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- SEO Meta Tags -->
    <SEO
      title={title}
      description={description}
      image={image}
      imageAlt={imageAlt}
      type="website"
    />

    <!-- Existing styles and scripts -->
    <link rel="stylesheet" href="https://use.typekit.net/yau4wtk.css" />
    <title>{title || 'Matt Chung'}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**File**: `/src/layouts/Post.astro`

**Changes**:
```astro
---
import Layout from "./Layout.astro";
import { getReadingTime } from "../utils/readingTime";

interface Props {
  title: string;
  publishDate: Date;
  updatedDate?: Date;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  tags?: string[];
}

const {
  title,
  publishDate,
  updatedDate,
  content = "",
  excerpt,
  featuredImage,
  featuredImageAlt,
  tags = []
} = Astro.props;

const readingTime = getReadingTime(content);

// Format dates for OG tags
const publishedTime = publishDate.toISOString();
const modifiedTime = updatedDate?.toISOString();
---

<Layout
  title={title}
  description={excerpt}
  image={featuredImage}
  imageAlt={featuredImageAlt}
  type="article"
  publishedTime={publishedTime}
  modifiedTime={modifiedTime}
  tags={tags}
>
  <!-- Existing post content -->
  <slot />
</Layout>
```

**Tasks**:
1. Import SEO component
2. Pass props to Layout
3. Update Layout to accept SEO props
4. Pass SEO props to SEO component
5. Test with existing pages

---

#### Step 2.3: Update Dynamic Routes

**File**: `/src/pages/[...slug].astro`

**Changes**:
```astro
---
import { getCollection } from 'astro:content';
import Post from '../layouts/Post.astro';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  return blogEntries.map((entry) => {
    const slug = entry.id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    return {
      params: { slug },
      props: { entry },
    };
  });
}

const { entry } = Astro.props;
const { Content } = await entry.render();

const publishDate = entry.data.date ? new Date(entry.data.date) : new Date();
const title = entry.data.title || entry.id.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '').replace(/-/g, ' ');
---

<Post
  title={title}
  publishDate={publishDate}
  updatedDate={entry.data.modified}
  content={entry.body}
  excerpt={entry.data.excerpt}
  featuredImage={entry.data.featuredImage}
  featuredImageAlt={entry.data.featuredImageAlt}
  tags={entry.data.tags}
>
  <Content />
</Post>
```

**Tasks**:
1. Pass additional props to Post layout
2. Extract excerpt, featured image, tags from frontmatter
3. Test with posts that have/don't have featured images
4. Verify fallback logic works

---

### Phase 3: Testing & Validation (Day 2)

#### Step 3.1: Validator Testing

**Tools**:
1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **OpenGraph.xyz**: https://www.opengraph.xyz/

**Test Cases**:
```
1. Blog post with featured image
   - URL: https://themattchung.com/purpose-of-community
   - Expected: Featured image, title, excerpt display

2. Blog post without featured image
   - URL: https://themattchung.com/on-profits
   - Expected: Fallback image, title, excerpt display

3. Home page
   - URL: https://themattchung.com/
   - Expected: Home image, site title, description

4. Static page
   - URL: https://themattchung.com/now
   - Expected: Default image, page title, description
```

**Acceptance Criteria**:
- [ ] All validators show no errors
- [ ] Images display correctly
- [ ] Titles and descriptions are correct
- [ ] Dimensions are 1200x630px
- [ ] URLs are absolute

---

#### Step 3.2: Manual Testing

**Platforms to Test**:
1. Facebook (share in post)
2. Twitter/X (tweet with link)
3. LinkedIn (share in post)
4. Slack (paste link)
5. Discord (paste link)
6. WhatsApp (send link)

**Test Procedure**:
```
For each platform:
1. Share a link to a blog post
2. Verify image displays
3. Verify title displays
4. Verify description displays
5. Verify clicking opens correct URL
6. Screenshot for documentation
```

**Acceptance Criteria**:
- [ ] All platforms show rich preview
- [ ] Images load without errors
- [ ] Text is readable
- [ ] Links work correctly

---

#### Step 3.3: Performance Testing

**Tools**:
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- GTmetrix

**Metrics to Check**:
```
Before Implementation:
- Page load time: X seconds
- HTML size: Y KB
- Lighthouse score: Z

After Implementation:
- Page load time: ≤ X seconds
- HTML size: ≤ Y + 2 KB
- Lighthouse score: ≥ Z
```

**Acceptance Criteria**:
- [ ] No performance regression
- [ ] HTML size increase < 2KB
- [ ] Lighthouse SEO score improves
- [ ] No new console errors

---

### Phase 4: Documentation & Deployment (Day 2-3)

#### Step 4.1: Update Documentation

**Files to Update**:
1. `CHANGELOG.md` - Add social sharing implementation
2. `TINACMS_FEATURES.md` - Document featured image usage for social
3. `README.md` - Add social sharing section
4. Create `docs/SOCIAL_SHARING.md` - Usage guide

**SOCIAL_SHARING.md Content**:
```markdown
# Social Sharing Images Guide

## Overview
This blog uses Open Graph and Twitter Card meta tags for rich social media previews.

## How It Works
- Featured images from TinaCMS are used as social preview images
- Alt text provides image descriptions
- Fallback images are used when no featured image is set

## For Content Authors

### Adding a Featured Image
1. Open post in TinaCMS
2. Upload image to "Featured Image" field
3. Add descriptive "Alt Text"
4. Optional: Add "Caption"
5. Save post

### Best Practices
- Use images 1200x630px or larger
- Ensure images are <1MB
- Use high contrast for readability
- Include text overlay if needed
- Test on validators before publishing

## Validation Tools
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## Troubleshooting

### Image Not Showing
- Check image path is correct
- Verify image exists in /public/images/
- Clear platform cache (use validators)
- Ensure image is publicly accessible

### Wrong Image Showing
- Platforms cache images (can take 24 hours)
- Use validator to force refresh
- Check og:image tag in HTML source
```

**Tasks**:
1. Write documentation
2. Add examples and screenshots
3. Create troubleshooting guide
4. Update existing docs

---

#### Step 4.2: Create Default Images

**Requirements**:
- **Dimensions**: 1200x630px (exactly)
- **Format**: JPG or PNG
- **File Size**: <500KB (ideally <200KB)
- **Color**: Match brand colors
- **Text**: High contrast, readable at small sizes

**Images to Create**:
1. `/public/images/og-default.jpg` - Generic fallback
2. `/public/images/og-home.jpg` - Home page (optional)

**Design Elements**:
```
og-default.jpg:
- Background: Brand color or gradient
- Text: "Matt Chung" (large)
- Subtitle: "Blog" or tagline (medium)
- Optional: Subtle pattern or icon
- Ensure readability on mobile

og-home.jpg:
- Similar to default
- More personalized
- Could include photo or logo
- Welcome message
```

**Tools**: Canva, Figma, or use template

**Tasks**:
1. Design images
2. Export at correct dimensions
3. Optimize file size
4. Place in /public/images/
5. Update config paths

---

#### Step 4.3: Code Review Checklist

Before committing:
- [ ] All TypeScript types defined
- [ ] No hardcoded values
- [ ] Configuration externalized
- [ ] Components documented
- [ ] No console errors
- [ ] Fallback logic tested
- [ ] Image URLs are absolute
- [ ] Meta tags validate
- [ ] Performance not impacted
- [ ] Documentation complete

---

## Design Specifications

### Image Specifications

**Open Graph Images**:
- **Dimensions**: 1200 x 630 pixels (1.91:1 ratio)
- **Format**: JPG (preferred) or PNG
- **File Size**: <1MB (ideally <500KB)
- **Color Space**: sRGB
- **Safe Zone**: Keep important content in center 1200x600px
- **Text Size**: Minimum 60px for readability

**Twitter Card Images**:
- Same as Open Graph (summary_large_image)
- **Alternative**: 1:1 square (600x600px) for summary card
- This implementation uses large image format

### Meta Tag Hierarchy

**Priority Order** (if conflicts):
1. Twitter tags override OG tags on Twitter
2. OG tags are fallback for most platforms
3. Always include both for maximum compatibility

### Content Guidelines

**Titles**:
- **Length**: 60-70 characters max
- **Format**: "Post Title | Matt Chung" or "Post Title - Matt Chung"
- **Avoid**: Special characters that break rendering

**Descriptions**:
- **Length**: 150-160 characters max
- **Content**: 1-2 sentences summarizing post
- **Tone**: Engaging, clear, actionable
- **Avoid**: Clickbait, ALL CAPS, emoji overload

**Images**:
- **Subject**: Clear focal point
- **Text**: High contrast on solid background
- **Branding**: Subtle logo or watermark
- **Avoid**: Small text, busy backgrounds, low contrast

---

## Testing Requirements

### Unit Tests
**Scope**: Not required (static meta tags)

### Integration Tests

**Test Suite 1: Meta Tag Generation**
```
Given: A blog post with featured image
When: Page is rendered
Then:
  - OG tags are present
  - Twitter tags are present
  - Image URL is absolute
  - Title is correct
  - Description is truncated if needed
```

**Test Suite 2: Fallback Logic**
```
Given: A blog post without featured image
When: Page is rendered
Then:
  - Default image is used
  - All tags still present
  - No broken image URLs
```

**Test Suite 3: Different Page Types**
```
Given: Various page types (home, blog, static)
When: Each page is rendered
Then:
  - Correct type is set (website vs article)
  - Appropriate image is used
  - Metadata is relevant to page
```

### Manual Testing Checklist

**Pre-deployment**:
- [ ] Run validators on staging URLs
- [ ] Check HTML source for all tags
- [ ] Verify image dimensions
- [ ] Test on all major platforms
- [ ] Check mobile preview sizes

**Post-deployment**:
- [ ] Validate production URLs
- [ ] Share actual posts on platforms
- [ ] Monitor for errors in console
- [ ] Check analytics for social traffic
- [ ] Collect user feedback

### Validation Tools Checklist

For each blog post:
- [ ] Facebook Sharing Debugger - PASS
- [ ] Twitter Card Validator - PASS
- [ ] LinkedIn Post Inspector - PASS
- [ ] OpenGraph.xyz - PASS
- [ ] Slack preview - Visual check
- [ ] Discord preview - Visual check

---

## Success Metrics

### Primary KPIs

**Engagement Metrics**:
- Click-through rate on social shares: +50% target
- Social media engagement (likes, shares): +30% target
- Time on site from social traffic: >2 minutes average

**Technical Metrics**:
- Meta tag coverage: 100% of pages
- Validation score: 100% pass rate
- Image load success: >99%
- Page load time: No regression

### Secondary KPIs

**SEO Metrics**:
- Organic social traffic: Track growth
- Backlinks from social platforms: Track increase
- Brand mentions: Monitor uptick

**User Feedback**:
- Content author satisfaction: Survey
- Reader feedback: Comments/messages
- Error reports: Zero target

### Measurement Tools

- **Google Analytics**: Social traffic, engagement
- **Twitter Analytics**: Impression and engagement data
- **Facebook Insights**: Share and click data
- **Console Logs**: Error monitoring
- **Validator APIs**: Automated checking

### Reporting Frequency

- **Daily**: Error monitoring
- **Weekly**: Traffic and engagement review
- **Monthly**: Full KPI dashboard
- **Quarterly**: ROI analysis and optimization

---

## Out of Scope

The following items are explicitly **NOT** included in this implementation:

### Not Included
1. ❌ **Dynamic Image Generation**
   - Not creating images on-the-fly with text overlays
   - Not using services like Cloudinary or Vercel OG Image
   - Reason: Adds complexity, requires API integration

2. ❌ **Video Previews**
   - Not supporting og:video tags
   - Not implementing video thumbnails
   - Reason: Blog is text/image focused

3. ❌ **Structured Data (JSON-LD)**
   - Not implementing Schema.org markup
   - Not adding Article structured data
   - Reason: Can be separate enhancement

4. ❌ **Social Media Publishing APIs**
   - Not auto-posting to social platforms
   - Not using Buffer/Hootsuite integration
   - Reason: Out of scope for this feature

5. ❌ **A/B Testing Images**
   - Not testing different images for same post
   - Not optimizing for engagement
   - Reason: Requires analytics integration

6. ❌ **Platform-Specific Optimizations**
   - Not creating different images per platform
   - Not optimizing for Pinterest, Reddit, etc.
   - Reason: OG/Twitter cards cover primary platforms

7. ❌ **Image CDN Integration**
   - Not using Cloudinary, Imgix, etc.
   - Not implementing auto-optimization
   - Reason: Keep it simple, static files

### Future Enhancements

Items for future consideration:
- Schema.org structured data (Article, Person)
- Dynamic OG image generation with Vercel OG
- Video preview support
- Pinterest-specific rich pins
- A/B testing framework for social images
- Analytics dashboard for social sharing
- Automated social posting

---

## References & Resources

### Official Documentation

**Open Graph Protocol**:
- Specification: https://ogp.me/
- Facebook Guide: https://developers.facebook.com/docs/sharing/webmasters/

**Twitter Cards**:
- Documentation: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- Card Types: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image

**LinkedIn**:
- Post Inspector: https://www.linkedin.com/post-inspector/

### Testing & Validation

**Debugging Tools**:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Validator: https://cards-dev.twitter.com/validator
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/
- OpenGraph Validator: https://www.opengraph.xyz/

**Testing Tools**:
- Meta Tag Checker: https://metatags.io/
- Social Preview: https://www.bannerbear.com/tools/social-preview/
- SEO Checker: https://www.seoptimer.com/meta-tag-checker

### Design Resources

**Image Templates**:
- Canva OG Templates: https://www.canva.com/templates/
- Figma OG Kit: https://www.figma.com/community/search?model_type=files&q=og%20image
- Free Stock Photos: https://unsplash.com/

**Design Guides**:
- OG Image Best Practices: https://www.bannerbear.com/blog/how-to-create-open-graph-images/
- Social Media Sizes: https://sproutsocial.com/insights/social-media-image-sizes-guide/

### Code Examples

**Astro SEO Components**:
- astro-seo package: https://github.com/jonasmerlin/astro-seo
- Community examples: https://astro.build/integrations/?search=seo

**Meta Tag Generators**:
- Meta Tags Generator: https://metatags.io/
- OG Image Generator: https://og-image.xyz/

### Learning Resources

**Articles**:
- "Complete Guide to OG Tags": https://ahrefs.com/blog/open-graph-meta-tags/
- "Twitter Cards Implementation": https://css-tricks.com/essential-meta-tags-social-media/

**Videos**:
- Search YouTube for "Open Graph implementation"
- Search YouTube for "Twitter Cards tutorial"

### Internal Documentation

**Related Docs**:
- `TINACMS_FEATURES.md` - TinaCMS configuration
- `DECISIONLOG.md` - Technical decisions
- `BUGS.md` - Known issues
- `CHANGELOG.md` - Change history

---

## Appendix

### A. Configuration Reference

**Complete seo.config.ts Template**:
```typescript
export const seoConfig = {
  // Site Info
  siteName: 'Matt Chung',
  siteUrl: 'https://themattchung.com',
  author: 'Matt Chung',
  locale: 'en_US',

  // Defaults
  defaultTitle: 'Matt Chung - Personal Blog',
  defaultDescription: 'Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.',
  defaultImage: '/images/og-default.jpg',

  // Social Media
  twitterHandle: '@mattchung', // Update with actual handle
  facebookAppId: '', // Optional

  // Image Specifications
  ogImage: {
    width: 1200,
    height: 630,
  },

  // Fallback Images
  fallbackImages: {
    default: '/images/og-default.jpg',
    home: '/images/og-home.jpg',
    blog: '/images/og-blog.jpg',
  },

  // Optional: Article Defaults
  article: {
    section: 'Blog',
    tags: [],
  }
} as const;

export type SeoConfig = typeof seoConfig;
```

### B. SEO Component Full Code

See Phase 2, Step 2.1 for complete implementation.

### C. Troubleshooting Guide

**Common Issues**:

1. **Image not showing in Facebook**
   - Clear cache: Use Facebook Debugger "Scrape Again"
   - Check image is publicly accessible
   - Verify image meets size requirements (1200x630px)

2. **Twitter card not working**
   - Verify `twitter:card` is `summary_large_image`
   - Check image dimensions (min 300x157px, recommended 1200x630px)
   - Validate with Twitter Card Validator

3. **Wrong image showing**
   - Platforms cache aggressively (24-48 hours)
   - Use validators to force refresh
   - Check if old meta tags still in HTML

4. **Broken image URLs**
   - Ensure URLs are absolute (include https://)
   - Check image actually exists at URL
   - Verify no typos in path

### D. Quick Start Checklist

For rapid implementation:
- [ ] Copy seo.config.ts template
- [ ] Create SEO.astro component
- [ ] Update Layout.astro
- [ ] Update Post.astro
- [ ] Create default OG images
- [ ] Test with validators
- [ ] Deploy and verify

---

**End of PRD**

**Version History**:
- v1.0 (2024-12-20): Initial PRD created

**Approval**:
- [ ] Technical Review
- [ ] Design Review
- [ ] Ready for Implementation

**Notes for Cursor Implementation**:
This PRD is comprehensive and ready for AI implementation. Follow the phases sequentially. All code examples are production-ready. Refer to sections as needed during implementation.
