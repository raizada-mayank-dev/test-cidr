import { Button, Form, Input, TreeSelect } from 'antd';

export default function MockProvisioner() {
  const mockOUs = [
    {
      title: 'Root (Level 1)',
      value: 'root',
      children: [
        { 
          title: 'Prod (Level 2)', 
          value: 'prod',
          children: [
            { title: 'Web (Level 3)', value: 'web' },
            { title: 'DB (Level 3)', value: 'db' }
          ]
        }
      ]
    }
  ];

  return (
    <Form layout="vertical" style={{ maxWidth: 600, margin: '2rem' }}>
      <Form.Item label="Account Email" name="email">
        <Input placeholder="test@company.com" />
      </Form.Item>

      <Form.Item label="Organizational Unit" name="ou">
        <TreeSelect treeData={mockOUs} />
      </Form.Item>

      <Button type="primary">Create Account (Mock)</Button>
    </Form>
  );
}
