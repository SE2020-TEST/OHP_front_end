import React from "react";
import {Button, Input, Upload, Card, Breadcrumb, Layout} from "antd";

const {Content} = Layout;

class CourseCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit1: false,
            follow: false,
            icon: "",
            newIcon: false,
            CourseName: "",
            CourseIntro: "",
            CourseBooks: "",

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
        window.location.href = "/home/courses";
    }

    render() {
        return (
            <Content style={{padding: '50px'}}>
                <Breadcrumb style={{margin: '0 0 30px 0'}}>
                    <Breadcrumb.Item>课程列表</Breadcrumb.Item>
                    <Breadcrumb.Item>新建课程</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <div>上传课程图片</div>
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

                    <Card title="课程信息" style={{margin: '16px 0'}}>
                        <Card type="inner" title="课程名称">
                            {this.state.edit1 ?
                                <Input id="name"
                                       defaultValue={this.state.CourseName}/> : this.state.CourseName}
                        </Card>
                        <Card
                            style={{marginTop: 16}}
                            type="inner"
                            title="课程简介"
                        >
                            {this.state.edit1 ?
                                <Input id="intro"
                                       defaultValue={this.state.CourseIntro}/> : this.state.CourseIntro}
                        </Card>
                        <Card
                            style={{marginTop: 16}}
                            type="inner"
                            title="所需教材"
                        >
                            {this.state.edit1 ?
                                <Input id="books"
                                       defaultValue={this.state.CourseBooks}/> : this.state.CourseBooks}
                        </Card>
                    </Card>

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
            </Content>
        );
    }
}

export default CourseCreatePage;
