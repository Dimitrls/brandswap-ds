import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/bundle.ts' },
  format: ['cjs', 'esm'],
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.modern.js',
    };
  },
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  clean: true,
  sourcemap: true,
  injectStyle: false,
});
