## 已有插件

- [DingTalk 钉钉登录](./packages/plugins/nocobase-plugin-dingtalk/) [![NPM badge](https://img.shields.io/npm/v/@yeclimeric/nocobase-plugin-dingtalk.svg)](https://www.npmjs.com/package/@yeclimeric/nocobase-plugin-dingtalk)

插件目录约定：`packages/plugins/nocobase-plugin-<短名>`，下述命令中的 `<短名>` 即该目录后缀（如 `dingtalk`）。

## 安装Nocobase

```shell
yarn install
yarn nocobase install
yarn dev
```

前后端分离调试时可用：

```shell
yarn dev-client-p   # 客户端 13004，代理到 13005
yarn dev-server-p   # 服务端 13005
```

### 更新 Nocobase

#### 更新到最新版

`yarn nocobase upgrade`

#### 更新到指定版本

1. 修改`package.json`中的`@nocobase/cli`和`@nocobase/devtools`版本号
2. 执行`yarn install`安装新版本
3. 执行`yarn nocobase upgrade --skip-code-update`更新命令，其中`--skip-code-update`参数为无需加载新的版本

> 升级 NocoBase 大版本后，需同步：① 各插件`peerDependencies`的`@nocobase/*`大版本；② 各插件自身的`version`升一位（否则插件管理器会视为同版本而跳过更新）；③ 重新执行`yarn build <短名>`打包。

## 创建插件

```shell
# 自动创建nocobase-plugin-xxx命名的插件
yarn pm create xxx
# 如果创建的插件未在插件管理器里显示，可以通过 pm add 命令手动添加
yarn pm add xxx
# 激活插件
yarn pm enable xxx
```

> `pm` 子命令的插件名参数均支持短名（如 `dingtalk`），自动解析为 `packages/plugins/nocobase-plugin-<短名>` 的完整包名（scoped 包如 `@yeclimeric/*` 也能正确解析）；传全名（`nocobase-plugin-*` / `@scope/*`）则原样透传。
> 注意不要写成 `yarn create` / `yarn add`——那是 yarn 内置命令（脚手架初始化 / 安装依赖），脚本无法覆盖。

## 更新插件

```shell
# model变化时执行
yarn nocobase upgrade
```

## 添加插件依赖

向钉钉插件添加依赖`json-schema-ref-parser`，依赖默认安装到`devDependencies`

```shell
yarn lerna add @apidevtools/json-schema-ref-parser --scope=@yeclimeric/nocobase-plugin-dingtalk -D
```

## 打包插件

```shell
# 一键构建 + 打包（短名自动拼接为 nocobase-plugin-<短名>，等价 nocobase build nocobase-plugin-<短名> --tar）
yarn build dingtalk

# 分步骤
yarn tar dingtalk
```

产物在`storage/tar/`下，形如`@yeclimeric/nocobase-plugin-dingtalk-<版本>.tgz`，上传到 NocoBase 插件管理器升级即可。

## 发布插件到npm仓库

```shell
npm login
# 推荐：构建 + 打包 + 发布一条龙
yarn pp dingtalk
```
