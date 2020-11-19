import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
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
//import { findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import OperationModal from './components/OperationModal';
import RegisterCourseModal from './components/RegisterCourseModal';
import AddSectionModal from './components/AddSectionModal';
import PicturesWall from './components/PicturesWall';
import styles from './style.less';
import request from 'umi-request';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;


export const ManageCourseList = (props) => {
  const {
    loading,
    dispatch,
    courseList: { list },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'courseList/fetch',
      payload: {
        uid: 4180,
        role: 1,
        list_type: 0,
      },
    });
  }, [1]);

  const [showList, setShowList] = useState([]);

  useEffect(() => {
    setShowList(list);
  }, [list]);

  const paginationProps = {
    showQuickJumper: true,
    pageSize: 7,
  };

  const radioContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="progressing" onChange={radioChange}>
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

  function searchValueChange(value) {
    setShowList(list.filter((item) => {
      return item.title.indexOf(value) != -1 || item.intro.indexOf(value) != -1 || item.teacher.indexOf(value) != -1
        || item.year.indexOf(value) != -1 || item.semester.indexOf(value) != -1 || item.duration.indexOf(value) != -1;
    }));
  }

  function radioChange(e) {
    let list_type;
    if (e.target.value === "progressing") {
      list_type = 0;
    } else if (e.target.value === "finish") {
      list_type = 1;
    } else {
      list_type = 2;
    }
    dispatch({
      type: 'courseList/fetch',
      payload: {
        uid: 4180,
        role: 1,
        list_type: list_type,
      },
    });
  }

  const handleDelete = (item) => {
    console.log("delete")
    console.log(item)

    dispatch({
      type: 'courseList/deleteOne',
      payload: {
        sid:item.id
      },
    });
  }

  console.log("list")
  console.log(list)
  console.log(showList)
  return (
    <div>
      <PageContainer>
        {/* <PicturesWall/> */}

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
            {/* <Button
              type="dashed"
              style={{
                width: '50%',
                marginBottom: 8,
              }}
              onClick={showModal}             
            >
              <PlusOutlined />
              注册新课程
            </Button> */}
            <RegisterCourseModal/>
            <AddSectionModal/>

            {/* <Button
              type="dashed"
              style={{
                width: '50%',
                marginBottom: 8,
              }}
              onClick={showModal}
            >
              <PlusOutlined />
              新建课程(选择学期)
            </Button> */}

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={showList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    // <a
                    //   onClick={() => {
                    //     handleDelete(item)
                    //   }}
                    // >
                    //   删除
                    // </a>,
                    <Popconfirm
                      title="确认删除该课程？"
                      onConfirm={() => { handleDelete(item) }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#">删除</a>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.course.avatar} shape="square" size="large" />}
                    title={<a onClick={() => {
                      history.push({ pathname: '/manage/course/center', state: { sid: item.id,title: item.course.title } });
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
                      <Tag color="#55acee">{item.semester}学期</Tag>
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
};
export default connect(({ courseList, loading }) => ({
  courseList,
  loading: loading.models.courseList,
}))(ManageCourseList);
