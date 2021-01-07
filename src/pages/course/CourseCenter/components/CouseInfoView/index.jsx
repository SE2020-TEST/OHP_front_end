import { ProfileOutlined, BookOutlined } from '@ant-design/icons';
import { Avatar, Descriptions, Card, Divider } from 'antd';
import React, { Component } from 'react';
import { postRequest } from '@/utils/request';

const { Meta } = Card;

class CourseInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sid: this.props.sid,
      courseInfo:{},
    }
  }

  componentDidMount() {
    if (this.state.sid != undefined) {
      postRequest('/section/info',{sid:this.state.sid},(data)=>{this.setState({courseInfo:data})});
    }
  }

  render() {
    const courseInfo=this.state.courseInfo;
    
    if (JSON.stringify(courseInfo) == "{}") {
      return "";
    }

    return (
      <div>
        <Card style={{ width: "100%", marginTop: 16 }} bordered={false}>
          <Meta
            avatar={
              <Avatar shape="square" size={80} src={courseInfo.course.avatar} />
            }

            description={
              <Descriptions title={courseInfo.course.title}>
                <Descriptions.Item label={"课号"}>{courseInfo.course.courseId}</Descriptions.Item>
                {/* <Descriptions.Item label={"任课教师"}>{courseInfo.teacher.name}</Descriptions.Item> */}
                <Descriptions.Item  label={"结束时间"}>{courseInfo.endTime}</Descriptions.Item>
                <Descriptions.Item >{courseInfo.semester}</Descriptions.Item>
              </Descriptions>}
          />
          <Divider />
          <div><ProfileOutlined />&nbsp;课程简介</div>
          <Card style={{ width: "100%", margin: 16 }} bordered={false}>{courseInfo.course.description}</Card >
          <Divider />
          <div><BookOutlined />&nbsp;课程教材 </div>
          <Card style={{ width: "100%", margin: 16 }} bordered={false}>{courseInfo.course.textbook}</Card >
        </Card>
      </div>
    );
  }
}

export default CourseInfoView;
