import { Page } from '@playwright/test';

export class MetaTagUtils {
  constructor(private page: Page) {}

  async getMetaContent(propertyOrName: string): Promise<string | null> {
    // Try property attribute first (for OG tags)
    const propertyMeta = await this.page.locator(`meta[property="${propertyOrName}"]`).getAttribute('content');
    if (propertyMeta) return propertyMeta;

    // Try name attribute (for Twitter tags and basic meta tags)
    const nameMeta = await this.page.locator(`meta[name="${propertyOrName}"]`).getAttribute('content');
    return nameMeta;
  }

  async getLinkAttribute(rel: string, attribute: string): Promise<string | null> {
    return await this.page.locator(`link[rel="${rel}"]`).getAttribute(attribute);
  }

  async verifyAbsoluteUrl(url: string | null): Promise<boolean> {
    if (!url) return false;
    return /^https?:\/\/.+/.test(url);
  }

  async verifyIso8601Date(dateString: string | null): Promise<boolean> {
    if (!dateString) return false;
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString);
  }

  async getOpenGraphTags() {
    return {
      title: await this.getMetaContent('og:title'),
      description: await this.getMetaContent('og:description'),
      image: await this.getMetaContent('og:image'),
      url: await this.getMetaContent('og:url'),
      type: await this.getMetaContent('og:type'),
    };
  }

  async getTwitterCardTags() {
    return {
      card: await this.getMetaContent('twitter:card'),
      title: await this.getMetaContent('twitter:title'),
      description: await this.getMetaContent('twitter:description'),
      image: await this.getMetaContent('twitter:image'),
      site: await this.getMetaContent('twitter:site'),
      creator: await this.getMetaContent('twitter:creator'),
    };
  }

  async getArticleTags() {
    return {
      publishedTime: await this.getMetaContent('article:published_time'),
      modifiedTime: await this.getMetaContent('article:modified_time'),
      author: await this.getMetaContent('article:author'),
    };
  }

  async getBasicSeoTags() {
    return {
      title: await this.page.title(),
      description: await this.getMetaContent('description'),
      canonical: await this.getLinkAttribute('canonical', 'href'),
      charset: await this.page.locator('meta[charset]').getAttribute('charset'),
      viewport: await this.getMetaContent('viewport'),
    };
  }
}