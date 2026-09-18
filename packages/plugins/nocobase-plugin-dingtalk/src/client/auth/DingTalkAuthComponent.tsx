import React, { useState } from 'react';
import { Button } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';
import type { Authenticator } from '@nocobase/plugin-auth/client';
import { SchemaComponent, useResource } from '@nocobase/client';
import { usePluginTranslation } from '../locale';

export const DingTalkAuthButton = (props: { authenticator: Authenticator }) => {
  const [loading, setLoading] = useState(false);
  const resource = useResource('community-ding-talk');
  const onClick = async () => {
    setLoading(true);
    try {
      const res = await resource.getAuthUrl({
        values: {
          authenticator: props.authenticator.name,
          redirect: new URLSearchParams(location.search ? location.search.substring(1) : '').get('redirect') || '',
        }
      })
      location.href = res.data.data;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  return (
    <Button loading={loading} disabled={loading} icon={<DingtalkOutlined />} style={{ width: '100%' }} onClick={onClick}>{props.authenticator.title || props.authenticator.name}</Button>
  )
}

export const DingTalkAuthAdminSettingsForm = (props: { authenticator: Authenticator }) => {
  const { t } = usePluginTranslation();
  return (
    <SchemaComponent
      schema={{
        type: 'object',
        properties: {
          communityDingTalkAuth: {
            type: 'void',
            properties: {
              public: {
                type: 'object',
                properties: {
                  autoSignup: {
                    'x-decorator': 'FormItem',
                    type: 'boolean',
                    title: t('Auto sign up when user does not exist'),
                    required: false,
                    'x-component': 'Checkbox',
                  },
                },
              },
              internal: {
                type: 'object',
                properties: {
                  userCheckType: {
                    'x-decorator': 'FormItem',
                    type: 'string',
                    title: t('User verification method'),
                    required: true,
                    'x-component': 'Select',
                    'x-component-props': {
                      options: [
                        { value: 'orgEmail', label: t('Organization email') },
                        { value: 'personalEmail', label: t('Personal email') },
                        { value: 'mobile', label: t('Mobile') },
                      ]
                    }
                  },
                  emailDomain: {
                    'x-decorator': 'FormItem',
                    type: 'string',
                    title: t('Email domains, separated by commas'),
                    required: true,
                    'x-component': 'Input',
                  },
                  appKey: {
                    'x-decorator': 'FormItem',
                    type: 'string',
                    title: t('App ID'),
                    required: true,
                    'x-component': 'Input',
                  },
                  appSecret: {
                    'x-decorator': 'FormItem',
                    type: 'string',
                    title: t('App Secret'),
                    required: true,
                    'x-component': 'Password',
                  },
                }
              }
            },
          },
        },
      }}
    />
  );
}
