/**
 * Google Apps Script (GAS) to act as a Headless CMS for Jasuke Studio.
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with 3 tabs: "Portfolio", "Articles", "Original_IP".
 * 2. In Google Sheets, go to Extensions > Apps Script.
 * 3. Paste this code and click Deploy > New Deployment > Web App.
 * 4. Set "Who has access" to "Anyone".
 * 5. Copy the Web App URL and use it in your Next.js/React app.
 */

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const data = {
    portfolio: getSheetData(ss.getSheetByName("Portfolio")),
    articles: getSheetData(ss.getSheetByName("Articles")),
    original_ip: getSheetData(ss.getSheetByName("Original_IP")),
    lastUpdated: new Date().toISOString()
  };
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheetData(sheet) {
  if (!sheet) return [];
  
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const data = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    headers.forEach((header, index) => {
      item[header.toLowerCase().replace(/ /g, "_")] = row[index];
    });
    data.push(item);
  }
  
  return data;
}
