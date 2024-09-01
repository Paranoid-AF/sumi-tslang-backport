import * as vscode from 'vscode'
import * as l10n from '@vscode/l10n/dist/browser'

const vscodeAny = vscode as any

function polyfillL10n() {
  if (vscodeAny.l10n) return
  vscodeAny.l10n = {
    t: l10n.t,
  }
}

export function applyPolyfills() {
  polyfillL10n()
}
