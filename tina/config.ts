import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.CF_PAGES_BRANCH || "master"

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        format: "md",
        defaultItem: () => ({
          date: new Date().toISOString(),
        }),
        ui: {
          filename: {
            slugify: (values) => {
              const date = values?.date ? new Date(values.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
              const slug = values?.slug || values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
              return `${date}-${slug}`;
            },
          },
        },
        indexes: [
          {
            name: "date",
            fields: [{ name: "date" }],
          },
        ],
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "datetime",
            name: "modified",
            label: "Modified",
            required: false,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "Custom URL slug for this post (optional, defaults to filename)",
            required: false,
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            description: "Post categories for organization and filtering",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            description: "Tags for this post",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            description: "Short summary of the post",
            ui: {
              component: "textarea",
            },
            required: false,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "Mark as draft to prevent publishing",
            required: false,
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
            description: "Featured image for this post",
            required: false,
          },
          {
            type: "string",
            name: "featuredImageAlt",
            label: "Featured Image Alt Text",
            description: "Describe the image for accessibility and SEO",
            required: false,
          },
          {
            type: "string",
            name: "featuredImageCaption",
            label: "Featured Image Caption",
            description: "Optional caption displayed below the image",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
