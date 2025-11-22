import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const PhoneLogin = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (!otpSent) {
                // Request OTP
                await axios.post('/api/auth/phone/otp', { phoneNumber: values.phoneNumber });
                setPhoneNumber(values.phoneNumber);
                setOtpSent(true);
                message.success('OTP sent successfully!');
            } else {
                // Verify OTP
                const response = await axios.post('/api/auth/phone/verify', {
                    phoneNumber: phoneNumber,
                    otp: values.otp
                });
                message.success(response.data.message);
                console.log('Logged in:', response.data);
            }
        } catch (error) {
            message.error('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="phone_login"
            onFinish={onFinish}
            layout="vertical"
        >
            {!otpSent ? (
                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input
                        prefix={<MobileOutlined />}
                        placeholder="Phone Number"
                        size="large"
                    />
                </Form.Item>
            ) : (
                <Form.Item
                    name="otp"
                    rules={[{ required: true, message: 'Please input the OTP!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        placeholder="Enter OTP (123456)"
                        size="large"
                    />
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                    {otpSent ? 'Verify OTP' : 'Send OTP'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PhoneLogin;
