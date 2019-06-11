import { Form, Button, DatePicker, Checkbox, Col, Row, Typography, Input } from 'antd';
import moment from 'moment';
const { Paragraph } = Typography;
import questions from '../../static/questions';

class ScreeningForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
    const splitIndex = Math.ceil(questions.length / 2);
    const fstColQuestions = questions.filter((question, index) => index < splitIndex);
    const secColQuestions = questions.filter((question, index) => index >= splitIndex);
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Patient CPF">
          {/* intialValue: 42668869854, */}
          {getFieldDecorator('patient', {
            rules: [{ required: true, message: 'Please input a CPF!' }]
          })(<Input />)}
        </Form.Item>

        <Col span={12} {...tailFormItemLayout}>
          {fstColQuestions.map(({ subtitle, title, inputName }, index) => (
            <Row key={index}>
              <Form.Item key={inputName}>
                {getFieldDecorator(inputName)(<Checkbox>{title}</Checkbox>)}
                <Paragraph>{subtitle}</Paragraph>
              </Form.Item>
            </Row>
          ))}
        </Col>
        <Col span={12}>
          {secColQuestions.map(({ subtitle, title, inputName }, index) => (
            <Row key={index}>
              <Form.Item key={inputName}>
                {getFieldDecorator(inputName)(<Checkbox>{title}</Checkbox>)}
                <Paragraph>{subtitle}</Paragraph>
              </Form.Item>
            </Row>
          ))}
        </Col>
        <Form.Item />
        <Form.Item label="Date">
          {getFieldDecorator('date', {
            initialValue: moment()
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'screening' })(ScreeningForm);
