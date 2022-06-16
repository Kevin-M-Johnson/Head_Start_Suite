Feature: User is able to successfully add an item to cart on the SmartStore website

  Background:
    When I launch website "https://services.smartbear.com/samples/TestComplete14/smartstore/"

  Scenario: Add item to cart and verify price (simple test)
    Given I have launched the website "https://services.smartbear.com/samples/TestComplete14/smartstore/"
    When I search for item "Chronograph Watch"
    And I navigate to the Product page
    And I add the item to the cart
    Then the item "Chronograph Watch" must be added to cart
    And price should equal "$24,110.00"

  Scenario Outline: Add item to cart and verify price (data-driven test)
    Given I have launched the website "https://services.smartbear.com/samples/TestComplete14/smartstore/"
    When I search for item <item>
    And I navigate to the Product page
    And I add the item to the cart
    Then the item <item> must be added to cart
    And price should equal <price>

    Examples:
      | item              | price       |
      | "Soccer Football" | "$59.90"    |
      | "Airypods"        | "$1,014.00" |
