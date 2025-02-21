import React, { useState } from 'react';
import { Button, Alert, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const AllocateCIDR = () => {
  const [allocatedCIDR, setAllocatedCIDR] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAllocate = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://2xyql8rtcf.execute-api.eu-west-1.amazonaws.com/prod/allocate', {
        method: 'POST'
      });
      const data = await response.json();
      setAllocatedCIDR(data.cidr);
    } catch (error) {
      console.error('Allocation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="allocate-container">
      <h2>Allocate CIDR Block</h2>
      
      <div className="cidr-display-area">
        {allocatedCIDR && (
          <Alert
            message={<span className="cidr-message">Allocated CIDR Block: <strong>{allocatedCIDR}</strong></span>}
            type="success"
            showIcon
            className="cidr-alert"
          />
        )}
      </div>

      <Space className="button-group">
        <Button 
          type="primary" 
          onClick={handleAllocate}
          loading={loading}
        >
          Obtain CIDR Block
        </Button>
        <Button onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Space>
    </div>
  );
};

export default AllocateCIDR;
