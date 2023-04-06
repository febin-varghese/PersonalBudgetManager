import { readDataFromCSV } from '../dataProcessor';
import { months } from '../utilData';
import { IncomeInterface } from '../interfaces/income';
import { convertMonthStringToNumber } from '../utilities/common';

export class Income {
  currentYear: number;
  income!: IncomeInterface[];
  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  async setIncome() {
    this.income = await readDataFromCSV<IncomeInterface>(
      `income${this.currentYear}`
    );
  }

  async calculateMonthlyIncome(
    year: number,
    month?: string
  ): Promise<number | number[]> {
    if (month) {
      let monthlyIncome = 0;
      const monthNumber = convertMonthStringToNumber(month);
      for (const income of this.income) {
        const date = new Date(income.date);
        if (year === date.getFullYear() && monthNumber === date.getMonth()) {
          monthlyIncome += Number(income?.amount ?? 0);
        }
      }
      return monthlyIncome;
    }
    let monthlyIncome: number[] = [];
    for (const income of this.income) {
      const date = new Date(income.date);
      if (year === date.getFullYear()) {
        const monthlyIndex = date.getMonth();
        monthlyIncome[monthlyIndex] =
          (monthlyIncome[monthlyIndex] ?? 0) + Number(income?.amount ?? 0);
      }
    }
    return monthlyIncome;
  }

  async calculateAnnualIncome(year: number): Promise<number> {
    let annualIncome = 0;
    for (const income of this.income) {
      const date = new Date(income.date);
      if (year === date.getFullYear()) {
        annualIncome += Number(income?.amount ?? 0);
      }
    }
    return annualIncome;
  }
}

export async function getIncomeData(year: number): Promise<unknown> {
  const income = new Income();
  await income.setIncome();
  const amount = await income.calculateMonthlyIncome(year);
  return {
    months,
    amount
  };
}
