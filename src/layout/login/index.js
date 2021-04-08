import React from 'react';
import { Form, Button, Input, notification} from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";


import { post } from '../../utils/request';
import './index.less';

class Login extends React.Component {

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
        const baseUrl = 'http://localhost:3001';
        const url = "/users/login";
        const params = {
            ...value
        }

        post(baseUrl, url, params).then(res => {
            //将设置token
            if(res.errno === 0) {
                notification.success({
                    message: '登录成功'
                })
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/')
            } else {
                notification.error({
                    message: '账号或密码不正确'
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
                                <Input prefix={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[{
                                    required: true,
                                    message: '请输入密码'
                                }]}
                            >
                                <Input.Password prefix={<KeyOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block htmlType="submit">登录</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button block>注册</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)