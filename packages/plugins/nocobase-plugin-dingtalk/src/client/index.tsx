import { Plugin } from '@nocobase/client';
import AuthPlugin from '@nocobase/plugin-auth/client';
import { DingTalkAuthAdminSettingsForm, DingTalkAuthButton } from './auth/DingTalkAuthComponent';
import { NAMESPACE } from './locale';
import zhCN from '../../locale/zh_CN';
import enUS from '../../locale/en-US';

export class NocobasePluginDingTalkClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    const auth = this.app.pm.get(AuthPlugin);
    auth.registerType('community-ding-talk-auth', {
      components: {
        SignInButton: DingTalkAuthButton,
        AdminSettingsForm: DingTalkAuthAdminSettingsForm,
      },
    });

    // 注册多语言资源，使 usePluginTranslation() 按 community-ding-talk 命名空间取词
    this.app.i18n.addResourceBundle('zh-CN', NAMESPACE, zhCN, true, true);
    this.app.i18n.addResourceBundle('en-US', NAMESPACE, enUS, true, true);
  }
}

export default NocobasePluginDingTalkClient;
