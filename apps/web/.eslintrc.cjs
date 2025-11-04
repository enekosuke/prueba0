module.exports = {
  extends: ['next/core-web-vitals', '../../packages/config/eslint.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: __dirname
      }
    }
  }
};
