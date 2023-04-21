const xlsx = require('xlsx');
const fs = require('fs');

const { getAllCommentsWithToilets } = require('../controller/rateController')

const generateExcelReport = async (data, callback) => {
    data = await getAllCommentsWithToilets()

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);

    // Adjust column width to auto-fit the text
    const columns = Object.keys(data[0]);
    const columnWidths = columns.map((_, i) => Math.max(...data.map(row => String(row[columns[i]]).length)));
    worksheet['!cols'] = columnWidths.map(w => ({ wch: w }));

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Report');

    const fileName = 'Report.xlsx';
    xlsx.writeFile(workbook, fileName);

    callback(fileName);
};

module.exports = generateExcelReport;
// http://localhost:3000/report