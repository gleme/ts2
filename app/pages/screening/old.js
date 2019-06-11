import { Component, Fragment } from 'react';
import { Typography, Divider, Row, Col, Button, List, notification } from 'antd';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import BinaryQuestion from '../../components/screening/BinaryQuestion';
import questions from '../../static/questions';
import { calculateIndicator } from '../../services/measles';

const { Title } = Typography;

export default class Screening extends Component {
  state = {
    questions: questions.map(question => ({ ...question, checked: false })),
    loading: false
  };

  onClickQuestion = (e, i) => {
    const questions = this.state.questions.slice();
    const question = questions[i];
    question.checked = !question.checked;
    this.setState({ questions: questions });
  };

  submitForm = () => {
    const questions = this.state.questions.slice();
    const indicator = calculateIndicator(questions);
    const { message, description } = indicator;
    notification[indicator.label]({ message, description });
  };

  render() {
    const { loading, questions } = this.state;
    return (
      <Fragment>
        <Title level={2} style={{ textAlign: 'center', width: '80%' }}>
          Measles Screening
        </Title>
        <div style={{ margin: 'auto', width: '100%' }}>
          <Row gutter={16}>
            {questions.map(({ title, subtitle }, index) => (
              <BinaryQuestion key={index} title={title} subtitle={subtitle} />
            ))}
          </Row>
          <Divider />
          <Row>
            <Button size="default" className="fb" onClick={this.submitForm}>
              Confirm
            </Button>
            <Button size="default" type="danger" className="fb">
              Cancel
            </Button>
          </Row>
        </div>
        {loading && <LoadingSpinner />}
      </Fragment>
    );
  }
}
