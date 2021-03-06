import { Button, Input, Form, message, DatePicker, Card } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import BraftEditor from 'braft-editor'
import './BraftEditor.css';
import { postRequest } from '@/utils/request';


class HwCreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            HTMLContent: '',
            editorAnswer: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            HTMLAnswer: '',

        }
    }

    handleSubmit = (value) => {
        //这里更新课程信息
        value.sid=this.props.sid;
        value.startTime = value.startTime.format('YYYY-MM-DD HH:mm:ss');
        value.deadline = value.deadline.format('YYYY-MM-DD HH:mm:ss');
        value.content = this.state.HTMLContent;
        value.refAnswer = this.state.HTMLAnswer;

        console.log(this.props);
        console.log(value);
        postRequest('/hw/add',value,()=>{
            message.success('新建作业成功!')});

    };


    validatorContent = (rule, value, callback) => {
        if (this.state.HTMLContent == '' || this.state.HTMLContent == '<p></p>') callback("请输入作业内容！");
        else callback();
    }

    validatorAnswer = (rule, value, callback) => {
        if (this.state.HTMLAnswer == '' || this.state.HTMLAnswer == '<p></p>') callback("请输入参考答案！");
        else callback();
    }

    render() {
        const disabledDate = (current) => {
            return current < moment().startOf('day');
        }
        const { editorContent, editorAnswer } = this.state;

        return (
            <div style={{ paddingTop: 12 }}>
                <Form
                    layout="vertical"
                    onFinish={this.handleSubmit}
                    hideRequiredMark
                >
                    <Form.Item
                        name="title"
                        label={"作业名称"}
                        rules={[
                            {
                                required: true,
                                message: '请输入课程名称!',
                            },
                        ]}
                    >
                        <Input style={{ width: 500, }} />
                    </Form.Item>
                    <Form.Item
                        name="startTime"
                        label={"开始时间"}
                        rules={[
                            {
                                required: true,
                                message: '请输入开始时间!',
                            },
                        ]}
                    >
                        <DatePicker showTime disabledDate={disabledDate} />
                    </Form.Item>
                    <Form.Item
                        name="deadline"
                        label={"截止时间"}
                        rules={[
                            {
                                required: true,
                                message: '请输入截止时间!',
                            },
                        ]}
                    >
                        <DatePicker showTime disabledDate={disabledDate} />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label={"作业要求"}
                        rules={[
                            {
                                validator: this.validatorContent,
                            },
                        ]}
                    >
                        <Card className="editor-wrapper">
                            <BraftEditor
                                value={editorContent}
                                onChange={(editorContent) => {
                                    this.setState({
                                        editorContent: editorContent,
                                        HTMLContent: editorContent.toHTML()
                                    })
                                }} />
                        </Card>
                    </Form.Item>
                    <Form.Item
                        name="refAnswer"
                        label={"参考答案"}
                        rules={[
                            {
                                validator: this.validatorAnswer,
                            },
                        ]}
                    >
                        <Card className="editor-wrapper">
                            <BraftEditor
                                value={editorAnswer}
                                onChange={(editorAnswer) => {
                                    this.setState({
                                        editorAnswer: editorAnswer,
                                        HTMLAnswer: editorAnswer.toHTML()
                                    })
                                }} />
                        </Card>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">发布新作业</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default HwCreateView;
