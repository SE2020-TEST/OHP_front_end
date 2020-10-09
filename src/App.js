import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import HomePage from "./Pages/HomePage";
import "./App.css"
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
    return (
        <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Switch>
                <Redirect exact from={'/'} to={'/home'}/>
                <Route path={'/home'} component={HomePage}/>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/register'} component={RegisterPage}/>
            </Switch>
        </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
