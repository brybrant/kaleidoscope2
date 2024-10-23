import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint2';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgoPlugin from 'vite-plugin-svgo';

import * as configs from '@brybrant/configs';

export default defineConfig({
  base: '/kaleidoscope2/',
  css: {
    postcss: configs.postCSSConfig,
  },
  plugins: [
    stylelintPlugin({
      lintInWorker: true,
      config: configs.stylelintConfig,
    }),
    eslintPlugin({
      lintInWorker: true,
    }),
    svgoPlugin(configs.svgoConfig),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
  },
});
