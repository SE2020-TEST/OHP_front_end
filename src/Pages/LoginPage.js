import React from "react";
import {Button, Checkbox, Form, Input, Radio} from 'antd';
import 'antd/dist/antd.css';
import {LockOutlined, TaobaoCircleOutlined, UserOutlined, AntCloudOutlined} from '@ant-design/icons';
import './LogInPage.css';
// import {logIn} from "../Functions/login";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            PW: "",
            value: 0,//0表示学生，1 表示老师
        }
    }

    Login() {
        if (this.state.ID.length > 0 && this.state.PW.length > 0) {
            // logIn(this.state.email, this.state.PW, this.props.history);
            if(this.state.ID==="123")
            {
                this.props.history.push("/home");
            }
            else{
                alert("密码/ID错误");//message
                window.location.href = "/login";
            }
        }
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <div>
                <div style={{
                    maxWidth: "500px",
                    padding: "15px",
                    margin: "0 auto"
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
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot">
                                <span onClick={() => this.props.history.push("/findPW")}>
                                    忘记密码
                                </span>
                            </a>
                        </Form.Item>

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
                            或者 <a data-cy="goToRegister"><span
                            onClick={() => this.props.history.push("/register")}>立刻注册
                            </span>
                        </a>
                        </Form.Item>
                    </Form>
                    <div style={{color: "black", textAlign: "center", verticalAlign: "middle",margin: "0px"}}>
                        <Radio.Group  onChange={this.onChange} value={this.state.value}>
                            <Radio value={0}>学生</Radio>
                            <Radio value={1}>老师</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        )
    }
}
