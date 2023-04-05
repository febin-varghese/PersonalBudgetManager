import { readDataFromCSV } from './dataProcessor';
import { months } from './utilData';

export async function getExpenseData(): Promise<unknown> {
  const currentYear = new Date().getFullYear();
  const expenseData = await readDataFromCSV(`expense${currentYear}`);
  const monthlyExpense: number[] = [];
  for (const expense of expenseData) {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    if (year === currentYear) {
      const month = date.getMonth();
      const currentExpenseInTheMonth = monthlyExpense[month] ?? 0;
      monthlyExpense[month] =
        currentExpenseInTheMonth + Number(expense?.amount ?? 0);
    }
  }
  return {
    months,
    amount: monthlyExpense
  };
}
