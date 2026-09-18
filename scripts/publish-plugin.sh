#!/usr/bin/env bash
# 发布单个 NocoBase 插件到 npm。
# 用法: yarn pp <插件短名>   例: yarn pp dingtalk
#   <插件短名> 对应 packages/plugins/nocobase-plugin-<短名>
set -euo pipefail

PLUGIN="${1:-}"
if [ -z "$PLUGIN" ]; then
  echo "用法: yarn pp <插件短名>  例: yarn pp dingtalk" >&2
  exit 1
fi

PLUGIN_DIR="packages/plugins/nocobase-plugin-${PLUGIN}"
if [ ! -d "$PLUGIN_DIR" ]; then
  echo "插件目录不存在: $PLUGIN_DIR" >&2
  exit 1
fi

# 1) 构建（参数化 build: yarn build <短名> -> nocobase build nocobase-plugin-<短名> --tar）
yarn build "$PLUGIN"

# 2) 进入插件目录发布（避开根 workspace 导致的 npm publish EUSAGE）
cd "$PLUGIN_DIR"
npm publish --access=public --registry=https://registry.npmjs.org
