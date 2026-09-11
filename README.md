# Playwright Test Project and API test project (Details after playwright description)

## Installation

```bash
npm init playwright@latest
```

During setup, choose JavaScript or TypeScript and allow the installer to create the test folder and configuration file. For an existing Node.js project, use:

```bash
npm install -D @playwright/test
npx playwright install
```

## Page Object Model (POM) structure

Keep selectors and page actions in page classes, while test files contain the test scenarios:

```text
projectPlaywright/
├── pageObjects/
│   ├── AdminPage.js
│   └── LeavePage.js
│   └── LoginPage.js
    └── PimPage.js
├── tests/
│   ├── adminTest.spec.js
│   └── employeeListTest.spec.js
│   └── leaveTest.spec.js
│   └── loginErrorTest.spec.js
├── playwright.config.js
└── package.json
```

Example page object:

```js
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.LOGIN_URL);
  }

  async login(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
export default LoginPage;
```

Use the page object from a test:

```js
// tests/login.spec.js
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
```

## Running tests

Run the complete test suite:

```bash
npx playwright test
```

Run all tests in a specific project or browser:

```bash
npx playwright test --project=chromium
```

Run one test file:

```bash
npx playwright test tests/loginErrorTest.spec.js

npx playwright test --grep "@loginErrorTest"

```

Run one test by its title:

```bash
npx playwright test -g "Test login error with invalid credentials"
```

## Html Report will be saved in a folder named HtmlReport in the project root

Useful options:

```bash
npx playwright test --headed       # Run with a visible browser
npx playwright test --debug        # Run in debug mode
npx playwright show-report        # Open the HTML report
```

# API test project

## Go to api test

From root directory go to APITests and run the code given below:

```bash
cd projectPlaywright/APITests
newman run Ostad-Api-Project.postman_collection.json

```

You should get similar response:

```bash

JSONPlaceholder User API Automation

→ 01 - Get All Users
  GET https://jsonplaceholder.typicode.com/users

  ✓ Status code is 200
  ✓ Response contains user data
  ✓ Each user has id, name and email

→ 02 - Update User
  PUT https://jsonplaceholder.typicode.com/users/1

  ✓ Status code is 200
  ✓ Returned ID matches stored ID
  ✓ Phone field is not empty

2 requests
6 tests
6 passed
0 failed

```
