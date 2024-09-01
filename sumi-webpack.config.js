const path = require('path')
const {
  node,
} = require('@opensumi/cli/lib/config/webpack/shared.webpack.config')

const WebpackShellPluginNext = require('webpack-shell-plugin-next')

const root = path.join(__dirname)

module.exports.vscode = node({
  mode: 'production',
  context: path.join(process.cwd()),
  entry: {
    'SUMI-EXTENSION': path.join(root, 'src/extension.ts'),
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
  ],
})
