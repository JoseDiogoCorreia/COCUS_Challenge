@catalog
Feature: Product Browsing
  As a logged in user
  I want to browse and view products
  So that I can find items to purchase

  Background:
    Given I am logged in

  @smoke
  Scenario: View product inventory
    Then I should see at least 1 product displayed
    And each product should show a name and price

  Scenario: View product detail page
    When I select the first product
    Then I should see the product name
    And I should see the product price
    And I should see the product description
    And I should see the product image

  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then the products should be sorted by price ascending

  Scenario: Sort products by name A to Z
    When I sort products by "Name (A to Z)"
    Then the products should be sorted by name ascending
