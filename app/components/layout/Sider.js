import { Menu, Icon, Layout, Typography } from 'antd';
import Link from 'next/link';
import pages from './pages';
const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const { Title } = Typography;

// style={{ position: 'flex', alignItems: 'center', justifyContent: 'center' }}

function sider() {
  return (
    <Sider>
      <div className="logo">
        {/* <img src="../../static/images/80x80.png" /> */}
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
      <Menu style={{ width: 256, height: '100%' }} mode="inline">
        {/* defaultSelectedKeys={['1']} */}
        {pages.map(page => renderSiderMenuItem(page))}
      </Menu>
    </Sider>
  );
}

function renderSiderMenuItem(page) {
  const { children, path, icon, label } = page;
  return children ? (
    <SubMenu
      key={path}
      title={
        <Link href={path}>
          <span>
            {icon && <Icon type={icon} />}
            {label}
          </span>
        </Link>
      }
    >
      {children.map(child => renderSiderMenu(child))}
    </SubMenu>
  ) : (
    <Item key={path}>
      <Link href={path}>
        <span>
          {icon && <Icon type={icon} />}
          {label}
        </span>
      </Link>
    </Item>
  );
}

export default sider;
