/*
  This test shows how to simulate user actions on .NET applications.
 
  It runs a C# tested app, loads orders from a file,
  edits an order, creates a new order, and closes the tested app.
*/

// The main test function
function Main()
{
  let process = RunApplication();
  ChangeRecord(process);
  AddRecord(process);
  Close(process);
}

// Run the tested application
function RunApplication()
{
  return TestedApps.Orders.Run();
}

// Close the tested application without saving changes
function Close(process)
{
  let mainForm = process.WinFormsObject('MainForm');
  
  // Close the application
  mainForm.Close(0);
  
  // Answer "No" to the question on saving changes 
  let msgBox = process.Window('#32770', 'Confirmation');
  if (msgBox.Exists)
  {
    msgBox.Window('Button', '&No').ClickButton();
  }
  
  // Wait until the Orders process terminates
  while (process.Exists)
  {
    Delay(100);
  }
}

// Edit an order
function ChangeRecord(process)
{
  let mainForm = process.WaitWinFormsObject('MainForm', 30000);
  let toolBar = mainForm.WinFormsObject('ToolBar');
  
  // Click the "Open" toolbar button
  toolBar.ClickItem(1, false);
  
  // Load orders from a file via the Open File dialog
  let openDlg = process.Window('#32770', 'Open');
  openDlg.OpenFile(Project.Path + '..\\MyTable.tbl');
  
  // Select the "Samuel Clemens" order 
  mainForm.WinFormsObject('OrdersView').ClickItem('Samuel Clemens', 0);
  
  // Click the "Edit" toolbar item
  toolBar.ClickItem(5, false);
  
  // Change order data 
  let orderDlg = process.WinFormsObject('OrderForm'); 
  orderDlg.WinFormsObject('Group').WinFormsObject('ProductNames').ClickItem('FamilyAlbum');
  orderDlg.WinFormsObject('Group').WinFormsObject('CardNo').SetText('123123123123');
  
  // Save changes
  orderDlg.WinFormsObject('ButtonOK').ClickButton();
}

// Create a new order
function AddRecord(process)
{ 
  let mainForm = process.WinFormsObject('MainForm');
  let toolBar = mainForm.WinFormsObject('ToolBar');
  
  // Add a new order
  toolBar.ClickItem(4, false);

  // Enter new order details
  let orderDlg = process.WinFormsObject('OrderForm'); 
  orderDlg.WinFormsObject('Group').WinFormsObject('ProductNames').ClickItem("ScreenSaver");
  orderDlg.WinFormsObject('Group').WinFormsObject('Quantity').wValue = '2';
  orderDlg.WinFormsObject('Group').WinFormsObject('Date').wDate = '11/02/1999';
  orderDlg.WinFormsObject('Group').WinFormsObject('Customer').SetText('David Waters');
  orderDlg.WinFormsObject('Group').WinFormsObject('Street').SetText('3, Music Street');
  orderDlg.WinFormsObject('Group').WinFormsObject('City').SetText('Liverpool');
  orderDlg.WinFormsObject('Group').WinFormsObject('State').SetText('Great Britain');
  orderDlg.WinFormsObject('Group').WinFormsObject('MasterCard').ClickButton();
  orderDlg.WinFormsObject('Group').WinFormsObject('CardNo').SetText('1357902468');
  orderDlg.WinFormsObject('Group').WinFormsObject('ExpDate').wDate = '03/03/2008';
  
  // Save changes
  orderDlg.WinFormsObject('ButtonOK').ClickButton();
}
