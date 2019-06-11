import { Component, Fragment } from 'react';
import { Typography } from 'antd';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import ConsultationForm from './Form';
import ConsultationList from './List';
import consultationService from '../../services/consultation';
const { Title } = Typography;

export default class Consultation extends Component {
  state = {
    loading: false,
    editMode: false,
    consultations: []
  };

  componentDidMount() {
    consultationService
      .findAll(['patient', 'physician'])
      .then(consultations => {
        this.setState({ consultations });
      })
      .catch(error => console.error(error));
  }

  render() {
    const { loading, editMode, consultations } = this.state;
    return (
      <Fragment>
        <Title level={2} style={{ textAlign: 'center' }}>
          {editMode ? 'Update' : 'New'} Consultation
        </Title>
        {/* <ConsultationForm /> */}
        <ConsultationList consultations={consultations} />
        {loading && <LoadingSpinner />}
      </Fragment>
    );
  }
}
