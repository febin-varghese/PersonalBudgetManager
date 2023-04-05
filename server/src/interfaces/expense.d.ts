import { MoneyType } from './common';
import { IncomeCategory } from './income';

export interface Expense {
  date: Date;
  currency: string;
  amount: number;
  category: ExpenseCategory;
  subCategory: ExpenseSubCategory;
  type: MoneyType;
  comment: string;
}

export enum ExpenseCategory {
  meal = 'Meals',
  entertainment = 'Entertainment',
  rent = 'Rent'
}

export enum ExpenseSubCategory {} // TODO: How to map subcategory relationships
