import React from 'react';
import { Button, Space, message } from 'antd';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import axios from 'axios';

const SocialLoginButtons = () => {
    const handleGoogleLogin = async () => {
        // In a real app, trigger Google OAuth flow here
        // For demo, we'll simulate a token
        try {
            const response = await axios.post('/api/auth/google', { token: 'mock-google-token' });
            message.success(response.data.message);
            console.log('Logged in:', response.data);
        } catch (error) {
            message.error('Google login failed');
        }
    };

    const handleMetaLogin = async () => {
        try {
            const response = await axios.post('/api/auth/meta', { token: 'mock-meta-token' });
            message.success(response.data.message);
            console.log('Logged in:', response.data);
        } catch (error) {
            message.error('Meta login failed');
        }
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Button
                icon={<GoogleOutlined />}
                block
                size="large"
                onClick={handleGoogleLogin}
            >
                Sign in with Google
            </Button>
            <Button
                icon={<FacebookFilled />}
                block
                size="large"
                style={{ backgroundColor: '#1877f2', color: 'white', borderColor: '#1877f2' }}
                onClick={handleMetaLogin}
            >
                Sign in with Facebook
            </Button>
        </Space>
    );
};

export default SocialLoginButtons;
