const shared = require('@aurora/config/tailwind');

module.exports = {
  ...shared,
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}'
  ]
};
