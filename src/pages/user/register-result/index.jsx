import { Button, Result } from 'antd';
import { FormattedMessage, formatMessage, Link } from 'umi';
import React from 'react';
import styles from './style.less';
const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        去登录
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="userandregister-result.register-result.msg"
          values={{
            email: location?.state?.account || 'AntDesign@example.com',
          }}
        />
      </div>
    }
    extra={actions}
  />
);

export default RegisterResult;
