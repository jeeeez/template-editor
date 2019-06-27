import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import sourcemaps from 'rollup-plugin-sourcemaps';


export default {
  input: 'packages/editor/src/index.ts',
  output: {
    format: 'cjs',
    sourcemap: true,
    file: 'dist/editor/index.js'
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        {
          src: 'packages/editor/src/index.d.ts',
          dest: 'dist/editor',
        },
        {
          src: 'package.json',
          dest: 'dist'
        }
      ]
    }),
    sourcemaps()
  ]
};
