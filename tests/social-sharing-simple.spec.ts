import { test, expect } from '@playwright/test';

test.describe('Social Sharing Meta Tags - Simple Validation', () => {
  test('home page should have all required social meta tags', async ({ page }) => {
    await page.goto('/');

    // Test basic meta tags
    const title = await page.title();
    expect(title).toBe('Matt Chung - Personal Blog');

    // Test OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBe('Matt Chung - Personal Blog');

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription?.length).toBeGreaterThan(0);

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https?:\/\/.+/);
    expect(ogImage).toContain('og-home.jpg');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\/.+/);

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    // Test Twitter Card tags
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toBe('Matt Chung - Personal Blog');

    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    expect(twitterDescription).toBeTruthy();
    expect(twitterDescription?.length).toBeGreaterThan(0);

    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toMatch(/^https?:\/\/.+/);

    const twitterSite = await page.locator('meta[name="twitter:site"]').getAttribute('content');
    expect(twitterSite).toBe('@themattchung');

    const twitterCreator = await page.locator('meta[name="twitter:creator"]').getAttribute('content');
    expect(twitterCreator).toBe('@themattchung');

    // Test canonical URL
    const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalUrl).toMatch(/^https?:\/\/.+/);
  });

  test('blog post should have article-specific meta tags', async ({ page }) => {
    await page.goto('/purpose-of-community');

    // Test OG tags for article
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('article');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBe('Purpose of community');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toMatch(/^https?:\/\/.+/);
    expect(ogUrl).toContain('/purpose-of-community');

    // Test Twitter Card tags
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toBe('Purpose of community');

    // Test article-specific tags
    const articleAuthor = await page.locator('meta[property="article:author"]').getAttribute('content');
    expect(articleAuthor).toBe('Matt Chung');

    const articleSection = await page.locator('meta[property="article:section"]').getAttribute('content');
    expect(articleSection).toBeTruthy();

    // Test canonical URL
    const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalUrl).toMatch(/^https?:\/\/.+/);
    expect(canonicalUrl).toContain('/purpose-of-community');

    // Test page title
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Purpose of community');
  });
});