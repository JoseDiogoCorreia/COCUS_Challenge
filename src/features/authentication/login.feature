@authentication
Feature: User Authentication
  As a user
  I want to log in and out of SauceDemo
  So that I can access the product inventory

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be on the inventory page

  Scenario: Failed login with invalid credentials
    When I login with username "invalid_user" and password "wrong_pass"
    Then I should see the error message "Username and password do not match any user in this service"

  Scenario: Login with locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see the error message "Sorry, this user has been locked out"

  Scenario: Login with empty credentials
    When I login with username "" and password ""
    Then I should see the error message "Username is required"

  @smoke
  Scenario: Successful logout
    When I login with username "standard_user" and password "secret_sauce"
    And I logout
    Then I should be on the login page
