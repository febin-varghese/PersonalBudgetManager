import { MoneyType } from './common';

export interface IncomeInterface {
  date: Date;
  currency: string;
  amount: number;
  category: IncomeCategory;
  type: MoneyType;
  comment: string;
}

export enum IncomeCategory {
  salary = 'Salary',
  bonus = 'Bonus',
  gig = 'Gig',
  pension = 'Pension',
  dividend = 'Dividend',
  freelance = 'Freelance',
  profit = 'Profit',
  others = 'Others'
}
