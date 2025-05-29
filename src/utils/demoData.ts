import { Transaction } from '../types';

export const generateDemoData = (): Transaction[] => {
  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const createdAt = new Date().toISOString();

  const demoTransactions: Transaction[] = [
    // Income transactions
    {
      id: 'demo-1',
      type: 'income',
      amount: 5500,
      category: 'Salary',
      description: 'Monthly salary - Software Developer',
      date: `${currentMonth}-01`,
      createdAt,
    },
    {
      id: 'demo-2',
      type: 'income',
      amount: 1200,
      category: 'Freelance',
      description: 'Web development project',
      date: `${currentMonth}-15`,
      createdAt,
    },
    {
      id: 'demo-3',
      type: 'income',
      amount: 250,
      category: 'Investment',
      description: 'Dividend payment',
      date: `${currentMonth}-10`,
      createdAt,
    },

    // Expense transactions
    {
      id: 'demo-4',
      type: 'expense',
      amount: 1200,
      category: 'Bills & Utilities',
      description: 'Rent payment',
      date: `${currentMonth}-01`,
      createdAt,
    },
    {
      id: 'demo-5',
      type: 'expense',
      amount: 450,
      category: 'Food & Dining',
      description: 'Groceries and dining out',
      date: `${currentMonth}-03`,
      createdAt,
    },
    {
      id: 'demo-6',
      type: 'expense',
      amount: 280,
      category: 'Transportation',
      description: 'Gas and car maintenance',
      date: `${currentMonth}-05`,
      createdAt,
    },
    {
      id: 'demo-7',
      type: 'expense',
      amount: 150,
      category: 'Entertainment',
      description: 'Netflix, Spotify, movies',
      date: `${currentMonth}-07`,
      createdAt,
    },
    {
      id: 'demo-8',
      type: 'expense',
      amount: 320,
      category: 'Shopping',
      description: 'Clothing and electronics',
      date: `${currentMonth}-12`,
      createdAt,
    },
    {
      id: 'demo-9',
      type: 'expense',
      amount: 180,
      category: 'Healthcare',
      description: 'Doctor visit and pharmacy',
      date: `${currentMonth}-14`,
      createdAt,
    },
    {
      id: 'demo-10',
      type: 'expense',
      amount: 95,
      category: 'Bills & Utilities',
      description: 'Internet and phone bill',
      date: `${currentMonth}-16`,
      createdAt,
    },
    {
      id: 'demo-11',
      type: 'expense',
      amount: 220,
      category: 'Food & Dining',
      description: 'Restaurant meals',
      date: `${currentMonth}-18`,
      createdAt,
    },
    {
      id: 'demo-12',
      type: 'expense',
      amount: 75,
      category: 'Personal Care',
      description: 'Haircut and toiletries',
      date: `${currentMonth}-20`,
      createdAt,
    },
    {
      id: 'demo-13',
      type: 'expense',
      amount: 120,
      category: 'Education',
      description: 'Online course subscription',
      date: `${currentMonth}-22`,
      createdAt,
    },
    {
      id: 'demo-14',
      type: 'expense',
      amount: 200,
      category: 'Entertainment',
      description: 'Concert tickets',
      date: `${currentMonth}-25`,
      createdAt,
    },
    {
      id: 'demo-15',
      type: 'expense',
      amount: 300,
      category: 'Travel',
      description: 'Weekend trip',
      date: `${currentMonth}-28`,
      createdAt,
    },
  ];

  return demoTransactions;
};

export const DEMO_FEATURES = [
  '💰 Multiple income sources (Salary, Freelance, Investments)',
  '📊 Diverse expense categories with realistic amounts',
  '📈 Interactive charts showing spending patterns',
  '🎯 Professional financial tracking interface',
  '🌙 Dark/Light mode for optimal viewing',
  '📱 Fully responsive design for all devices',
];

export const isDemoMode = (): boolean => {
  return localStorage.getItem('finance-tracker-demo-mode') === 'true';
};

export const enableDemoMode = (): void => {
  localStorage.setItem('finance-tracker-demo-mode', 'true');
};

export const disableDemoMode = (): void => {
  localStorage.removeItem('finance-tracker-demo-mode');
}; 