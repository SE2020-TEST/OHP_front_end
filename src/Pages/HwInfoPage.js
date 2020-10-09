import React from "react";
import { Divider, Button, Space, Upload, message, Table,Tabs,Progress,Card} from "antd";
import "../Assets/Css/HwInfoPage.css"
import {UploadOutlined} from '@ant-design/icons';

const { TabPane } = Tabs;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png',
        },
        {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },
        {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
        },
    ],
};



class HwInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hwTitle: undefined,
            // hwId: undefined,
            hwTitle: "作业0",
            hwId: 0,
            submitHwList:[],
            userList:[],
        }
    }

    componentWillUnmount() {
        sessionStorage.removeItem("hwTitle")
        sessionStorage.removeItem("hwKey")
    }

    componentDidMount() {
        //this.setState({hwTitle: this.props.location.params.hwTitle});
        //this.setState({hwId: this.props.location.params.hwId});
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

    changeTab(key) {
        console.log(key);
    }

    goToHwCheckPage(record){
        console.log(record);
        this.props.history.push('/home/course/hw/check');
    }

    render() {
        console.log("hw title" + this.state.hwTitle);
        console.log("hw title1" + sessionStorage.getItem("hwTitle"));

        const paginationProps = {
            position: ['bottomCenter'],
            showSizeChanger: true,//设置每页显示数据条数
            showQuickJumper: true
        };

        const hwColumns = [
            {
                title: <b>提交者姓名</b>,
                dataIndex: 'user',
                key: 'user',
                width: "40%",
            },
            {
                title: <b>提交时间</b>,
                dataIndex: 'time',
                key: 'time',
                width: "20%",
            },
            {
                title: <b>是否迟交</b>,
                dataIndex: 'late',
                key: 'late',
            },
            {
                title: <b>评分</b>,
                dataIndex: 'score',
                key: 'score',
            },
            {
                title: <b>操作</b>,
                dataIndex: 'operation',
                render: (text, record) =>(
                    <Button onClick={()=>this.goToHwCheckPage(record)}>进入批改</Button>
                )

            },
        ];

        const userColumns = [
            {
                title: <b>姓名</b>,
                dataIndex: 'user',
                key: 'user',
                width: "40%",
            },
            {
                title: <b>ID</b>,
                dataIndex: 'id',
                key: 'id',
                width: "20%",
            },
            {
                title: <b>班级</b>,
                dataIndex: 'class',
                key: 'class',
            },
            {
                title: <b>身份</b>,
                dataIndex: 'role',
                key: 'role',
            },
        ];

        return (
            <div>
                <Divider/>
                <Space align="center" size={300}>
                    <div className={"hw-title"} style={{float: "left"}}>{this.state.hwTitle}</div>
                    <Button type={"primary"} style={{float: "right"}}>提交作业</Button>
                </Space>
                <Divider/>
                <Space align="center">
                    <div><b>截止时间：</b>10月31日 23:59 之前</div>
                    &nbsp; &nbsp;
                    <div><b>评分：</b>--/10</div>
                    &nbsp; &nbsp;
                    <div><b>提交及形式：</b>一份上传文件：图片形式</div>
                </Space>
                <Divider/>
                <p>此处为作业0内容</p>
                <p>此处为作业0内容</p>
                <p>此处为作业0内容</p>
                <p>此处为作业0内容</p>
                <Divider/>
                <Upload {...props}>
                    <Button icon={<UploadOutlined/>}>点击上传</Button>
                </Upload>

                <Divider/>
                <div className={"hw-title"}>批改结果及参考答案(批改完,下面的内容才显示)</div>
                <Divider/>
                <div className={"hw-title1"}>评分</div>
                <Divider/>
                <p>此处为评分</p>
                <div className={"hw-title1"}>批注</div>
                <Divider/>
                <p>此处为批注</p>
                <div className={"hw-title1"}>留言</div>
                <Divider/>
                <p>此处为留言</p>
                <div className={"hw-title1"}>参考答案</div>
                <Divider/>
                <p>此处为参考答案</p>
                <p>此处为参考答案</p>
                <p>此处为参考答案</p>
                <p>此处为参考答案</p>

                <Divider/>
                <div className={"hw-title"}>提交作业情况(只对教师显示)</div>
                <Divider/>
                <Space size={"large"}>
                    <Card title={"批改进度"}>
                        <Progress type="circle" percent={100} />
                    </Card>
                    <Card title={"提交情况"}>
                        <Progress type="circle" percent={60} />
                    </Card>
                </Space>

                <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                    <TabPane tab="提交作业列表" key="1">
                        <Table history={this.props.history}
                               columns={hwColumns}
                               dataSource={this.state.submitHwList}
                               bordered
                               pagination={paginationProps}
                               footer={() => {
                                   return <div>共<b>{this.state.submitHwList.length}</b>条记录</div>
                               }}/>
                    </TabPane>
                    <TabPane tab="未提交用户列表" key="2">
                        <Table history={this.props.history}
                               columns={userColumns}
                               dataSource={this.state.userList}
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
                                   return <div>共<b>{this.state.userList.length}</b>条记录</div>
                               }}/>
                    </TabPane>

                </Tabs>


            </div>
        )
    }
}

export default HwInfoPage;
