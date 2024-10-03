const XLSX = require('xlsx')

// Load team details from excel file
function loadTeamData() {
    const workbook = XLSX.readFile('E:\\Users\\MMadhusoodanan\\Desktop\\PoC_259\\testdata\\data.xlsx')
    const sheet = workbook.Sheets['teamdetails']
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}

// Load list of clubs from excel file
function loadClubData() {
    const workbook = XLSX.readFile('E:\\Users\\MMadhusoodanan\\Desktop\\PoC_259\\testdata\\data.xlsx')
    const sheet = workbook.Sheets['clublist']
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}

// Load affiliation status from excel file
function loadStatusData() {
    const workbook = XLSX.readFile('E:\\Users\\MMadhusoodanan\\Desktop\\PoC_259\\testdata\\data.xlsx')
    const sheet = workbook.Sheets['affiliationstatus']
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}

module.exports = { loadTeamData, loadClubData, loadStatusData };
