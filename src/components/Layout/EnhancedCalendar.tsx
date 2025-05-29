import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths } from 'date-fns';

interface EnhancedCalendarProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const EnhancedCalendar: React.FC<EnhancedCalendarProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  // Parse the current selected month (YYYY-MM format)
  const currentDate = new Date(selectedMonth + '-01');
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

  const handlePreviousMonth = () => {
    setDirection(-1);
    const previousMonth = subMonths(currentDate, 1);
    onMonthChange(format(previousMonth, 'yyyy-MM'));
  };

  const handleNextMonth = () => {
    setDirection(1);
    const nextMonth = addMonths(currentDate, 1);
    onMonthChange(format(nextMonth, 'yyyy-MM'));
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentMonthIndex, 1);
    onMonthChange(format(newDate, 'yyyy-MM'));
    setIsYearPickerOpen(false);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    onMonthChange(format(newDate, 'yyyy-MM'));
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
      years.push(year);
    }
    return years;
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Main Calendar Display */}
      <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
        <CalendarIcon />
        
        {/* Previous Month Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePreviousMonth}
          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronLeftIcon />
        </motion.button>

        {/* Month/Year Display */}
        <div className="flex items-center space-x-2 min-w-[140px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedMonth}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="flex items-center space-x-1"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {format(currentDate, 'MMMM')}
              </span>
              <button
                onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                {currentYear}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Month Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextMonth}
          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronRightIcon />
        </motion.button>
      </div>

      {/* Year Picker Dropdown */}
      <AnimatePresence>
        {isYearPickerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 p-4 min-w-[280px]"
          >
            {/* Year Selection */}
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Year
              </h4>
              <div className="grid grid-cols-3 gap-1">
                {generateYearOptions().map((year) => (
                  <motion.button
                    key={year}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleYearSelect(year)}
                    className={`p-2 text-xs rounded-md transition-colors ${
                      year === currentYear
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Month Selection */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Month
              </h4>
              <div className="grid grid-cols-3 gap-1">
                {months.map((month, index) => (
                  <motion.button
                    key={month}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMonthSelect(index)}
                    className={`p-2 text-xs rounded-md transition-colors ${
                      index === currentMonthIndex
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {month}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const today = new Date();
                    onMonthChange(format(today, 'yyyy-MM'));
                    setIsYearPickerOpen(false);
                  }}
                  className="flex-1 p-2 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                >
                  This Month
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsYearPickerOpen(false)}
                  className="flex-1 p-2 text-xs bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-md transition-colors text-primary-700 dark:text-primary-300"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedCalendar; 