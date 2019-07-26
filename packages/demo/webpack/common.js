const fs = require('fs');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const stripJsonComments = require('strip-json-comments');

const tslintConfigPath = path.resolve(__dirname, '../../../tsconfig.json');
const tslintConfigStr = fs.readFileSync(tslintConfigPath).toString();
const { compilerOptions } = JSON.parse(stripJsonComments(tslintConfigStr));



module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve('../src'),
      '@shuyun-ep-team/template-editor': path.resolve('../../editor/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true,
          compilerOptions,
          getCustomTransformers: () => {
            return {
              before: [tsImportPluginFactory({
                libraryDirectory: 'es',
                libraryName: 'antd',
                // style: 'css'
              })]
            };
          }
        }
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }

    ]
  }
};
