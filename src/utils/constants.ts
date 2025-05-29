import { Category } from '../types';

export const EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'UtensilsCrossed' },
  { id: '2', name: 'Transportation', type: 'expense', color: '#3b82f6', icon: 'Car' },
  { id: '3', name: 'Entertainment', type: 'expense', color: '#8b5cf6', icon: 'Gamepad2' },
  { id: '4', name: 'Shopping', type: 'expense', color: '#f59e0b', icon: 'ShoppingBag' },
  { id: '5', name: 'Healthcare', type: 'expense', color: '#10b981', icon: 'Heart' },
  { id: '6', name: 'Education', type: 'expense', color: '#6366f1', icon: 'GraduationCap' },
  { id: '7', name: 'Bills & Utilities', type: 'expense', color: '#dc2626', icon: 'Receipt' },
  { id: '8', name: 'Travel', type: 'expense', color: '#0891b2', icon: 'Plane' },
  { id: '9', name: 'Personal Care', type: 'expense', color: '#ec4899', icon: 'Sparkles' },
  { id: '10', name: 'Other', type: 'expense', color: '#6b7280', icon: 'MoreHorizontal' },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: '11', name: 'Salary', type: 'income', color: '#059669', icon: 'Briefcase' },
  { id: '12', name: 'Freelance', type: 'income', color: '#0d9488', icon: 'Laptop' },
  { id: '13', name: 'Investment', type: 'income', color: '#7c3aed', icon: 'TrendingUp' },
  { id: '14', name: 'Business', type: 'income', color: '#ea580c', icon: 'Building2' },
  { id: '15', name: 'Other Income', type: 'income', color: '#6b7280', icon: 'Plus' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const CURRENCY_SYMBOL = '$';

export const LOCAL_STORAGE_KEYS = {
  TRANSACTIONS: 'finance-tracker-transactions',
  BUDGETS: 'finance-tracker-budgets',
  DARK_MODE: 'finance-tracker-dark-mode',
  SELECTED_MONTH: 'finance-tracker-selected-month',
} as const; 