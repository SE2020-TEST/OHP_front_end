import React from "react";
import { Divider, Button, Space, message, Table, Tabs, Progress, Card, Avatar } from "antd";
import { connect } from 'umi';
import './index.css'

const { TabPane } = Tabs;

class HwInfoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hwTitle: undefined,
            // hwId: undefined,
 
            hwTitle: "作业0",
            hwId: this.props.hwid,
            submitHwList:[],
            userList:[],
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'courseCenter/fetchHwInfo',
            payload: {
                hwid: this.props.hwid,
            },
        });

        dispatch({
            type: 'manageCourseCenter/fetchSubmission',
            payload: {
                hwid: this.props.hwid,
            },
        });

        let list = [];
        for (let i = 0; i < 47; ++i) {
            list.push({
                key: i,
                user: `user${i}`,
                time: `10月12日 15:12`,
                late: i%4===0?`按时提交`:`迟交`,
                score: '--/10',
            });
        }
        this.setState({submitHwList: list});

        list=[];
        for (let i = 0; i < 13; ++i) {
            list.push({
                key: i,
                user: `user${i}`,
                id: `518021910${i}`,
                class: 'F1803704',
                role: i%7!==0?'学生':'助教',
            });
        }
        this.setState({userList: list});
    }

    onClicked(record) {
        console.log(record);
    }

    goToHwCheckPage(hwid){
        console.log("goto check:"+hwid);
        this.props.parent.changeView('hwcheck');
    }

    string2html(htmlString) {
        var html = { __html: htmlString };
        return <div dangerouslySetInnerHTML={html}></div>;
    }

    render() {
        const paginationProps = {
            position: ['bottomLeft'],
            showSizeChanger: false,//设置每页显示数据条数
            showQuickJumper: true,
            pageSize:7,
        };

        const hwColumns = [
            {
                title: <b>提交者姓名</b>,
                dataIndex: 'username',
            },
            {
                title: <b>完成情况</b>,
                dataIndex: 'state',
                render: (text) => {
                    if(text==0)return "未完成";
                    else if(text==1)return "按时提交";
                    else if(text==2)return "迟交";
                }

            },
            {
                title: <b>批改情况</b>,
                dataIndex: 'hasCorrected',
                render: (text) => {
                    if (text == true) return "已批改";
                    else return "未批改";
                }
            },
            {
                title: <b>操作</b>,
                dataIndex: 'operation',
                render: (text, record) => {
                    if (record.hasCorrected) return <div>无需操作</div>;
                    else return <Button onClick={() => { this.goToHwCheckPage(record.id) }}>进入批改</Button>
                }

            },
        ];

        const userColumns = [
            {
                title: <b></b>,
                dataIndex: 'avatar',
                width: "10%",
                render:(text)=>{
                    return <Avatar src={text}/>
                }
            },
            {
                title: <b>姓名</b>,
                dataIndex: 'username',
            },
            {
                title: <b>学号</b>,
                dataIndex: 'userid',
            },
            {
                title: <b>身份</b>,
                dataIndex: 'role',

            },
        ];

        const { hwInfo, submission } = this.props;

        if (JSON.stringify(hwInfo) == "{}" || JSON.stringify(submission) == "{}"
            || !Array.isArray(submission.hwDetialList) || !Array.isArray(submission.notSubmitUserList)) {
            return "";
        }

        return (
            <div>
               <Divider />
                <div style={{ fontSize: 16, paddingBottom: 30 }}>
                    <div className={"hw-title"} style={{ float: "left" }}>{hwInfo.title}</div>
                </div>
                <Divider />
                <div style={{ fontSize: 16, paddingBottom: 20 }}>
                    <div style={{ float: "left" }}><b>截止时间：</b>{hwInfo.deadline}之前</div>
                    <div style={{ float: "right" }}><b>提交：</b>一份上传文件</div>
                </div>
                <Divider />
                <div className={"hw-title1"}>作业要求</div>
                <Divider />
                <p>{this.string2html(hwInfo.requirement)}</p>
                <Divider />
                <div className={"hw-title1"}>参考答案</div>
                <Divider />
                <p>{this.string2html(hwInfo.answer)}</p>
                <Divider />
                <div className={"hw-title1"}>提交作业情况</div>
                <Divider/>
                <Space size={"large"}>
                    <Card title={"批改进度"}>
                        <Progress type="circle" percent={submission.percentCorrection} />
                    </Card>
                    <Card title={"提交情况"}>
                        <Progress type="circle" percent={submission.percentSubmission} />
                    </Card>
                </Space>
                <Divider/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="提交作业列表" key="1">
                        <Table 
                            columns={hwColumns}
                            dataSource={submission.hwDetialList}
                            bordered
                            pagination={paginationProps}
                            footer={() => {
                                return <div>共<b>{submission.hwDetialList.length}</b>条记录</div>
                            }}
                            rowClassName={(record, index) => {
                                let className = 'light-row';
                                if (index % 2 === 1) className = 'dark-row';
                                return className;
                            }}
                        />
                    </TabPane>
                    <TabPane tab="未提交用户列表" key="2">
                        <Table 
                            columns={userColumns}
                            dataSource={submission.notSubmitUserList}
                            onRow={record => {
                                return {
                                    onClick: () => {this.onClicked(record);}, // 点击行
                                };
                            }}
                            pagination={paginationProps}
                            footer={() => {
                                return <div>共<b>{submission.notSubmitUserList.length}</b>条记录</div>
                            }}
                        />
                    </TabPane>

                </Tabs>


            </div>
        )
    }
}

export default connect(({ courseCenter, manageCourseCenter }) => ({
    hwInfo: courseCenter.hwInfo,
    submission: manageCourseCenter.submission,
}))(HwInfoView);
