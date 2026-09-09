import test, { expect } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
import testDataList from "../utils/TestData.json" with { type: "json" };

const testData = testDataList[0];

test("Admin Page Test @adminPageTest", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const adminPage = poManager.getAdminPage();
  await loginPage.navigateToLoginPage();
  //login with valid credentials
  await loginPage.login(testData.USERNAME, testData.PASSWORD);
  //navigate to Admin page
  await adminPage.navigateToAdminPage();
  //verify that the Admin page is displayed by checking for the presence of the "System Users" text
  await expect(page.getByText("System Users").first()).toBeVisible();

  //search for a user
  const usernameToSearch = "Admin";
  await adminPage.searchUser(usernameToSearch);
  //verify that the search results contain the searched username
  await expect(page.getByText(usernameToSearch).first()).toBeVisible();

  //edit the user
  await adminPage.navigateToEditUser();
  await expect(page.getByText("Edit User").first()).toBeVisible();
  await adminPage.page.waitForLoadState("networkidle");

  await adminPage.editUserRole("ESS");

  //verify that the user role was updated successfully by checking for the presence of the success toast message
  await expect(
    page.locator("div.oxd-toast.oxd-toast--success.oxd-toast-container--toast"),
  ).toBeVisible();

  await expect(page.getByText("ESS").first()).toBeVisible();
}); // End of admin page test
