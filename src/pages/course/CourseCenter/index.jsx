import React, { Component } from 'react';
import { GridContent,PageContainer } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import CourseInfoView from './components/CouseInfoView';
import HwListView from './components/HwListView';
import HwInfoView from './components/HwInfoView';
import styles from './style.less';
import { RollbackOutlined, ArrowLeftOutlined } from '@ant-design/icons';
const { Item } = Menu;

class CourseCenter extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const titleMap = {
      courseinfo: '课程详情',
      hwlist: '作业列表',
      hwinfo: <div><ArrowLeftOutlined  onClick={()=>{this.setState({selectKey:'hwlist'})}}/>&nbsp;&nbsp;&nbsp;作业详情</div>,
    };
    this.state = {
      mode: 'inline',
      titleMap,
      selectKey: 'courseinfo',
      sid: this.props.location.state.sid,
      title:this.props.location.state.title,
      hwid:undefined,
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
  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'courseinfo':
        return <CourseInfoView sid={this.state.sid}/>;

      case 'hwlist':
        return <HwListView parent={this} sid={this.state.sid}/>;

      case 'hwinfo':
        return <HwInfoView hwid={this.state.hwid}/>;

      default:
        break;
    }

    return null;
  };
  goToHwCreateView(newKey){
    this.setState({ selectKey: newKey });
  }

  goToHwInfoView(newKey,hwid) {
    console.log(newKey)
    console.log(hwid)
    this.setState({ selectKey: newKey });
    this.setState({hwid:hwid});
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

export default CourseCenter;
