import React from "react";
import { Table, Avatar, Card, Button,Popconfirm, message} from "antd";
import { connect } from "umi";
import { UserAddOutlined,UsergroupAddOutlined } from "@ant-design/icons";
import { postRequest } from '@/utils/request';
import AddUserModal from './AddUserModal';

class UserListView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            sid:this.props.sid,
            userList:[],
        }
        this.forceUpdate=this.forceUpdate.bind(this);
    }

    forceUpdate() {
        postRequest('/section/userlist', { sid: this.state.sid }, (data) => {
            console.log(data);
            this.setState({ userList: data })
        });
    }

    componentDidMount() {
        this.forceUpdate();
    }

    addStudent() {
        console.log("添加学生")
    }

    deleteUser(record){
        console.log("delete ");
        console.log(record);
        postRequest('/section/deleteuser',{sid:this.props.sid,uid:record.id},()=>{
            message.success('删除学生成功');
            postRequest('/section/userlist',{sid:this.state.sid},(data)=>{
                console.log(data);
                this.setState({userList:data})});
        })
    }

    render() {
        const paginationProps = {
            position: ['bottomLeft'],
            showSizeChanger: false,//设置每页显示数据条数
            showQuickJumper: true,
            pageSize: 7,
        };

        const userColumns = [
            {
                title: <b></b>,
                width: "10%",
                dataIndex: 'avatar',
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
                title: <b>邮箱</b>,
                dataIndex: 'email',
            },
            {
                title: <b>手机号</b>,
                dataIndex: 'phone',
            },
            {
                title: <b>操作</b>,
                dataIndex: 'operation',
                render: (text, record) =>
                    <Button>
                        <Popconfirm title="确认删除?" onConfirm={() => this.deleteUser(record)}>
                            <a>删除</a>
                        </Popconfirm>
                    </Button>
            },
        ];

        console.log("userlist")
        console.log(this.state.userList);
        
        return (
            <Card title={
            // <Button icon={<UserAddOutlined />} onClick={() => this.addStudent()}>添加学生</Button>
            <AddUserModal sid={this.props.sid} forceUpdate={this.forceUpdate}/>
        } 
            extra={<Button icon={<UsergroupAddOutlined />}>导入学生</Button>} bordered={false}>
                <Table
                    columns={userColumns}
                    dataSource={this.state.userList}
                    onRow={record => {
                        return {
                            // onClick: () => { this.onClicked(record); }, // 点击行
                        };
                    }}
                    pagination={paginationProps}
                    footer={() => {
                        return <div>共<b>{this.state.userList.length}</b>条记录</div>
                    }}
                />

            </Card>
        );
    }
}

export default UserListView;