function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('JSON').addItem('Convert active spreadsheet', 'convertActiveSpreadsheet').addToUi();
}

function convertActiveSpreadsheet() {
  var result={};
  var tableName = SpreadsheetApp.getActiveSheet().getName();
  var data = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  var dataJSON = makeJSON(data, tableName);
  displayJSON(dataJSON);
}

function makeJSON(data, tableName) {
  res = {};
  keys = data[0];
  content = [];
  for (var i=1; i<data.length; i++) {
    obj = {};
    keys.forEach((key, ind) => {
      obj[key] = data[i][ind];
    });
    content.push(obj);
  }
  res[tableName] = content;
  return JSON.stringify(res, null, "\t");
}

function displayJSON(text) {
  var output = HtmlService.createHtmlOutput("<textarea style='width:100%;' rows='30'>" + text + "</textarea>");
  output.setWidth(700)
  output.setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(output, 'JSON output');
}