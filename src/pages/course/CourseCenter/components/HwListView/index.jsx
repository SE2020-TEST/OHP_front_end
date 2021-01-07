import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { connect } from 'umi';
import logo from './logo.svg';
import { postRequest } from '@/utils/request';
import { getUserinfo } from '@/utils/userinfo';

class HwListView extends React.Component {
    constructor(props) {
        super(props);
        super(props);
        this.state={
            sid:this.props.sid,
            HwList:[],
            
        }
    }

    componentDidMount() {
        postRequest('/hw/stu/list',{sid:this.state.sid,uid:getUserinfo().id},(data)=>{this.setState({HwList:data})});
    }

    onClicked(record) {
        console.log(record)
        this.props.parent.goToHwInfoView("hwinfo", record.hwid);
    }

    render() {
       
        return (
            <Card bordered={false}>
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
                                        <div><b>截止时间：</b>{item.deadline}</div>
                                        |
                                        <div><b>计分：</b>{item.state == 2 ? item.score : '--'}/100</div>
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
