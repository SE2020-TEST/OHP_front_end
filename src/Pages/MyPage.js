import React from "react";
import { Layout} from "antd";
import 'antd/dist/antd.css';
import {Redirect, Route, Switch} from "react-router-dom";
import MyHomePage from "./MyHomePage";
import MyEditPage from "./MyEditPage";

const {Content}=Layout;

class MyPage extends React.Component{
    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    <Switch>
                        <Route exact component={MyHomePage} path="/home/my/myHome"/>
                        <Route exact component={MyEditPage} path="/home/my/edit"/>
                        <Redirect exact path={'/home/my/'}
                                  to={'/home/my/myHome/'}/>
                    </Switch>
                </div>
            </Content>
        );
    }
}

export default MyPage;
