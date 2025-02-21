import React, { useState, useEffect } from 'react';
import { Form, Input, Button, TreeSelect, Skeleton, message } from 'antd';
import { validateEmail, validateName } from '../utils/validators';

const AccountProvisioner = ({ withCIDR }) => {
  const [form] = Form.useForm();
  const [ous, setOus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    // Mock OU data fetch
    setTimeout(() => {
      setOus([/* existing OU data */]);
    }, 1000);
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if(withCIDR) {
        values.cidr = `${values.cidr}/21`;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Account provisioning started!');
      form.resetFields();
    } catch (error) {
      message.error('Account provisioning failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-provisioner">
      <h2>Provision AWS Account {withCIDR ? 'with CIDR' : 'without CIDR'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={() => {
          const errors = form.getFieldsError().some(field => field.errors.length > 0);
          const values = form.getFieldsValue();
          const filled = Object.values(values).every(v => !!v);
          setFormValid(errors || !filled);
        }}
      >
        {/* Existing form items */}

        {withCIDR && (
          <Form.Item
            label="CIDR Block"
            name="cidr"
            rules={[
              { required: true, message: 'CIDR Block is required!' },
              { 
                validator: (_, value) => validateCIDR(_, `${value}/21`) 
              }
            ]}
          >
            <Input 
              placeholder="10.x.x.x"
              addonAfter="/21" 
              style={{ width: 250 }}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
            disabled={formValid}
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountProvisioner;
