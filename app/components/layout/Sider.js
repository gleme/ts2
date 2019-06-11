import { Menu, Icon, Layout, Typography } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
// style={{ position: 'flex', alignItems: 'center', justifyContent: 'center' }}
function sider() {
  return (
    <Sider>
      <div className="logo">
        <img src="../../static/images/80x80.png" />
        <Title level={3}>STAGIOP-BD</Title>
      </div>
      <style jsx>{`
        .logo {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <Menu
        style={{ width: 256, height: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Icon type="home" />
          Home
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          Patient
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="reconciliation" />
              <span>Consultation</span>
            </span>
          }
        >
          <Menu.Item key="3">New</Menu.Item>
          <Menu.Item key="4">Search</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="exception" />
              <span>Screening</span>
            </span>
          }
        >
          <Menu.Item key="7">New</Menu.Item>
          <Menu.Item key="8">Search</Menu.Item>
        </SubMenu>
        <Menu.Item key="4">
          <Icon type="monitor" />
          Diagnosis
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default sider;
