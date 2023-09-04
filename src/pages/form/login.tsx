import React from 'react'
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class FormLogin extends React.Component {



    render() {
        const onFinish = (values: any) => {
            console.log('成功:', values);
            message.success(`${values.username} 恭喜你，您通过本次表单组件学习，当前密码为：${values.password}`)
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('失败:', errorInfo);
        };
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="基本使用">
                    <Form name="basic"
                        style={{ width: 300 }}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!'
                                },
                                {
                                    min: 5, max: 10,
                                    message: '长度不在范围内'
                                },
                                {
                                    pattern: new RegExp('^\\w+$', 'g'),
                                    message: '用户名必须为字母或者数字'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>记住密码</Checkbox>
                            <a href="#" style={{ float: 'right' }}>忘记密码</a>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}