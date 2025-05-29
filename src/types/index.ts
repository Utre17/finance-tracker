export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  month: string; // YYYY-MM format
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface MonthlyData {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactions: Transaction[];
  budgets: Budget[];
}

export interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  darkMode: boolean;
  selectedMonth: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface BudgetFormData {
  category: string;
  amount: string;
}

export interface FilterOptions {
  type?: 'income' | 'expense' | 'all';
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
} 