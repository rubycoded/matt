# Playwright Testing Setup

This project includes Playwright testing for validating social sharing meta tags on the Astro site.

## What's Tested

The test suite validates:

### Home Page Social Sharing
- OG meta tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image, twitter:site, twitter:creator)
- Canonical URLs
- Absolute image URLs
- Proper Twitter handle (@themattchung)

### Blog Post Social Sharing
- Article-specific OG meta tags (og:type="article")
- Article meta tags (article:author, article:section, article:published_time, article:modified_time)
- Post-specific titles and descriptions
- Proper canonical URLs for individual posts
- Featured image validation

### General SEO Validation
- Proper page titles
- Meta descriptions
- Charset and viewport settings
- URL formats (absolute vs relative)

## Test Files

- `tests/social-sharing-simple.spec.ts` - Core validation tests for home page and blog posts
- `tests/utils/meta-tag-utils.ts` - Utility class for common meta tag operations

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with browser UI
npm run test:headed

# Run tests with debugging
npm run test:debug

# Run tests with Playwright Test UI
npm run test:ui

# View test report
npm run test:report

# Run specific test file
npx playwright test tests/social-sharing-simple.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The Playwright configuration (`playwright.config.ts`) is set up to:

- Start the Astro development server automatically before testing
- Test against Chromium, Firefox, and WebKit browsers
- Generate HTML reports
- Use proper timeouts and retry logic for CI/CD
- Run tests in parallel for faster execution

## Adding New Tests

When adding new blog posts or pages, you can extend the tests by:

1. Adding new test cases in the existing test files
2. Using the `MetaTagUtils` class for common operations
3. Following the pattern of testing both OG and Twitter Card meta tags

Example of adding a new blog post test:

```typescript
test('new-blog-post should have valid meta tags', async ({ page }) => {
  await page.goto('/new-blog-post');
  const meta = new MetaTagUtils(page);

  const ogTags = await meta.getOpenGraphTags();
  expect(ogTags.title).toBe('New Blog Post');
  expect(ogTags.type).toBe('article');
  
  // ... more validations
});
```

## Best Practices

1. **Test Absolute URLs**: Always verify that image and page URLs are absolute
2. **Validate Twitter Handle**: Ensure @themattchung is consistently used
3. **Check Image Names**: Verify the correct og-* images are used for different page types
4. **Article vs Website**: Blog posts should have `og:type="article"`, home page should have `og:type="website"`
5. **ISO 8601 Dates**: Date meta tags should be in ISO 8601 format

## Continuous Integration

The tests are designed to work in CI/CD environments with:
- Headless browser execution
- Automatic retries for flaky tests
- HTML report generation for debugging
- Proper timeout handling