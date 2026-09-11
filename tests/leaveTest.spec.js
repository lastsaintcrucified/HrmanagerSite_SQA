import test, { expect } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
import testDataList from "../utils/TestData.json" with { type: "json" };

const testData = testDataList[0];
test("Leave Page Test @leavePageTest", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const leavePage = poManager.getLeavePage();
  await loginPage.navigateToLoginPage();

  //login with valid credentials
  await loginPage.login(testData.USERNAME, testData.PASSWORD);

  // Navigate to the Leave page
  await leavePage.navigateToLeavePage();

  // Verify that the Leave page is displayed by checking for the presence of the "Leave List" text
  await expect(leavePage.leaveListText).toBeVisible();

  // Apply for leave
  const leaveType = "CAN - Personal";
  const fromDate = "2024-06-01";
  const toDate = "2024-06-05";
  const comment = "Vacation leave";
  await leavePage.applyLeave(leaveType, fromDate, toDate, comment);
  await expect(
    page.locator("div.oxd-toast.oxd-toast--success.oxd-toast-container--toast"),
  ).toBeVisible();

  // Navigate to the "My Leave" tab
  await leavePage.navigateToMyLeaveTab();
  await page.waitForLoadState("networkidle");
  await expect(leavePage.leaveListTable).toBeVisible();
  await leavePage.getLeaveListTableRows();
  await expect(leavePage.leaveListTableRows).toHaveCountGreaterThan(0);
  await expect(
    leavePage.leaveListTableRows.first().getByText(leaveType),
  ).toBeVisible();

  await leavePage.cancelLeave();
  await expect(
    page.locator("div.oxd-toast.oxd-toast--success.oxd-toast-container--toast"),
  ).toBeVisible();
});
