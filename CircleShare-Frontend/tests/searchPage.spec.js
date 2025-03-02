import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:4000';

test.describe('Search Page Tests', () => {

    test('should have the correct title', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await expect(page).toHaveTitle(/CircleShare/i);
    });

    test('should display the navbar', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await expect(page.locator('nav')).toBeVisible();
    });

    test('should display the search bar', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await expect(page.locator('input[placeholder="Search items..."]')).toBeVisible();
    });

    test('should display the items list', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await expect(page.locator('h3:has-text("Power Drill")')).toBeVisible();
        await expect(page.locator('h3:has-text("Camping Tent")')).toBeVisible();
        await expect(page.locator('h3:has-text("Lawn Mower")')).toBeVisible();
    });

    test('should filter items based on search input', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await page.fill('input[placeholder="Search items..."]', 'Power Drill');
        await expect(page.locator('h3:has-text("Power Drill")')).toBeVisible();
        await expect(page.locator('h3:has-text("Camping Tent")')).not.toBeVisible();
        await expect(page.locator('h3:has-text("Lawn Mower")')).not.toBeVisible();
    });

    test('should navigate to item detail page when clicking on Power Drill', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await page.click('h3:has-text("Power Drill")');
        await expect(page).toHaveURL(`${BASE_URL}/item/1`);
    });

    test('should display the bottom navigation', async ({ page }) => {
        await page.goto(`${BASE_URL}/search`);
        await expect(page.locator('nav')).toBeVisible();
    });

});