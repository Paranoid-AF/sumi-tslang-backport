import * as vscode from 'vscode'
import { applyPolyfills } from './polyfill'

export async function activate(context: vscode.ExtensionContext) {
  applyPolyfills()

  const { activate: activateTS } = require('vscode-ts-extension')
  activateTS(context)
}

export function deactivate() {}
