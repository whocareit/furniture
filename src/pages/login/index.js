import React, { Component } from 'react';
import { Form, Button, Input, notification } from 'antd';
import { UserOutlined, KeyOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { userLogin, userRegister } from '../../api/users';
import './index.less';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            table: ['登录', '注册'],
            status: 0,
            layout: { wrapperCol: { offset: 2, span: 20 },}
        }
        this.changeStatus = this.changeStatus.bind(this)
    }

    changeStatus(index) {
        this.setState({
            status: index
        })
    }       

    submitLogin(value) {

        const params = {
            ...value
        }

        userLogin(params).then(res => {
            console.log(res)
            if(res.errno === 0) {
                notification.success({
                    message: '登录成功'
                })
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                this.props.history.push('/');
            } else {
                notification.error({
                    message: '账号或密码不正确'
                })
            }
        })

    }

    register(value) {
        const { checkPassword, ...result } = value;
        userRegister(result).then(res => {
            if(res.errno === 0) {
                notification.success({
                    message: '注册成功'
                })
                this.setState({status: 0});
            } else {
                const { info } = res.data
                notification.error({
                    message: info
                })
            }
        })
        
    }

    render() {
        return(
            <div className="LoginWrapper">
                <div className="LoginContent">
                    <div className="LoginTitle">
                        {
                            this.state.table.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={index === this.state.status ? "tabBar active" : "tabBar"}
                                    onClick={() => this.changeStatus(index)}
                                >
                                    <span>{item}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="LoginBody">
                        {
                            this.state.status === 0 ? (
                                <Form
                                    {...this.state.layout}
                                    onFinish={this.submitLogin.bind(this)}
                                >
                                    <Form.Item
                                        name='username'
                                        rules={[{
                                            required: true,
                                            message: '请输入用户名'
                                        }]}
                                    >
                                        <Input placeholder="用户名" prefix={<UserOutlined />}/>
                                    </Form.Item>
                                    <Form.Item
                                        name='password'
                                        rules={[{
                                            required: true,
                                            message: '请输入密码'
                                        }]}
                                    >
                                        <Input.Password placeholder="密码" prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" block htmlType="submit">登录</Button>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <Form
                                    {...this.state.layout}
                                    onFinish={this.register.bind(this)}
                                >   
                                    <Form.Item
                                        name='username'
                                        rules={[{
                                            required: true,
                                            message: '请输入用户名'
                                        }]}
                                    >
                                        <Input placeholder="用户名" prefix={<UserOutlined />}/>
                                    </Form.Item>
                                    <Form.Item
                                        name='password'
                                        rules={[
                                            { required: true, message: '请输入密码' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    this.setState({check: value})
                                                    callback()
                                                },
                                            }
                                        ]}
                                    >
                                        <Input.Password placeholder="密码" prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        name='checkPassword'
                                        rules={[
                                            { required: true, message: '请再次输入密码' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    return new Promise((resolve) => {
                                                        if(value === '') {
                                                        resolve()
                                                    }
                                                    if(this.state.check !== value) {
                                                        resolve(callback('两次输入密码不同'));
                                                    } else  {
                                                        resolve(callback())
                                                    }
                                                    })
                                                },
                                            }
                                        ]}
                                    >
                                        <Input.Password placeholder="再次确认密码" prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        name='phone'
                                        rules={[{
                                            required: true,
                                            message: '请输入手机号'
                                        }]}
                                    >
                                        <Input placeholder="手机号" prefix={<WhatsAppOutlined />} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" block htmlType="submit">注册</Button>
                                    </Form.Item>
                                </Form>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Login)