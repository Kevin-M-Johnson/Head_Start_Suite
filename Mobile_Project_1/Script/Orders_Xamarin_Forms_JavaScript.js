function AddNewOrder(ordersProcess)
{
  let navigationPage = ordersProcess.XFObject("MainPage", "").XFObject("NavigationPage", "Orders");  
  
  // Click 'New'
  let ordersPage = navigationPage.XFObject("OrdersPage", "Orders Sample");
  ordersPage.ToolbarItems.Item(0).OnClicked();
  
  let editItemPage = navigationPage.XFObject("EditItemPage", "New item");
  let editItemPageContent = editItemPage.XFObject("ScrollView", "").XFObject("StackLayout", "");
  
  // Change params
  editItemPageContent.XFObject("ProductNamePicker").TouchItem("Family Album");  // Set product name
  editItemPageContent.XFObject("QuantityEntry").wText     = 50;                     // Set quantity
  editItemPageContent.XFObject("NameEntry").wText         = "John Black";               // Set Customer name
  editItemPageContent.XFObject("StreetEntry").wText       = "Light street";           // Set Customer street
  editItemPageContent.XFObject("CityEntry").wText         = "Rain city";                // Set Customer city
  editItemPageContent.XFObject("StateEntry").wText        = "US";                      // Set Customer state
  editItemPageContent.XFObject("CardNamePicker").TouchItem("Visa");             // Set card
  editItemPageContent.XFObject("CardNumberEntry").wText   = "1324354657";         // Set card number
  editItemPageContent.XFObject("CardDatePicker").wDate    = "2034-07-15";          // Set card expire date
  
  // Click 'Save'
  editItemPage.ToolbarItems.Item(0).OnClicked();
}

function EditOrder(ordersProcess, customerName)
{
  let navigationPage = ordersProcess.XFObject("MainPage", "").XFObject("NavigationPage", "Orders");
  
  // 1. Get orders
  let ordersPage = navigationPage.XFObject("OrdersPage", "Orders Sample");
  let ordersList = ordersPage.XFObject("ScrollView", "").XFObject("Grid", "").XFObject("ItemsListView");
  
  //    Select item
  ordersList.TouchItem(FindItem(ordersList, customerName));
  
  //---
  
  // 2. Get View
  let viewItemPage = navigationPage.XFObject("ViewItemPage", "Edit item");
  
  //    Click 'Edit' item
  viewItemPage.ToolbarItems.Item(0).OnClicked();
  
  //---
  
  // 3. Get Edit
  let editItemPage = navigationPage.XFObject("EditItemPage", "Edit item");
  let editItemPageContent = editItemPage.XFObject("ScrollView", "").XFObject("StackLayout", "");
  
  //    Change params
  editItemPageContent.XFObject("ProductNamePicker").TouchItem("Family Album");
  editItemPageContent.XFObject("QuantityEntry").wText     = 25;
  editItemPageContent.XFObject("NameEntry").wText         = "Tomas";
  editItemPageContent.XFObject("StreetEntry").wText       = "Some street name";
  editItemPageContent.XFObject("CityEntry").wText         = "Some city name";
  editItemPageContent.XFObject("StateEntry").wText        = "Some state";
  editItemPageContent.XFObject("CardNamePicker").TouchItem("Visa");
  editItemPageContent.XFObject("CardNumberEntry").wText   = "987654321";
  editItemPageContent.XFObject("CardDatePicker").wDate    = "2014-03-07";
  
  //    Click 'Save'
  editItemPage.ToolbarItems.Item(0).OnClicked();
}

function DeleteOrder(OrdersProcess, customerName, platform)
{
  let navigationPage = OrdersProcess.XFObject("MainPage", "").XFObject("NavigationPage", "Orders");
  
  // 1. Get orders
  let ordersPage = navigationPage.XFObject("OrdersPage", "Orders Sample");
  let ordersList = ordersPage.XFObject("ScrollView", "").XFObject("Grid", "").XFObject("ItemsListView");
  
  //    Delete order                                                 // 0 - edit, 1 - delete
  ordersList.TemplatedItems.Item(FindItem(ordersList, customerName)).ContextActions.Item(1).OnClicked();
    
  // Dialogs are platform dependant
  if (platform == "iOS")
  {    
    let alertView = OrdersProcess.FindChild(["ObjectType", "wTitle"], ["AlertView", "Orders Demo"], 5);
    alertView.TouchButton("Yes");
  }
  else if(platform == "Android")
  {   
    let yesButton = OrdersProcess.FindChild(["ControlText", "ObjectType", "ViewID"], ["Yes", "Button", "button1"], 5);
    yesButton.Touch();
  }
  else
  {
    throw "Platform [" + platform + "] not supported.";
  }
}

function FindItem(listView, customerName)
{
  for (let i = 0; i < listView.TemplatedItems.Count; i++) 
  {
    if (listView.TemplatedItems.Item(i).View.Children.Item(0).Text == customerName) 
    {
      return i;
    }
  }
  throw "Customer [" + customerName + "] not found.";
}

module.exports.AddNewOrder = AddNewOrder;
module.exports.EditOrder = EditOrder;
module.exports.DeleteOrder = DeleteOrder;