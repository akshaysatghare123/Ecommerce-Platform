import React from 'react';
import { Tabs, Typography, Divider, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SocialLoginButtons from '../components/SocialLoginButtons';
import PhoneLogin from '../components/PhoneLogin';
import axios from 'axios';

const { Title, Text } = Typography;

const LoginPage = () => {
    const onFinish = async (values) => {
        try {
            const response = await axios.post('/api/auth/login', values);
            message.success(response.data.message);
            console.log('Logged in:', response.data);
        } catch (error) {
            message.error('Login failed');
        }
    };

    const items = [
        {
            key: '1',
            label: 'Email Login',
            children: (
                <>
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a style={{ float: 'right' }} href="">
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider plain>Or</Divider>
                    <SocialLoginButtons />
                </>
            ),
        },
        {
            key: '2',
            label: 'Phone Login',
            children: <PhoneLogin />,
        },
    ];

    return (
        <div className="login-container">
            <div className="login-banner">
                <div className="login-banner-content">
                    <Title level={1} style={{ color: 'white', marginBottom: 0 }}>Welcome Back</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>
                        Discover the best deals and shop with confidence.
                    </Text>
                </div>
            </div>
            <div className="login-form-wrapper">
                <div style={{ marginBottom: 30, textAlign: 'center' }}>
                    <Title level={2}>Sign In</Title>
                    <Text type="secondary">Access your account using email or phone</Text>
                </div>
                <Tabs defaultActiveKey="1" items={items} centered />
            </div>
        </div>
    );
};

export default LoginPage;
