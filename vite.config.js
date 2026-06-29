import viteConfig from '@brybrant/vite-config';

import threeMinifyPlugin from 'rollup-plugin-three-minify';

export default viteConfig({
  base: '/kaleidoscope/',
  plugins: [
    threeMinifyPlugin({
      features: ['clipping', 'colorspace', 'vertices'],
    }),
  ],
});
