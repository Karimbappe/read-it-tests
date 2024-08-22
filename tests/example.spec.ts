import { test, expect } from '@playwright/test';

async function clickAndFill(page, selector, value) {
  await page.waitForSelector(selector, { state: 'visible' }); // Ensure the element is visible
  const isEnabled = await page.isEnabled(selector); // Check if it's enabled
  const isEditable = await page.isEditable(selector); // Check if it's editable

  console.log(`Selector ${selector} is visible, enabled: ${isEnabled}, editable: ${isEditable}`);

  if (isEnabled && isEditable) {
      await page.click(selector);
      console.log(`Clicked on ${selector}`);
      await page.fill(selector, value);
      console.log(`Filled ${selector} with ${value}`);
  } else {
      console.log(`Selector ${selector} is not ready for interaction.`);
  }
}

test('login button is visible and clickable', async ({ page }) => {
    const email = 'paypalkarim930@gmail.com';
    const password = 'Paypal1234';

  // Navigate to the local server
    await page.goto('http://localhost:3000');

  // Check if the login button is visible
    const loginButton = await page.locator('button:has-text("Login")');

    await expect(loginButton).toBeVisible();

  // Click the login button
    await loginButton.click();
    await page.waitForTimeout(3000);

    await clickAndFill(page, 'input[name="username"]', email); // Corrected the name attribute
    await clickAndFill(page, 'input[name="password"]', password); // Ensure the password field is correctly targeted
    const submitButton = await page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await page.waitForTimeout(3000);
    const myProjectsHeading = await page.locator('h6.MuiTypography-h6:has-text("My Projects")');
    await expect(myProjectsHeading).toBeVisible();
});


