# Decision Log

This document records significant technical decisions made during the development of this project, including context, alternatives considered, and rationale.

## 2024-12-20: Featured Image Field Structure

### Context
Initial implementation used a nested object structure for featured images:
```yaml
featuredImage:
  src: /images/photo.jpg
  alt: Description
  caption: Caption text
```

This broke TinaCMS's image preview functionality in the admin interface and media library.

### Problem
TinaCMS's image field type expects a direct string path to display image previews. When using a nested object structure, the preview functionality no longer works, making it difficult for content editors to see which image they've selected.

### Decision
**Restructure to use flat fields instead of nested objects**

New structure:
```yaml
featuredImage: /images/photo.jpg
featuredImageAlt: Description
featuredImageCaption: Caption text
```

### Alternatives Considered

1. **Keep nested object structure**
   - Pros: More semantically organized, cleaner frontmatter
   - Cons: Breaks TinaCMS image preview, poor UX for bloggers
   - Rejected: User experience is paramount

2. **Use custom TinaCMS component**
   - Pros: Could maintain nested structure
   - Cons: Significant development effort, maintenance burden, potential compatibility issues
   - Rejected: Over-engineering for the problem at hand

3. **Flat field structure (chosen)**
   - Pros: Works with TinaCMS out of the box, image previews functional, simple to implement
   - Cons: Slightly less semantic frontmatter structure
   - Chosen: Best balance of functionality and simplicity

### Rationale
- **User Experience First**: Bloggers need to see image previews when selecting media
- **Simplicity**: Works with TinaCMS's built-in functionality without custom code
- **Maintainability**: Fewer moving parts, easier to debug and maintain
- **Backward Compatibility**: Optional fields don't break existing content

### Implementation Details
- Changed TinaCMS schema in `tina/config.ts` to three separate fields
- Updated Astro content schema in `src/content/config.ts` to match
- All fields remain optional to maintain backward compatibility
- Image preview now works correctly in TinaCMS admin interface

### Impact
- ✅ TinaCMS image preview restored
- ✅ Alt text and caption support maintained
- ✅ Backward compatible with existing posts
- ✅ Simple, maintainable solution
- ✅ Production build successful

### Future Considerations
- If Astro Image optimization is added, featured images can be leveraged
- Fields are in place but currently not displayed in blog listing or post templates
- Alt text fields ensure accessibility compliance when/if featured images are displayed
