import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:4000';

test.describe('Login Page Tests', () => {

    test('should have the correct title', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page).toHaveTitle(/CircleShare/i);
    });

    test('should display the logo', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('img[alt="Logo"]')).toBeVisible();
    });

    test('should display the welcome text', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('h2')).toHaveText(/Welcome back/i);
    });

    test('should display the username and password input fields', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    });

    test('should display the remember me checkbox', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    });

    test('should display the forgot password link', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('button:has-text("Forgot your password?")')).toBeVisible();
    });

    test('should display the sign in button', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('button:has-text("Sign in")')).toBeVisible();
    });

    test('should display the sign up link', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await expect(page.locator('a:has-text("Sign up")')).toBeVisible();
    });

    test('should login with valid credentials', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[placeholder="Username"]', 'sir');
        await page.fill('input[placeholder="Password"]', 'sir@123');
        await page.click('button:has-text("Sign in")');
        await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
    });

    test('should show error message with invalid credentials', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[placeholder="Username"]', 'invalidUser');
        await page.fill('input[placeholder="Password"]', 'invalidPass');
        await page.click('button:has-text("Sign in")');
        await expect(page.locator('.text-red-500')).toBeVisible();
    });

});