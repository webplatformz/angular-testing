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

    // TODO: Click on third salon and verify that:
    // - third salon is now highlighted
    // - first salon is not highlighted anymore
  });

  it('should show details of clicked salon', async () => {
    await page.clickSalonAt(0);
    expect(await page.getDetailsInfoOfSalonAt(0)).toContain('Owner: Thomas Meier');

    // TODO: Verify that address of selected salon contains "Bahnhofstrasse 43a"
  });

  it('should filter salons by name', async () => {
    await page.enterSearchText('Schere');
    await page.clickSearchButton();

    // TODO: Verify that only one salon is shown and that its name matches "Rostige Schere"
  });

  it('should filter salons by gender', async () => {
    // TODO: Search for salons that serve gender "female" and verify that:
    // - Result lists two salons
    // - Served genders of the two listed salons are "both" and "female"
    //
    // Hint: Try to select gender in search form by value ("female") instead of element-index or id/class
    // Use element.getAttribute('value') or css selector [value="${value}"]
  });
});
