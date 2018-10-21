import { SalonListPage } from './salon-list.po';

describe('Salon list', () => {
  const page = new SalonListPage();

  beforeEach(async () => {
    await page.navigateTo();
  });

  it('should show all salons by default', async () => {
    expect(await page.getNameOfSalonAt(0)).toBe('Haarige Zeiten');
    expect(await page.getNameOfSalonAt(1)).toBe('Rostige Schere');
    expect(await page.getNameOfSalonAt(2)).toBe('Trudis Badewanne');
  });

  it('should highlight clicked salon', async () => {
    expect(await page.isSalonSelectedAt(0)).toBeFalsy();
    await page.clickSalonAt(0);
    expect(await page.isSalonSelectedAt(0)).toBeTruthy();

    await page.clickSalonAt(2);
    expect(await page.isSalonSelectedAt(2)).toBeTruthy();
    expect(await page.isSalonSelectedAt(0)).toBeFalsy();
  });

  it('should show details of clicked salon', async () => {
    await page.clickSalonAt(0);
    expect(await page.getDetailsInfoOfSalonAt(0)).toContain('Owner: Thomas Meier');
    expect(await page.getDetailsAddressOfSalonAt(0)).toContain('Bahnhofstrasse 43a');
  });

  it('should filter salons by name', async () => {
    await page.enterSearchText('Schere');
    await page.clickSearchButton();
    expect(await page.getNumberOfSalons()).toBe(1);
    expect(await page.getNameOfSalonAt(0)).toBe('Rostige Schere');
  });

  it('should filter salons by gender', async () => {
    await page.selectSearchGender('female');
    await page.clickSearchButton();
    expect(await page.getNumberOfSalons()).toBe(2);
    expect(await page.getServedGenderOfSalonAt(0)).toBe('both');
    expect(await page.getServedGenderOfSalonAt(1)).toBe('female');
  });
});
