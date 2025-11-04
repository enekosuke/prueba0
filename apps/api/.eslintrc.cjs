module.exports = {
  extends: ['../../packages/config/eslint.cjs'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
};
