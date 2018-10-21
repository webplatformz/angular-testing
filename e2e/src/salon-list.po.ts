import { browser, by, element } from 'protractor';

export class SalonListPage {
  private searchTextInput = element(by.css('.search-form input[type="text"]'));
  private searchButton = element(by.css('.search-form button'));
  private salonContainers = element.all(by.css('.salon-container'));

  private salonHeaderLoc = by.css('.salon-header');
  private salonHeaderNameLoc = by.css('div:nth-of-type(1)');
  private salonDetailsLoc = by.tagName('app-salon-details');
  private detailsInfoLoc = by.css('.details-info');

  private selectedHeaderClass = 'selected';

  async navigateTo() {
    await browser.get('/');
  }

  getNameOfSalonAt(index: number) {
    return this.getSalonHeaderAt(index).element(this.salonHeaderNameLoc).getText();
  }

  getDetailsInfoOfSalonAt(index: number) {
    return this.getSalonDetailsAt(index).element(this.detailsInfoLoc).getText();
  }

  async isSalonSelectedAt(index: number) {
    const classesOfHeader = await this.getSalonHeaderAt(index).getAttribute('class');
    return classesOfHeader.includes(this.selectedHeaderClass);
  }

  async clickSalonAt(index: number) {
    await this.getSalonHeaderAt(index).click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async enterSearchText(text: string) {
    await this.searchTextInput.sendKeys(text);
  }

  private getSalonHeaderAt(index: number) {
    return this.salonContainers.get(index).element(this.salonHeaderLoc);
  }

  private getSalonDetailsAt(index: number) {
    return this.salonContainers.get(index).element(this.salonDetailsLoc);
  }
}
