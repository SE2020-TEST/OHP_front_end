import React from "react";
import { Divider, Button, Card, Form,Space } from "antd";
import BraftEditor from 'braft-editor'
import { connect } from 'umi';
import './BraftEditor.css';
import './index.css'


class HwInfoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hwid: this.props.hwid,
            editorCommit: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            HTMLCommit: '',
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'courseCenter/fetchHwInfo',
            payload: {
                hwid:this.props.hwid,
            },
        })
    }
    

    onClicked(record) {
        console.log(record);
    }

    changeTab(key) {
        console.log(key);
    }

    goToHwCheckPage(record) {
        console.log(record);
        this.props.history.push('/home/course/hw/check');
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

    render() {
        const { editorCommit } = this.state;
        const { hwInfo } = this.props;

        if (JSON.stringify(hwInfo) == "{}") {
            console.log("not render")
            return "";
        }

        return (
            <div>
                <Divider />
                <div style={{ fontSize: 16, paddingBottom: 30 }}>
                    <div className={"hw-title"} style={{ float: "left" }}>{hwInfo.title}</div>
                    <div style={{ float: "right" }}>
                        <Button type={"primary"} style={{ float: "right" }} onClick={() => this.scrollToAnchor('submit-hw')}>
                            提交作业
                            </Button>
                    </div>
                </div>
                <Divider />
                <div style={{fontSize:16,paddingBottom:20}}>
                    <div style={{float:"left"}}><b>截止时间：</b>{hwInfo.deadline}之前</div>
                    <div  style={{float:"right"}}><b>提交：</b>一份上传文件</div>
                </div>
                <Divider />
                <div className={"hw-title1"}>作业内容</div>
                <Divider />
                <p>{this.string2html(hwInfo.content)}</p>
                <Divider />
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
                <Divider />
                {hwInfo.hasCorrected ?
                    <div>
                        <div className={"hw-title"}>批改结果及参考答案</div>
                        <Divider />
                        <div className={"hw-title1"}>评分</div>
                        <Divider />
                        <p>{hwInfo.score}</p>
                        <Divider />
                        <div className={"hw-title1"}>批注</div>
                        <Divider />
                        <p>{hwInfo.comment}</p>
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

export default  connect(({ courseCenter }) => ({
    hwInfo: courseCenter.hwInfo,
}))(HwInfoView);
