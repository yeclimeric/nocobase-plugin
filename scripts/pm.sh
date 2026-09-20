#!/usr/bin/env bash
# yarn pm 短名包装：插件名参数自动解析为完整包名，免输长名。
# 用法: yarn pm <子命令> [插件短名|目录名|包名] [其余参数原样透传]
# 解析规则（对子命令后的第一个非 flag 参数生效）：
#   dingtalk  -> 读 packages/plugins/nocobase-plugin-dingtalk/package.json 的 name（如 @yeclimeric/nocobase-plugin-dingtalk）
#   目录不存在 -> 回退拼接为 nocobase-plugin-<短名>
#   已是包名(@开头)/目录名(nocobase-plugin-开头)/flag(-开头) -> 原样透传
set -euo pipefail

SUB="${1:-}"
if [ -z "$SUB" ]; then
  exec nocobase pm
fi
shift

expand() {
  local name="$1"
  case "$name" in
    @*|nocobase-plugin-*|-*)
      printf '%s' "$name"
      return
      ;;
  esac
  local dir="packages/plugins/nocobase-plugin-${name}"
  if [ -f "$dir/package.json" ]; then
    node -p "require('./${dir}/package.json').name"
  else
    printf 'nocobase-plugin-%s' "$name"
  fi
}

if [ $# -gt 0 ]; then
  NAME="$(expand "$1")"
  shift
  set -- "$NAME" "$@"
fi

exec nocobase pm "$SUB" "$@"
