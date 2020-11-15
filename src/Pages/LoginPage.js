import React from "react";
import {Button, Checkbox, Form, Input, Radio,Divider} from 'antd';
import QueueAnim from 'rc-queue-anim';
import 'antd/dist/antd.css';
import {LockOutlined, UpCircleOutlined , UserOutlined, AntCloudOutlined} from '@ant-design/icons';
import './LogInPage.css';
import {logIn} from "../Functions/login";


export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.moment = null;
        this.animation = { left: '70%', duration: 2000 };
        this.state = {
            ID: "",
            PW: "",
            value: 0,//0表示学生，1 表示老师
            moment: null,
            paused: true,
            reverse: false,
            show:false,
        }
    }

    Login() {
        if (this.state.ID.length > 0 && this.state.PW.length > 0) {
            logIn(this.state.ID, this.state.PW,this.state.value, this.props.history);
            // if(this.state.ID==="123")
            // {
            //     this.props.history.push("/home");
            // }
            // else{
            //     alert("密码/ID错误");//message
            //     window.location.href = "/login";
            // }
        }
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    onClick = () => {
        this.setState({
            show: true,
        });
    };


    render() {
        return (
            <div id={"body"}>
                <QueueAnim
                    // delay={500} style={{ height: 150 }}
                    delay={500}
                    interval={1000}
                    className="demo-content"
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, 80] },
                        { opacity: [1, 0], translateY: [0, -80] },
                    ]}
                    type={['down', 'up']}
                    ease={['easeOutQuart', 'easeInOutQuart']}
                >
                    {this.state.show?
                        <div
                            key="b"
                            id={"form"} style={{
                            // maxWidth: "500px",
                            padding: "20px",
                            margin: "auto",
                            width: "30%",
                            // verticalAlign: "middle"
                        }}>
                            <div style={{fontSize: "80px", color: "black", textAlign: "center", verticalAlign: "middle"}}>
                                <AntCloudOutlined/>云作业
                            </div>
                            <Form
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    // label={this.state.value === 0 ? '学号' : '工号'}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入学号/工号',
                                        },
                                    ]}
                                >
                                    <Input
                                        id="IDInput"
                                        prefix={<UserOutlined className="site-form-item-icon"/>}
                                        placeholder="ID"
                                        onChange={(e) => {
                                            this.setState({ID: e.target.value})
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码',
                                        },
                                    ]}
                                >
                                    <Input
                                        id="pwInput"
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        type="password"
                                        placeholder="密码"
                                        onChange={(e) => {
                                            this.setState({PW: e.target.value})
                                        }}
                                    />
                                </Form.Item>
                                {/*<Form.Item>*/}
                                {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
                                {/*        <Checkbox style={{fontSize: "20px"}}>记住我</Checkbox>*/}
                                {/*    </Form.Item>*/}

                                {/*    <a className="login-form-forgot">*/}
                                {/*        <span onClick={() => this.props.history.push("/findPW")}>*/}
                                {/*            忘记密码*/}
                                {/*        </span>*/}
                                {/*    </a>*/}
                                {/*</Form.Item>*/}

                                <Form.Item>
                                    <Button
                                        data-cy="login"
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={() => this.Login()}
                                    >
                                        登录
                                    </Button>
                                    <p/>
                                    <span style={{fontSize: "17px"}}>或者</span> <a data-cy="goToRegister"><span style={{fontSize: "17px"}}
                                                                                                               onClick={() => this.props.history.push("/register")}>立刻注册
                            </span>
                                </a>
                                </Form.Item>
                            </Form>
                            <div style={{color: "black", textAlign: "center", verticalAlign: "middle",margin: "0px"}}>
                                <Radio.Group  onChange={this.onChange} value={this.state.value} >
                                    <Radio value={0} style={{fontSize: "18px"}}>学生</Radio>
                                    <Radio value={1} style={{fontSize: "18px"}}>老师</Radio>
                                </Radio.Group>
                            </div>
                            <p/>
                        </div>
                        :
                        <div key="a" style={{
                                textAlign: "center",
                                // verticalAlign: "middle",
                                padding: "300px",
                                margin: "auto",
                                width: "100%",}}>

                            <h1 style={{fontSize: "40px"}}>OHP Begins Here!</h1>
                            <Divider id="divider">
                            <span onClick={this.onClick}><UpCircleOutlined style={{fontSize: "60px"}}/>
                            </span>
                            </Divider>
                        </div>}
                </QueueAnim>

            </div>
        )
    }
}
// LoginPage.propTypes = {
//     children: PropTypes.any,
//     className: PropTypes.string,
//     paused: PropTypes.bool,
// };
