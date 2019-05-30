import { Layout, Menu } from 'antd';

const { Header } = Layout;
const MenuItem = Menu.Item;

export default function header() {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <MenuItem key="1">Nav 1</MenuItem>
        <MenuItem key="2">Nav 2</MenuItem>
        <MenuItem key="3">Nav 3</MenuItem>
      </Menu>
    </Header>
  );
}
