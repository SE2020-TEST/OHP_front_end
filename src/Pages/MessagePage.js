import React from "react";
import {Layout, List, Skeleton, Button} from "antd";

const {Content} = Layout;

class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            messageList:[],

        }

        this.setRead=this.setRead.bind(this);
        this.setAllRead=this.setAllRead.bind(this);
    }
    setRead(item){
        console.log(item);
        let list=this.state.messageList;

        for(let i=0;i<list.length;++i){
            console.log(list[i]);
            if(list[i].key===item.key){
                list.splice(i,1);
            }
        }
        this.setState({messageList:list})
    }

    setAllRead(){
        console.log("set all read");
        this.setState({messageList:[]})
    }

    componentDidMount() {
        let listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                key:i,
                href: 'https://ant.design',
                title: `基础电路 ${i} 发布了新作业:作业${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                    `作业${i}详情${i}`,
                content:
                    `发布人:Zhang Feng`
            });
        }

        this.setState({messageList:listData});
    }

    render() {
        return (
            <Content style={{padding: '50px'}}>
                <div className="site-layout-content">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.messageList}
                        header={
                            <div style={{textAlign:"right"}}>
                                <Button type={"primary"} onClick={this.setAllRead}>全部设为已读</Button>
                            </div>}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                            showSizeChanger: true,//设置每页显示数据条数
                            showQuickJumper: true
                        }}
                        renderItem={item => (
                            <List.Item
                                actions={[ <Button onClick={this.setRead.bind(this,item)}>设为已读</Button>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description={item.description}
                                    />
                                    <div>{item.content}</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        );
    }
}

export default MessagePage;

