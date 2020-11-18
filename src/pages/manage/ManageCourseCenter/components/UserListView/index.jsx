import React from "react";
import { Table, Avatar, Card, Button,Popconfirm } from "antd";
import { connect } from "umi";
import { UserAddOutlined,UsergroupAddOutlined } from "@ant-design/icons";

class UserListView extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'manageCourseCenter/fetchUserList',
            payload: {
                sid: this.props.sid,
            },
        });
    }

    addStudent() {
        console.log("添加学生")
    }

    deleteUser(record){
        console.log("delete ");
        console.log(record)
    }

    render() {
        const paginationProps = {
            position: ['bottomLeft'],
            showSizeChanger: false,//设置每页显示数据条数
            showQuickJumper: true,
            pageSize: 7,
        };

        const { userList } = this.props;

        if (!Array.isArray(userList)) {
            return "";
        }

        const userColumns = [
            {
                title: <b></b>,
                width: "10%",
                dataIndex: 'phone',
                render: (text) => {
                    return <Avatar src={text} />
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
                title: <b>手机号</b>,
                dataIndex: 'phone',
            },
            {
                title: <b>操作</b>,
                dataIndex: 'operation',
                render: (text, record) =>
                    <div>
                        <Popconfirm title="确认删除?" onConfirm={() => this.deleteUser(record)}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
            },
        ];
        
        return (
            <Card title={<Button icon={<UserAddOutlined />} onClick={() => this.addStudent()}>添加学生</Button>} 
            extra={<Button icon={<UsergroupAddOutlined />}>导入学生</Button>} bordered={false}>
                <Table
                    columns={userColumns}
                    dataSource={userList}
                    onRow={record => {
                        return {
                            // onClick: () => { this.onClicked(record); }, // 点击行
                        };
                    }}
                    pagination={paginationProps}
                    footer={() => {
                        return <div>共<b>{userList.length}</b>条记录</div>
                    }}
                />

            </Card>
        );
    }
}

export default connect(({ manageCourseCenter }) => ({
    userList: manageCourseCenter.userList,
}))(UserListView);