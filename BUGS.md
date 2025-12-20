# Known Bugs

This document tracks known issues and bugs that need to be addressed.

## 🐛 Active Bugs

### TinaCMS Image Preview Not Displaying (2024-12-20)

**Priority**: Medium
**Status**: Open
**Affects**: TinaCMS Admin Interface

#### Description
Image previews are not displaying correctly in the TinaCMS admin interface:
1. Featured image section shows broken image icon
2. Post editor section doesn't show image preview
3. Media selector shows broken image icon

#### Current Behavior
- Image path is correctly saved to frontmatter (e.g., `featuredImage: /images/IMG_5329.jpeg`)
- Image file exists at `/Users/matt/AI/matt/public/images/IMG_5329.jpeg`
- Images display correctly on the live blog
- TinaCMS admin cannot preview the images

#### Expected Behavior
- Image preview should display in the featured image field
- Image preview should display in the media selector
- Image preview should display in the post editor

#### Root Cause
Likely cause: TinaCMS dev server runs on port 4001, while Astro serves static assets (including images) on port 4321. The relative image paths `/images/...` work on the Astro site but not in the TinaCMS admin interface running on a different port.

#### Possible Solutions

1. **Configure TinaCMS to proxy image requests to Astro**
   - Pros: Would work in dev mode
   - Cons: Requires custom TinaCMS configuration

2. **Use absolute URLs for images**
   - Pros: Would work across different ports
   - Cons: Hardcoded URLs, not portable

3. **Configure TinaCMS to serve from the same origin**
   - Pros: Clean solution
   - Cons: Requires TinaCMS configuration changes

4. **Use a media service (Cloudinary, etc.)**
   - Pros: Solves preview issue, provides image optimization
   - Cons: External dependency, potential cost

#### Workaround
Images work correctly on the deployed site. Content editors can:
- Upload images through TinaCMS (works)
- Reference images by filename
- Verify images on the live site after deployment

#### Impact
- **Severity**: Medium - doesn't affect production site
- **User Experience**: Poor - editors can't see image previews
- **Workaround Available**: Yes - verify on live site

#### Next Steps
- [ ] Test if issue persists on production TinaCMS Cloud
- [ ] Research TinaCMS media configuration options
- [ ] Consider implementing custom media store
- [ ] Evaluate external media service integration

---

## 📋 Bug Tracking Stats

- **Total Bugs**: 1
- **Critical**: 0
- **High**: 0
- **Medium**: 1
- **Low**: 0
- **Resolved**: 0

---

## 🔍 Investigation Notes

### 2024-12-20 Initial Investigation
- Tested with flat field structure (current implementation)
- Tested with nested object structure (previous implementation)
- Both have the same image preview issue
- Issue is not related to schema structure
- Likely related to TinaCMS dev server configuration
- Production deployment may resolve the issue (needs testing)

### Technical Details
- **TinaCMS Version**: 3.1.1
- **Astro Version**: 5.9.0
- **Image Storage**: `/public/images/`
- **TinaCMS Media Config**:
  ```typescript
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  }
  ```

---

## 💡 Related Documentation
- See `DECISIONLOG.md` for decision to use flat field structure
- See `CHANGELOG.md` for implementation history
- See `TINACMS_FEATURES.md` for full TinaCMS configuration
