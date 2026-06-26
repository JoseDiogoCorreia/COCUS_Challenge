# E-commerce Test Automation Framework

End-to-end BDD test automation for an e-commerce site using Playwright, TypeScript, and Cucumber.

## Prerequisites

- Node.js 18+

## Dependencies

| Package | Purpose |
|---------|---------|
| playwright | Browser automation engine |
| @cucumber/cucumber | BDD test runner with Gherkin support |
| typescript | Type-safe code with compile-time checks |
| ts-node | Run TypeScript directly without a build step |
| dotenv | Load environment variables from .env file |
| cross-env | Set environment variables across platforms |

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target site URL (default: https://www.saucedemo.com) |
| `TEST_USER_EMAIL` | Login username for authentication tests |
| `TEST_USER_PASSWORD` | Login password for authentication tests |
| `HEADLESS` | Run browser without UI (`true`/`false`) |

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

The test suite covers the three most critical e-commerce user flows:

- **Authentication** (login/logout) — Validates session management, which gates access to all personalised features. A broken login means zero conversions.
- **Product Catalog** (browsing, sorting) — Covers the product discovery funnel. If users can't find products, they can't buy. Sorting validates that the UI correctly reflects backend data.
- **Shopping Cart** (add, view, remove) — Tests the core conversion path where browsing intent becomes purchase intent. Cart integrity (correct items, quantities) directly impacts revenue.

## Reports

After running tests, open the HTML report:

```bash
# Windows
start reports\html\cucumber-report.html

# macOS / Linux
open reports/html/cucumber-report.html
```

Failed scenarios automatically include a screenshot in the report.

**Google Drive report link:** [TODO: Add link after uploading reports]
