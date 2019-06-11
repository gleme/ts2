import { Layout } from 'antd';

const { Footer } = Layout;

export default function footer() {
  return (
    <Footer
      style={{
        textAlign: 'center',
        flexShrink: '0'
      }}
    >
      Scrum Team #2 ©2019 Created by Gustavo Leme
    </Footer>
  );
}
