import { Component, Fragment } from 'react';
import {
  Button,
  Col,
  Dropdown,
  Icon,
  Input,
  Typography,
  message,
  Menu,
  Modal,
  notification,
  Row
} from 'antd';
import ScreeningForm from '../../components/screening/Form';
import ScreeningList from '../../components/screening/List';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import screeningService from '../../services/screening';
const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

export default class Screening extends Component {
  state = {
    loading: false,
    visible: false,
    editMode: false,
    screenings: [],
    selected: []
  };

  componentDidMount() {
    this.loadScreenings();
  }

  loadScreenings = () => {
    this.setState({ loading: true });
    screeningService
      .findAll(['patient'])
      .then(screenings => {
        this.setState({ screenings, loading: false });
      })
      .catch(error => {
        notification.error({
          message: 'Error to load screenings',
          description: error.message
        });
        this.setState({ loading: false });
      });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSelectChange = selected => {
    this.setState({ selected });
  };

  handleOk = () => {
    const { form } = this.formRef.props;
    form.validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        const { patientCpf, date, ...flags } = values;
        try {
          this.setState({ loading: true });
          const screening = await screeningService.create(patientCpf, date.toDate(), flags);
          const { score } = screening;
          message.success(`Screening ${screening.id} created.`);
          notification[score.status]({
            message: score.message,
            description: score.description
          });
          const newScreenings = this.state.screenings.slice();
          newScreenings.push(screening);
          this.setState({ screenings: newScreenings });
          form.resetFields();
        } catch (error) {
          message.error('Could not create consultation: ' + error);
        } finally {
          this.setState({ visible: false, loading: false });
        }
      }
    });
  };

  handleDeleteSelected = () => {
    const { selected } = this.state;
    confirm({
      title: 'Are you sure you want to delete these screenings?',
      content: `This action will permanently delete ${selected.length} screenigs.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          this.setState({ loading: true });
          await screeningService.deleteAll(selected);
          message.success(`Successfully deleted ${selected.length} screenings.`);
          const newScreenings = this.state.screenings.filter(scr => !selected.includes(scr.id));
          this.setState({ screenings: newScreenings, selected: [] });
        } catch (error) {
          console.error('error', error);
          message.error('Failed to delete selected screenings.');
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  };

  handleSearch = async value => {
    try {
      this.setState({ loading: true });
      const screenings = await screeningService.find({ cpf: value, expand: 'patient' });
      this.setState({ screenings });
    } catch (error) {
      console.error('error', error);
      message.error('Failed to load screenings.');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCreate = () => {
    this.setState({ visible: true });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { loading, visible, editMode, screenings, selected } = this.state;
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
          <Title level={2}>Measles Screening</Title>
          <img src="../../static/images/medical-history.png" width="100" />
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
            <Button icon="reload" onClick={this.loadScreenings} />
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
          <ScreeningList
            screenings={screenings}
            onSelectChange={this.handleSelectChange}
            selectedKeys={selected}
          />
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `${selected.length} screening(s) selected` : 'No screening selected'}
          </span>
        </div>
        <ScreeningForm
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
