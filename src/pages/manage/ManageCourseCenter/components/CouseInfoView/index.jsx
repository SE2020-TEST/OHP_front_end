import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, Tooltip } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import request from 'umi-request';
import { postRequest } from '../../../../../utils/request';

const { Option } = Select;

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>
      头像
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
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
      courseInfo:{},
      avatar:"",
    }
  }

  componentDidMount() {
    if (this.state.sid != undefined) {
      postRequest('/section/info', { sid: this.state.sid }, (data) => { this.setState({ courseInfo: data, avatar: data.course.avatar }) });
    }
  }

  handleSubmit = (value) => {
    const { courseInfo } = this.props;

    //这里更新课程信息
    let params={};
    params.cid=value.cid;
    params.avatar=courseInfo.course.avatar;
    params.title=value.title;
    params.textbook=value.textbook;
    params.intro=value.description;


    request.post('http://localhost:8080/course/update',{data:params})
    .then(function(res){
      console.log(res);
      if(res.code==0){
        message.success("更新课程信息成功");
      }else{
        message.error(res.message);
      }
    })
  };
  
  beforeUpload(file) {
    console.log('file', file);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大于2MB!');
    }
    return isLt2M;
} 

  render() {
    const courseInfo=this.state.courseInfo;

    if (JSON.stringify(courseInfo) == "{}") {
      return "";
    }

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
                更新课程信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.state.avatar} />
        </div>
        <Upload
          name="files"
          listType="picture-card"
          showUploadList={false}
          withCredentials
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        ></Upload>
      </div>
    );
  }
}

export default CourseInfoView;
