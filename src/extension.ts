// vscode namespace 下为 VS Code 插件 API
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Hello world, OpenSumi!')
}

export function deactivate() {}
