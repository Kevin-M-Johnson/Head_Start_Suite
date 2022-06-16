// This example works with the sample Xamarin.Forms Orders application.
// You can find its source code in the following folder:
//   <TestComplete Samples>/Mobile/Xamarin.Forms/Orders/Orders/
//
// BEFORE running the example:
//
//  1. Make certain that the compiled sample Android Orders application is located here: 
//   <TestComplete Samples>/Mobile/Xamarin.Forms/Orders/TCProjects/Apps/Orders.Orders-Signed.apk
// 
//  2. Compile the sample iOS Orders application: 
//   * Compile the sample application on a Mac computer.
//   * Copy the compiled .ipa file to the following folder:
//        <TestComplete Samples>/Mobile/Xamarin.Forms/Orders/TCProjects/Apps/OrdersSample.ipa
//   * Check that the Orders item in the TestedApps collection contains 
//     a valid path to the .ipa file.
//
//  3. Connect your Android or/and iOS device/devices to your computer.
//     After that, you can run the test project. The test project will deploy 
//     the tested .ipa or /and .apk file to the device(s) automatically.
//
// Enjoy!

function Main()
{ 
  let xfTests = require('Orders_Xamarin_Forms_JavaScript');
  
  for (let device of Mobile)
  {
    Mobile.SetCurrent(device.DeviceName, device.Index);
    
    let ordersProcess;
    if (device.OSType == "iOS")
    {
      TestedApps.Orders_iOS.Run();
      ordersProcess = Mobile.Device().WaitProcess("OrdersSample", 10000);
    }
    else if (device.OSType == "Android")
    {
      if (device.OSInfo.VersionSDK < 17)
      {
        Log.Message("Newer version of Android is required for this sample. Test will not be executed on Android device with SDK < 17.");
        continue;
      }
      TestedApps.Orders_Android.Run();
      ordersProcess = Mobile.Device().WaitProcess("Orders.Orders", 10000);
    }
    else
    {
      throw "Platform [" + device.OSType + "] not supported.";
    }
        
    // Actions
    xfTests.AddNewOrder(ordersProcess);
    xfTests.EditOrder(ordersProcess, 'Susan McLaren');
    xfTests.DeleteOrder(ordersProcess, "John Black", device.OSType);
  }
  
  if (Mobile.ChildCount == 0)
  {
    Log.Warning("No devices found.");
  }
}