import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CIDRRelease from './components/CIDRRelease';
import AccountProvisioner from './components/AccountProvisioner';
import './App.css';
import Reports from './components/Reports';
import AllocateCIDR from './components/AllocateCIDR';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
            <Menu.Item key="1">
              <Link to="/release">Release CIDR Block</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/allocate">Allocate CIDR Block</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/provision-with">Provision AWS Account with CIDR</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/provision-without">Provision AWS Account without CIDR</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/reports">Reporting</Link>
            </Menu.Item>
          </Menu>
          <div className="client-logo" style={{ color: 'white', marginLeft: 'auto' }}>
            ABC Company
          </div>
        </Header>

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/release" element={<CIDRRelease />} />
              <Route path="/allocate" element={<AllocateCIDR />} />
              <Route path="/provision-with" element={<AccountProvisioner withCIDR={true} />} />
              <Route path="/provision-without" element={<AccountProvisioner withCIDR={false} />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

// Add simple placeholder components
//function AllocateCIDR() {
//  return <div>Allocate CIDR Block Form (Implementation Pending)</div>;
//}

function Home() {
  return (
    <div className="welcome-message">
      <h1>CIDR Management System</h1>
      <p>Select an option from the navigation menu</p>
    </div>
  );
}

export default App;
