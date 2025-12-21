# Known Bugs

This document tracks known issues and bugs that need to be addressed.

## 🐛 Active Bugs

### Dark Mode Toggle Not Functional (2024-12-21)

**Priority**: High
**Status**: Open - Deferred to Next Session
**Affects**: Production Site (themattchung.com)

#### Description
The dark mode toggle button appears correctly in both mobile and desktop views but does not respond to clicks. Theme does not switch between light and dark modes when the toggle is clicked.

#### Current Behavior
- Toggle button renders correctly in header (mobile + desktop)
- Sun/moon icons display appropriately
- Clicking the toggle has no visible effect
- Theme remains in light mode
- No JavaScript errors in browser console

#### Expected Behavior
- Clicking toggle should switch between light and dark themes instantly
- Theme preference should persist during browsing session (sessionStorage)
- Icons should swap (moon in light mode, sun in dark mode)

#### Testing Results
- ✅ **Playwright Automated Tests**: 24/24 tests passing
  - Theme toggle functionality works in automated browser tests
  - Session persistence verified
  - Keyboard accessibility validated
  - ARIA labels update correctly
- ❌ **Manual Browser Testing**: Toggle non-functional
  - Tested in development environment (multiple browsers)
  - Tested in production environment (https://themattchung.com)
  - Confirmed non-functional in incognito/private mode
  - Issue persists across Chrome, Firefox, Safari

#### Root Cause Analysis
**Potential causes investigated:**
1. ~~Duplicate ID attributes~~ - Fixed (removed all IDs, using data-testid)
2. ~~Event listener duplication~~ - Fixed (initialization guard implemented)
3. ~~Preline UI interference~~ - Fixed (coordination added)
4. ~~Browser caching~~ - Cleared (Astro cache, Vite cache, hard refresh)
5. **Discrepancy**: Works in Playwright but not in actual browsers

**Hypothesis**: Possible issues with:
- Script execution order/timing in production build
- Vite build process differences between test and production
- Event listener attachment timing vs. DOM readiness
- Astro's client-side hydration affecting script execution

#### Implementation Details
- Session storage key: `matt-theme`
- Script location: `src/layouts/Layout.astro` (inline script in `<body>`)
- Toggle component: `src/components/ThemeToggle.astro`
- Event listeners: Click and keyboard (Enter/Space)
- Initialization guard: Prevents duplicate listener attachment

#### Files Modified
- `src/components/ThemeToggle.astro` - Toggle button component
- `src/components/ThemeScript.astro` - FOUC prevention
- `src/layouts/Layout.astro` - Theme initialization script
- `src/components/Header.astro` - Responsive toggle placement
- `tests/dark-mode.spec.ts` - Comprehensive test suite

#### Impact
- **Severity**: High - Affects user experience and accessibility
- **User Experience**: Poor - No dark mode available despite toggle presence
- **Production Impact**: Feature non-functional on live site
- **Workaround Available**: None currently

#### Next Steps
- [ ] Investigate script execution timing in production build
- [ ] Add console logging to debug script execution order
- [ ] Test with different script placement (head vs. body)
- [ ] Review Astro client-side script handling documentation
- [ ] Consider alternative implementation approach
- [ ] Test with `is:inline` vs. regular `<script>` tags
- [ ] Investigate if Preline UI is capturing/preventing events

#### Decision Log Reference
See DECISIONLOG.md "2024-12-21: Dark Mode Implementation" for complete technical context and implementation details.

---

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

- **Total Bugs**: 2
- **Critical**: 0
- **High**: 1 (Dark Mode Toggle)
- **Medium**: 1 (TinaCMS Image Preview)
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
