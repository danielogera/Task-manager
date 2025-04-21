import React, { useState } from 'react';
import { Card, Typography, Switch, Select, Form, Radio, Button, message, notification } from 'antd';
import { BellOutlined, UserOutlined, GlobalOutlined, SkinOutlined } from '@ant-design/icons';
import { useSettings } from '../contexts/SettingsContext';

const { Title, Text } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: typeof settings) => {
    setLoading(true);
    
    // Handle push notifications
    if (values.notifications && !settings.notifications) {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            notification.success({
              message: 'Push Notifications Enabled',
              description: 'You will now receive push notifications for your tasks.',
            });
          } else {
            notification.warning({
              message: 'Push Notifications Blocked',
              description: 'Please enable notifications in your browser settings.',
            });
            values.notifications = false;
          }
        });
      } else {
        notification.warning({
          message: 'Push Notifications Not Supported',
          description: 'Your browser does not support push notifications.',
        });
        values.notifications = false;
      }
    }

    // Handle email notifications
    if (values.emailNotifications && !settings.emailNotifications) {
      notification.info({
        message: 'Email Notifications',
        description: 'Email notifications will be sent to your registered email address.',
      });
    }

    updateSettings(values);
    
    setTimeout(() => {
      message.success('Settings updated successfully');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Title level={2} className="settings-title">Settings</Title>
        <Text className="settings-subtitle">Customize your task management experience</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={settings}
        onFinish={onFinish}
        className="settings-form"
      >
        <Card className="settings-card">
          <div className="settings-section">
            <div className="settings-section-header">
              <BellOutlined className="settings-icon" />
              <Title level={4} className="settings-section-title">Notifications</Title>
            </div>
            
            <Form.Item name="notifications" valuePropName="checked" className="settings-item">
              <div className="settings-toggle">
                <div className="settings-toggle-content">
                  <Text strong>Push Notifications</Text>
                  <Text className="settings-description">Receive real-time updates about your tasks</Text>
                </div>
                <Switch className="settings-switch" />
              </div>
            </Form.Item>

            <Form.Item name="emailNotifications" valuePropName="checked" className="settings-item">
              <div className="settings-toggle">
                <div className="settings-toggle-content">
                  <Text strong>Email Notifications</Text>
                  <Text className="settings-description">Get daily summaries and important updates</Text>
                </div>
                <Switch className="settings-switch" />
              </div>
            </Form.Item>
          </div>
        </Card>

        <Card className="settings-card">
          <div className="settings-section">
            <div className="settings-section-header">
              <SkinOutlined className="settings-icon" />
              <Title level={4} className="settings-section-title">Appearance</Title>
            </div>

            <Form.Item name="theme" label="Theme" className="settings-item">
              <Radio.Group className="theme-options">
                <Radio.Button value="light" className="theme-option">
                  <div className="theme-option-content">
                    <div className="theme-preview light"></div>
                    <div>
                      <Text strong>Light</Text>
                      <Text className="theme-description">Clean and bright interface</Text>
                    </div>
                  </div>
                </Radio.Button>
                <Radio.Button value="dark" className="theme-option">
                  <div className="theme-option-content">
                    <div className="theme-preview dark"></div>
                    <div>
                      <Text strong>Dark</Text>
                      <Text className="theme-description">Easy on the eyes</Text>
                    </div>
                  </div>
                </Radio.Button>
                <Radio.Button value="system" className="theme-option">
                  <div className="theme-option-content">
                    <div className="theme-preview system"></div>
                    <div>
                      <Text strong>System</Text>
                      <Text className="theme-description">Match your system settings</Text>
                    </div>
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        </Card>

        <Card className="settings-card">
          <div className="settings-section">
            <div className="settings-section-header">
              <GlobalOutlined className="settings-icon" />
              <Title level={4} className="settings-section-title">Language</Title>
            </div>

            <Form.Item name="language" className="settings-item">
              <Select className="language-select">
                <Option value="en">English</Option>
                <Option value="es">Español</Option>
                <Option value="fr">Français</Option>
                <Option value="de">Deutsch</Option>
                <Option value="it">Italiano</Option>
                <Option value="pt">Português</Option>
              </Select>
            </Form.Item>
          </div>
        </Card>

        <div className="settings-actions">
          <Button 
            onClick={() => form.resetFields()} 
            className="settings-button reset-button"
          >
            Reset
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="settings-button save-button"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings; 