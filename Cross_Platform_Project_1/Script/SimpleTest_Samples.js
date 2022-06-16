
function MainTestLocal() {
  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";
  OpenWebStoreLocal(url);
  SimpleWebTest_CurrentBrowser();
}

function MainTestRemote() {
  
  /* IMPORTANT:
     To run this test in the CrossBrowserTesting cloud, you need to log in to that cloud.

     To specify the credentials:
       - Go to the Project Explorer (on the left of the TestComplete window).
       - Double-click the project node there. This will open the project editor.
       - Switch to the Properties tab, and go to "Open Applications > Web Testing > CrossBrowserTesting" in the option tree on the left.   
       - Click "Get Credentials from CBT", and then specify your CBT user name and password in the subsequent dialog.
         If you don't have a CBT account, click "Try Free Trial" in the dialog to create a trial account.      
  */

  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";
  default_remote_cap = {
    "platform": "Windows 10", 
    "browserName": "Chrome", 
    "version": "80x64", 
    "screenResolution": "1920x1080"
  };
  
  OpenWebStoreRemote(url, default_remote_cap);
  SimpleWebTest_CurrentBrowser();
}

function MainTestRemoteLoop() {

  /* IMPORTANT:
     To run this test in the CrossBrowserTesting cloud, you need to log in to that cloud.

     To specify the credentials:
       - Go to the Project Explorer (on the left of the TestComplete window).
       - Double-click the project node there. This will open the project editor.
       - Switch to the Properties tab, and go to "Open Applications > Web Testing > CrossBrowserTesting" in the option tree on the left.   
       - Click "Get Credentials from CBT", and then specify your CBT user name and password in the subsequent dialog.
         If you don't have a CBT account, click "Try Free Trial" in the dialog to create a trial account.      
  */

  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";   
  const browser_caps = [
    {
      "platform": "Windows 10", 
      "browserName": "Chrome", 
      "version": "80x64", 
      "screenResolution": "1920x1080"
    },    
    {
      "platform": "Mac OSX 10.15", 
      "browserName": "Firefox", 
      "version": "77x64", 
      "screenResolution": "1366x768"
    },
    {
      "deviceName": "iPhone X Simulator", 
      "platformName": "iOS", 
      "platformVersion": "11.0", 
      "browserName": "Safari", 
      "deviceOrientation": "portrait"
    }
  ];

  for (const c in browser_caps) {
    OpenWebStoreRemote(url, browser_caps[c]);
    SimpleWebTest_CurrentBrowser();
    Log.Message("Test with cap " + browser_caps[c]["browserName"] + " finished");
  }   
}



function OpenWebStoreLocal(url){
  Browsers.Item(btIExplorer).Run(url);
}

function OpenWebStoreRemote(url, capabilities) {
  const server = "http://hub.crossbrowsertesting.com:80/wd/hub";
  Browsers.RemoteItem(server, capabilities).Run(url);  
}

function SimpleWebTest_CurrentBrowser() {
  FindProduct("Solar");
  AddToCart();
  VerifyProductPrice("969.0");
  RemoveFromCart();  
  CloseBrowser();  
}

function FindProduct(productName) {
  //Input searching product name at instant search box and click to the matched item
  let page = Aliases.browser.FrontPage;
  let textbox = page.FrontPageSearchBox;
  textbox.Click();
  textbox.SetText(productName);
  page.FrontPageSearchHit.Click();
}

function AddToCart() {
  //Wait until the web page is loaded completely to ensure the next click will be processed correctly by the web page
  let page = Aliases.browser.ProductPage;
  page.Wait();
  page.AddToCartButton.Click();
}

function VerifyProductPrice(price) {
  //Check that contentText property value contains the expected price
  let page = Aliases.browser.ProductPage;
  aqObject.CheckProperty(page.Cart.Subtotal, "contentText", cmpContains, price);
}

function RemoveFromCart() {
  Aliases.browser.ProductPage.Cart.RemoveFromCartLink.Click();
}

function CloseBrowser() {
  Sys.Browser().BrowserWindow(0).Close();
}


module.exports.OpenWebStoreRemote = OpenWebStoreRemote;
module.exports.SimpleWebTest_CurrentBrowser = SimpleWebTest_CurrentBrowser;