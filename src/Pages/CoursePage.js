import React from "react";
import {Layout,Button,Menu} from "antd";
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    EditOutlined,
    MailOutlined, BookOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './CoursePage.css';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import CourseInfoPage from "./CourseInfoPage";
import CourseUserPage from "./CourseUserPage";

const { Header, Content, Sider } = Layout;



class CoursePage extends React.Component{
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            // <Content style={{ padding: '50px' }}>
            <Layout>
                <Sider width={200} className="site-layout-background" trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ width: 200 }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Menu
                            defaultSelectedKeys={['1']}
                            //defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={this.state.collapsed}
                        >
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                <Link to={'/home/courseDemo/courseInfo'}>主页</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<MailOutlined />}>
                                <Link to={'/home/courseDemo'}>公告</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<EditOutlined />}>
                                <Link to={'/home/courseDemo'}>作业</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<UserOutlined />}>
                                <Link to={'/home/courseDemo/courseUser'}>用户</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 10,
                            minHeight: 280,
                        }}
                    >
                        <div  className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <Route exact component={CourseInfoPage} path="/home/courseDemo/courseInfo"/>
                                <Route exact component={CourseUserPage} path="/home/courseDemo/courseUser"/>
                                <Redirect exact path={'/home/courseDemo/'}
                                          to={'/home/courseDemo/courseInfo'}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            // <div className="site-layout-content">
            //     <div style={{ width: 256 }}>
            //         <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            //             {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            //         </Button>
            //         <Menu
            //             defaultSelectedKeys={['1']}
            //             defaultOpenKeys={['sub1']}
            //             mode="inline"
            //             theme="dark"
            //             inlineCollapsed={this.state.collapsed}
            //         >
            //             <Menu.Item key="1" icon={<PieChartOutlined />}>
            //                 Option 1
            //             </Menu.Item>
            //             <Menu.Item key="2" icon={<DesktopOutlined />}>
            //                 Option 2
            //             </Menu.Item>
            //             <Menu.Item key="3" icon={<ContainerOutlined />}>
            //                 Option 3
            //             </Menu.Item>
            //         </Menu>
            //     </div>
            //     <div>
            //         <Switch>
            //             <Route exact component={CourseInfoPage} path="/home/courseDemo/courseInfo"/>
            //             <Redirect exact path={'/home/courseDemo/'}
            //                       to={'/home/courseDemo/courseInfo'}/>
            //         </Switch>
            //     </div>
            //
            // </div>
            // </Content>
        );
    }
}

export default CoursePage;
