import React from "react";
import {Layout, Menu} from 'antd';
import {CloudOutlined, BookOutlined,MessageOutlined,CalendarOutlined,UserOutlined,LogoutOutlined} from '@ant-design/icons';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import "../Assets/Css/HomePage.css"
import CourseListPage from "./CourseListPage";
import MessagePage from "./MessagePage";
import MyPage from "./MyPage";
import CalendarPage from "./CalendarPage";
import CoursePage from "./CoursePage";
import CourseCreatePage from "./CourseCreatePage";

const {Header, Footer} = Layout;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            positiveKey: "1",
        }
    }

    componentDidMount() {
        let key=sessionStorage.getItem("topKey");
        if(key!==undefined)
            this.setState({positiveKey:key})
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
                    <Menu theme="dark"
                          mode="horizontal"
                          defaultSelectedKeys={[sessionStorage.getItem("topKey")===undefined?"1":sessionStorage.getItem("topKey")]}
                          selectedKeys={this.state.positiveKey}
                          onClick={(e) => {sessionStorage.setItem("topKey",e.key);this.setState({positiveKey: e.key})
                    }}>
                        <Menu.Item key="1"><Link to={'/home/courses'}><BookOutlined />课程</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={'/home/messages'}><MessageOutlined />消息</Link></Menu.Item>
                        <Menu.Item key="3"><Link to={'/home/calendar'}><CalendarOutlined />日历</Link></Menu.Item>
                        <Menu.Item key="4"><Link to={'/home/my'}><UserOutlined />我的</Link></Menu.Item>
                        <Menu.Item key="5" style={{float: "right"}}><Link to={'/login'}><LogoutOutlined />退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <div>
                    <Switch>
                        <Route path={'/home/courses'} component={CourseListPage}/>
                        <Route path={'/home/messages'} component={MessagePage}/>
                        <Route path={'/home/calendar'} component={CalendarPage}/>
                        <Route path={'/home/my'} component={MyPage}/>
                        <Route path={'/home/course'} component={CoursePage}/>
                        <Route path={'/home/createCourse'} component={CourseCreatePage}/>
                        <Redirect exact path={'/home'} to={'/home/courses'}/>
                    </Switch>
                </div>
                <Footer style={{textAlign: 'center'}}>©2020 云作业平台</Footer>
            </Layout>
        );
    }
}


export default HomePage;
