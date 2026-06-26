# E-commerce Test Automation Framework

End-to-end BDD test automation for an e-commerce site using Playwright, TypeScript, and Cucumber.

## Prerequisites

- Node.js 18+

## Setup

```bash
npm install
npx playwright install
cp .env.example .env   # fill in test credentials
```

## Running Tests

```bash
npm test               # headless
npm run test:headed    # with visible browser
```

## Project Structure

```
src/
├── features/          # Gherkin .feature files with test scenarios (Given/When/Then)
├── step-definitions/  # TypeScript implementations that map each Gherkin step to Playwright actions
├── pages/             # Page Object classes — each page/component has its own class with locators and methods
│   └── components/    # Reusable UI components shared across pages (e.g. header)
└── support/
    ├── hooks.ts       # Cucumber lifecycle hooks — browser setup/teardown, screenshot on failure
    └── world.ts       # Shared state between steps (holds the browser page and test data)
```

## Test Scope

The test suite covers the three most critical e-commerce user flows: **Authentication** (login/logout), **Product Catalog** (browsing, sorting), and **Shopping Cart** (add, view, remove items). These represent the core purchase funnel — from account access through product discovery to conversion intent.

## Reports

After running tests, open:

```
reports/html/cucumber-report.html
on terminal: start reports\html\cucumber-report.html

```

Failed scenarios automatically include a screenshot in the report.
