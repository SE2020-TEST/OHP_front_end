import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { connect } from 'umi';
import logo from './logo.svg';

class HwListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'courseCenter/fetchHwList',
            payload: {
                sid: this.props.parent.state.sid
            },
        })
    }

    onClicked(record) {
        this.props.parent.goToHwInfoView("hwinfo", record.id);
    }

    render() {
        const { hwList } = this.props;

        return (
            <Card bordered={false}>
                <List
                    itemLayout="horizontal"
                    dataSource={hwList}
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
                                        <div><b>计分：</b>{!item.hasCorrected ? '--' : item.score}/100</div>
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

export default connect(({ courseCenter }) => ({
    hwList: courseCenter.hwList,
}))(HwListView);
