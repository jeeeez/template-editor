const fs = require('fs');
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const stripJsonComments = require('strip-json-comments');

const tslintConfigPath = path.resolve(__dirname, '../../../tsconfig.json');
const tslintConfigStr = fs.readFileSync(tslintConfigPath).toString();
const { compilerOptions } = JSON.parse(stripJsonComments(tslintConfigStr));


const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);


module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@template-editor/native': resolvePath('../../editor/src'),
      '@template-editor/react': resolvePath('../../react-template-editor/src')
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
