import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { validateCIDR } from '../utils/validators';

const CIDRRelease = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Existing submit handler remains unchanged
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const fullCIDR = `${values.cidr}/21`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(`CIDR ${fullCIDR} released successfully!`);
      form.resetFields();
    } catch (error) {
      message.error('Failed to release CIDR block');
    } finally {
      setLoading(false);
    }
  };

  // New clear handler
  const handleClear = () => {
    form.resetFields();
  };

  // New cancel handler
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="cidr-release-form">
      <h2>Release CIDR Block</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Existing form items remain unchanged */}
        <Form.Item
          label="CIDR Block"
          name="cidr"
          rules={[
            { required: true, message: 'Please input a CIDR block!' },
            { validator: (_, value) => validateCIDR(_, `${value}/21`) }
          ]}
        >
          <Input placeholder="10.x.x.x" addonAfter="/21" style={{ width: 250 }} />
        </Form.Item>

        {/* Modified button section */}
        <Form.Item>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
            >
              Release CIDR
            </Button>
            <Button onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CIDRRelease;
