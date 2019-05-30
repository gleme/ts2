import { Row, List, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function DiagnosisDetails(props) {
  const { diagnosis } = props;
  const { category } = diagnosis;

  return (
    <div style={{ margin: '5px' }}>
      <Row>
        <Title level={3}>
          {diagnosis.code} - {diagnosis.description}
        </Title>
      </Row>
      <Row>
        <Title level={3}>Information</Title>
        <Paragraph>{diagnosis.info}</Paragraph>
      </Row>
      <Row>
        <Title level={3}>Category</Title>
        <Paragraph>
          {category.code} - {category.description}
        </Paragraph>
      </Row>
      {diagnosis.symptoms.length > 0 && (
        <Row>
          <Title level={3}>Symptoms</Title>
          <List
            size="small"
            dataSource={diagnosis.symptoms}
            renderItem={symptom => <List.Item>{symptom}</List.Item>}
          />
        </Row>
      )}
    </div>
  );
}
