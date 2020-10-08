import React from "react";
import {Button, Descriptions, Input, Layout, Upload,Card} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

// const {Content}=Layout;

class CourseInfoPage extends React.Component{
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
            edit1: false,
            edit2: false,
            edit3: false,
            follow: false,
            icon: "",
            newIcon: false,
            CourseName:"课程的名称",
            CourseIntro:"课程的简介",
            CourseBooks:"所需的教材",

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
        alert("修改成功");
    }
    render() {
        return (
            // <Content style={{ padding: '50px' }}>
                <div >
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
                    <Button type="primary" danger>删除课程</Button>
                    <hr/>
                    <Card title="课程信息">
                        <Card type="inner" title="课程名称" extra={<Button type={this.state.edit1 ? "primary" : "ghost"}
                                                                       onClick={() => {
                                                                           if (this.state.edit1) {
                                                                               this.Submit();
                                                                               this.setState({edit1: false});
                                                                           } else {
                                                                               this.setState({edit1: true});
                                                                           }
                                                                       }}>{this.state.edit1 ? "提交修改" : "修改资料"}</Button>}>
                            {this.state.edit1 ?
                                <Input id="name"
                                       defaultValue={this.state.CourseName}/> : this.state.CourseName}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="课程简介"
                            extra={<Button type={this.state.edit2 ? "primary" : "ghost"}
                                           onClick={() => {
                                               if (this.state.edit2) {
                                                   this.Submit();
                                                   this.setState({edit2: false});
                                               } else {
                                                   this.setState({edit2: true});
                                               }
                                           }}>{this.state.edit2 ? "提交修改" : "修改资料"}</Button>}
                        >
                            {this.state.edit2 ?
                                <Input id="intro"
                                       defaultValue={this.state.CourseIntro}/> : this.state.CourseIntro}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="所需教材"
                            extra={<Button type={this.state.edit3 ? "primary" : "ghost"}
                                           onClick={() => {
                                               if (this.state.edit3) {
                                                   this.Submit();
                                                   this.setState({edit3: false});
                                               } else {
                                                   this.setState({edit3: true});
                                               }
                                           }}>{this.state.edit3 ? "提交修改" : "修改资料"}</Button>}
                        >
                            {this.state.edit3 ?
                                <Input id="books"
                                       defaultValue={this.state.CourseBooks}/> : this.state.CourseBooks}
                        </Card>
                    </Card>
                    <hr/>
                    {/*<Button type={this.state.edit ? "primary" : "ghost"}*/}
                    {/*        onClick={() => {*/}
                    {/*            if (this.state.edit) {*/}
                    {/*                this.Submit();*/}
                    {/*                this.setState({edit: false});*/}
                    {/*            } else {*/}
                    {/*                this.setState({edit: true});*/}
                    {/*            }*/}
                    {/*        }}>{this.state.edit ? "提交修改" : "修改资料"}</Button>*/}
                    {/*<Button type={"ghost" }><Link to={'/home/my/edit'}>{"修改密码"}</Link></Button>*/}
                </div>
            // </Content>
        );
    }
}

export default CourseInfoPage;
