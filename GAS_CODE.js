/**
 * Google Apps Script (GAS) to act as a Headless CMS for Jasuke Studio.
 *
 * Setup Instructions:
 * 1. Sheets that must exist: "Portfolio", "Articles", "IP Ready", "IP In Progress"
 * 2. In Google Sheets, go to Extensions > Apps Script.
 * 3. Paste this code and click Deploy > New Deployment > Web App.
 * 4. Set "Who has access" to "Anyone".
 * 5. Copy the Web App URL and paste it into your .env as VITE_GAS_API_URL.
 * 6. After any change, go to Deploy > Manage Deployments > create a New Deployment.
 */

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const data = {
    portfolio: getSheetData(ss.getSheetByName("Portfolio")),
    articles: getSheetData(ss.getSheetByName("Articles")),
    ip_ready: getSheetData(ss.getSheetByName("IP Ready")),
    ip_in_progress: getSheetData(ss.getSheetByName("IP In Progress")),
    lastUpdated: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Reads all rows from a sheet and returns an array of objects
 * keyed by normalised column headers (lowercase, spaces → underscores).
 */
function getSheetData(sheet) {
  if (!sheet) return [];

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];   // header only – no data

  const headers = rows[0];
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    headers.forEach((header, index) => {
      item[header.toString().toLowerCase().replace(/ /g, "_")] = row[index];
    });
    data.push(item);
  }

  return data;
}
