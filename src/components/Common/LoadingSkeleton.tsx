import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'card' | 'transaction' | 'chart' | 'text' | 'button';
  count?: number;
  height?: string;
  width?: string;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  count = 1,
  height,
  width,
  className = '',
}) => {
  const pulseAnimation = {
    animate: {
      opacity: [0.6, 1, 0.6],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <motion.div
            {...pulseAnimation}
            className={`bg-gray-200 dark:bg-gray-700 rounded-lg p-6 ${className}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              </div>
              <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </motion.div>
        );

      case 'transaction':
        return (
          <motion.div
            {...pulseAnimation}
            className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          </motion.div>
        );

      case 'chart':
        return (
          <motion.div
            {...pulseAnimation}
            className={`bg-gray-200 dark:bg-gray-700 rounded-lg p-6 ${className}`}
            style={{ height: height || '400px' }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-80">
              <div className="bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
          </motion.div>
        );

      case 'button':
        return (
          <motion.div
            {...pulseAnimation}
            className={`bg-gray-300 dark:bg-gray-600 rounded-md ${className}`}
            style={{ 
              height: height || '40px', 
              width: width || '120px' 
            }}
          />
        );

      case 'text':
      default:
        return (
          <motion.div
            {...pulseAnimation}
            className={`bg-gray-300 dark:bg-gray-600 rounded ${className}`}
            style={{ 
              height: height || '20px', 
              width: width || '100%' 
            }}
          />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={count > 1 ? 'mb-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

// Specific skeleton components for common use cases
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <LoadingSkeleton variant="card" count={count} />
  </div>
);

export const TransactionListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="space-y-3">
    <LoadingSkeleton variant="transaction" count={count} />
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <LoadingSkeleton variant="chart" />
);

export default LoadingSkeleton; 