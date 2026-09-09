class AdminPage {
  constructor(page) {
    this.page = page;
    this.navigateAdminPage = page.getByRole("link", { name: "Admin" });
    this.searchInput = page.locator(
      "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']",
    );
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.editButton = page
      .locator("div.oxd-table-cell-actions")
      .locator("button")
      .nth(1);
    this.userRoleDropdown = page
      .locator("div.oxd-select-wrapper")
      .locator("div")
      .nth(0);
    this.userRoleDropdownOptions = page.locator(
      'div[role="listbox"] div[role="option"]',
    );

    this.saveEditButton = page.getByRole("button", { name: "Save" });
  }

  async navigateToAdminPage() {
    await this.navigateAdminPage.click();
    await this.page.waitForLoadState("networkidle");
  }

  async searchUser(username) {
    await this.searchInput.fill(username);
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToEditUser() {
    await this.editButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async editUserRole(newRole) {
    await this.userRoleDropdown.click();
    await this.userRoleDropdownOptions.filter({ hasText: newRole }).click();
    await this.saveEditButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default AdminPage;
