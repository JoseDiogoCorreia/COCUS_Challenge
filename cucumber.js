module.exports = {
  default: {
    require: ['src/step-definitions/**/*.ts', 'src/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/json/cucumber-report.json',
      'html:reports/html/cucumber-report.html',
    ],
    paths: ['src/features/**/*.feature'],
  },
};
