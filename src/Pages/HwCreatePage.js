import React from "react";
import {Button, Input, Card, Layout,DatePicker,Select } from "antd";

const { Option } = Select;

class HwCreatePage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillUnmount() {
        sessionStorage.removeItem("hwKey")
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {
        return (
                <div className="site-layout-content">
                    <Card title="作业信息" style={{margin: '16px 0'}}>
                        <Card type="inner" title="作业名称">
                            <Input id="title"/>
                        </Card>
                        <Card type="inner" title="截止时间">
                            <DatePicker/>
                        </Card>
                        <Card type="inner" title="作业形式">
                        <Select defaultValue="word" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="word">文字</Option>
                            <Option value="picture">图片</Option>
                            <Option value="voice">语音</Option>
                            <Option value="mix">混合</Option>
                        </Select>
                        </Card>

                        <Card style={{marginTop: 16}} type="inner" title="作业内容">
                            <Input.TextArea id="content"/>
                        </Card>
                        <Card style={{marginTop: 16}} type="inner" title="参考答案">
                            <Input.TextArea id="answer"/>
                        </Card>
                    </Card>
                    <Button type={"primary"}>发布新作业</Button>
                </div>

        );
    }
}

export default HwCreatePage;
