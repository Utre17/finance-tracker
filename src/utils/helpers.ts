import { Transaction, Budget, MonthlyData } from '../types';
import { CURRENCY_SYMBOL } from './constants';

// Simple date helpers without date-fns dependency
const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

const formatDateSimple = (date: Date, format: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  if (format === 'MMM dd, yyyy') {
    return `${months[month]} ${day.toString().padStart(2, '0')}, ${year}`;
  } else if (format === 'MMMM yyyy') {
    return `${monthsFull[month]} ${year}`;
  }
  
  return date.toLocaleDateString();
};

const getStartOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

const getEndOfMonth = (year: number, month: number): Date => {
  return new Date(year, month + 1, 0, 23, 59, 59, 999);
};

const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

export const formatCurrency = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date: string): string => {
  const parsedDate = parseDate(date);
  return formatDateSimple(parsedDate, 'MMM dd, yyyy');
};

export const formatMonthYear = (date: string): string => {
  const parsedDate = parseDate(date + '-01');
  return formatDateSimple(parsedDate, 'MMMM yyyy');
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getMonthlyData = (
  transactions: Transaction[],
  budgets: Budget[],
  month: string
): MonthlyData => {
  const [year, monthNum] = month.split('-').map(Number);
  const monthStart = getStartOfMonth(year, monthNum - 1);
  const monthEnd = getEndOfMonth(year, monthNum - 1);

  const monthTransactions = transactions.filter(transaction => {
    const transactionDate = parseDate(transaction.date);
    return isDateInRange(transactionDate, monthStart, monthEnd);
  });

  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthBudgets = budgets.filter(b => b.month === month);

  return {
    month,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    transactions: monthTransactions,
    budgets: monthBudgets,
  };
};

export const calculateBudgetSpent = (
  transactions: Transaction[],
  category: string,
  month: string
): number => {
  const [year, monthNum] = month.split('-').map(Number);
  const monthStart = getStartOfMonth(year, monthNum - 1);
  const monthEnd = getEndOfMonth(year, monthNum - 1);

  return transactions
    .filter(t => 
      t.type === 'expense' && 
      t.category === category &&
      isDateInRange(parseDate(t.date), monthStart, monthEnd)
    )
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getTransactionsByCategory = (transactions: Transaction[], month: string) => {
  const [year, monthNum] = month.split('-').map(Number);
  const monthStart = getStartOfMonth(year, monthNum - 1);
  const monthEnd = getEndOfMonth(year, monthNum - 1);

  const monthTransactions = transactions.filter(transaction => {
    const transactionDate = parseDate(transaction.date);
    return isDateInRange(transactionDate, monthStart, monthEnd);
  });

  const categoryTotals = monthTransactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    acc[category][type] += amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  return Object.entries(categoryTotals).map(([category, totals]) => ({
    category,
    income: totals.income,
    expense: totals.expense,
    net: totals.income - totals.expense,
  }));
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

export const parseAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[^0-9.]/g, ''));
}; 