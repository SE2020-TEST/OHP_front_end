import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message,Tooltip,Avatar  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './CourseInfoView.less';
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="accountsettings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
  </>
);


class CourseInfoView extends Component {
  view = undefined;

  constructor(props){
    super(props);

    this.state = {
      sid: this.props.sid,

    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'courseCenter/fetchCourseInfo',
      payload: {
        sid: this.state.sid
      },
    })
  }

  getAvatarURL() {
    const { courseInfo } = this.props;

    if (courseInfo) {
      if (courseInfo.avatar) {
        return courseInfo.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }


  render() {
    const { courseInfo } = this.props;
    console.log("courseinfo:")
    console.log(courseInfo)

    return (
      <div className={styles.baseView}>
        
        <div className={styles.left}>
          
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(({ courseCenter }) => ({
  courseInfo: courseCenter.courseInfo,
}))(CourseInfoView);
