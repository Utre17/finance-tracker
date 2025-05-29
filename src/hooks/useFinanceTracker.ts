import { useState, useEffect, useCallback } from 'react';
import { Transaction, Budget, TransactionFormData, BudgetFormData } from '../types';
import {
  loadTransactions,
  saveTransactions,
  loadBudgets,
  saveBudgets,
  loadDarkMode,
  saveDarkMode,
  loadSelectedMonth,
  saveSelectedMonth,
} from '../utils/storage';
import { generateId, getCurrentMonth, parseAmount, calculateBudgetSpent } from '../utils/helpers';

export const useFinanceTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedTransactions = loadTransactions();
    const loadedBudgets = loadBudgets();
    const loadedDarkMode = loadDarkMode();
    const loadedSelectedMonth = loadSelectedMonth();

    setTransactions(loadedTransactions);
    setBudgets(loadedBudgets);
    setDarkMode(loadedDarkMode);
    setSelectedMonth(loadedSelectedMonth);
    setIsLoading(false);

    // Apply dark mode to document
    if (loadedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoading]);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveBudgets(budgets);
    }
  }, [budgets, isLoading]);

  // Save dark mode preference
  useEffect(() => {
    if (!isLoading) {
      saveDarkMode(darkMode);
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, isLoading]);

  // Save selected month
  useEffect(() => {
    if (!isLoading) {
      saveSelectedMonth(selectedMonth);
    }
  }, [selectedMonth, isLoading]);

  const addTransaction = useCallback((formData: TransactionFormData) => {
    const transaction: Transaction = {
      id: generateId(),
      type: formData.type,
      amount: parseAmount(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      createdAt: new Date().toISOString(),
    };

    setTransactions(prev => [transaction, ...prev]);

    // Update budget spent amount if it's an expense
    if (transaction.type === 'expense') {
      setBudgets(prev => prev.map(budget => {
        if (budget.category === transaction.category && budget.month === selectedMonth) {
          return {
            ...budget,
            spent: calculateBudgetSpent([...transactions, transaction], budget.category, budget.month)
          };
        }
        return budget;
      }));
    }
  }, [transactions, selectedMonth]);

  const updateTransaction = useCallback((id: string, formData: TransactionFormData) => {
    const updatedTransaction: Transaction = {
      id,
      type: formData.type,
      amount: parseAmount(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      createdAt: transactions.find(t => t.id === id)?.createdAt || new Date().toISOString(),
    };

    setTransactions(prev => prev.map(t => t.id === id ? updatedTransaction : t));

    // Update related budgets
    setBudgets(prev => prev.map(budget => ({
      ...budget,
      spent: calculateBudgetSpent(
        transactions.map(t => t.id === id ? updatedTransaction : t),
        budget.category,
        budget.month
      )
    })));
  }, [transactions]);

  const deleteTransaction = useCallback((id: string) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));

    // Update related budgets if it was an expense
    if (transactionToDelete?.type === 'expense') {
      setBudgets(prev => prev.map(budget => {
        if (budget.category === transactionToDelete.category) {
          return {
            ...budget,
            spent: calculateBudgetSpent(
              transactions.filter(t => t.id !== id),
              budget.category,
              budget.month
            )
          };
        }
        return budget;
      }));
    }
  }, [transactions]);

  const addBudget = useCallback((formData: BudgetFormData) => {
    const budget: Budget = {
      id: generateId(),
      category: formData.category,
      amount: parseAmount(formData.amount),
      spent: calculateBudgetSpent(transactions, formData.category, selectedMonth),
      month: selectedMonth,
    };

    setBudgets(prev => [...prev, budget]);
  }, [transactions, selectedMonth]);

  const updateBudget = useCallback((id: string, formData: BudgetFormData) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id 
        ? {
            ...budget,
            category: formData.category,
            amount: parseAmount(formData.amount),
            spent: calculateBudgetSpent(transactions, formData.category, budget.month)
          }
        : budget
    ));
  }, [transactions]);

  const deleteBudget = useCallback((id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const changeSelectedMonth = useCallback((month: string) => {
    setSelectedMonth(month);
  }, []);

  const loadDemoData = useCallback((demoTransactions: Transaction[]) => {
    setTransactions(demoTransactions);
  }, []);

  const clearAllData = useCallback(() => {
    setTransactions([]);
    setBudgets([]);
  }, []);

  return {
    // State
    transactions,
    budgets,
    darkMode,
    selectedMonth,
    isLoading,
    
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    toggleDarkMode,
    changeSelectedMonth,
    loadDemoData,
    clearAllData,
  };
}; 