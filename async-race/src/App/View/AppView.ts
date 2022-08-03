type Page = 'Garage' | 'Winners';

class AppView {
  private defaultPage: Page = 'Garage';

  private currentPage: Page;

  constructor(page: Page) {
    this.currentPage = page;

    this.renderPage(this.currentPage);
  }

  renderPage(page: Page = this.defaultPage): string {
    return `
    <wrapper class="wrapper">
      <header class="header">${this.renderHeader()}</header>
      <main class="main">${page === 'Garage' ? this.renderGarage() : this.renderWinners()}</main>
      <footer class="footer">${this.renderFooter()}</footer>
    </wrapper>
    `;
  }

  renderHeader(): string  {}

  renderFooter(): string  {}

  renderGarage(): string  {}

  updateGarage(): string  {}

  renderWinners(): string  {}

  updateWinners(): string  {}
}

export default AppView;
