import { Form, Input, Select, Button, DatePicker, Spin, message } from 'antd';
import { debounce, set } from 'lodash';
import moment from 'moment';
import produce from 'immer';
import { findByDiasease } from '../../services/consultation/diagnosis';
import procedureService from '../../services/consultation/procedure';
import patientService from '../../services/patient';
import physicianService from '../../services/physician';
import consultationService from '../../services/consultation';

const { Option } = Select;

function hasErrors(fieldsErrors) {
  return Object.keys(fieldsErrors).some(field => fieldsErrors[field]);
}

class ConsultationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validate: true,
      patientCpf: {
        validateStatus: ''
      },
      physicianCpf: {
        validateStatus: ''
      },
      procedures: {
        data: [],
        value: [],
        fetching: false
      },
      diagnosis: {
        data: [],
        value: [],
        fetching: false
      },
      confirmDirty: false
    };
    this.lastFetchId = 0;
    this.lastFetchId2 = 0;
    this.fetchDiagnosis = debounce(this.fetchDiagnosis, 1000);
    this.fetchProcedures = debounce(this.fetchProcedures, 1000);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { patientCpf, physicianCpf, prescription, date } = values;
        const procedures = values.procedures.map(({ key }) => ({ code: key }));
        const diagnosis = values.diagnosis.map(({ key }) => ({ code: key }));
        try {
          const { protocol } = await consultationService.create(
            patientCpf,
            physicianCpf,
            prescription,
            procedures,
            diagnosis,
            date.toDate()
          );
          message.success(`Protocol ${protocol} created.`);
        } catch (error) {
          message.error('Could not create consultation: ', error);
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  fetchDiagnosis = value => {
    this.lastFetchId++;
    const fetchId = this.lastFetchId;
    this.setState(
      produce(draft => {
        set(draft, 'diagnosis.data', []);
        set(draft, 'diagnosis.fetching', true);
      })
    );
    findByDiasease(value)
      .then(results => {
        if (fetchId !== this.lastFetchId) return;

        const data = results.map(({ code, description }) => ({
          text: `${code} - ${description}`,
          value: code
        }));
        this.setState(
          produce(draft => {
            set(draft, 'diagnosis.data', data);
            set(draft, 'diagnosis.fetching', false);
          })
        );
      })
      .catch(error => console.error(error));
  };

  fetchProcedures = value => {
    this.lastFetchId2++;
    const fetchId = this.lastFetchId2;
    this.setState(
      produce(draft => {
        set(draft, 'procedures.data', []);
        set(draft, 'procedures.fetching', true);
      })
    );
    procedureService
      .find({ name: value })
      .then(results => {
        if (fetchId !== this.lastFetchId2) return;

        const data = results.map(({ name, code }) => ({
          text: `${code} - ${name}`,
          value: code
        }));
        this.setState(
          produce(draft => {
            set(draft, 'procedures.data', data);
            set(draft, 'procedures.fetching', false);
          })
        );
      })
      .catch(error => console.error(error));
  };

  handleChange = (value, target, field) => {
    this.setState(
      produce(draft => {
        set(draft, `${field}.value`, value);
        set(draft, `${field}.data`, []);
        set(draft, `${field}.fetching`, false);
      })
    );
  };

  handleValidateCPF = async (rule, value, callback) => {
    const { field } = rule;
    
    if (value) {
      this.setState(
        produce(draft => {
          set(draft, `${field}.validateStatus`, 'validating');
        })
      );
      try {
        field === 'patientCpf'
          ? await patientService.exists(value)
          : await physicianService.exists(value);
        this.setState(
          produce(draft => {
            set(draft, `${field}.validateStatus`, 'success');
          })
        );
        callback();
      } catch (error) {
        this.setState(
          produce(draft => {
            set(draft, `${field}.validateStatus`, 'error');
          })
        );
        console.error('error', error);
        callback('error to validate CPF!');
      }
    }
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { patientCpf, physicianCpf, diagnosis, procedures } = this.state;
    const patientCpfError = (isFieldTouched('patientCpf') && getFieldError('patientCpf')) || '';
    const physicianCpfError =
      (isFieldTouched('physicianCpf') && getFieldError('physicianCpf')) || '';
    const prescriptionError =
      (isFieldTouched('prescription') && getFieldError('prescription')) || '';
    const diagnosisError = (isFieldTouched('diagnosis') && getFieldError('diagnosis')) || '';
    const proceduresError = (isFieldTouched('procedures') && getFieldError('procedures')) || '';

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} layout="horizontal">
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
        <Form.Item
          label="Physician CPF"
          hasFeedback
          validateStatus={physicianCpf.validateStatus}
          help={physicianCpfError}
        >
          {getFieldDecorator('physicianCpf', {
            initialValue: '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: 'Please input a physician CPF!' },
              { validator: this.handleValidateCPF }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Prescription"
          help={prescriptionError}
          validateStatus={prescriptionError ? 'error' : ''}
        >
          {getFieldDecorator('prescription', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input a prescription!' }]
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item
          label="CID-10"
          help={diagnosisError}
          validateStatus={diagnosisError ? 'error' : ''}
        >
          {getFieldDecorator('diagnosis', {
            initialValue: [],
            rules: [{ required: true, message: 'Please input a diagnosis!' }]
          })(
            <Select
              mode="multiple"
              labelInValue
              value={diagnosis.value}
              placeholder="Select diasease"
              notFoundContent={diagnosis.fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchDiagnosis}
              onChange={(value, target) => this.handleChange(value, target, 'diagnosis')}
              style={{ width: '100%' }}
            >
              {diagnosis.data.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Procedures"
          help={proceduresError}
          validateStatus={proceduresError ? 'error' : ''}
        >
          {getFieldDecorator('procedures', {
            initialValue: [],
            rules: [{ required: true, message: 'Please input a procedure!' }]
          })(
            <Select
              mode="multiple"
              labelInValue
              value={procedures.value}
              placeholder="Select procedure"
              notFoundContent={procedures.fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchProcedures}
              onChange={(value, target) => this.handleChange(value, target, 'diagnosis')}
              style={{ width: '100%' }}
            >
              {procedures.data.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Date">
          {getFieldDecorator('date', {
            initialValue: moment()
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'consultation' })(ConsultationForm);
