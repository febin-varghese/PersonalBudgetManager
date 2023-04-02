import { readDataFromCSV } from './dataProcressor';

export async function getIncomeData(): Promise<unknown> {
  const incomeData = readDataFromCSV('income');
  return {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    amount: [120, 190, 300, 500, 700, 900, 1000, 1100]
  };
}
