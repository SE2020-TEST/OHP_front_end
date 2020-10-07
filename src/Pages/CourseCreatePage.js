import React from "react";
import {Button, Input, Upload,Card} from "antd";
import 'antd/dist/antd.css';

class CourseCreatePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit1: false,
            follow: false,
            icon: "",
            newIcon: false,
            CourseName:"",
            CourseIntro:"",
            CourseBooks:"",

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
        window.location.href = "/home/courseDemo";

        // /home/courseDemo
    }
    render() {
        return (
            <div style={{ padding: '50px' }}>
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
                <Card title="课程信息">
                    <Card type="inner" title="课程名称" >
                        {this.state.edit1 ?
                            <Input id="name"
                                   defaultValue={this.state.CourseName}/> : this.state.CourseName}
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="课程简介"
                    >
                        {this.state.edit1 ?
                            <Input id="intro"
                                   defaultValue={this.state.CourseIntro}/> : this.state.CourseIntro}
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="所需教材"
                    >
                        {this.state.edit1 ?
                            <Input id="books"
                                   defaultValue={this.state.CourseBooks}/> : this.state.CourseBooks}
                    </Card>
                </Card>
                <hr/>
                {<Button type={this.state.edit1 ? "primary" : "ghost"}
                               onClick={() => {
                                   if (this.state.edit1) {
                                       this.Submit();
                                       this.setState({edit1: false});
                                   } else {
                                       this.setState({edit1: true});
                                   }
                               }}>{this.state.edit1 ? "提交修改" : "修改资料"}</Button>}
            </div>
        );
    }
}

export default CourseCreatePage;
