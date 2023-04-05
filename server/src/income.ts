import { readDataFromCSV } from './dataProcessor';
import { months } from './utilData';

export async function getIncomeData(): Promise<unknown> {
  const currentYear = new Date().getFullYear();
  const incomeData = await readDataFromCSV(`income${currentYear}`);
  const monthlyIncome: number[] = [];
  for (const income of incomeData) {
    const date = new Date(income.date);
    const year = date.getFullYear();
    if (year === currentYear) {
      const month = date.getMonth();
      const currentIncomeInTheMonth = monthlyIncome[month] ?? 0;
      monthlyIncome[month] =
        currentIncomeInTheMonth + Number(income?.amount ?? 0);
    }
  }
  return {
    months,
    amount: monthlyIncome
  };
}
