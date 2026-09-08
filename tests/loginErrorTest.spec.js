import { expect, test } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
import testDataList from "../utils/TestData.json" with { type: "json" };

const testData = testDataList[0];

test("Test login error with invalid credentials @loginErrorTest", async ({
  page,
}) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  await loginPage.navigateToLoginPage();
  await loginPage.login(testData.INVALID_USERNAME, testData.INVALID_PASSWORD);

  await expect(page.getByText(testData.LOGIN_ERROR_MESSAGE)).toBeVisible();
});
