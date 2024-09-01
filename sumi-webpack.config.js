const path = require('path')
const {
  node,
} = require('@opensumi/cli/lib/config/webpack/shared.webpack.config')

const CopyPlugin = require('copy-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

const root = path.join(__dirname)

module.exports.vscode = node({
  mode: 'production',
  context: path.join(process.cwd()),
  entry: {
    'SUMI-EXTENSION': path.join(root, 'src/extension.ts'),
  },
  externals: {
    'vscode-ts-extension': './vscode-extension.js',
  },
  output: {
    filename: 'extension.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['yarn compile:ts'],
        blocking: true,
        parallel: false,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/vscode/extensions/typescript-language-features/dist/browser/extension.js',
          to: 'vscode-extension.js',
        },
        {
          from: 'src/vscode/extensions/typescript-language-features/dist/browser/typescript',
          to: 'browser/typescript',
        },
      ],
    }),
  ],
})
