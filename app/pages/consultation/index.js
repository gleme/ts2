import { Component, Fragment } from 'react';
import {
  Button,
  Col,
  Dropdown,
  Icon,
  Input,
  Menu,
  message,
  Modal,
  notification,
  Row,
  Typography
} from 'antd';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import ConsultationForm from '../../components/consultation/Form';
import ConsultationList from '../../components/consultation/List';
import consultationService from '../../services/consultation';

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

export default class Consultation extends Component {
  state = {
    loading: false,
    visible: false,
    editMode: false,
    consultations: [],
    selected: []
  };

  componentDidMount() {
    this.loadConsultations();
  }

  loadConsultations = () => {
    this.setState({ loading: true });
    consultationService
      .findAll(['patient', 'physician'])
      .then(consultations => {
        this.setState({ consultations });
      })
      .catch(error => {
        notification.error({
          message: 'Error to load screenings',
          description: error.message
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCreate = () => {
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
        }
      }
    });
  };

  handleDeleteSelected = () => {
    const { selected } = this.state;
    confirm({
      title: 'Are you sure you want to delete these consultations?',
      content: `This action will permanently delete ${selected.length} consultations.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          this.setState({ loading: true });
          await consultationService.deleteAll(selected);
          message.success(`Successfully deleted ${selected.length} consultations.`);
          const newConsultations = this.state.consultations.filter(
            scr => !selected.includes(scr.id)
          );
          this.setState({ consultations: newConsultations, selected: [] });
        } catch (error) {
          console.error('error', error);
          message.error('Failed to delete selected consultations.');
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  };

  handleSearch = async value => {
    try {
      this.setState({ loading: true });
      const consultations = await consultationService.find({
        patientCpf: value,
        expand: 'patient,physician'
      });
      this.setState({ consultations });
    } catch (error) {
      console.error('error', error);
      message.error('Failed to load consultations.');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, editMode, visible, consultations, selected } = this.state;
    const hasSelected = selected.length > 0;
    const actionsMenu = (
      <Menu>
        <Menu.Item onClick={this.handleCreate}>
          <Icon type="form" />
          Create
        </Menu.Item>
        <Menu.Item disabled={!hasSelected} onClick={this.handleDeleteSelected}>
          <Icon type="delete" theme="twoTone" twoToneColor="#ff1616" />
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <Fragment>
        {loading && <LoadingSpinner />}
        <div style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}>
          <Title level={2}>Consultations</Title>
          <img src="../../static/images/medical-consultation.png" width="100" />
        </div>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Dropdown overlay={actionsMenu}>
              <Button>
                Actions
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span={2}>
            <Button icon="reload" onClick={this.loadConsultations} />
          </Col>
          <Col span={18}>
            <Search
              placeholder="enter patient CPF"
              onSearch={this.handleSearch}
              enterButton
              style={{ width: '80%' }}
            />
          </Col>
        </Row>
        <div style={{ margin: 'auto', width: '100%' }}>
          <ConsultationList
            consultations={consultations}
            onSelectChange={this.handleSelectChange}
            selectedKeys={selected}
          />
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `${selected.length} screening(s) selected` : 'No screening selected'}
          </span>
        </div>
        <ConsultationForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          editMode={editMode}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
      </Fragment>
    );
  }
}
