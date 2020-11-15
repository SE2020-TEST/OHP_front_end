import React from "react";
import {Button, Card, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";

const columns = [
    {
        title: <b>作业名</b>,
        dataIndex: 'title',
        key: 'title',
        width: "40%",
    },
    {
        title: <b>截止时间</b>,
        dataIndex: 'deadline',
        key: 'deadline',
        width: "20%",
    },
    {
        title: <b>作业状态</b>,
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: <b>完成情况</b>,
        dataIndex: 'completion',
        key: 'completion',
    },
    {
        title: <b>评分</b>,
        dataIndex: 'score',
        key: 'score',
    },
];

class HwListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwList: []
        }
    }

    componentDidMount() {
        let list = [];
        for (let i = 0; i < 47; ++i) {
            list.push({
                id: i,
                title: `作业${i}`,
                deadline: `10月30日23:59`,
                state: i % 2 === 0 ? `正在进行` : `已过期`,
                completion: i % 3 === 0 ? `未完成` : (i % 3 === 1 ? `按时完成` : `迟交`),
                score: '--/10',
            });
        }
        this.setState({hwList: list});
    }

    onClicked(record) {
        //console.log(record);
        this.props.parent.goToHwInfoView("hwinfo",record.id);
    }

    render() {
        const paginationProps = {
            position: ['bottomCenter'],
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: true
        }

        return (
            <div>
                <Card title={<Button icon={<EditOutlined/>} onClick={()=>{this.props.parent.goToHwCreateView('hwcreate');}}>发布新作业</Button>} bordered={false}>
                    <Table history={this.props.history}
                           columns={columns}
                           dataSource={this.state.hwList}
                           bordered
                           onRow={record => {
                               return {
                                   onClick: event => {
                                       this.onClicked(record);
                                   }, // 点击行
                               };
                           }}
                           pagination={paginationProps}
                           footer={() => {
                               return <div>共<b>{this.state.hwList.length}</b>条记录</div>
                           }}/>
                </Card>
            </div>
        );
    }
}

export default HwListView;
