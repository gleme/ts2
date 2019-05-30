import { Component } from 'react';
import { Typography, Divider, Row, Col, Button, List, notification } from 'antd';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/feedback/LoadingSpinner';
import BinaryQuestion from '../components/screening/BinaryQuestion';
import questions from '../static/questions';
import { calculateIndicator } from '../services/measles';

const { Title } = Typography;

const pages = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Screening',
    path: '/screening',
    active: true
  }
];

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
    const splitIndex = Math.ceil(questions.length / 2);
    const fstColQuestions = questions.filter((question, index) => index < splitIndex);
    const secColQuestions = questions.filter((question, index) => index >= splitIndex);

    return (
      <Layout pages={pages}>
        <Title level={2} style={{ textAlign: 'center', width: '80%' }}>
          Measles Screening
        </Title>
        <div style={{ margin: 'auto', width: '80%' }}>
          <Row gutter={16}>
            <Col span={12}>
              <List
                size="large"
                bordered
                dataSource={fstColQuestions}
                renderItem={(question, index) => (
                  <BinaryQuestion
                    title={question.title}
                    subtitle={question.subtitle}
                    checked={question.checked}
                    onClick={e => this.onClickQuestion(e, index)}
                  />
                )}
              />
              {/* {questions.map(({ title, subtitle }, index) => {
                if (index % 2 === 0) return (<BinaryQuestion key={index} title={title} subtitle={subtitle} />)
              })} */}
            </Col>
            <Col span={12}>
              <List
                size="large"
                bordered
                dataSource={secColQuestions}
                renderItem={(question, index) => (
                  <BinaryQuestion
                    title={question.title}
                    subtitle={question.subtitle}
                    checked={question.checked}
                    onClick={e => this.onClickQuestion(e, index + splitIndex)}
                  />
                )}
              />
              {/* {questions.map(({ title, subtitle }, index) => {
                if (index % 2 === 1) return (<BinaryQuestion key={index} title={title} subtitle={subtitle} />)
              })} */}
            </Col>
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
      </Layout>
    );
  }
}
