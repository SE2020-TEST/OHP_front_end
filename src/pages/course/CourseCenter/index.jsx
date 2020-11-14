import React, { Component } from 'react';
import { FormattedMessage, connect } from 'umi';
import { GridContent,PageContainer } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import CourseInfoView from './components/CouseInfoView';
import SecurityView from './components/SecurityView/security';
import styles from './style.less';
const { Item } = Menu;

class CourseCenter extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      courseinfo: <FormattedMessage id="courseCenter.menuMap.courseinfo" />,
      hwlist: <FormattedMessage id="courseCenter.menuMap.hwlist" />,
      userlist: <FormattedMessage id="courseCenter.menuMap.userlist" />,
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'courseinfo',
      sid: this.props.location.state.sid,
      title:this.props.location.state.title,
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
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
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
        return <SecurityView />;

      case 'userlist':
        return <CourseInfoView/>;

      default:
        break;
    }

    return null;
  };

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

export default connect()(CourseCenter);
