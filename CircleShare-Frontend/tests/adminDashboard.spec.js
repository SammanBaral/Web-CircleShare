import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:4000';

test.describe('Admin Dashboard Tests', () => {

    test('should have the correct title', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page).toHaveTitle(/CircleShare/i);
    });

    test('should display the navbar', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('nav')).toBeVisible();
    });

    test('should display the summary cards', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('h3:has-text("Member Since")')).toBeVisible();
        await expect(page.locator('h3:has-text("Total Reviews")')).toBeVisible();
        await expect(page.locator('h3:has-text("Community Rating")')).toBeVisible();
        await expect(page.locator('h3:has-text("Total Users")')).toBeVisible();
    });

    test('should display the Recent User Activities section', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('h3:has-text("Recent User Activities")')).toBeVisible();
    });

    test('should display the Site Statistics section', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('h3:has-text("Site Statistics")')).toBeVisible();
    });

    test('should display the Management Center section', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('h3:has-text("Management Center")')).toBeVisible();
    });



    test('should change view to Categories Management', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await page.click('button:has-text("Categories Management")');
        await expect(page.locator('h3:has-text("Categories Management")')).toBeVisible();
    });

    test('should change view to Item Management', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await page.click('button:has-text("Item Management")');
        await expect(page.locator('h3:has-text("Item Management")')).toBeVisible();
    });

    test('should display the System Activity Log section', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('h3:has-text("System Activity Log")')).toBeVisible();
    });

    test('should display the bottom navigation', async ({ page }) => {
        await page.goto(`${BASE_URL}/admin/dashboard`);
        await expect(page.locator('nav')).toBeVisible();
    });

});