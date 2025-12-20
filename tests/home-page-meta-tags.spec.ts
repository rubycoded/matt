import { test, expect } from '@playwright/test';

test.describe('Home Page Meta Tags', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct OG meta tags', async ({ page }) => {
    // OG Title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBe('Matt Chung - Personal Blog');

    // OG Description
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBe('Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.');

    // OG Image should be absolute URL
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\/.+/); // Should be absolute URL
    expect(ogImage).toContain('og-home.jpg'); // Should contain the home image

    // OG URL should be absolute
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\/.+/);

    // OG Type
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');
  });

  test('should have correct Twitter Card meta tags', async ({ page }) => {
    // Twitter Card type
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    // Twitter Title
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toBe('Matt Chung - Personal Blog');

    // Twitter Description
    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    expect(twitterDescription).toBe('Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.');

    // Twitter Image
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toMatch(/^https?:\/\/.+/); // Should be absolute URL
    expect(twitterImage).toContain('og-home.jpg'); // Should contain the home image

    // Twitter Handle
    const twitterSite = await page.locator('meta[name="twitter:site"]').getAttribute('content');
    expect(twitterSite).toBe('@themattchung');

    // Twitter Creator
    const twitterCreator = await page.locator('meta[name="twitter:creator"]').getAttribute('content');
    expect(twitterCreator).toBe('@themattchung');
  });

  test('should have correct canonical URL', async ({ page }) => {
    const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalUrl).toMatch(/^https?:\/\/.+\/$/); // Should be absolute URL ending with /
  });

  test('should have basic SEO meta tags', async ({ page }) => {
    // Page title
    const title = await page.title();
    expect(title).toBe('Matt Chung - Personal Blog');

    // Description meta tag
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBe('Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.');

    // Charset
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset).toBe('UTF-8');

    // Viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBe('width=device-width');
  });
});