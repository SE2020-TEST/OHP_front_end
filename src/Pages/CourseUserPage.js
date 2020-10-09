import React from "react";
import {Button, Card, Upload,Table,Space} from "antd";
import {
    DownloadOutlined,
    UserAddOutlined
} from '@ant-design/icons';

class CourseUserPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            newIcon: false,
            dataSource:[
                {
                    key: '1',
                    name: '胡彦斌',
                    ID: "5180XXXX",
                    class:"F180xxx",
                    role: '助教',
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    ID: "5180XXXX",
                    class:"F180xxx",
                    role: '学生',
                },
                {
                    key: '3',
                    name: '胡元彬',
                    ID: "5180XXXX",
                    class:"F180xxx",
                    role: '老师',
                },
            ],
            columns:[
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    render: text => <a>{text}</a>,
                },
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID',
                },
                {
                    title: '班级',
                    dataIndex: 'class',
                    key: 'class',
                },
                {
                    title: '身份',
                    dataIndex: 'role',
                    key: 'role',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: () => (
                        <Space size="middle">
                            <a>删除</a>
                        </Space>
                    ),
                },
            ],
        }
    }
    render() {
        return (
            <div >
                <Card title="用户列表" extra={<Button icon={<UserAddOutlined />}>添加学生</Button>}>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                </Card>
                <br/>
                <Upload >
                    <Button icon={<DownloadOutlined />}>导入学生</Button>
                </Upload>
            </div>
        )
    }

}

export default CourseUserPage;

