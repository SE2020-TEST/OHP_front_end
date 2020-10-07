import React from "react";
import {Layout, Menu} from 'antd';
import {CloudOutlined, BookOutlined,MessageOutlined,CalendarOutlined,UserOutlined,LogoutOutlined} from '@ant-design/icons';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import "../Assets/Css/HomePage.css"
import CourseListPage from "./CourseListPage";
import MessagePage from "./MessagePage";
import MyPage from "./MyPage";
import LoginPage from "./LoginPage";
import CalendarPage from "./CalendarPage";
import CoursePage from "./CoursePage";
import CourseCreatePage from "./CourseCreatePage";

const {Header, Content, Footer} = Layout;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            positiveKey: "1",
        }
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <div style={{color: "white", textAlign: "center", verticalAlign: "middle"}}>
                            <CloudOutlined/>&nbsp;&nbsp;云作业
                        </div>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}
                          selectedKeys={this.state.positiveKey} onClick={(e) => this.setState({positiveKey: e.key})}>
                        <Menu.Item key="1"><Link to={'/home/courses'}><BookOutlined />课程</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={'/home/messages'}><MessageOutlined />消息</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={'/home/calendar'}><CalendarOutlined />日历</Link></Menu.Item>
                        <Menu.Item key="4"><Link to={'/home/my'}><UserOutlined />我的</Link></Menu.Item>
                        <Menu.Item key="5" style={{float: "right"}}><Link to={'/login'}><LogoutOutlined />退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <div>
                    <Switch>
                        <Route path={'/home/courseDemo'} component={CoursePage}/>
                        <Route path={'/home/courses'} component={CourseListPage}/>
                        <Route path={'/home/create'} component={CourseCreatePage}/>
                        <Route path={'/home/messages'} component={MessagePage}/>
                        <Route path={'/home/calendar'} component={CalendarPage}/>
                        <Route path={'/home/my'} component={MyPage}/>
                        <Redirect exact path={'/home'} to={'/home/courses'}/>
                    </Switch>
                </div>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}


export default HomePage;
