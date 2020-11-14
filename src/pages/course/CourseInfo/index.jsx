import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';


export default (props) => {
  const cid=props.match.params.id;
  

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(props);
    console.log("cid:"+cid);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
        this is course info
      </div>
    </PageContainer>
  );
};
