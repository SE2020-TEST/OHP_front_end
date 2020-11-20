import { Button, Input, Form, message, DatePicker, Card ,Divider,InputNumber } from 'antd';
import React, { Component } from 'react';
import BraftEditor from 'braft-editor'
import { connect } from 'umi';
import './BraftEditor.css';
import request from 'umi-request';


class HwCheckView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorComment: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            HTMLComment: '',
        }
    }

    componentDidMount() {
        const { dispatch, hwid } = this.props;
        dispatch({
            type: 'courseCenter/fetchHwInfo',
            payload: {
                hwid: hwid,
            },
        })
    }

    handleSubmit = (value) => {
        value.comment = this.state.HTMLComment;
        value.hwid=this.props.hwid;

        console.log(value)
        request('/hw/check',{
            method:'POST',
            data:value
        }).then(res=>{
            console.log("res")
            console.log(res)
            if(res.code==0){
                message.success("批改作业成功");
            }else{
                message.error("批改作业失败");
            }
        })
      
    };


    validatorComment = (rule, value, callback) => {
        if (this.state.HTMLComment == '' || this.state.HTMLComment == '<p></p>') callback("请输入作业内容！");
        else callback();
    }

    validatorScore= (rule, value, callback) => {
        if(value>100||value<0) callback("评分不符合范围！")
        else callback();
    }

    string2html(htmlString) {
        var html = { __html: htmlString };
        return <div dangerouslySetInnerHTML={html}></div>;
    }


    render() {
        const { editorComment } = this.state;
        const { hwInfo } = this.props;
    
        if (JSON.stringify(hwInfo) == "{}") {
            return "";
        }

        return (
            <div style={{ paddingTop: 12 }}>
                <Divider />
                <div style={{ fontSize: 16, paddingBottom: 30 }}>
                    <div className={"hw-title"} style={{ float: "left" }}>{hwInfo.title}</div>
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
                <p>{this.string2html(hwInfo.content)}</p>
                <Divider />
                <div className={"hw-title1"}>参考答案</div>
                <Divider />
                <p>{this.string2html(hwInfo.answer)}</p>
                <Divider />
                <div className={"hw-title1"}>批改</div>
                <Divider />
                <Form
                    layout="vertical"
                    onFinish={this.handleSubmit}
                    hideRequiredMark
                >
                    <Form.Item
                        name="comment"
                        label={"批注(对作业内容)"}
                        rules={[
                            {
                                validator: this.validatorComment,
                            },
                        ]}
                    >
                        <Card className="editor-wrapper">
                            <BraftEditor
                                value={editorComment}
                                onChange={(editorComment) => {
                                    this.setState({
                                        editorComment: editorComment,
                                        HTMLComment: editorComment.toHTML()
                                    })
                                }} />
                        </Card>
                    </Form.Item>
                    <Form.Item
                        name="score"
                        label={"评分(满分为100)"}
                        rules={[
                            {
                                required: true,
                                message: '请输入评分!',
                            },
                            {
                                validator: this.validatorScore,
                            },
                        ]}
                    >
                       <InputNumber max={100} min={0}/>
                    </Form.Item>
                    <Form.Item
                        name="msg"
                        label={"留言"}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                   
                    <Form.Item>
                        <Button htmlType="submit" type="primary">发布新作业</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(({ courseCenter }) => ({
    hwInfo: courseCenter.hwInfo,
}))(HwCheckView);
