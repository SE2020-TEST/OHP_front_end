import { FormattedMessage, formatMessage,connect } from 'umi';
import React, { Component } from 'react';
import { Form,Input,Button,message } from 'antd';
import { getUserinfo } from '@/utils/userinfo';
import { postRequest } from '@/utils/request';


class SecurityView extends Component {
  handleSubmit = (value) => {
    //这里更新密码
    postRequest('/user/password',{uid:getUserinfo().userId,password:value.newpassword},()=>{
      message.success('修改密码成功!');
    })
  };

  validatorPassword = (rule, value, callback) => {
    postRequest('/user/checkpwd', { uid: getUserinfo().userId, password: value }, (data) => {
      if (data) callback();
      else callback('原密码输入错误!');
    })
  }

  render() {
    return (
      <div style={{width:"350px",paddingTop:"12px"}}>
        <Form
          layout="vertical"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            name="password"
            label="输入原密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: this.validatorPassword,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newpassword"
            label="输入新密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newpassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入密码不一致!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountsettings.basic.updatePw"
                  defaultMessage="Update Password"
                />
              </Button>
            </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SecurityView;
