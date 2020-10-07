import React from "react";
import {Button, Form, Input, Select,Radio} from 'antd';
import 'antd/dist/antd.css';
import './RegisterPage.css';
import {TaobaoCircleOutlined,RedditOutlined,UserOutlined,AntCloudOutlined} from '@ant-design/icons';
// import {postFetch} from "../Functions/fetchRequest";
// import {logIn} from "../Functions/login";

const {Option} = Select;
const { Search } = Input;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ID:"",
            email: "",
            nickname: "",//nick与否都无关，其实老师关心的只是学号（你叫卢本伟都没有关系）
            PW: "",
            pw1: "",
            pw2: "",
            phonenumber: "",
            value:0,
            check:"",
            liked:false,
            count:10,
        }

    }

    GotoLogIn() {
        this.props.history.push('/login');
    }


    submitRegister() {
        if ((this.state.email.length > 0)
            && (this.state.nickname.length > 0)
            && (this.state.phonenumber.length > 0)
            && (this.state.ID.length > 0)
            && (this.state.PW.length > 0)) {
            // postFetch('/user/register',
            //     {
            //         userName: this.state.nickname,
            //         email: this.state.email,
            //         password: this.state.PW,
            //         phoneNumber: this.state.phonenumber
            //     }, (rsp) => {
            //         // logIn(this.state.email, this.state.PW, this.props.history);
            //     }
            // );
            alert("注册成功");//message
            window.location.href = "/login";
        }
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    countDown() {
        let count  = this.state.count;
        if (count === 1) {//当为0的时候，liked设置为true，button按钮显示内容为 获取验证码
            this.setState({
                count: 10,
                liked: false,
            })
        } else {
            count=count-1;
            this.setState({
                count: count,
                liked: true,
            });
            setTimeout(() => this.countDown(), 1000)//每一秒调用一次
        }
    }
    getCode()
    {
        console.log("getting");
        //这里是联系后端去发送邮件
        this.setState({
            liked: true,
        });
        this.countDown();
    }

    render() {
        let count=this.state.count;
        console.log("count:"+count);
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
                    <div style={{color: "black", textAlign: "center", verticalAlign: "middle",margin: "10px"}}>
                        <Radio.Group onChange={this.onChange} value={this.state.value} buttonStyle="solid" size="large">
                            <Radio.Button value={0}><RedditOutlined />学生</Radio.Button>
                            <Radio.Button value={1}><UserOutlined />老师</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Form
                        style={{
                            maxWidth: "300px",
                            margin: "0 auto"
                        }}
                        name="register"
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="ID"
                            rules={[
                                {
                                    message:'只能输入数字',
                                    pattern: /^[0-9]+$/
                                },
                                {
                                    required: true,
                                    message: '请输入ID',
                                },
                            ]}
                        >
                            <Input
                                id="IDInput"
                                placeholder={"输入ID"}
                                onChange={(e) => {
                                    this.setState({ID: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式不规范',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ]}
                        >
                            <Input
                                id="emailInput"
                                placeholder={"输入邮箱"}
                                onChange={(e) => {
                                    this.setState({email: e.target.value})
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
                            hasFeedback
                        >
                            <Input.Password
                                id="pw1"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw2) {
                                        this.setState({
                                            pw1: e.target.value,
                                            PW: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw1: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"设置密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('两次输入不一致');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                id="pw2"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw1) {
                                        this.setState({
                                            pw2: e.target.value,
                                            PW: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw2: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"确认密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入昵称',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                id="nameInput"
                                placeholder={"设置昵称"}
                                onChange={(e) => {
                                    this.setState({nickname: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    // required: true,
                                    pattern: /^1[34578]\d{9}$/,
                                    message: '手机号格式不正确'
                                },
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                                // {
                                //     message:'只能输入数字',
                                //     pattern: /^[0-9]+$/
                                // },

                            ]}
                        >
                            <Input
                                id="numberInput"
                                placeholder={"手机号码"}
                                style={{
                                    width: '100%',
                                }}
                                onChange={(e) => {
                                    this.setState({phonenumber: e.target.value})
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="check"
                            rules={[
                                {
                                    message:'只能输入数字',
                                    pattern: /^[0-9]+$/
                                },
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                                ({getFieldValue}) => ({//这一部分验证应该放到另一个地方做——那个login函数那里。
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('验证码错误');
                                    },
                                }),
                            ]}
                        >
                            {/*<Input*/}
                            {/*    id="checkInput"*/}
                            {/*    placeholder={"验证码"}*/}
                            {/*    style={{*/}
                            {/*        width: '100%',*/}
                            {/*    }}*/}
                            {/*    onChange={(e) => {*/}
                            {/*        this.setState({check: e.target.value})*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<Search*/}
                            {/*    id="checkInput"*/}
                            {/*    placeholder="输入验证码"*/}
                            {/*    enterButton={!this.state.liked ? '获取验证码':("("+count+")秒后重发")}*/}
                            {/*    // size="large"*/}
                            {/*    // onSearch={value => console.log(value)}*/}
                            {/*    onChange={(e) => {*/}
                            {/*        this.setState({check: e.target.value})*/}
                            {/*    }}*/}
                            {/*    onSearch={() => this.getCode()}*/}
                            {/*    disabled={this.state.liked}*/}
                            {/*/>——问题在于无法控制disable*/}
                            <Input
                                id="checkInput"
                                placeholder="输入验证码"
                                // className={`apiInput`}
                                onChange={(e) => {
                                    this.setState({check: e.target.value})
                                }}
                                addonAfter={
                                    <Button
                                        style={{maxWidth: "200px", margin: "0 auto"}}
                                        type="text"
                                        //判断如果点击了获取验证码，就让button按钮上显示 *秒后重发送 并且button设置为disabled
                                        disabled={this.state.liked}
                                        onClick={() => this.getCode()}//点击此按钮获取验证码
                                        className={`verificationCode`}
                                    >
                                        <span>{!this.state.liked ? '获取验证码':("("+count+")秒后重发")}</span>
                                        {/*'（60）秒后重发'*/}
                                    </Button>}
                            />
                        </Form.Item>

                        <Form.Item style={{maxWidth: "200px", margin: "0 auto"}}>
                            <Button
                                id="submitButton"
                                type="primary"
                                htmlType="submit"
                                style={{float: "left"}}
                                onClick={() => {
                                    this.submitRegister()
                                }}
                            >
                                注册
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: "right"}}
                                onClick={() => this.GotoLogIn()}
                            >
                                返回
                            </Button>

                        </Form.Item>
                    </Form>

                </div>
            </div>
        )
    }
}
