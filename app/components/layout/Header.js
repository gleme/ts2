import { Layout, Menu } from 'antd';

const { Header } = Layout;
const MenuItem = Menu.Item;

export default function header() {
  return (
    <Header>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <MenuItem key="1">Home</MenuItem>
        <MenuItem key="2">Project</MenuItem>
        <MenuItem key="3">About</MenuItem>
      </Menu>
    </Header>
  );
}
