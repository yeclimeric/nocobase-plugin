import { Plugin } from '@nocobase/server';
import { DingTalkAuth } from './auth/DingTalkAuth';
import { dingTalkActions } from './actions/dingTalkActions';
import { AuthName, ResoureName } from './constants';

export class NocobasePluginDingTalkServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.authManager.registerTypes(AuthName, {
      title: '钉钉登录(社区)',
      auth: DingTalkAuth,
    });

    this.app.resourceManager.define({
      name: ResoureName,
      actions: dingTalkActions,
    })
    // 仅对未登录用户开放登录流所需的两个接口，避免放开全部角色
    this.app.acl.allow(ResoureName, ['getAuthUrl', 'redirectAuth'], 'public');
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default NocobasePluginDingTalkServer;
