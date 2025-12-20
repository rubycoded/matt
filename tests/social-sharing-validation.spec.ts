import { test, expect } from '@playwright/test';
import { MetaTagUtils } from './utils/meta-tag-utils';

test.describe('Social Sharing Meta Tags Validation', () => {
  const blogPosts = [
    '/purpose-of-community',
    '/on-profits',
    '/on-being-wrong',
    '/disagree-and-commit'
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('home page should have complete social sharing setup', async ({ page }) => {
    const meta = new MetaTagUtils(page);

    // Test Open Graph tags
    const ogTags = await meta.getOpenGraphTags();
    expect(ogTags.title).toBe('Matt Chung - Personal Blog');
    expect(ogTags.description).toBe('Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.');
    expect(ogTags.type).toBe('website');
    
    await expect(meta.verifyAbsoluteUrl(ogTags.image)).toBeTruthy();
    await expect(meta.verifyAbsoluteUrl(ogTags.url)).toBeTruthy();
    expect(ogTags.image).toContain('og-home.jpg');

    // Test Twitter Card tags
    const twitterTags = await meta.getTwitterCardTags();
    expect(twitterTags.card).toBe('summary_large_image');
    expect(twitterTags.site).toBe('@themattchung');
    expect(twitterTags.creator).toBe('@themattchung');
    expect(twitterTags.title).toBe('Matt Chung - Personal Blog');
    
    await expect(meta.verifyAbsoluteUrl(twitterTags.image)).toBeTruthy();

    // Test basic SEO
    const seoTags = await meta.getBasicSeoTags();
    expect(seoTags.title).toBe('Matt Chung - Personal Blog');
    expect(seoTags.description).toBe('Personal blog about technology, community, and life. Writing about WordPress, web development, and entrepreneurship.');
    expect(seoTags.charset).toBe('UTF-8');
    expect(seoTags.viewport).toBe('width=device-width');
    
    await expect(meta.verifyAbsoluteUrl(seoTags.canonical)).toBeTruthy();
  });

  test('blog posts should have proper article meta tags', async ({ page }) => {
    // Test the first blog post as a representative sample
    await page.goto('/purpose-of-community');
    const meta = new MetaTagUtils(page);

    // Test Open Graph tags for article
    const ogTags = await meta.getOpenGraphTags();
    expect(ogTags.type).toBe('article');
    expect(ogTags.title).toContain('Purpose of community');
    expect(ogTags.title).toContain('Matt Chung');
    
    await expect(meta.verifyAbsoluteUrl(ogTags.image)).toBeTruthy();
    await expect(meta.verifyAbsoluteUrl(ogTags.url)).toBeTruthy();
    expect(ogTags.url).toContain('/purpose-of-community');

    // Test Twitter Card tags
    const twitterTags = await meta.getTwitterCardTags();
    expect(twitterTags.card).toBe('summary_large_image');
    expect(twitterTags.site).toBe('@themattchung');
    expect(twitterTags.creator).toBe('@themattchung');
    expect(twitterTags.title).toContain('Purpose of community');
    
    await expect(meta.verifyAbsoluteUrl(twitterTags.image)).toBeTruthy();

    // Test article-specific tags
    const articleTags = await meta.getArticleTags();
    expect(articleTags.author).toBe('Matt Chung');
    await expect(meta.verifyIso8601Date(articleTags.publishedTime)).toBeTruthy();
    
    await expect(meta.verifyAbsoluteUrl(await meta.getLinkAttribute('canonical', 'href'))).toBeTruthy();
  });

  blogPosts.forEach((slug) => {
    test(`${slug} should have valid meta tags`, async ({ page }) => {
      await page.goto(slug);
      const meta = new MetaTagUtils(page);

      // Verify all essential meta tags are present
      const ogTags = await meta.getOpenGraphTags();
      const twitterTags = await meta.getTwitterCardTags();
      const articleTags = await meta.getArticleTags();
      const seoTags = await meta.getBasicSeoTags();

      // Open Graph validation
      expect(ogTags.title).toBeTruthy();
      expect(ogTags.description).toBeTruthy();
      expect(ogTags.type).toBe('article');
      await expect(meta.verifyAbsoluteUrl(ogTags.image)).toBeTruthy();
      await expect(meta.verifyAbsoluteUrl(ogTags.url)).toBeTruthy();
      expect(ogTags.url).toContain(slug);

      // Twitter Card validation
      expect(twitterTags.card).toBe('summary_large_image');
      expect(twitterTags.site).toBe('@themattchung');
      expect(twitterTags.creator).toBe('@themattchung');
      expect(twitterTags.title).toBeTruthy();
      expect(twitterTags.description).toBeTruthy();
      await expect(meta.verifyAbsoluteUrl(twitterTags.image)).toBeTruthy();

      // Article validation
      expect(articleTags.author).toBe('Matt Chung');
      await expect(meta.verifyIso8601Date(articleTags.publishedTime)).toBeTruthy();

      // Basic SEO validation
      expect(seoTags.title).toBeTruthy();
      expect(seoTags.description).toBeTruthy();
      expect(seoTags.charset).toBe('UTF-8');
      await expect(meta.verifyAbsoluteUrl(seoTags.canonical)).toBeTruthy();
    });
  });
});