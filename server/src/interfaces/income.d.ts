import { MoneyType } from './common';

export interface Income {
  date: Date;
  currency: string;
  amount: number;
  category: IncomeCategory; // TODO:
  type: MoneyType; // TODO:
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
