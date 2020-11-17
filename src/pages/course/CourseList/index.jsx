import React, {  useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  Input,
  List,
  Radio,
  Tag,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';
import { history } from 'umi';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const ListContent = ({ data: { teacher, year, semester, duration } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>任课教师</span>
      <p>{teacher}</p>
    </div>
    <div className={styles.listContentItem}>
      <Tag  color="#55acee" >{year}学年</Tag>
      <Tag color={semester==='春季'?'green':(semester==='夏季'?'red':'orange')}>{semester}学期</Tag>
      <Tag color='cyan'>{duration}</Tag>
    </div>
  </div>
);

export const CourseList = (props) => {
  const {
    loading,
    dispatch,
    courseList: { list },
  } = props;

  useEffect(() => {
    dispatch({
      type: 'courseList/fetch',
      payload: {
        uid:123,
        role:'student',
        list_type:0,
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

  function searchValueChange(value){
    console.log(value);

    setShowList(list.filter((item) => {
      return item.title.indexOf(value) != -1 || item.intro.indexOf(value) != -1 || item.teacher.indexOf(value) != -1
        || item.year.indexOf(value) != -1 || item.semester.indexOf(value) != -1 || item.duration.indexOf(value) != -1;
    }));
  }

  function radioChange(e) {
    let list_type ;
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
        uid: 123,
        role: 'student',
        list_type: list_type,
      },
    });
  }

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
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={showList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={<a onClick={()=>{console.log(item);
                      history.push({ pathname: '/course/center', state: { sid: item.id,title:item.title } });
                    }}>{item.title}</a>}
                    description={item.intro}
                  />
                  <ListContent data={item} />
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
}))(CourseList);
