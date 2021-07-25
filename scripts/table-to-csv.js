import XLSX from 'xlsx';

/**
 * Converts XLSX file to CSV
 */

console.log('table-to-csv.js');
const workbook = XLSX.readFile('Papers.xlsx');
XLSX.writeFile(workbook, 'Papers.csv', { bookType: 'csv', forceQuotes: true, RS: '\n' });
console.log('converted to CSV');
