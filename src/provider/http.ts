import * as vscode from 'vscode'

class HttpFileProvider implements vscode.FileSystemProvider {
  onDidChangeFile(): vscode.Disposable {
    return {
      dispose() {},
    }
  }

  watch(
    uri: vscode.Uri,
    options: { recursive: boolean; excludes: string[] }
  ): vscode.Disposable
  watch(
    uri: vscode.Uri,
    options: { recursive: boolean; excludes: string[] }
  ): vscode.Disposable
  watch(
    uri: vscode.Uri,
    options: {
      readonly recursive: boolean
      readonly excludes: readonly string[]
    }
  ): vscode.Disposable
  watch(uri: unknown, options: unknown): vscode.Disposable {
    throw new Error('Method not implemented.')
  }

  async stat(uri: vscode.Uri) {
    await Promise.resolve()
    return {
      type: vscode.FileType.File,
      ctime: 1,
      mtime: 1,
      size: 1,
    }
  }

  readDirectory(
    uri: vscode.Uri
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]>
  readDirectory(
    uri: vscode.Uri
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]>
  readDirectory(
    uri: vscode.Uri
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]>
  readDirectory(
    uri: unknown
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
    throw new Error('Method not implemented.')
  }
  createDirectory(uri: vscode.Uri): void | Thenable<void>
  createDirectory(uri: vscode.Uri): void | Thenable<void>
  createDirectory(uri: vscode.Uri): void | Thenable<void>
  createDirectory(uri: unknown): void | Thenable<void> {
    throw new Error('Method not implemented.')
  }
  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array>
  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array>
  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array>
  readFile(uri: unknown): Uint8Array | Thenable<Uint8Array> {
    throw new Error('Method not implemented.')
  }
  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void>
  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void>
  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { readonly create: boolean; readonly overwrite: boolean }
  ): void | Thenable<void>
  writeFile(
    uri: unknown,
    content: unknown,
    options: unknown
  ): void | Thenable<void> {
    throw new Error('Method not implemented.')
  }
  delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): void | Thenable<void>
  delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): void | Thenable<void>
  delete(
    uri: vscode.Uri,
    options: { readonly recursive: boolean }
  ): void | Thenable<void>
  delete(uri: unknown, options: unknown): void | Thenable<void> {
    throw new Error('Method not implemented.')
  }
  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>
  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>
  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { readonly overwrite: boolean }
  ): void | Thenable<void>
  rename(
    oldUri: unknown,
    newUri: unknown,
    options: unknown
  ): void | Thenable<void> {
    throw new Error('Method not implemented.')
  }
  copy?(
    source: vscode.Uri,
    destination: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>
  copy?(
    source: vscode.Uri,
    destination: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void>
  copy?(
    source: vscode.Uri,
    destination: vscode.Uri,
    options: { readonly overwrite: boolean }
  ): void | Thenable<void>
  copy?(
    source: unknown,
    destination: unknown,
    options: unknown
  ): void | Thenable<void> {
    throw new Error('Method not implemented.')
  }
}

export default function register() {
  vscode.workspace.registerFileSystemProvider(
    'tsb-http',
    new HttpFileProvider()
  )
  vscode.workspace.registerFileSystemProvider(
    'tsb-https',
    new HttpFileProvider()
  )
}
