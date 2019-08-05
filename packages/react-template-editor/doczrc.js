const fs = require('fs');
const path = require('path');
const { version } = require('./package.json');
const stripJsonComments = require('strip-json-comments');

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const tslintConfigPath = resolvePath('../../tsconfig.json');
const tslintConfigStr = fs.readFileSync(tslintConfigPath).toString();
const { compilerOptions } = JSON.parse(stripJsonComments(tslintConfigStr));


export default {
  typescript: true,
  title: '@template-editor/react@' + version,
  menu: [],
  base: '/template-editor/',
  modifyBundlerConfig(config) {
    Object.assign(config.resolve.alias, {
      '@template-editor/native': resolvePath('../editor/src'),
      '@template-editor/react': resolvePath('./src')
    });
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      options: {
        transpileOnly: true,
        compilerOptions
      }
    });
    config.module.rules.push({
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    });
    return config;
  }
}
