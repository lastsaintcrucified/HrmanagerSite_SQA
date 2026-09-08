import test, { expect } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
import testDataList from "../utils/TestData.json" with { type: "json" };

const testData = testDataList[0];

test("Employee List Test @employeeListTest", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const pimPage = poManager.getPimPage();
  const randomText = `user_${Math.random().toString(36).substring(2, 7)}`;
  const randomNumber = Math.floor(Math.random() * 1000);
  await loginPage.navigateToLoginPage();
  //login with valid credentials
  await loginPage.login(testData.USERNAME, testData.PASSWORD);
  await page.waitForLoadState("networkidle");
  //navigate to PIM page
  await pimPage.navigateToPimPage();
  await page.waitForLoadState("networkidle");
  //navigate to Add Employee page
  await pimPage.navigateToAddEmployeePage();
  await page.waitForLoadState("networkidle");
  //add a new employee
  //   console.log("Employee Name: ", randomText);

  await pimPage.addEmployee(randomText, randomText, randomText, randomNumber);
  await expect(
    page.locator(".oxd-toast.oxd-toast--success.oxd-toast-container--toast"),
  ).toBeVisible();
  //verify that the employee was added successfully by checking for the presence of the employee's name in the employee list
  await pimPage.navigateToPimPage();
  await page.waitForLoadState("networkidle");
  const employeeName = `${randomText}`;
  //   console.log("Employee Name: ", employeeName);
  await pimPage.searchEmployee(employeeName);
  await page.waitForLoadState("networkidle");
  await expect(page.getByText(employeeName).first()).toBeVisible();
});
