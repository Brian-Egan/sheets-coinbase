function onOpen() {
 var menu = SpreadsheetApp.getUi().createMenu('Cryptos Update')
 menu.addItem('Add auto-update timer','timerFromMenu')
 .addToUi(); 
}

function updateTimer() {
  range = createOrFindTimerCell();
  range.setValue(new Date());
}

function createUpdateTimer() {
 ScriptApp.newTrigger('updateTimer')
      .timeBased()
      .everyMinutes(1) // This can be set to 1,5,10, etc..
      .create(); 
}

function timerFromMenu() {
  TIMERCELL = createOrFindTimerCell();
  updateTimer(TIMERCELL);
  createUpdateTimer();
}

function createOrFindTimerCell() {
  var timer_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("timer");
  if (timer_sheet == null) {
    timer_sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("timer");
    timer_sheet.getRange("A1").setValue("Prices last updated at:");
    timer_sheet.setColumnWidth(1, 154);
    timer_sheet.setColumnWidth(2, 160);
    timer_sheet.getRange("B1").setNumberFormat("mm/dd/yyyy hh:mm:ss");
    timer_sheet.hideSheet();
  } 
  SpreadsheetApp.getActiveSpreadsheet().setNamedRange("auto_update", timer_sheet.getRange("B1"));
  return timer_sheet.getRange("B1");
}
