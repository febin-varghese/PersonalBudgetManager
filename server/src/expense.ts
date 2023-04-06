import { months } from './utilData';

export async function getExpenseData(): Promise<unknown> {
  return {
    months,
    amount: []
  };
}
