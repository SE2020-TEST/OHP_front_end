import React from "react";
import {Layout} from "antd";
import "../Assets/Css/HomePage.css"

const {Content}=Layout;

class CalendarPage extends React.Component{
    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    Calendar
                </div>
            </Content>
        );
    }
}

export default CalendarPage;
