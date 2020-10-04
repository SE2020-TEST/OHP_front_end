import React from "react";
import { Layout,List, Avatar, Space ,Tabs} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import "../Assets/Css/CourseListPage.css";

const {Content}=Layout;
const { TabPane } = Tabs;

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class CourseList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        console.log("tabKey:"+this.props.tabKey);

        return (
            <div className="site-layout-content">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={listData}
                    footer={
                        <div>
                            共<b>{listData.length}</b>条记录
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    style={{float:"left"}}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

class CourseListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            tabKey:"1"
        }
        this.changeTabKey=this.changeTabKey.bind(this);
    }
    changeTabKey(key) {
        this.setState({tabKey:key});
    }

    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.changeTabKey}>
                        <TabPane tab="正在进行" key="1">
                            <CourseList tabKey={this.state.tabKey}/>
                        </TabPane>
                        <TabPane tab="已结束" key="2">
                            <CourseList tabKey={this.state.tabKey}/>
                        </TabPane>
                        <TabPane tab="所有课程" key="3">
                            <CourseList tabKey={this.state.tabKey}/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        );
    }
}

export default CourseListPage;
