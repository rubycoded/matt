import { test, expect } from '@playwright/test';

test.describe('Blog Post Meta Tags', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific blog post
    await page.goto('/purpose-of-community');
  });

  test('should have correct OG meta tags for blog post', async ({ page }) => {
    // OG Title should contain the post title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Purpose of community');

    // OG Description should exist and not be empty
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription?.length).toBeGreaterThan(0);

    // OG Image should be absolute URL
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\/.+/); // Should be absolute URL

    // OG URL should be absolute
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\/.+/);
    expect(ogUrl).toContain('/purpose-of-community'); // Should contain the slug

    // OG Type should be article
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('article');
  });

  test('should have correct Twitter Card meta tags for blog post', async ({ page }) => {
    // Twitter Card type
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    // Twitter Title should contain the post title
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toContain('Purpose of community');

    // Twitter Description should exist and not be empty
    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    expect(twitterDescription).toBeTruthy();
    expect(twitterDescription?.length).toBeGreaterThan(0);

    // Twitter Image should be absolute URL
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toMatch(/^https?:\/\/.+/); // Should be absolute URL

    // Twitter Handle
    const twitterSite = await page.locator('meta[name="twitter:site"]').getAttribute('content');
    expect(twitterSite).toBe('@themattchung');

    // Twitter Creator
    const twitterCreator = await page.locator('meta[name="twitter:creator"]').getAttribute('content');
    expect(twitterCreator).toBe('@themattchung');
  });

  test('should have correct canonical URL for blog post', async ({ page }) => {
    const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalUrl).toMatch(/^https?:\/\/.+/); // Should be absolute URL
    expect(canonicalUrl).toContain('/purpose-of-community'); // Should contain the slug
  });

  test('should have article-specific meta tags', async ({ page }) => {
    // Published time
    const publishedTime = await page.locator('meta[property="article:published_time"]').getAttribute('content');
    expect(publishedTime).toBeTruthy();
    expect(publishedTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/); // ISO 8601 format

    // Modified time (optional, should be present if available)
    const modifiedTime = await page.locator('meta[property="article:modified_time"]').getAttribute('content');
    if (modifiedTime) {
      expect(modifiedTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/); // ISO 8601 format
    }

    // Author
    const author = await page.locator('meta[property="article:author"]').getAttribute('content');
    expect(author).toBe('Matt Chung');
  });

  test('should have correct page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Purpose of community');
    // Note: Current implementation only shows post title, not site name
  });
});