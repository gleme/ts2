import Footer from './Footer';
// import Header from './Header';
import Sider from './Sider';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

// const BreadcrumbItem = Breadcrumb.Item;
// style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
export default function layout(props) {
  const { pages } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        {/* <Header /> */}
        <Content style={{ padding: '0 50px', backgroundColor: 'white', flex: '1 0 auto' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            {pages.map(page =>
              page.active ? (
                <BreadcrumbItem key={page.path}>{page.name}</BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={page.path} href={page.path}>
                  {page.name}
                </BreadcrumbItem>
              )
            )}
          </Breadcrumb> */}
          <div style={{ padding: 24, minHeight: 280, height: '100%' }}>{props.children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
