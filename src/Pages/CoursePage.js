import React from "react";
import {Layout, Button, Menu} from "antd";
import { Route, Switch, Link} from 'react-router-dom';
import {Redirect}from 'react-router-dom'
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
import '../Assets/Css/CoursePage.css';
import CourseInfoPage from "./CourseInfoPage";
import CourseUserPage from "./CourseUserPage";
import HwListPage from "./HwListPage";
import HwInfoPage from "./HwInfoPage";
import HwCreatePage from "./HwCreatePage";
import HwCheckPage from "./HwCheckPage";

const {Header, Content, Sider} = Layout;

class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            title: sessionStorage.getItem("courseTitle"),
            courseId: sessionStorage.getItem("courseId"),
            positiveKey: "1"
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        let key = sessionStorage.getItem("leftKey");
        if (key !== undefined)
            this.setState({positiveKey: key})
    }

    render() {
        let leftKey = sessionStorage.getItem("leftKey");
        let hwKey =sessionStorage.getItem("hwKey");
        let hwTitle=sessionStorage.getItem("hwTitle");

        return (
            <Layout>
                <Sider width={200} className="site-layout-background" trigger={null} collapsible
                       collapsed={this.state.collapsed}>
                    <div style={{width: 200}}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Menu
                            mode="inline"
                            theme="light"
                            inlineCollapsed={this.state.collapsed}
                            defaultSelectedKeys={[sessionStorage.getItem("leftKey") === undefined ? "1" : sessionStorage.getItem("leftKey")]}
                            selectedKeys={this.state.positiveKey}
                            onClick={(e) => {
                                sessionStorage.setItem("leftKey", e.key);
                                this.setState({positiveKey: e.key})
                            }}
                        >
                            <Menu.Item key="1" icon={<HomeOutlined/>}>
                                <Link to={{
                                    pathname: '/home/course/info',

                                }}>主页</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<EditOutlined/>}>
                                <Link to={'/home/course/hw'}>作业</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UserOutlined/>}>
                                <Link to={'/home/course/users'}>用户</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 10,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route exact component={CourseInfoPage} path="/home/course/info"/>
                            <Route exact component={HwListPage} path="/home/course/hw"/>
                            <Route exact component={HwCreatePage} path="/home/course/hw/create"/>
                            <Route exact component={HwInfoPage} path="/home/course/hw/info"/>
                            <Route exact component={HwCheckPage} path="/home/course/hw/check"/>
                            <Route exact component={CourseUserPage} path="/home/course/users"/>
                            <Redirect exact path={"/home/course"} to={'/home/course/info'}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CoursePage;
