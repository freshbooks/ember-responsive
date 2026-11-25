// Used by ESLint. Rollup builds with babel.publish.config.mjs, which adds the
// async template-compilation plugins that ESLint's sync Babel call can't load.
export default {
  plugins: [
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: 'decorator-transforms/runtime-esm',
        },
      },
    ],
  ],
};
