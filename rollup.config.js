import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import litcss from 'rollup-plugin-lit-css-ex';

const isProd = process.env.NODE_ENV == 'production';

function buildConfig(inputName, format) {
  const isCjs = format === 'cjs';
  const plugins = [json(), typescript()];
  if (!isCjs) {
    plugins.push(
      nodeResolve({
        browser: true,
        extensions: ['.js', '.json', '.css'],
      }),
      commonjs(),
      litcss(),
    );
  }

  if (isProd) {
    plugins.push(terser());
  }

  return {
    input: [`src/${inputName}/${inputName}.ts`],
    output: {
      dir: 'dist',
      format,
      sourcemap: true,
    },
    plugins,
  };
}

export default [buildConfig('main', 'cjs'), buildConfig('renderer', 'iife')];
