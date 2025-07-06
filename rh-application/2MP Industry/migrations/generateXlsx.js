const fs = require('fs');
const XLSX = require('xlsx');

// Read and parse the JSON file
const rawData = fs.readFileSync('data.json');
const communes = JSON.parse(rawData);

// Group data by wilaya and daira
const wilayas = communes.reduce((acc, commune) => {
    const wilayaKey = `${commune.wilaya_code} ${commune.wilaya_name}`;
    const dairaName = commune.daira_name;

    if (!acc[wilayaKey]) {
        acc[wilayaKey] = {};
    }

    if (!acc[wilayaKey][dairaName]) {
        acc[wilayaKey][dairaName] = [];
    }

    acc[wilayaKey][dairaName].push(commune.commune_name);
    return acc;
}, {});

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Process each wilaya
Object.entries(wilayas).forEach(([wilayaName, dairas]) => {
    // Convert dairas object to array of {daira, communes}
    const dairaList = Object.entries(dairas).map(([daira, communes]) => ({
        daira,
        communes
    }));

    // Find maximum number of communes in any daira
    const maxCommunes = Math.max(...dairaList.map(d => d.communes.length));

    // Build worksheet data
    const wsData = [
        dairaList.map(d => d.daira) // Header row with daira names
    ];

    for (let i = 0; i < maxCommunes; i++) {
        wsData.push(
            dairaList.map(d => d.communes[i] || '')
        );
    }

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, ws, wilayaName);
});

// Write the workbook to file
XLSX.writeFile(workbook, 'wilayas.xlsx');