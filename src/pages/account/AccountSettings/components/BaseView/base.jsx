import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message,Tooltip  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './BaseView.less';
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="accountsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          />
        </Button>
      </div>
    </Upload>
  </>
);


class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = (ref) => {
    this.view = ref;
  };
  handleSubmit = (value) => {
    //这里更新个人信息
    console.log(value)

    message.success(
      formatMessage({
        id: 'accountsettings.basic.update.success',
      }),
    );
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleSubmit}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="username"
              label={formatMessage({
                id: 'accountsettings.basic.username',
              })}
            >
              <Input readOnly suffix={
                <Tooltip title="用户名不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="userid"
              label={formatMessage({
                id: 'accountsettings.basic.userid',
              })}
            >
              <Input readOnly suffix={
                <Tooltip title="用户id不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="role"
              label={formatMessage({
                id: 'accountsettings.basic.identity',
              })}
            >
              <Input readOnly suffix={
                <Tooltip title="身份不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="email"
              label={formatMessage({
                id: 'accountsettings.basic.email',
              })}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.email-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="profile"
              label={formatMessage({
                id: 'accountsettings.basic.profile',
              })}
            >
              <Input.TextArea
                placeholder={formatMessage({
                  id: 'accountsettings.basic.profile-placeholder',
                })}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label={formatMessage({
                id: 'accountsettings.basic.address',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.address-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label={formatMessage({
                id: 'accountsettings.basic.phone',
              })}
              rules={[
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.phone-message',
                    },
                    {},
                  ),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ accountSettings }) => ({
  currentUser: accountSettings.currentUser,
}))(BaseView);
