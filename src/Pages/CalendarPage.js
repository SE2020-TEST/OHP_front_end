import React from "react";
import {Layout} from "antd";
import {Calendar, Badge} from 'antd';
import "../Assets/Css/HomePage.css"

const {Content} = Layout;

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.dateCellRender = this.dateCellRender.bind(this);
    }

    getListData(value) {
        let listData;
        switch (value.date()) {
            case 7:
                listData = [
                    {type: 'error', content: '作业2迟交'},
                    {type: 'error', content: '作业3逾期'},
                ];
                break;
            case 8:
                listData = [
                    {type: 'warning', content: '作业0未完成'},
                    {type: 'success', content: '作业1按时完成'},
                ];
                break;
            case 14:
                listData = [
                    {type: 'warning', content: '作业0未完成'},
                    {type: 'success', content: '作业1按时完成'},
                ];
                break;
            case 26:
                listData = [
                    {type: 'warning', content: '作业0未完成'},
                    {type: 'success', content: '作业1按时完成'},
                ];
                break;
            default:
        }
        return listData || [];
    }

    dateCellRender(value) {
        let listData = this.getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        let moment = require('moment');
        moment().format();

        return (
            <Content style={{padding: '50px'}}>
                <div className="site-layout-content">
                    <Calendar mode={"month"} dateCellRender={this.dateCellRender}
                              defaultValue={moment()}/>
                </div>
            </Content>
        );
    }
}

export default CalendarPage;
