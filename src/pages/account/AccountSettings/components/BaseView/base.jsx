import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message,Tooltip  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './BaseView.less';
import { getUserinfo,setUserinfo } from '@/utils/userinfo';
import { postRequest } from '@/utils/request';

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
        {/* <Button>
          <UploadOutlined />
          更换头像
        </Button> */}
      </div>
    </Upload>
  </>
);


class BaseView extends Component {
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

  handleSubmit = (value) => {
    //这里更新个人信息
    console.log(value)

    value.uid=getUserinfo().userId;
    postRequest('/user/update',value,(data)=>{
      message.success("更新个人信息成功!");
      console.log(data);
      setUserinfo(data);
    })

    
  };

  render() {
    
    console.log(currentUser);
    let userInfo=getUserinfo();

    let currentUser={};
    currentUser.uid=userInfo.id;
    currentUser.role=userInfo.role==0?"学生":"教师";
    currentUser.name=userInfo.name;
    currentUser.email=userInfo.email;
    currentUser.phone=userInfo.phone;

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
              name="uid"
              label={"学号/工号"}
            >
              <Input readOnly suffix={
                <Tooltip title="用户id不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="role"
              label={"身份"}
            >
              <Input readOnly suffix={
                <Tooltip title="身份不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
            </Form.Item>
            <Form.Item
              name="name"
              label={"用户名"}
              rules={[
                {
                  required: true,
                  message:"请输入您的用户名"
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="email"
              label={"邮箱"}
              rules={[
                {
                  type: 'email',
                  message: '不是合法的email格式!',
                },
                {
                  required: true,
                  message: formatMessage(
                    {
                      id: 'accountsettings.basic.email-message',
                    }
                  ),
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="phone"
              label={"联系电话"}
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
