import React from "react";
import {Layout} from "antd";

const {Content}=Layout;

class MessagePage extends React.Component{
    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    message
                </div>
            </Content>
        );
    }
}

export default MessagePage;

