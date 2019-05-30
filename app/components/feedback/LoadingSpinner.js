import { Icon, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

export default function LoadingSpinner() {
  return <Spin indicator={antIcon} style={{ margin: '0 auto', display: 'block', zIndex: 1000 }} />;
}
