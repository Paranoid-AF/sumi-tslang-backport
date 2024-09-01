import * as vscode from 'vscode'
import { applyPolyfills } from './polyfill'
import { registerProviders } from './provider'

export async function activate(context: vscode.ExtensionContext) {
  applyPolyfills()
  registerProviders()

  const { activate: activateTS } = require('vscode-ts-extension')
  activateTS(context)
}

export function deactivate() {}
