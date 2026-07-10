import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Landing Page & Critical Path', () => {
  test('should render hero and allow navigation to quoter', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('/');

    // Validate main heading is visible
    await expect(page.locator('h1')).toContainText('CRISTAL Y ALUMINIO');

    // 2. Click the primary CTA
    const primaryCta = page.getByRole('link', { name: /Cotizar Proyecto/i }).first();
    await expect(primaryCta).toBeVisible();

    // 3. Scroll to quoter section
    const quoterSection = page.locator('#validador-tecnico');
    await quoterSection.scrollIntoViewIfNeeded();
    await expect(quoterSection).toBeVisible();

    // 4. E2E: Validating Calculator UI
    // Ensure the first step (Applicación) is visible
    await expect(page.getByText('Aplicación')).toBeVisible();
    await expect(page.getByText('Cabina de Ducha (Premium)')).toBeVisible();
  });

  test('should pass axe-core accessibility checks', async ({ page }) => {
    await page.goto('/');

    // Test for WCAG compliance
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // In strict mode, we might want to fail the test on ANY violation.
    // For now we assert there are no violations.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
