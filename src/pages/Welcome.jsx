import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';

const TextPreview = ({ children }) => (
  <div className={styles.pre}>
    <Typography.Text>{children}</Typography.Text>
  </div>
);

export default () => (
  <PageContainer>
    <Card>
      <Alert
        message="UI升级的云作业平台2.0"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        欢迎使用云作业平台
      </Typography.Text>
      <TextPreview>云作业平台是为师生开展网络辅助教学服务的支撑平台。教师可布置作业、查看学生完成情况；学生可完成作业、查看成绩和教师评价。</TextPreview>
    </Card>
  </PageContainer>
);
