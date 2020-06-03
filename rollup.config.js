import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import litcss from 'rollup-plugin-lit-css-ex';

const isProd = process.env.NODE_ENV == 'production';

const plugins = [
  nodeResolve({
    browser: true,
    extensions: ['.js', '.json', '.css'],
  }),
  commonjs(),
  json(),
  typescript({ tsconfig: './tsconfig-renderer.json' }),
  litcss(),
];

if (isProd) {
  plugins.push(terser());
}

export default {
  input: ['src/renderer/renderer.ts'],
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true,
  },
  plugins,
};
