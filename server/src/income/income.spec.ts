import { Income } from './income';

describe('Income', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV, environment: 'testing' }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should should set the income from data', async () => {
    const income = new Income();
    await income.setIncome();
    expect(income.income.length).toBeGreaterThan(0);
  });

  it('should properly calculate annual income', async () => {
    const income = new Income();
    await income.setIncome();
    await expect(income.calculateAnnualIncome(2023)).resolves.toBe(12250);
  });

  it('should properly calculate monthly income', async () => {
    const income = new Income();
    await income.setIncome();
    await expect(income.calculateMonthlyIncome(2023, 'Jan')).resolves.toBe(
      1000
    );
  });

  it('should properly calculate monthly income for an year', async () => {
    const income = new Income();
    await income.setIncome();
    const monthlyIncome = await income.calculateMonthlyIncome(2023);
    const testIncomeData = [
      1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1250
    ];
    expect(monthlyIncome).toEqual(testIncomeData);
  });
});
