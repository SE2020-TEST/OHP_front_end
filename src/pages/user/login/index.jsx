import { Alert } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useState('student');

  const handleSubmit = (values) => {  
    const { dispatch } = props;
    
    let payload = {};
    payload.role = type;
    if (type == "student") {
      payload.uid = values.userid;
      payload.password = values.password;
    } else {
      payload.uid = values.userid_2;
      payload.password = values.password_2;
    }
    dispatch({
      type: 'login/login',
      payload: { ...payload },
    });
  };

  console.log("status:"+status)
  console.log("submitting:"+submitting)
  
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="student" tab="学生登录">
          {status === 'error' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}
          <UserName
            name="userid"
            placeholder="学号"
            rules={[
              {
                required: true,
                message: '请输入学号!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="teacher" tab="教师登录">
        {status === 'error' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}
          <UserName
            name="userid_2"
            placeholder="工号"
            rules={[
              {
                required: true,
                message: '请输入工号!',
              },
            ]}
          />
          <Password
            name="password_2"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Link to="/user/register">
            注册账户
          </Link>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
