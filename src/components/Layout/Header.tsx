import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EnhancedCalendar from './EnhancedCalendar';
import { exportToCSV, exportToJSON, exportToMarkdown, ExportData } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

// Simple icon components to replace lucide-react for now
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const WalletIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 7h-3V6a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v9a3 3 0 0 0 3 3h15a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 4h7a2 2 0 0 1 2 2v1H5a2 2 0 0 1 0-4zm14 10h-4a2 2 0 0 1 0-4h4v4z"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DotsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  exportData?: ExportData;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  selectedMonth,
  onMonthChange,
  exportData,
}) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExport = async (format: 'csv' | 'json' | 'markdown') => {
    if (!exportData) {
      toast.error('No data available for export');
      return;
    }

    try {
      const loadingToast = toast.loading(`Preparing ${format.toUpperCase()} export...`);
      
      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      
      switch (format) {
        case 'csv':
          exportToCSV(exportData);
          toast.success('CSV file downloaded successfully!', { id: loadingToast });
          break;
        case 'json':
          exportToJSON(exportData);
          toast.success('JSON file downloaded successfully!', { id: loadingToast });
          break;
        case 'markdown':
          exportToMarkdown(exportData);
          toast.success('Markdown report downloaded successfully!', { id: loadingToast });
          break;
      }
      
      setIsExportMenuOpen(false);
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
      console.error('Export error:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg"
            >
              <WalletIcon />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Finance Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your personal finances
              </p>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Calendar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <EnhancedCalendar
                selectedMonth={selectedMonth}
                onMonthChange={onMonthChange}
              />
            </motion.div>

            {/* Export Menu */}
            {exportData && exportData.transactions.length > 0 && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                  title="Export Data"
                >
                  <DownloadIcon />
                  <span className="hidden sm:inline text-sm font-medium">Export</span>
                  <DotsIcon />
                </motion.button>

                {/* Export Dropdown */}
                {isExportMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                  >
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleExport('csv')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>📊</span>
                        <div>
                          <div className="font-medium">Export to CSV</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Spreadsheet format</div>
                        </div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleExport('json')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>💾</span>
                        <div>
                          <div className="font-medium">Export to JSON</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Data backup format</div>
                        </div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      onClick={() => handleExport('markdown')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span>📝</span>
                        <div>
                          <div className="font-medium">Generate Report</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Markdown summary</div>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Close export menu when clicking outside */}
      {isExportMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExportMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 