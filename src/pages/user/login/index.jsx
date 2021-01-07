import React, { useState } from 'react';
import { Link, history } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';
import { notification } from 'antd';
import { postRequest } from '@/utils/request';
import { setUserinfo } from '@/utils/userinfo';
import { setAuthority } from '@/utils/authority';
import { stringify } from 'querystring';

const { Tab, UserName, Password, Submit } = LoginForm;

const Login = () => {
  const [type, setType] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => { 
    setLoading(true);
    
    let payload = {};
    payload.role = type == "student" ? 0 : 1;
    if (type == "student") {
      payload.uid = values.userid;
      payload.password = values.password;
      values.role=0;
    } else {
      payload.uid = values.userid_2;
      payload.password = values.password_2;
      values.role=1;
    }

    function callback(data){
      setUserinfo(data);
      setAuthority(data.role==0?'user':'admin');
      history.push('/');
    }
    postRequest('/user/login',payload,callback,()=>{setLoading(false);});
  };
  
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="student" tab="学生登录">
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
          <Link to="/user/register" style={{color:"white"}}>
            注册账户
          </Link>
          <a
            style={{
              float: 'right',
              color:"white"
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={loading}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default Login;
