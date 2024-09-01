# sumi-tslang-backport

## 目录说明

```md
.
├── src                             # 源码目录
│    ├── extend
│    │   ├── browser                # browser 层
│    │   │   ├── component-a.tsx
│    │   │   ├── component-b.tsx
│    │   │   └── index.ts
│    │   └── node                   # node 层
│    │       └── index.ts
│    ├── extension.ts
│    └── test
│        ├── extension.test.ts
│        └── index.ts
├── out/                            # 编译输出目录
├── CHANGELOG.md
├── README.md
├── package.json
├── tsconfig.json
├── tslint.json
├── typings
├── webpack.config.entry.js        # 入口工程配置
├── webpack.config.browser.js      # browser 工程配置
└── webpack.config.node.js         # node 工程配置
```

## 开发前置

### 启用 SharedArrayBuffer

插件依赖 `SharedArrayBuffer` 才能正常工作，要让浏览器启用该特性，需要一些前置操作

1. 打开 `~/.sumi-cli/engines/你的Engine版本/node_modules/@opensumi/cli-engine/lib/node/server.js`

2. 找到 `ctx.set('Content-Type', contentType);` 这一行，在下面添加: 

```javascript
ctx.set('Cross-Origin-Opener-Policy', 'same-origin');
ctx.set('Cross-Origin-Embedder-Policy', 'require-corp');
```

### 扩展允许访问的文件类型

TypeScript 插件需要访问 `.json` 和 `.ts` 文件，而 OpenSumi 默认 CLI 会拦截此类文件的访问，需要手动修改

1. 打开 `~/.sumi-cli/engines/你的Engine版本/node_modules/@opensumi/ide-express-file-server/lib/common/index.js`

2. 在 `exports.ALLOW_MIME` 对象中添加以下内容

```javascript
exports.ALLOW_MIME = {
  // 文件原内容略
  json: 'application/json',
  ts: 'application/typescript',
}
```

## 运行
```bash
# 开发
$ npm run watch

# 编译
$ npm run compile
```
