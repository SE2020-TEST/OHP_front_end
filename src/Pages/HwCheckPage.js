import React from "react";
import {Button, Input, Upload, Card, Layout,Select,message,Descriptions,InputNumber } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const {Content} = Layout;
const { Option } = Select;

class HwCheckPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillUnmount() {
        sessionStorage.removeItem("hwKey")
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    changeNumber(value){
        console.log(value)
    }

    render() {
        return (
            <div className="site-layout-content">
                <Descriptions title="作业简介" bordered>
                    <Descriptions.Item label="作业名">作业0</Descriptions.Item>
                    <Descriptions.Item label="截止时间">10月31日23:59</Descriptions.Item>
                    <Descriptions.Item label="评分满分">10</Descriptions.Item>
                    <Descriptions.Item label="作业形式">图片</Descriptions.Item>
                    <Descriptions.Item label="作业内容">
                        此处为作业内容
                        <br />
                        此处为作业内容
                        <br />
                        此处为作业内容
                        <br />
                        此处为作业内容
                        <br />
                        此处为作业内容
                        <br />
                        此处为作业内容<br />
                    </Descriptions.Item>
                </Descriptions>

                <Card title="批改作业" style={{margin: '16px 0'}}>
                    <Card type="inner" title="批注">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Card>
                    <Card style={{marginTop: 16}} type="inner" title="留言">
                        <Input.TextArea id="content"/>
                    </Card>
                    <Card style={{marginTop: 16}} type="inner" title="评分">
                        <InputNumber defaultValue={10.00} min={0} max={10} step={0.01} onChange={this.changeNumber} />
                    </Card>
                </Card>
                <Button type={"primary"}>提交批改</Button>
            </div>

        );
    }
}

export default HwCheckPage;
