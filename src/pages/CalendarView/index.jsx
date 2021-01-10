import {PageContainer} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Calendar, Badge, Card} from 'antd';
import styles from './index.less';
import { postRequest } from '@/utils/request';
import { getUserinfo } from '@/utils/userinfo';
import moment from 'moment';


class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hwList:[],
    }
    this.dateCellRender = this.dateCellRender.bind(this);
  }

  componentDidMount(){
    if (getUserinfo().role == 0)
      postRequest('/hw/stu/all', { uid: getUserinfo().id }, (data) => { this.setState({ hwList: data }) });
  }

  getListData(value) {
    let listData=[];

    let dayTime = moment(value).format('YYYY-MM-DD');
    console.log(dayTime);
    let len = this.state.hwList.length;
    for (let i = 0; i < len; ++i) {
      let hw = this.state.hwList[i];
      let startTime = moment(hw.startTime, 'YYYY-MM-DD');
      let deadline = moment(hw.deadline, 'YYYY-MM-DD');
      if (hw.startTime == dayTime)
        listData.push(
          { type: 'success', content: `课程[${hw.sectionTitle}]的作业[${hw.title}]开始` },
        )
      if (hw.deadline == dayTime)
        listData.push(
          { type: 'success', content: `课程[${hw.sectionTitle}]的作业[${hw.title}]结束` },
        )
    }
    return listData || [];
  }

  dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}/>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let moment = require('moment');
    moment().format();

    return (
      <PageContainer>
        <div className={styles.main}>
          <Card>
            <Calendar mode={"month"} dateCellRender={this.dateCellRender}/>
          </Card>
        </div>
      </PageContainer>

    );
  }
}

export default CalendarView;

