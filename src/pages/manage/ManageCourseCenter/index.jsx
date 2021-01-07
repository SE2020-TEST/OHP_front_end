import React, { Component } from 'react';
import { GridContent,PageContainer } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import CourseInfoView from './components/CouseInfoView';
import HwListView from './components/HwListView';
import HwInfoView from './components/HwInfoView';
import HwCreateView from './components/HwCreateView';
import HwCheckView from './components/HwCheckView';
import UserListView from './components/UserListView';
import styles from './style.less';
const { Item } = Menu;

class ManageCourseCenter extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const titleMap = {
      courseinfo: '课程详情',
      hwlist: '作业列表',
      hwinfo: '作业详情',
      hwcreate: '新建作业',
      hwcheck: '批改作业',
      userlist: '学生列表',
    };
    this.state = {
      mode: 'inline',
      titleMap,
      selectKey: 'courseinfo',
      sid: this.props.location.state.sid,
      title:this.props.location.state.title,
      // sid:2,
      // title:"123",
      hwid:undefined,//作业id
      uid:undefined,//写作业学生的id
      hwdId:undefined,//提交作业的id
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const menuMap = {
      courseinfo: '课程详情',
      hwlist: '作业列表',
      userlist: '学生列表',
    };
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  getRightTitle = () => {
    const { selectKey, titleMap } = this.state;
    return titleMap[selectKey];
  };
  selectKey = (key) => {
    this.setState({
      selectKey: key,
    });
  };
  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };
  setUid(uid){
    this.setState({uid:uid});
  }
  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'courseinfo':
        return <CourseInfoView sid={this.state.sid}/>;

      case 'hwlist':
        return <HwListView  parent={this} sid={this.state.sid}/>;

      case 'hwinfo':
        return <HwInfoView parent={this} hwid={this.state.hwid}/>;

      case 'hwcreate':
        return <HwCreateView parent={this} sid={this.state.sid}/>;

      case 'hwcheck':
        return <HwCheckView parent={this} hwid={this.state.hwid} uid={this.state.uid} hwdId={this.state.hwdId}/>;
        
      case 'userlist':
        return <UserListView sid={this.state.sid}/>;

      default:
        break;
    }

    return null;
  };
  
  changeView(newKey){
    this.setState({ selectKey: newKey });
  }

  goToHwCheckPage(newKey, uid, hwdId) {
    this.setState({
      selectKey: newKey,
      uid: uid,
      hwdId: hwdId
    });
  }

  goToHwInfoView(newKey, hwid) {
    this.setState({ selectKey: newKey, hwid: hwid });
  }

  render() {
    const { mode, selectKey } = this.state;
    return (
      <PageContainer content={<div>{this.state.title}</div>}>
        <GridContent>
          <div className={styles.main}>
            <div className={styles.leftMenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
                {this.getMenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              {this.renderChildren()}
            </div>
          </div>
        </GridContent>
      </PageContainer>
    );
  }
}

export default ManageCourseCenter;
