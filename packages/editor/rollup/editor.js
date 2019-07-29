import path from 'path';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import sourcemaps from 'rollup-plugin-sourcemaps';

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

export default function createConfig(format) {
  return {
    input: resolvePath('../src/index.ts'),
    output: {
      format,
      sourcemap: true,
      file: `dist/${format}/index.js`,
      name: 'TemplateEditor'
    },
    plugins: [
      typescript(),
      copy({
        targets: [
          {
            src: resolvePath('../src/index.d.ts'),
            dest: 'dist/' + format,
          },
          {
            src: resolvePath('../package.json'),
            dest: 'dist'
          },
          {
            src: resolvePath('../README.md'),
            dest: 'dist'
          }
        ]
      }),
      sourcemaps()
    ]
  }
}
