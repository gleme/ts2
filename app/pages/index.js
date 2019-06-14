import { Component, Fragment } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default class Index extends Component {
  render() {
    return (
      <Fragment>
        <Title level={2} style={{ textAlign: 'center' }}>
          STAGIOP-BD
        </Title>
        <Title level={3} style={{ textAlign: 'center' }}>
          SCRUM Team #2 - Physician
        </Title>
        <img
          src="../static/images/doctor-bg.png"
          style={{ display: 'block', margin: '50px auto', height: '50%' }}
        />
      </Fragment>
    );
  }
}
