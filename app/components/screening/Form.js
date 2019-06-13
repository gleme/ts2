import { Component, Fragment } from 'react';
import { Form, DatePicker, Checkbox, Typography, Input, Modal } from 'antd';
import produce from 'immer';
import moment from 'moment';
import { set } from 'lodash';
const { Text } = Typography;

import patientService from '../../services/patient';
import screeningService from '../../services/screening';

function hasErrors(fieldsErrors) {
  return Object.keys(fieldsErrors).some(field => fieldsErrors[field]);
}

class ScreeningForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientCpf: {
        validateStatus: ''
      }
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleValidateCPF = async (rule, value, callback) => {
    if (value) {
      this.setState(
        produce(draft => {
          set(draft, 'patientCpf.validateStatus', 'validating');
        })
      );
      try {
        await patientService.exists(value);
        this.setState(
          produce(draft => {
            set(draft, 'patientCpf.validateStatus', 'success');
          })
        );
        callback();
      } catch (error) {
        this.setState(
          produce(draft => {
            set(draft, 'patientCpf.validateStatus', 'error');
          })
        );
        console.error('error', error);
        callback('error to validate CPF!');
      }
    }
  };

  render() {
    const { form, visible, editMode, onOk, onCancel } = this.props;
    const { patientCpf } = this.state;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    const title = (editMode ? 'Edit ' : 'New ') + 'Screening';
    const buttonText = editMode ? 'Update' : 'Create';
    const patientCpfError = (isFieldTouched('patientCpf') && getFieldError('patientCpf')) || '';
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <Modal
        visible={visible}
        title={title}
        okText={buttonText}
        okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit} styles={{ width: '100%' }}>
          <Form.Item
            label="Patient CPF"
            hasFeedback
            validateStatus={patientCpf.validateStatus}
            help={patientCpfError}
          >
            {getFieldDecorator('patientCpf', {
              initialValue: '',
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: 'Please input a patient CPF!' },
                { validator: this.handleValidateCPF }
              ]
            })(<Input />)}
          </Form.Item>
          {screeningService.questions.map(({ subtitle, title, inputName }, index) => (
            <Fragment key={inputName}>
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator(inputName, { initialValue: false })(
                  <Checkbox>{title}</Checkbox>
                )}
              </Form.Item>
              <Text style={{ marginBottom: 10 }}>{subtitle}</Text>
            </Fragment>
          ))}
          <Form.Item label="Date">
            {getFieldDecorator('date', {
              initialValue: moment()
            })(<DatePicker />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'screening' })(ScreeningForm);
