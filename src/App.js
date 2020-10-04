import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import "./App.css"
import LoginPage from "./Pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from={'/'} to={'/home'}/>
                <Route path={'/home'} component={HomePage}/>
                <Route path={'/login'} component={LoginPage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
