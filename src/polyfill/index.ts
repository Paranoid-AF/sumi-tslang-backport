import * as vscode from 'vscode'
import * as l10n from '@vscode/l10n/dist/browser'
import {
  FileSystemError,
  FileSystemProviderErrorCode,
  FileType,
} from './lib/file-system'

const vscodeAny = vscode as any

function polyfillL10n() {
  if (vscodeAny.l10n) return
  vscodeAny.l10n = {
    t: l10n.t,
  }
}

function polyfillTelemetry() {
  vscodeAny.env.createTelemetryLogger = function () {
    return {
      onDidChangeEnableStates() {},
      isErrorsEnabled: false,
      isUsageEnabled: false,
      logUsage() {},
      logError() {},
      dispose() {},
    }
  }
}

function polyfillUiKind() {
  vscodeAny.env.uiKind = vscode.UIKind.Web
}

function polyfillFileSystem() {
  vscodeAny.FileSystemError = FileSystemError
  vscodeAny.FileSystemProviderErrorCode = FileSystemProviderErrorCode
  vscodeAny.FileType = FileType
}

export function applyPolyfills() {
  polyfillL10n()
  polyfillTelemetry()
  polyfillUiKind()
  polyfillFileSystem()
}
