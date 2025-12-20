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
  twitterHandle: '@themattchung',
  facebookAppId: '', // Optional, can be added later

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

// Helper function to get absolute URL for images and pages
export function getAbsoluteUrl(path: string, baseUrl: string = seoConfig.siteUrl): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return new URL(path, baseUrl).href;
}

// Helper function to get absolute image URL with fallback
export function getAbsoluteImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return getAbsoluteUrl(seoConfig.defaultImage);
  }
  return getAbsoluteUrl(imagePath);
}

// Helper function to truncate text for meta descriptions
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}