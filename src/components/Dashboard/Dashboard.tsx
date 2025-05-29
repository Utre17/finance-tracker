import React, { useState } from 'react';
import { Transaction, TransactionFormData } from '../../types';
import { getMonthlyData, formatMonthYear } from '../../utils/helpers';
import { useFinanceTracker } from '../../hooks/useFinanceTracker';
import { motion } from 'framer-motion';
import { generateDemoData } from '../../utils/demoData';
import Header from '../Layout/Header';
import DemoBanner from '../Layout/DemoBanner';
import SummaryCards from './SummaryCards';
import ExpenseChart from './ExpenseChart';
import TransactionForm from '../Forms/TransactionForm';
import TransactionList from '../Transactions/TransactionList';

// Simple icon component
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Dashboard: React.FC = () => {
  const {
    transactions,
    budgets,
    darkMode,
    selectedMonth,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    toggleDarkMode,
    changeSelectedMonth,
    loadDemoData,
    clearAllData,
  } = useFinanceTracker();

  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Get monthly data for the selected month
  const monthlyData = getMonthlyData(transactions, budgets, selectedMonth);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsTransactionFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleTransactionSubmit = (formData: TransactionFormData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
    } else {
      addTransaction(formData);
    }
    setIsTransactionFormOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseForm = () => {
    setIsTransactionFormOpen(false);
    setEditingTransaction(null);
  };

  const handleLoadDemoData = () => {
    const demoData = generateDemoData();
    loadDemoData(demoData);
  };

  const handleClearData = () => {
    clearAllData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        selectedMonth={selectedMonth}
        onMonthChange={changeSelectedMonth}
        exportData={{
          transactions: monthlyData.transactions,
          summary: {
            totalIncome: monthlyData.totalIncome,
            totalExpenses: monthlyData.totalExpenses,
            balance: monthlyData.balance,
            period: selectedMonth,
          },
        }}
      />

      {/* Portfolio Demo Banner */}
      <DemoBanner
        onLoadDemoData={handleLoadDemoData}
        onClearData={handleClearData}
        hasExistingData={transactions.length > 0}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Title */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatMonthYear(selectedMonth)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Financial overview for the selected month
            </p>
          </div>
          
          {/* Add Transaction Button */}
          <button
            onClick={handleAddTransaction}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          totalIncome={monthlyData.totalIncome}
          totalExpenses={monthlyData.totalExpenses}
          balance={monthlyData.balance}
        />

        {/* Expense Analytics Chart */}
        {monthlyData.transactions.filter(t => t.type === 'expense').length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <ExpenseChart
              transactions={monthlyData.transactions}
              totalExpenses={monthlyData.totalExpenses}
            />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction List - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={monthlyData.transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </div>

          {/* Sidebar - Quick Stats and Future Features */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Transactions
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {monthlyData.transactions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Avg. Transaction
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${monthlyData.transactions.length > 0 
                      ? ((monthlyData.totalIncome + monthlyData.totalExpenses) / monthlyData.transactions.length).toFixed(2)
                      : '0.00'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Income Transactions
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {monthlyData.transactions.filter(t => t.type === 'income').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Expense Transactions
                  </span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {monthlyData.transactions.filter(t => t.type === 'expense').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Status Card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Features
              </h3>
              <div className="space-y-3 text-sm">
                {/* Completed Features */}
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>✓ Interactive Charts</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>✓ Expense Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>✓ Data Export (CSV/JSON)</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>✓ Advanced Filtering</span>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-600 my-3"></div>
                
                {/* Upcoming Features */}
                <div className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">
                  Coming Soon
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Budget Goals & Alerts</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Recurring Transactions</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Mobile App</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Multi-Currency Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message for Empty State */}
        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to Finance Tracker!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start managing your finances by adding your first transaction. Track your income and expenses to get insights into your spending habits.
              </p>
              <button
                onClick={handleAddTransaction}
                className="btn-primary"
              >
                Add Your First Transaction
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isTransactionFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleTransactionSubmit}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default Dashboard; 