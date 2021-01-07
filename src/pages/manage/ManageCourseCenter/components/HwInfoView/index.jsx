import React from "react";
import { Divider, Button, Space, message, Table, Tabs, Progress, Card, Avatar } from "antd";
import { connect } from 'umi';
import './index.css'
import { postRequest } from '@/utils/request';

const { TabPane } = Tabs;

class HwInfoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwId: this.props.hwid,
            hwInfo:{},
            submission:{},
        }
    }

    componentDidMount() {
        postRequest('/hw/info', {  hwid: this.state.hwId },(data)=>{
            this.setState({hwInfo:data});
        });
        postRequest('/hw/submission', { hw_id: this.state.hwId }, (data) => {
            this.setState({submission:data});
        })
    }

    onClicked(record) {
        console.log(record);
    }

    goToHwCheckPage(record){
        
        console.log("goto check:");
        console.log(record)
        this.props.parent.goToHwCheckPage('hwcheck', record.stuId, record.hwdetailId);
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
                title: <b>学号</b>,
                dataIndex: 'stuId',
                
                
            },
            {
                title: <b>完成情况</b>,
                dataIndex: 'isLate',
                render: (text) => {
                    if (text == 0) return "按时提交";
                    else return "迟交";
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
                    else return <Button onClick={() => { this.goToHwCheckPage(record) }}>进入批改</Button>
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
                dataIndex: 'name',
            },
            {
                title: <b>学号</b>,
                dataIndex: 'id',
            },
            {
                title: <b>邮箱</b>,
                dataIndex: 'email',
            },
            {
                title: <b>电话</b>,
                dataIndex: 'phone',
            },
        ];


        const { hwInfo, submission } = this.state;

        console.log("submit")
        console.log(hwInfo);
        console.log(submission)

        if (JSON.stringify(submission) == "{}"){
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
                <div style={{ float: "left" }}>
                        <b>开始时间：</b>{hwInfo.startTime}之前&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>截止时间：</b>{hwInfo.deadline}之前
                    </div>
                    <div style={{ float: "right" }}><b>提交：</b>一份上传文件</div>
                </div>
                <Divider />
                <div className={"hw-title1"}>作业内容</div>
                <Divider />
                <p>{this.string2html(hwInfo.contents)}</p>
                <Divider />
                <div className={"hw-title1"}>参考答案</div>
                <Divider />
                <p>{this.string2html(hwInfo.refAnswer)}</p>
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
                            dataSource={submission.hwCommitList}
                            pagination={paginationProps}
                            footer={() => {
                                return <div>共<b>{submission.hwCommitList.length}</b>条记录</div>
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
                            dataSource={submission.userList}
                            onRow={record => {
                                return {
                                    onClick: () => {this.onClicked(record);}, // 点击行
                                };
                            }}
                            pagination={paginationProps}
                            footer={() => {
                                return <div>共<b>{submission.userList.length}</b>条记录</div>
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
