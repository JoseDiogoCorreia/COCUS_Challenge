@basket
Feature: Shopping Cart
  As a logged in user
  I want to manage items in my cart
  So that I can purchase selected products

  Background:
    Given I am logged in

  @smoke
  Scenario: Add a product to the cart
    When I add the first product to the cart
    Then the cart badge should show 1 item

  Scenario: View cart with product details
    When I add the first product to the cart
    And I navigate to the cart
    Then the cart should display the product name
    And the cart should display the correct quantity

  Scenario: Remove a product from the cart
    When I add the first product to the cart
    And I navigate to the cart
    And I remove the product from the cart
    Then the cart should be empty

  Scenario: Add multiple products to the cart
    When I add the first product to the cart
    And I add the second product to the cart
    Then the cart badge should show 2 items
