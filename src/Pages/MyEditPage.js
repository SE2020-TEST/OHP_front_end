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

export default class MyEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ID:"",
            // email: "",
            nickname: "",//nick与否都无关，其实老师关心的只是学号（你叫卢本伟都没有关系）
            oldpw:"",
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
    submitRegister() {
        if ((this.state.pw2.length > 0)
            && (this.state.pw1.length > 0)
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
            alert("修改成功");
        }
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    GoBack() {
        this.props.history.push('/home/my/myHome/');
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
                        <AntCloudOutlined/>修改密码
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
                            name="oldpassword"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入旧密码',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                id="pw0"
                                onChange={(e) => {
                                        this.setState({
                                            oldpw: e.target.value
                                        });
                                }}
                                placeholder={"原密码"}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码',
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
                                    message: '请确认新密码',
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
                                提交修改
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: "right"}}
                                onClick={() => this.GoBack()}
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
