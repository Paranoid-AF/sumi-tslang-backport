import * as vscode from 'vscode'
import { activate as activateTS } from 'vscode-ts-extension'

export function activate(context: vscode.ExtensionContext) {
  console.log('Hello world, OpenSumi!')
  activateTS(context)
}

export function deactivate() {}
