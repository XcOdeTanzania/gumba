import React, { PureComponent } from 'react';
import {Button, Card, Col, Form, Input, Row, Select, Switch, Tooltip} from 'antd';
import PropTypes from "prop-types";
const FormItem = Form.Item

class OptionalAnswer extends PureComponent {
  formRef = React.createRef()

  handleEditAnswer = () => {
    const {answer,   onEditAnswer } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: answer.id,
        }
         onEditAnswer(data,answer.id)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }



  handleDeleteAnswer = ( ) => {
    const {answer,   onDeleteAnswer } = this.props
    onDeleteAnswer(answer.id);
  }


  render() {
    const {answer, number } = this.props

    return (
      <>
      <Form ref={this.formRef}>
        <Row gutter={16}>
          <Col span={1}><div style={{}}>{number}.</div></Col>
          <Col span={13}>
            <FormItem name='title'>
              <Input  placeholder={answer.title === 'Option' ? answer.title + " " + `${number}` : ""}
                      defaultValue={answer.title === 'Option' ? null : answer.title}
                    onChange={this.handleEditAnswer}
              ></Input>
            </FormItem>
          </Col>
          <Col span={2}>
            <Tooltip title="remove" key="remove">
              <Button key="remove" onClick={this.handleDeleteAnswer}>
                X
              </Button>
            </Tooltip>
          </Col>
        </Row>

      </Form>

        </>
    )
  }
}
OptionalAnswer.propTypes ={
  answer:PropTypes.array,
  number:PropTypes.any,
  onEditAnswer:PropTypes.func,
  onCreateAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,
  questionId:PropTypes.any,
  type:PropTypes.string
}
export default OptionalAnswer
