import React, {  useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  Modal,
  Radio,
  Tag,
  Popconfirm,
  message,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {  history } from 'umi';
import RegisterCourseModal from './components/RegisterCourseModal';
import AddSectionModal from './components/AddSectionModal';
import styles from './style.less';
import { postRequest } from '@/utils/request';
import { getUserinfo } from '@/utils/userinfo';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;


class ManageCourseList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      myList:[],
      showList:[],
      list_type:0,
    }

    this.radioChange=this.radioChange.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }

  getCourseList(list_type){
    const payload={
      uid: getUserinfo().id,
      role: 1,
      list_type: list_type,
    }
    postRequest('/section/list',payload,(data)=>{this.setState({myList:data,showList:data})});
  };

  componentDidMount(){
    this.getCourseList(0);
  }


  searchValueChange(value) {
    setShowList(myList.filter((item) => {
      return item.course.title.indexOf(value) != -1 || item.course.description.indexOf(value) != -1|| item.course.courseId.indexOf(value) != -1
      || item.endTime.indexOf(value) != -1 || item.semester.indexOf(value) != -1 
    }));
  }

  radioChange(e) {
    let list_type;
    if (e.target.value === "progressing") {
      list_type=0;
    } else if (e.target.value === "finish") {
      list_type=1;
    } else {
      list_type=2;
    }
    this.setState({list_type:list_type});
    this.getCourseList(list_type);
  }

  handleDelete = (item) => {
    postRequest('/section/delete', { sid: item.id }, (data)=>{
      message.success('删除课程成功!');
      this.getCourseList(this.state.list_type);//强制刷新列表
    });
  }


  render() {
    const paginationProps = {
      showQuickJumper: true,
      pageSize: 7,
    };
  
    const radioContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="progressing" onChange={this.radioChange}>
          <RadioButton value="progressing">正在进行</RadioButton>
          <RadioButton value="finish">已结束</RadioButton>
          <RadioButton value="all">全部课程</RadioButton>
        </RadioGroup>
      </div>
    );
  
    const searchContent = (
      <div>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={(value) => searchValueChange(value)} />
      </div>
    );

    return (
      <div>
        <PageContainer>
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              title={radioContent}
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={searchContent}
            >
              <RegisterCourseModal />
              <AddSectionModal forceUpdate={this.getCourseList} />

              <List
                size="large"
                rowKey="id"
                pagination={paginationProps}
                dataSource={this.state.showList}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="确认删除该课程？"
                        onConfirm={() => { this.handleDelete(item) }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>删除</Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.course.avatar} shape="square" size="large" />}
                      title={<a onClick={() => {
                        history.push({ pathname: '/manage/course/center', state: { sid: item.id, title: item.course.title } });
                      }}>{item.course.title}</a>}
                      description={item.course.description}
                    />
                    <div className={styles.listContent}>
                      <div className={styles.listContentItem}>
                        <span>课号</span>
                        <p>{item.course.courseId}</p>
                      </div>
                      <div className={styles.listContentItem}>
                        {/* <span>任课教师</span>
                      <p>{item.teacher.name}</p> */}
                        <span>结束时间</span>
                        <p>{item.endTime}</p>
                      </div>
                      <div className={styles.listContentItem}>
                        <Tag color="#55acee">{item.semester}</Tag>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageContainer>
      </div>
    );
  }
};
export default ManageCourseList;
