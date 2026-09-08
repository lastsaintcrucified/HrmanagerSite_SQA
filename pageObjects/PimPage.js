class PimPage {
  constructor(page) {
    this.page = page;
    this.navigatePimPage = page.locator(
      "a[href='/web/index.php/pim/viewPimModule']",
    );

    this.addEmployeeFirstName = page.locator("input[name='firstName']");
    this.addEmployeeMiddleName = page.locator("input[name='middleName']");
    this.addEmployeeLastName = page.locator("input[name='lastName']");
    this.addEmployeeId = page.locator(
      "div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']",
    );
    this.addEmployeeSaveButton = page.locator("button[type='submit']");

    this.searchEmployeeNameInput = page.locator(
      "input[placeholder='Type for hints...']",
    );
    this.searchEmployeeButton = page.locator(
      "button[type='submit'][class*='oxd-button--secondary']",
    );
  }

  async navigateToPimPage() {
    await this.page.goto(process.env.BASE_URL + "/pim/viewEmployeeList");
  }

  async navigateToAddEmployeePage() {
    await this.page.goto(`${process.env.BASE_URL}/pim/addEmployee`);
  }

  async addEmployee(firstName, middleName, lastName, id) {
    await this.addEmployeeFirstName.fill(firstName);
    await this.addEmployeeMiddleName.fill(middleName);
    await this.addEmployeeLastName.fill(lastName);
    await this.addEmployeeId.fill(id.toString());
    await this.addEmployeeSaveButton.click();
  }

  async searchEmployee(employeeName) {
    await this.searchEmployeeNameInput.first().fill(employeeName);
    await this.searchEmployeeButton.click();
  }
}
export default PimPage;
