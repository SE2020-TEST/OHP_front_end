import React from "react";
import { Divider, Button, Card, Form, message } from "antd";
import BraftEditor from 'braft-editor'
import { CheckOutlined } from '@ant-design/icons';
import './BraftEditor.css';
import './index.css'
import { postRequest } from '@/utils/request';
import { getUserinfo } from '@/utils/userinfo';


class HwInfoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwid: this.props.hwid,
            editorCommit: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            HTMLCommit: '',
            hwInfo:{},
        }
    }

    componentDidMount() {
        postRequest('/hwdetail/info', { uid: getUserinfo().id, hwid: this.state.hwid },(data)=>{this.setState({hwInfo:data})});
    }

    validatorCommit = (rule, value, callback) => {
        if (this.state.HTMLCommit == '' || this.state.HTMLCommit == '<p></p>') callback("请输入作业内容！");
        else callback();
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }

    string2html(htmlString) {
        var html = { __html: htmlString };
        return <div dangerouslySetInnerHTML={html}></div>;
    }

    handleSubmit = () => {
        console.log(this.state.hwid)
        console.log(this.state.HTMLCommit)
        const { dispatch,hwid } = this.props;

        let params={
            uid:0,
            hwid: hwid,
            content: this.state.HTMLCommit
        };

        postRequest('/hw/commit',
            {
                uid: getUserinfo().id,
                hwid: this.state.hwid,
                answer: this.state.HTMLCommit
            },
            () => {
                message.success('提交作业成功!');
                postRequest('/hwdetail/info', { uid: getUserinfo().id, hwid: this.state.hwid }, (data) => { this.setState({ hwInfo: data }) });
            });
    }


    render() {
        const { editorCommit,hwInfo } = this.state;

        console.log("get hwinfo")
        console.log(hwInfo)
        return (
            <div>
                <Divider />
                <div style={{ fontSize: 16, paddingBottom: 30 }}>
                    <div className={"hw-title"} style={{ float: "left" }}>{hwInfo.title}</div>
                    <div style={{ float: "right" }}>
                        {hwInfo.state == 0 ?
                            <Button type={"primary"} style={{ float: "right" }} onClick={() => this.scrollToAnchor('submit-hw')}>
                                提交作业
                            </Button>
                            :
                            <Button type={"primary"} icon={<CheckOutlined />} style={{ float: "right" }}
                                onClick={() => this.scrollToAnchor('hw-content')}>
                                已提交
                            </Button>}
                    </div>
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
                <p>{this.string2html(hwInfo.content)}</p>
                <Divider />
                <div className={"hw-title1"}>你的回答</div>
                <Divider />
                {hwInfo.state == 0 ?
                    <div id="submit-hw">
                        <Form
                            layout="vertical"
                            onFinish={this.handleSubmit}
                            hideRequiredMark
                        >
                            <Form.Item
                                name="commit"
                                rules={[
                                    {
                                        validator: this.validatorCommit,
                                    },
                                ]}>
                                <Card className="editor-wrapper">
                                    <BraftEditor
                                        value={editorCommit}
                                        onChange={(editorCommit) => {
                                            this.setState({
                                                editorCommit: editorCommit,
                                                HTMLCommit: editorCommit.toHTML()
                                            })
                                        }} />
                                </Card>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">提交作业</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    :
                    <div id="hw-content">
                        <p>{this.string2html(hwInfo.answer)}</p>
                    </div>
                }

                <Divider />
                {hwInfo.state==2 ?
                    <div>
                        <div className={"hw-title"}>批改结果及参考答案</div>
                        <Divider />
                        <div className={"hw-title1"}>评分</div>
                        <Divider />
                        <p>{hwInfo.score}</p>
                        <Divider />
                        <div className={"hw-title1"}>批注</div>
                        <Divider />
                        <p>{this.string2html(hwInfo.comment)}</p>
                        <Divider />
                        <div className={"hw-title1"}>留言</div>
                        <Divider />
                        <p>{hwInfo.msg}</p>
                        <Divider />
                        <div className={"hw-title1"}>参考答案</div>
                        <Divider />
                        <p>{this.string2html(hwInfo.answer)}</p>
                        <Divider />
                    </div> : ""}
            </div>
        )
    }
}

export default HwInfoView;
