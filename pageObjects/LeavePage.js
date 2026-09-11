import { expect } from "@playwright/test";

class LeavePage {
  constructor(page) {
    this.page = page;
    this.navigateLeavePage = page.getByRole("link", { name: "Leave" });
    this.leaveListText = page.getByText("Leave List").first();
    this.leaveListTable = page.locator("div.oxd-table-body");
    this.applyButton = page.getByText("Apply", { exact: true });
    this.leaveTypeDropdown = page
      .locator("div.oxd-select-wrapper")
      .locator("div")
      .nth(0);
    this.leaveTypeDropdownOptions = page.locator(
      'div[role="listbox"] div[role="option"]',
    );
    this.fromDateInput = page.locator("input[placeholder='yyyy-mm-dd']").nth(0);
    this.toDateInput = page.locator("input[placeholder='yyyy-mm-dd']").nth(1);
    this.commentInput = page.locator(
      "textarea[placeholder='Type comment here']",
    );
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.myLeaveTab = page.getByRole("tab", { name: "My Leave" });
    this.leaveListTableRows = this.leaveListTable.locator("div.oxd-table-card");
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async navigateToLeavePage() {
    await this.navigateLeavePage.click();
    await this.page.waitForLoadState("networkidle");
  }

  async applyLeave(leaveType, fromDate, toDate, comment) {
    await this.applyButton.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.leaveTypeDropdown).toBeVisible();
    await this.leaveTypeDropdown.click();
    await this.leaveTypeDropdownOptions.filter({ hasText: leaveType }).click();
    await this.fromDateInput.fill(fromDate);
    await this.toDateInput.fill(toDate);
    await this.commentInput.fill(comment);
    await this.submitButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToMyLeaveTab() {
    await this.myLeaveTab.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getLeaveListTableRows() {
    return await this.leaveListTableRows.all();
  }

  async cancelLeave() {
    await this.cancelButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default LeavePage;
