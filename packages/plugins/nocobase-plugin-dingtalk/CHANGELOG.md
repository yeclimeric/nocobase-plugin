## 更新日志

### 20260918

- 修复 emailDomain 多域名分割正则（字符串误用为正则，导致多域名配置失效）
- 收窄 ACL 权限：仅对未登录用户开放 getAuthUrl / redirectAuth 登录接口
- 接入客户端国际化（usePluginTranslation），新增 en-US 语言包，配置表单与按钮文案改为取词
- 删除未被引用的钉钉 API Explorer 代码生成遗留脚本 dingTalkUtil.js

### 20240723

- 支持钉钉第三方登录
