import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, Tooltip } from 'antd';
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
  constructor(props) {
    super(props);
    this.state = {
      sid: this.props.sid,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    if (this.state.sid != undefined) {
      dispatch({
        type: 'courseCenter/fetchCourseInfo',
        payload: {
          sid: this.state.sid
        },
      })
    }
  }

  getAvatarURL() {
    const { courseInfo } = this.props;

    if (courseInfo) {
      if (courseInfo.course.avatar) {
        return courseInfo.course.avatar;
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

    if (JSON.stringify(courseInfo) == "{}") {
      return "";
    }

    console.log(courseInfo);

    let info = {};
    info.title = courseInfo.course.title;
    info.cid=courseInfo.course.courseId;
    info.semester = courseInfo.semester;
    info.description = courseInfo.course.description;
    info.textbook = courseInfo.course.textbook;
    

    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleSubmit}
            initialValues={info}
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
              <Input />
            </Form.Item>
            <Form.Item
              name="cid"
              label={"课号"}
            >
              <Input readOnly suffix={
                <Tooltip title="课号不可更改">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              } />
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
              <Select style={{ width: 120 }}>
                <Option value="2019春季">2019春季</Option>
                <Option value="2019夏季">2019夏季</Option>
                <Option value="2019秋季">2019秋季</Option>
                <Option value="2020春季">2020春季</Option>
                <Option value="2020夏季">2020夏季</Option>
                <Option value="2020秋季">2020秋季</Option>
                <Option value="2021春季">2021春季</Option>
                <Option value="2021夏季">2021夏季</Option>
                <Option value="2021秋季">2021秋季</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label={"课程简介"}
              rules={[
                {
                  required: true,
                  message: '请输入课程简介!',
                },
              ]}
            >
              <Input.TextArea rows={4} />
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
              <Input.TextArea rows={4} />
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

export default connect(({ courseCenter }) => ({
  courseInfo: courseCenter.courseInfo,
}))(CourseInfoView);
