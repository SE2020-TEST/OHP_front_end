import React, { Component } from 'react';
import { FormattedMessage, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/BaseView/base';
import SecurityView from './components/SecurityView/security';
import styles from './style.less';
const { Item } = Menu;

class AccountSettings extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      base: <FormattedMessage id="accountsettings.menuMap.basic" defaultMessage="Basic Settings" />,
      security: <FormattedMessage id="accountsettings.menuMap.security" defaultMessage="Security Settings" />,
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountSettings/fetchCurrent',
    });

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
      case 'base':
        return <BaseView />;

      case 'security':
        return <SecurityView />;

      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;

    if (!currentUser.userid) {
      return '';
    }

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
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
    );
  }
}

export default connect(({ accountSettings }) => ({
  currentUser: accountSettings.currentUser,
}))(AccountSettings);
