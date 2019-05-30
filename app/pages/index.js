import { Component } from 'react';
import { Row, Radio, Input, Typography, Divider, message } from 'antd';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/feedback/LoadingSpinner';
import DiagnosisDetails from '../components/medical-diagnosis/DiagnosisDetails';
import DiagnosisResults from '../components/medical-diagnosis/DiagnosisResults';
import { findByCode, findByDiasease } from '../services/diagnosis';

const { Search } = Input;
const { Title } = Typography;

const RadioGroup = Radio.Group;
const pages = [
  {
    name: 'Home',
    path: '/',
    active: true
  },
  {
    name: 'Screening',
    path: '/screening'
  }
];

export default class About extends Component {
  state = {
    type: 1,
    placeholder: 'search by CID10 code (e.g. A009, B051, J120)',
    diagnosis: null,
    results: null,
    loading: false
  };

  onSearch = value => {
    if (this.state.type === 1) {
      findByCode(value)
        .then(diagnosis => this.setState({ diagnosis, loading: false }))
        .catch(ex => {
          const { statusCode, error } = ex.response.data;
          const errorMessage = `${statusCode} - ${error}`;
          message.error(errorMessage);
          this.setState({ loading: false });
        });
    } else {
      findByDiasease(value)
        .then(results => this.setState({ results, loading: false }))
        .catch(ex => {
          const { statusCode, error } = ex.response.data;
          const errorMessage = `${statusCode} - ${error}`;
          message.error(errorMessage);
          this.setState({ loading: false });
        });
    }
    this.setState({ loading: true });
  };

  onTypeChange = event => {
    const { target } = event;
    let placeholder = '';
    switch (target.value) {
      case 1:
        placeholder = 'search by CID10 code (e.g. A009, B051, J120)';
        break;
      case 2:
        placeholder = 'search by disease name (e.g. measles, cholera)';
        break;
      default:
        placeholder = 'invalid radio button selection value';
        break;
    }
    this.setState({
      type: target.value,
      placeholder
    });
  };

  render() {
    const { diagnosis, results, type, loading } = this.state;
    return (
      <Layout pages={pages}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Medical Diagnosis
        </Title>
        <Row style={{ margin: '10px 0', textAlign: 'center' }}>
          <RadioGroup onChange={this.onTypeChange} value={this.state.type}>
            <Radio value={1}>CID10</Radio>
            <Radio value={2}>Disease</Radio>
          </RadioGroup>
        </Row>
        <Row style={{ margin: 'auto', width: '35%' }}>
          <Search placeholder={this.state.placeholder} onSearch={this.onSearch} enterButton />
        </Row>
        <Divider />
        {!diagnosis && !results && (
          <img src="../static/images/logo.png" style={{ display: 'block', margin: '0 auto' }} />
        )}
        {loading && <LoadingSpinner />}
        {!loading && type === 1 && diagnosis && <DiagnosisDetails diagnosis={diagnosis} />}
        {!loading && type === 2 && results && <DiagnosisResults results={results} />}
      </Layout>
    );
  }
}
