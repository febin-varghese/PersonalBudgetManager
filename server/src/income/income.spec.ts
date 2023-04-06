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
});
