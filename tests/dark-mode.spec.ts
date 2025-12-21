import { test, expect } from '@playwright/test';

test.describe('Dark Mode Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Clear sessionStorage before each test
    await page.goto('/');
    await page.evaluate(() => sessionStorage.clear());
  });

  test('should have theme toggle button visible', async ({ page }) => {
    await page.goto('/');
    // At least one toggle should be visible
    const toggles = page.locator('[data-testid="theme-toggle"]');
    await expect(toggles.nth(1)).toBeVisible(); // Desktop toggle is always visible
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');

    // Check initial state (light mode, no .dark class)
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    // Toggle to dark mode (nth(1) is desktop toggle, always visible)
    await page.locator('[data-testid="theme-toggle"]').nth(1).click();
    await expect(html).toHaveClass(/dark/);

    // Toggle back to light mode
    await page.locator('[data-testid="theme-toggle"]').nth(1).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should persist theme preference within session', async ({ page }) => {
    await page.goto('/');

    // Set dark theme
    await page.locator('[data-testid="theme-toggle"]').nth(1).click();
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Reload page - theme should persist (sessionStorage)
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });

  test('should respect system color scheme preference', async ({ page }) => {
    // Emulate dark system preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should allow manual override of system preference', async ({ page }) => {
    // Start with dark system preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // User manually switches to light
    await page.locator('[data-testid="theme-toggle"]').nth(1).click();
    await expect(html).not.toHaveClass(/dark/);

    // Preference should persist after reload
    await page.reload();
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should reset to system preference on new session', async ({ page, context }) => {
    await page.goto('/');

    // Set dark theme manually
    await page.locator('[data-testid="theme-toggle"]').nth(1).click();

    // Clear sessionStorage (simulates closing browser)
    await page.evaluate(() => sessionStorage.clear());

    // Reload - should go back to system preference (light by default)
    await page.reload();
    const html = page.locator('html');
    // Should be system preference, not dark
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('[data-testid="theme-toggle"]').nth(1);
    const html = page.locator('html');

    // Focus the toggle with Tab
    await toggle.focus();
    await expect(toggle).toBeFocused();

    // Press Enter to toggle
    await page.keyboard.press('Enter');
    await expect(html).toHaveClass(/dark/);

    // Press Space to toggle back
    await page.keyboard.press('Space');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should have correct aria-label', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('[data-testid="theme-toggle"]').nth(1);

    // In light mode, should offer to switch to dark
    await expect(toggle).toHaveAttribute('aria-label', /dark/i);

    // Toggle to dark
    await toggle.click();

    // In dark mode, should offer to switch to light
    await expect(toggle).toHaveAttribute('aria-label', /light/i);
  });
});
