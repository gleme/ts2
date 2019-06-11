import { Component, Fragment } from 'react';
import { Typography } from 'antd';
import ScreeningForm from './Form';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';

const { Title } = Typography;

export default class NewScreening extends Component {
  state = {
    loading: false
  };

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        <Title level={2} style={{ textAlign: 'center', width: '80%' }}>
          Measles Screening
        </Title>
        <div style={{ margin: 'auto', width: '100%' }}>
          <ScreeningForm />
        </div>
        {loading && <LoadingSpinner />}
      </Fragment>
    );
  }
}
