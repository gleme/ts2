import { Checkbox, List } from 'antd';

export default function BinaryQuestion(props) {
  const { title, subtitle, checked, onClick } = props;

  // return (
  //   <Row style={{ margin: '5px' }}>
  //     <Col span={1} style={{ margin: 'auto', textAlign: 'center', verticalAlign: 'center' }}>
  //       <Checkbox defaultChecked={false} />
  //     </Col>
  //     <Col span={23}>
  //       <Title level={4}>{title}</Title>
  //       <Paragraph>{subtitle}</Paragraph>
  //     </Col>
  //   </Row>
  // );

  return (
    <List.Item onClick={onClick}>
      <List.Item.Meta
        avatar={<Checkbox checked={checked} defaultChecked={false} />}
        title={title}
        description={subtitle}
      />
    </List.Item>
  );
}
