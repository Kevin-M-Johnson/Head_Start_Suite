When("I launch website {arg}", function (url){
  Browsers.Item(btIExplorer).Run(url)
});

Given("I have launched the website {arg}", function (url){
  aqObject.CheckProperty(Aliases.Browser.WaitPage(url), "Exists", cmpEqual, true);
});

When("I search for item {arg}", function (product){
  Aliases.Browser.FrontPage.FrontPageSearchBox.SetText(product);
  Aliases.Browser.FrontPage.SearchButton.ClickButton();
});

When("I navigate to the Product page", function (){
  Aliases.Browser.SearchPage.FoundProduct.Click();
});

When("I add the item to the cart", function (){
  //Wait until the web page is loaded completely to ensure the next click will be processed correctly by the web page
  Aliases.Browser.ProductPage.Wait();
  Aliases.Browser.ProductPage.AddToCartButton.ClickButton();
});

Then("the item {arg} must be added to cart", function (product){
  //Check that contentText property value contains the expected product
  aqObject.CheckProperty(Aliases.Browser.ProductPage.Cart, "contentText", cmpContains, product, false);
});

Then("price should equal {arg}", function (price){
  //Check that contentText property value contains the expected price
  aqObject.CheckProperty(Aliases.Browser.ProductPage.Cart.Subtotal, "contentText", cmpContains, price);
});

AfterScenario(function (scenario){
  Aliases.Browser.ProductPage.Cart.RemoveFromCartLink.ClickButton();
  Aliases.Browser.Close();
});
