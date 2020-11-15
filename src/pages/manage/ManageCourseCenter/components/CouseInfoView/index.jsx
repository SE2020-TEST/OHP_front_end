import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message,Tooltip  } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import styles from './index.less';
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


class CourseInfoView extends Component {
  constructor(props){
    super(props);
    this.state={
      courseInfo:this.props.courseInfo,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manageCourseCenter/fetchCourseInfo',
      payload: {
        sid: 4
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

  handleSubmit = (value) => {
    //这里更新个人信息
    console.log(value)

    message.success("更新课程信息成功");
  };

  render() {
    const { courseInfo } = this.props;

    //先判断是否为空
    if (JSON.stringify(courseInfo) == "{}") {
      return "";
    }

    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleSubmit}
            initialValues={courseInfo}
            hideRequiredMark
          >
            <Form.Item
              name="title"
              label={"课程名称"}
              rules={[
                {
                  required: true,
                  message: '请输入课程名称!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="year"
              label={"学年"}
              rules={[
                {
                  required: true,
                  message: '请输入学年!',
                },
              ]}
            >
              <Select  style={{ width: 120 }}>
                <Option value="2017">2017</Option>
                <Option value="2018">2018</Option>
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="semester"
              label={"学期"}
              rules={[
                {
                  required: true,
                  message: '请输入学期!',
                },
              ]}
            >
              <Select  style={{ width: 120 }}>
                <Option value="春季">春季</Option>
                <Option value="夏季">夏季</Option>
                <Option value="秋季">秋季</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="duration"
              label={"周数"}
              rules={[
                {
                  required: true,
                  message: '请输入周数!',
                },
              ]}
            >
              <Select  style={{ width: 120 }}>
                <Option value="12周">12周</Option>
                <Option value="16周">16周</Option>
                <Option value="18周">18周</Option>
                <Option value="20周">20周</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="intro"
              label={"课程简介"}
              rules={[
                {
                  required: true,
                  message: '请输入课程简介!',
                },
              ]}
            >
              <Input.TextArea rows={4}/>
            </Form.Item>
            <Form.Item
              name="textbook"
              label={"课程教材"}
              rules={[
                {
                  required: true,
                  message: '请输入课程教材!',
                },
              ]}
            >
              <Input.TextArea rows={4}/>
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

export default connect(({ manageCourseCenter }) => ({
  courseInfo: manageCourseCenter.courseInfo,
}))(CourseInfoView);
