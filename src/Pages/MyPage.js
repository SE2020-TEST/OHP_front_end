import React from "react";
import {Layout} from "antd";

const {Content}=Layout;

class MyPage extends React.Component{
    render() {
        return (
            <Content style={{ padding: '50px' }}>
                <div className="site-layout-content">
                    my page
                </div>
            </Content>
        );
    }
}

export default MyPage;
