import { Transaction } from '../types';
import { format } from 'date-fns';

export interface ExportData {
  transactions: Transaction[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    period: string;
  };
}

export const exportToCSV = (data: ExportData): void => {
  const csvHeaders = [
    'Date',
    'Type',
    'Category',
    'Description',
    'Amount',
    'Created At'
  ];

  const csvRows = data.transactions.map(transaction => [
    transaction.date,
    transaction.type,
    transaction.category,
    `"${transaction.description}"`, // Wrap in quotes to handle commas
    transaction.amount.toString(),
    format(new Date(transaction.createdAt), 'yyyy-MM-dd HH:mm:ss')
  ]);

  // Add summary row
  csvRows.push([]);
  csvRows.push(['Summary']);
  csvRows.push(['Total Income', '', '', '', data.summary.totalIncome.toString(), '']);
  csvRows.push(['Total Expenses', '', '', '', data.summary.totalExpenses.toString(), '']);
  csvRows.push(['Balance', '', '', '', data.summary.balance.toString(), '']);
  csvRows.push(['Period', data.summary.period, '', '', '', '']);

  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');

  downloadFile(csvContent, `finance-tracker-${data.summary.period}.csv`, 'text/csv');
};

export const exportToJSON = (data: ExportData): void => {
  const jsonData = {
    exportDate: new Date().toISOString(),
    period: data.summary.period,
    summary: data.summary,
    transactions: data.transactions,
    meta: {
      version: '1.0',
      format: 'finance-tracker-export'
    }
  };

  const jsonContent = JSON.stringify(jsonData, null, 2);
  downloadFile(jsonContent, `finance-tracker-${data.summary.period}.json`, 'application/json');
};

export const generateReport = (data: ExportData): string => {
  const { transactions, summary } = data;
  
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // Category breakdowns
  const incomeByCategory = incomeTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const expensesByCategory = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const report = `
# Financial Report - ${summary.period}

## Summary
- **Total Income**: $${summary.totalIncome.toFixed(2)}
- **Total Expenses**: $${summary.totalExpenses.toFixed(2)}
- **Net Balance**: $${summary.balance.toFixed(2)}
- **Transaction Count**: ${transactions.length}

## Income Breakdown
${Object.entries(incomeByCategory)
  .sort(([,a], [,b]) => b - a)
  .map(([category, amount]) => `- **${category}**: $${amount.toFixed(2)}`)
  .join('\n')}

## Expense Breakdown
${Object.entries(expensesByCategory)
  .sort(([,a], [,b]) => b - a)
  .map(([category, amount]) => `- **${category}**: $${amount.toFixed(2)}`)
  .join('\n')}

## Recent Transactions
${transactions
  .slice(-10)
  .reverse()
  .map(t => `- ${t.date} | ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)} | ${t.category} | ${t.description}`)
  .join('\n')}

---
Generated on ${format(new Date(), 'PPP')} by Finance Tracker
`;

  return report.trim();
};

export const exportToMarkdown = (data: ExportData): void => {
  const report = generateReport(data);
  downloadFile(report, `finance-report-${data.summary.period}.md`, 'text/markdown');
};

const downloadFile = (content: string, filename: string, contentType: string): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export const importFromJSON = (file: File): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate the JSON structure
        if (!data.transactions || !Array.isArray(data.transactions)) {
          throw new Error('Invalid file format: transactions array not found');
        }
        
        // Validate each transaction
        const transactions = data.transactions.map((t: any, index: number) => {
          if (!t.id || !t.type || !t.amount || !t.category || !t.description || !t.date) {
            throw new Error(`Invalid transaction at index ${index}: missing required fields`);
          }
          
          return {
            id: t.id,
            type: t.type,
            amount: Number(t.amount),
            category: t.category,
            description: t.description,
            date: t.date,
            createdAt: t.createdAt || new Date().toISOString()
          } as Transaction;
        });
        
        resolve(transactions);
      } catch (error) {
        reject(new Error(`Failed to parse JSON file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}; 