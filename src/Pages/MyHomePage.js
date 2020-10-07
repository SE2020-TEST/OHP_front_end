import React from "react";
import {Layout} from "antd";
import 'antd/dist/antd.css';
import {Button, Descriptions, Input, Upload} from 'antd';
// import {BookOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Content}=Layout;

class MyHomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            phoneNumber: "",
            hometown: "",
            role: 0,
            interest: [],
            selfIntro: "",
            edit: false,
            follow: false,
            icon: "",
            newIcon: false
        }
    }
    setIcon = (info) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({icon: reader.result, newIcon: this.state.icon});
        });
        reader.readAsDataURL(info.file.originFileObj);
    };

    postIcon = () => {
    };
    Submit() {
        alert("修改成功");//message
        // window.location.href = "/login";
    }
    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={this.setIcon}
                    >
                        <img src={this.state.icon} alt="avatar" style={{width: '100%'}}/>
                    </Upload>
                    {this.state.newIcon && <Button onClick={this.postIcon}>上传新头像</Button>}
                    <hr/>
                    <Descriptions bordered column={3}>
                        <Descriptions.Item label="用户名">{this.state.edit ?
                            <Input id="name"
                                   defaultValue={this.state.userName}/> : this.state.userName}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{this.state.edit ?
                            <Input id="email" defaultValue={this.state.email}/> : this.state.email}</Descriptions.Item>
                        <Descriptions.Item label="手机号">{this.state.edit ?
                            <Input id="phone"
                                   defaultValue={this.state.phoneNumber}/> : this.state.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="身份">{this.state.role ? "老师" : "学生"}</Descriptions.Item>
                        <Descriptions.Item label="家乡" span={2}>{this.state.edit ?
                            <Input id="hometown"
                                   defaultValue={this.state.hometown}/> : this.state.hometown}</Descriptions.Item>
                        <Descriptions.Item label="自我介绍" span={3}>
                            {this.state.edit ?
                                <Input id="intro" defaultValue={this.state.selfIntro}/> : this.state.selfIntro}
                        </Descriptions.Item>
                    </Descriptions>
                    <hr/>
                    <Button type={this.state.edit ? "primary" : "ghost"}
                            onClick={() => {
                                if (this.state.edit) {
                                    this.Submit();
                                    this.setState({edit: false});
                                } else {
                                    this.setState({edit: true});
                                }
                            }}>{this.state.edit ? "提交修改" : "修改资料"}</Button>
                    <Button type={"ghost" }><Link to={'/home/my/edit'}>{"修改密码"}</Link></Button>
                </div>
            </Content>
        );
    }
}

export default MyHomePage;
