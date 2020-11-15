import { ProfileOutlined,BookOutlined} from '@ant-design/icons';
import { Avatar,Descriptions,Card,Divider  } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';

const { Meta } = Card;

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

    return (
      <div>
        <Card style={{ width: "100%", marginTop: 16 }} bordered={false}>
          <Meta
            avatar={
              <Avatar shape="square" size={80} src={courseInfo.avatar} />
            }
      
            description={
              <Descriptions title={courseInfo.title}>
              <Descriptions.Item label={"任课教师"}>{courseInfo.teacher}</Descriptions.Item>
              <Descriptions.Item >{courseInfo.year}{courseInfo.semester}</Descriptions.Item>
              <Descriptions.Item label={"周数"}>{courseInfo.duration}</Descriptions.Item>
            </Descriptions>}
          />
          <Divider />
          <div><ProfileOutlined />&nbsp;课程简介</div>
          <Card style={{ width: "100%", margin: 16 }} bordered={false}>{courseInfo.intro}</Card >
          <Divider />
          <div><BookOutlined />&nbsp;课程教材 </div>
          <Card style={{ width: "100%", margin: 16 }} bordered={false}>{courseInfo.textbook}</Card >
        </Card>
      </div>
    );
  }
}

export default connect(({ courseCenter }) => ({
  courseInfo: courseCenter.courseInfo,
}))(CourseInfoView);
