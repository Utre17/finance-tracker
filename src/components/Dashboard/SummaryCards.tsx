import React from 'react';
import { motion } from 'framer-motion';

// Simple icon components
const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TrendingDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const DollarSignIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalIncome,
  totalExpenses,
  balance,
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
  };

  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUpIcon,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-900 dark:text-green-100',
      borderColor: 'border-green-200 dark:border-green-700',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDownIcon,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-900 dark:text-red-100',
      borderColor: 'border-red-200 dark:border-red-700',
    },
    {
      title: 'Balance',
      amount: balance,
      icon: DollarSignIcon,
      bgColor: balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400',
      textColor: balance >= 0 ? 'text-blue-900 dark:text-blue-100' : 'text-orange-900 dark:text-orange-100',
      borderColor: balance >= 0 ? 'border-blue-200 dark:border-blue-700' : 'border-orange-200 dark:border-orange-700',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02, 
              transition: { duration: 0.2 },
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            className={`card p-6 cursor-pointer ${card.bgColor} border-l-4 ${card.borderColor} hover:shadow-lg transition-shadow relative overflow-hidden`}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 dark:to-black/5" />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <motion.p
                  className={`text-3xl font-bold ${card.textColor}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {card.title === 'Balance' && balance < 0 ? '-' : ''}
                  {formatCurrency(card.amount)}
                </motion.p>
              </div>
              <motion.div
                className={`p-3 rounded-full ${card.bgColor} ${card.iconColor}`}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                <IconComponent />
              </motion.div>
            </div>

            {/* Progress indicator for visual appeal */}
            <motion.div
              className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
            >
              <motion.div
                className={`h-full rounded-full ${
                  card.title === 'Total Income' ? 'bg-green-500' :
                  card.title === 'Total Expenses' ? 'bg-red-500' : 
                  balance >= 0 ? 'bg-blue-500' : 'bg-orange-500'
                }`}
                initial={{ width: 0 }}
                animate={{ 
                  width: card.title === 'Balance' ? '100%' : 
                         totalIncome > 0 || totalExpenses > 0 ?
                         Math.min((Math.abs(card.amount) / Math.max(totalIncome, totalExpenses)) * 100, 100) + '%' :
                         '0%'
                }}
                transition={{ 
                  delay: index * 0.1 + 0.7, 
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SummaryCards; 