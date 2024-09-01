/**
 * This extension requries `SharedArrayBuffer` to work. However due to browser security policies, some configurations are required to make it available.
 *
 * See also: https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
 *
 * This script creates a proxy that adds required HTTP headers, so that `SharedArrayBuffer` will be exposed by browsers.
 */

const waitPort = require('wait-port')
const parallel = require('run-parallel')
const open = require('open')

const cp = require('child_process')

const HOST = 'localhost'
const PORT = 50777

async function openPage() {
  await waitPort({
    host: HOST,
    port: PORT,
  })
  open(`http://${HOST}:${PORT}`)
}

function startOrigin() {
  const cliPath = require.resolve('@opensumi/cli')
  cp.fork(cliPath, ['dev', `-e=${process.cwd()}`, `-p=${PORT}`])
}

parallel([startOrigin, openPage])
