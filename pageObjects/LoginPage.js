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
