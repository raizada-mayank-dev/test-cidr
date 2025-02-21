import React, { useState } from 'react';
import { Radio, Button, Alert, Form, Input } from 'antd';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [reportData, setReportData] = useState(null);
  const [email, setEmail] = useState('');

  const mockReports = {
    allocated: ['10.0.0.0/21', '10.0.8.0/21'],
    unallocated: ['10.0.16.0/21', '10.0.24.0/21'],
    consumed: { total: 8192, used: 4 }
  };

  const handleGenerate = () => {
    setReportData(mockReports[selectedReport]);
  };

  const validateEmail = (email) => {
    return email.endsWith('@abc.com');
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h2>CIDR Block Reports</h2>
      
      <Radio.Group 
        onChange={(e) => setSelectedReport(e.target.value)}
        value={selectedReport}
      >
        <Radio value="allocated">Allocated CIDR Blocks</Radio>
        <Radio value="unallocated">Unallocated CIDR Blocks</Radio>
        <Radio value="consumed">Total Consumed CIDR Blocks</Radio>
      </Radio.Group>

      <Button
        type="primary"
        onClick={handleGenerate}
        disabled={!selectedReport}
        style={{ margin: '16px 0' }}
      >
        Generate Report
      </Button>

      {reportData && (
        <div>
          <Alert
            message="Report Generated"
            description={
              Array.isArray(reportData) 
                ? reportData.join(', ')
                : `Used: ${reportData.used}/${reportData.total}`
            }
            type="info"
          />

          <Form layout="inline" style={{ marginTop: 24 }}>
            <Form.Item
              label="Email Report"
              validateStatus={email && !validateEmail(email) ? 'error' : ''}
              help={email && !validateEmail(email) && 'Must use @abc.com domain'}
            >
              <Input
                placeholder="user@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 250 }}
              />
            </Form.Item>

            <Button type="primary" disabled={!validateEmail(email)}>
              Send Email
            </Button>
            <Button type="primary" style={{ marginLeft: 16 }}>
              Save as PDF
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Reports;
