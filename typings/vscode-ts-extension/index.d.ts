import * as vscode from 'vscode'

declare module 'vscode-ts-extension' {
  export function activate(context: vscode.ExtensionContext): Promise<unknown>
}
