const XLSX = require('xlsx');
const fs = require('fs');

// Create a new workbook
const wb = XLSX.utils.book_new();

const names = ["Elsie", "Hilary", "Jamie", "Liam"];

// Create data for the worksheet
const ws_data = [
    ["Week Commencing", "Kitchen & Living Room", "Conservatory, Laundry & Hallways/Stairs", "Garden"],
];

const numWeeks = 12;
const startDateStr = getCurrentMondayDate(); // Use the current Monday date for calculations

for (let i = 0; i < numWeeks; i++) {
    const nameIndex1 = i % names.length;
    const nameIndex2 = (i + 1) % names.length;
    const nameIndex3 = (i + 2) % names.length;
    ws_data.push([getNextWeeks(startDateStr, numWeeks)[i],
        names[nameIndex1], names[nameIndex2], (i % 3) === 0 ? names[nameIndex3] : ""]);
}

const ws = XLSX.utils.aoa_to_sheet(ws_data);

XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

XLSX.writeFile(wb, 'example.xlsx');

console.log('Excel file created successfully!');

// Function to get the current Monday's date
function getCurrentMondayDate() {
    const today = new Date();
    const day = today.getDay();
    const daysToMonday = (day === 0) ? 1 : (8 - day) % 7;
    today.setDate(today.getDate() + daysToMonday);
    return today.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
}

// Function to get the start dates of the next weeks
function getNextWeeks(startDateStr, numWeeks) {
    // Parse the starting date
    const startDate = new Date(startDateStr);

    // Array to hold the beginning of each week
    const weeks = [];

    // Calculate the next weeks
    for (let i = 0; i < numWeeks; i++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + i * 7);

        // Format the date as YYYY-MM-DD
        const formattedDate = weekStart.toISOString().split('T')[0];
        weeks.push(formattedDate);
    }

    return weeks;
}
