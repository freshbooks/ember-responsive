import baseConfig from '@ijlee2-frontend-configs/eslint-config-ember/v2-addon';

export default [
  ...baseConfig,
  {
    // Blueprints are CommonJS run by ember-cli in Node.
    files: ['blueprints/*/index.js'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        module: 'writable',
        require: 'readonly',
      },
      sourceType: 'commonjs',
    },
  },
];
