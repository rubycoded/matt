# TinaCMS Features & Customizations

This document tracks all TinaCMS features and customizations implemented for this site.

## Project Overview

- **CMS**: TinaCMS v3.1.1
- **Framework**: Astro v5.9.0
- **Content Path**: `src/content/blog/`
- **Admin URL**: `http://localhost:4001/` (development)
- **Media Storage**: `public/images/`

## Collection Configuration

### Blog Post Collection

**Collection Name**: `post`
**Label**: Posts
**Path**: `src/content/blog/`
**Format**: Markdown (`.md`)

## Content Schema

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Post title (displayed as page heading) |
| `date` | DateTime | Yes | Publication date |
| `modified` | DateTime | No | Last modified date |
| `slug` | String | No | Custom URL slug (defaults to filename) |
| `categories` | String Array | No | Post categories for organization |
| `tags` | String Array | No | Post tags for filtering |
| `excerpt` | String (Textarea) | No | Short summary/preview of the post |
| `draft` | Boolean | No | Mark post as draft (hides from public site) |
| `image` | Image | No | Featured image for the post |
| `body` | Rich Text | Yes | Main post content (Markdown) |

### Field Customizations

#### Categories & Tags (Multi-value)
- **Type**: String arrays with `list: true`
- **UI**: Multi-input component with add/remove buttons
- **Entry**: Freeform text input (allows organic taxonomy growth)
- **Output**: YAML array format in frontmatter

#### Excerpt (Textarea)
- **UI Component**: `textarea` for multi-line input
- **Purpose**: Post summaries for listings and previews

#### Draft (Toggle)
- **UI**: Boolean toggle switch
- **Behavior**: When `true`, post is filtered from blog listing and won't generate public URL
- **Use Case**: Work-in-progress posts or unpublish without deleting

#### Featured Image
- **Type**: Image picker
- **Integration**: TinaCMS media manager
- **Storage**: `/public/images/`
- **Output**: Relative path (e.g., `/images/photo.jpg`)

## Custom Features

### 1. Automatic Date-Prefixed Filenames

**Location**: `tina/config.ts` → `ui.filename.slugify`

New blog posts automatically generate filenames in the format:
```
YYYY-MM-DD-slug-name.md
```

**Benefits**:
- Natural chronological sorting in file system
- Consistent naming convention
- Easy identification of post dates

**Implementation**:
```typescript
ui: {
  filename: {
    slugify: (values) => {
      const date = values?.date
        ? new Date(values.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      const slug = values?.slug
        || values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return `${date}-${slug}`;
    },
  },
}
```

### 2. Date Index for Query Performance

**Location**: `tina/config.ts` → `indexes`

Configured a date field index for optimized sorting in GraphQL queries.

**Implementation**:
```typescript
indexes: [
  {
    name: "date",
    fields: [{ name: "date" }],
  },
]
```

### 3. Draft Post Filtering

**Locations**:
- `src/pages/blog.astro` (blog listing)
- `src/pages/[...slug].astro` (dynamic routes)

Posts marked as `draft: true` are automatically filtered from:
- Blog listing page (`/blog`)
- Public URLs (no static page generated)

**Implementation**:
```typescript
const posts = await getCollection("blog", ({ data }) => {
  return data.draft !== true;
});
```

### 4. Default Item Configuration

**Location**: `tina/config.ts` → `defaultItem`

New posts automatically populate with:
- Current date/time in ISO format

**Implementation**:
```typescript
defaultItem: () => ({
  date: new Date().toISOString(),
})
```

## Media Configuration

**Provider**: TinaCMS Media Manager
**Storage Location**: `public/images/`
**Public Folder**: `public`
**Media Root**: `images`

**Configuration**:
```typescript
media: {
  tina: {
    mediaRoot: "images",
    publicFolder: "public",
  },
}
```

## Astro Content Schema

**Location**: `src/content/config.ts`

