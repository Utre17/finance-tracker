import { Transaction, Budget } from '../types';
import { LOCAL_STORAGE_KEYS } from './constants';

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadTransactions = (): Transaction[] => {
  return loadFromStorage(LOCAL_STORAGE_KEYS.TRANSACTIONS, []);
};

export const saveTransactions = (transactions: Transaction[]): void => {
  saveToStorage(LOCAL_STORAGE_KEYS.TRANSACTIONS, transactions);
};

export const loadBudgets = (): Budget[] => {
  return loadFromStorage(LOCAL_STORAGE_KEYS.BUDGETS, []);
};

export const saveBudgets = (budgets: Budget[]): void => {
  saveToStorage(LOCAL_STORAGE_KEYS.BUDGETS, budgets);
};

export const loadDarkMode = (): boolean => {
  return loadFromStorage(LOCAL_STORAGE_KEYS.DARK_MODE, false);
};

export const saveDarkMode = (darkMode: boolean): void => {
  saveToStorage(LOCAL_STORAGE_KEYS.DARK_MODE, darkMode);
};

export const loadSelectedMonth = (): string => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  return loadFromStorage(LOCAL_STORAGE_KEYS.SELECTED_MONTH, currentMonth);
};

export const saveSelectedMonth = (month: string): void => {
  saveToStorage(LOCAL_STORAGE_KEYS.SELECTED_MONTH, month);
}; 