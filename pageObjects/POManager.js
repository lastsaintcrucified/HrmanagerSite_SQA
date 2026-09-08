import AdminPage from "./AdminPage";
import LeavePage from "./LeavePage";
import LoginPage from "./LoginPage";
import PimPage from "./PimPage";

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.adminPage = new AdminPage(this.page);
    this.leavePage = new LeavePage(this.page);
    this.pimPage = new PimPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getAdminPage() {
    return this.adminPage;
  }
  getLeavePage() {
    return this.leavePage;
  }
  getPimPage() {
    return this.pimPage;
  }
}

export default POManager;
