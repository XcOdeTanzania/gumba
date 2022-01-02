import React, { PureComponent } from 'react';
import {Button, Col, Input, Row} from 'antd';
import PropTypes from "prop-types";

import OptionalAnswer from "./OptionalAnswer";

const { TextArea } = Input;

class Answer extends PureComponent {

  handleCreateAnswer = ( ) => {
    const {questionId,   onCreateAnswer } = this.props

    const data={
      "title":"Option",
      "questionId":questionId
    }

    onCreateAnswer(data,questionId);
  }

  onChangeQuestionType = (value) => {
        const {answers }= this.props;

    if (value === 'SHORT')
      return <>
         <Row gutter={16}>
           <Col span={12}>
             <Input placeholder="Short response text" disabled/>
           </Col>
         </Row>
        <br/>
      </>
      if (value === 'PARAGRAPH')
      return <>
        <Row gutter={16}>
          <Col span={14}>
            <TextArea  rows={4} placeholder="Long response text" disabled/>
          </Col>
        </Row>
        <br/>
      </>
    if (value === 'MULTIPLE'||value === 'CHECKBOX'||value === 'DROPDOWN'){
      const {onEditAnswer,onCreateAnswer, onDeleteAnswer,questionId, publish,hasSkips,sectionQuestions,onAddSkipAnswer,onEditSkip,onDeleteSkip} = this.props;
      return <>
        {
          answers.map(function(answer,index){

            const answerProps={
              answer:answer,
              number:index+1,
              onEditAnswer:onEditAnswer,
              onCreateAnswer:onCreateAnswer,
               onDeleteAnswer:onDeleteAnswer,
               questionId:questionId,
              type:value,
              publish:publish,
              hasSkips:hasSkips,
              sectionQuestions:sectionQuestions,
              onAddSkipAnswer: onAddSkipAnswer ,
            onEditSkip:onEditSkip,
            onDeleteSkip:onDeleteSkip}
            return  <OptionalAnswer {...answerProps}/>
          })

        }

        <Button onClick={this.handleCreateAnswer} disabled={publish}>
          Add option
        </Button>
      </>
    }

    if (value === 'FILE')
      return  <>
        <Row gutter={16}>
          <Col span={12}>
            <p>FILE UPLOAD</p>
            {/*<CalendarOutlined/>*/}
          </Col>
        </Row>
        <Row>
          <Col span={12}>

          </Col>
        </Row>
      </>
    if (value === 'DATE')
      return <Row gutter={16}>
        <Col span={12}>
          <p>Month, Day, Year</p>
        </Col>
        <Col span={12}>
          {/*<CalendarOutlined />*/}
        </Col>

      </Row>
    if (value === 'TIME')
      return   <Row gutter={16}>
        <Col span={12}>
          <p>TIME</p>
        </Col>
        <Col span={12}>
          {/*<ClockCircleOutlined/>*/}
        </Col>

      </Row>
  }
  render() {

     const {type}= this.props;
    return (
      this.onChangeQuestionType(type)
    )
  }
}
Answer.propTypes ={
  answers:PropTypes.array,
  onEditAnswer:PropTypes.func,
  onCreateAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,
  questionId:PropTypes.any,
  type:PropTypes.string,
  publish:PropTypes.bool,
  hasSkips:PropTypes.bool,
  sectionQuestions:PropTypes.array,

  onAddSkipAnswer:PropTypes.func,
  onEditSkip:PropTypes.func,
  onDeleteSkip:PropTypes.func

}
export default Answer
