var SimpleTest_Samples = require("SimpleTest_Samples");

function MainTestParallelEnvironmentsExecution() {

  /* This sample demonstrates how to run one test in parallel across three environments. */
  
  const tests = ['Script|SimpleTest_Samples|SimpleWebTest_CurrentBrowser'];
  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";
  const browser_caps = [
    '{ "platform": "Windows 10",  "browserName": "Chrome",  "version": "80x64", "screenResolution": "1920x1080"}',
    '{ "platform": "Mac OSX 10.15", "browserName": "Firefox",  "version": "77x64",  "screenResolution": "1366x768"}',
    '{ "deviceName": "iPhone X Simulator", "platformName": "iOS", "platformVersion": "11.0", "browserName": "Safari", "deviceOrientation": "portrait"}'];
  
  const server = "http://hub.crossbrowsertesting.com:80/wd/hub";
  
  Parallel.RunEnvironments(tests, browser_caps, url, server);
}


function TestOne()
{
  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";
  remote_cap = {
    "platform": "Windows 10", 
    "browserName": "Chrome", 
    "version": "80x64", 
    "screenResolution": "1920x1080"
  };
  
  SimpleTest_Samples.OpenWebStoreRemote(url, remote_cap);
  SimpleTest_Samples.SimpleWebTest_CurrentBrowser();
}


function TestTwo()
{
  const url = "https://services.smartbear.com/samples/TestComplete15/smartstore";
  var remote_cap = {
    "platform": "Mac OSX 10.15", 
    "browserName": "Chrome", 
    "version": "85", 
    "screenResolution": "1024x768"
  };
  SimpleTest_Samples.OpenWebStoreRemote(url, remote_cap);
  SimpleTest_Samples.SimpleWebTest_CurrentBrowser();
}


function MainTestParallelExecution() {

  /* This sample demonstrates how to run one test in parallel across three environments. */

  const tests = ['Script|ParallelTest_Samples|TestOne', 'Script|ParallelTest_Samples|TestTwo'];
  Parallel.RunTests(tests);
}