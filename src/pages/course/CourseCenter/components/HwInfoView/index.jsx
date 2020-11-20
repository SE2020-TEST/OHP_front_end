import React from "react";
import { Divider, Button, Card, Form, message } from "antd";
import BraftEditor from 'braft-editor'
import { connect } from 'umi';
import { CheckOutlined } from '@ant-design/icons';
import './BraftEditor.css';
import './index.css'
import request from 'umi-request';


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
                hwid: this.props.hwid,
            },
        })
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
        
        // dispatch({
        //     type: 'courseCenter/commitHw',
        //     payload: {
        //         hwid: this.props.hwid,
        //         content: this.state.HTMLCommit
        //     },
        // })

        request.post('/hw/commit',{data:params})
        .then(function(res){
            console.log(res)
            if(res.code==0){
                message.success('提交作业成功！');
                dispatch({
                    type: 'courseCenter/fetchHwInfo',
                    payload: {
                        hwid: hwid,
                    },
                })
            }
        })
    }


    render() {
        const { editorCommit } = this.state;
        const { hwInfo } = this.props;

        console.log(hwInfo);

        if (JSON.stringify(hwInfo) == "{}") {
            return "";
        }

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
                    <div style={{ float: "left" }}><b>截止时间：</b>{hwInfo.deadline}之前</div>
                    <div style={{ float: "right" }}><b>提交：</b>一份上传文件</div>
                </div>
                <Divider />
                <div className={"hw-title1"}>作业要求</div>
                <Divider />
                <p>{this.string2html(hwInfo.requirement)}</p>
                <Divider />
                <div className={"hw-title1"}>作业内容</div>
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
                        <p>{this.string2html(hwInfo.content)}</p>
                    </div>
                }

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

export default connect(({ courseCenter }) => ({
    hwInfo: courseCenter.hwInfo,
}))(HwInfoView);
