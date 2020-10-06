import React from "react";
import {Button, Card, Input, Upload,Table} from "antd";
import {
    DownloadOutlined
} from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        ID: "5180XXXX",
        // address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        ID: "5180XXXX",
        // address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
    },
    // {
    //     title: '住址',
    //     dataIndex: 'address',
    //     key: 'address',
    // },
];

class CourseUserPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            newIcon: false,
        }
    }

    // setIcon = (info) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => {
    //         this.setState({icon: reader.result, newIcon: this.state.icon});
    //     });
    //     reader.readAsDataURL(info.file.originFileObj);
    // };
    //
    // postIcon = () => {
    // };
    render() {
        return (
            <div >
                {/*user*/}
                <Card title="用户列表">
                    {/*<Card type="inner" title="课程名称" >*/}

                    {/*</Card>*/}
                    <Table dataSource={dataSource} columns={columns} />
                </Card>
                <br/>
                <Upload >
                    <Button icon={<DownloadOutlined />}>导入学生</Button>
                </Upload>
            </div>
        )
    }

}

export default CourseUserPage;

