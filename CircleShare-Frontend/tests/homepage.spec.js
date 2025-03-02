import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:4000';

test.describe('Homepage Tests', () => {

    test('should have the correct title', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        await expect(page).toHaveTitle(/CircleShare/i);
    });

    test('should display the main heading', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        await expect(page.locator('h1')).toHaveText(/Share More,\s*Own Less/i);
    });

    test('should display the hero section description', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        await expect(page.locator('section.text-center.py-20 p')).toHaveText(/Join your neighborhood's sharing economy/i);
    });

    test('should have a Get Started button', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
    });

    test('should display the Popular Categories section', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        await expect(page.locator('h2')).toHaveText(/Popular Categories/i);
    });

    test('should display all categories', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        const categories = [
            'Tools & Equipment',
            'Sports & Recreation',
            'Books & Media',
            'Home & Kitchen',
        ];
        for (const category of categories) {
            await expect(page.locator(`h3:has-text("${category}")`)).toBeVisible();
        }
    });

});