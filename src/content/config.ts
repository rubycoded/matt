import { defineCollection, z } from 'astro:content';

// Define the schema for blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    modified: z.date().optional(),
    slug: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    excerpt: z.string().optional(),
    image: z.string().optional(),
  }),
});

// Export the collections
export const collections = {
  'blog': blogCollection,
}; 