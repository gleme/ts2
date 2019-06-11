import { Component, Fragment } from 'react';
import { Typography, Modal, Button, message } from 'antd';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import ConsultationForm from './Form';
import ConsultationList from './List';
import consultationService from '../../services/consultation';
const { Title } = Typography;

export default class Consultation extends Component {
  state = {
    loading: false,
    visible: false,
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

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    const { form } = this.formRef.props;
    form.validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        const { patientCpf, physicianCpf, prescription, date } = values;
        const procedures = values.procedures.map(({ key }) => ({ code: key }));
        const diagnosis = values.diagnosis.map(({ key }) => ({ code: key }));
        try {
          const consultation = await consultationService.create(
            patientCpf,
            physicianCpf,
            prescription,
            procedures,
            diagnosis,
            date.toDate()
          );
          const consultations = this.state.consultations.slice();
          consultations.push(consultation);
          form.resetFields();
          this.setState({ visible: false, consultations });
          message.success(`Protocol ${consultation.protocol} created.`);
        } catch (error) {
          message.error('Could not create consultation: ', error);
        } finally {
        }
      }
    });
  };

  render() {
    const { loading, editMode, visible, consultations } = this.state;
    return (
      <Fragment>
        <Title level={2} style={{ textAlign: 'center' }}>
          Consultations
        </Title>
        <Button type="primary" onClick={this.showModal}>
          Create
        </Button>
        <ConsultationForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          editMode={editMode}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
        <ConsultationList consultations={consultations} />
        {loading && <LoadingSpinner />}
      </Fragment>
    );
  }
}
