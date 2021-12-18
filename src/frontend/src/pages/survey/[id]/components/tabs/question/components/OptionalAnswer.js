import React, { PureComponent } from 'react';
import {Button, Card, Col, Form, Input, Row, Select, Switch, Tag, Tooltip} from 'antd';
import PropTypes from "prop-types";
const FormItem = Form.Item

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

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

   tagRender=(props)=> {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  render() {
     const {answer, number,publish } = this.props



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
                      disabled={publish}
              ></Input>
            </FormItem>
          </Col>
          <Col span={2}>
            <Tooltip title="remove" key="remove">
              <Button key="remove" onClick={this.handleDeleteAnswer}
              disabled={publish}>
                X
              </Button>
            </Tooltip>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={1}></Col>
          <Col span={13}>
            <Select
              mode="multiple"
              showArrow
              tagRender={this.tagRender}
              defaultValue={['gold', 'cyan']}
              style={{ width: '100%' }}
              options={options}
            />
          </Col>
        </Row>
        <br/>
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
  type:PropTypes.string,
  publish:PropTypes.bool
}
export default OptionalAnswer