The Astro content collection schema uses Zod for validation and matches the TinaCMS schema:

```typescript
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
```

## Development Workflow

### Local Development

1. **Start Dev Server**:
   ```bash
   pnpm dev
   ```
   This runs both:
   - TinaCMS dev server (port 4001)
   - Astro dev server (port 4321)

2. **Access Admin**: Navigate to `http://localhost:4001/`

3. **View Site**: Navigate to `http://localhost:4321/`

### Creating New Posts

1. Open TinaCMS admin at `http://localhost:4001/`
2. Click "Posts" collection
3. Click "Create New Post"
4. Fill in fields:
   - Title (required)
   - Date (required, pre-filled with current date)
   - Add categories/tags as needed
   - Write content in the body editor
   - Toggle draft if not ready to publish
5. Save - filename will be auto-generated as `YYYY-MM-DD-title-slug.md`

### Publishing Workflow

1. **Draft → Published**: Toggle draft field from `true` to `false`
2. **Unpublish**: Toggle draft field from `false` to `true`
3. **Delete**: Manually delete markdown file from `src/content/blog/`

### Schema Updates

After modifying `tina/config.ts`:

```bash
pnpm dev
```

The TinaCMS dev server automatically regenerates:
- `tina/__generated__/types.ts`
- `tina/__generated__/schema.gql`
- `tina/__generated__/_graphql.json`
- `tina/__generated__/_schema.json`
- `tina/tina-lock.json`

## Production Deployment

**Platform**: Cloudflare Pages (based on config)
**Branch**: `master`
**Build Command**: `pnpm build`

The build process:
1. Runs `tinacms build` (generates schema)
2. Runs `astro build` (generates static site)
3. Filters draft posts during static generation
4. Deploys to production

## File Structure

```
/
├── src/
│   ├── content/
│   │   ├── blog/              # Blog post markdown files
│   │   └── config.ts          # Astro content collection schema
│   ├── pages/
│   │   ├── blog.astro         # Blog listing page
│   │   └── [...slug].astro    # Dynamic blog post pages
│   └── layouts/
│       └── Post.astro         # Blog post layout
├── tina/
│   ├── config.ts              # TinaCMS schema configuration
│   ├── tina-lock.json         # Generated schema lock file
│   └── __generated__/         # Auto-generated TinaCMS files
├── public/
│   ├── admin/                 # TinaCMS admin files
│   └── images/                # Media storage
└── TINACMS_FEATURES.md        # This file
```

## Known Limitations

### Sorting in Admin UI
- The TinaCMS admin list defaults to filename order
- No native `defaultSort` property available in schema
- **Workaround**: Date-prefixed filenames provide natural chronological sorting

### Delete Functionality
- No built-in delete button in TinaCMS admin UI
- **Workaround**: Use draft toggle to unpublish, manually delete files when needed

## Future Enhancements

Potential improvements to consider:

- [ ] Add predefined category options for consistency
- [ ] Implement author field for multi-author support
- [ ] Add SEO metadata fields (meta description, OG image)
- [ ] Create custom collection actions for delete functionality
- [ ] Add reading time calculation field
- [ ] Implement related posts functionality
- [ ] Add table of contents generation
- [ ] Configure multiple content types (pages, projects, etc.)

## Changelog

### 2025-12-19
- Added comprehensive frontmatter fields (categories, tags, slug, excerpt, draft, image)
- Implemented automatic date-prefixed filename generation
- Configured draft post filtering
- Added date index for query optimization
- Updated Astro content schema to match TinaCMS schema
- Created this documentation file

### 2024-12-18
- Configured TinaCMS media storage to `public/images/`
- Initial TinaCMS setup with basic schema

## Resources

- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS Schema Reference](https://tina.io/docs/reference/schema/)
- [TinaCMS Collections](https://tina.io/docs/reference/collections/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [TinaCMS + Astro Integration](https://docs.astro.build/en/guides/cms/tina-cms/)
