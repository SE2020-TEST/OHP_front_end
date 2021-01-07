import React from "react";
import { Card, List, Avatar, Space, Button } from "antd";
import { connect } from 'umi';
import { EditOutlined } from "@ant-design/icons";
import logo from './logo.svg';
import { postRequest } from '@/utils/request';
import { getUserinfo } from '@/utils/userinfo';


class HwListView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sid:this.props.sid,
            HwList:[],
            
        }
    }

    componentDidMount() {
        postRequest('/hw/tea/list',{sid:this.state.sid,uid:getUserinfo().id},(data)=>{this.setState({HwList:data})});
    }

    onClicked(record) {
        this.props.parent.goToHwInfoView("hwinfo", record.hwid);
    }

    goToHwCreateView(){
        this.props.parent.changeView("hwcreate");
    }

    render() {
        console.log(this.state.HwList)
        return (
            <Card title={<Button icon={<EditOutlined/>} onClick={()=>this.goToHwCreateView()}>发布新作业</Button>}bordered={false}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.HwList}
                    pagination={{
                        pageSize: 7,
                        showSizeChanger: false,
                        showQuickJumper: true
                    }}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={logo} size="small" />}
                                title={<b>{item.title}</b>}
                                description={
                                    <Space > 
                                        <div><b>开始时间：</b>{item.startTime}</div>
                                        |
                                        <div><b>截止时间：</b>{item.deadline}</div>
                                    </Space>
                                }
                                onClick={() => { this.onClicked(item) }}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default HwListView;
