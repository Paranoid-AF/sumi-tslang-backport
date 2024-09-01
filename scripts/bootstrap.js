/**
 * This extension requries `SharedArrayBuffer` to work. However due to browser security policies, some configurations are required to make it available.
 *
 * See also: https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
 *
 * This script creates a proxy that adds required HTTP headers, so that `SharedArrayBuffer` will be exposed by browsers.
 */

const httpProxy = require('http-proxy')
const waitPort = require('wait-port')
const parallel = require('run-parallel')
const open = require('open')

const ip = require('ip')
const cp = require('child_process')

const ORIGIN_HOST = ip.address() // same logic as OpenSumi (@opensumi/cli-engine/src/node/env.ts)
const ORIGIN_PORT = 50777 // as assigned in `package.json`

const TARGET_HOST = 'localhost'
const TARGET_PORT = 3200

function startProxy() {
  function init() {
    const proxy = httpProxy.createProxyServer({
      target: `http://${ORIGIN_HOST}:${ORIGIN_PORT}`,
    })

    proxy.on('proxyRes', function (proxyRes, req, res) {
      proxyRes.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
      proxyRes.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    })

    proxy.listen(TARGET_PORT)

    open(`http://${TARGET_HOST}:${TARGET_PORT}`)
  }

  waitPort({
    host: ORIGIN_HOST,
    port: ORIGIN_PORT,
  }).then(init)
}

function startOrigin() {
  const cliPath = require.resolve('@opensumi/cli')
  cp.fork(cliPath, ['dev', `-e=${process.cwd()}`, `-p=${ORIGIN_PORT}`])
}

parallel([startOrigin, startProxy])
