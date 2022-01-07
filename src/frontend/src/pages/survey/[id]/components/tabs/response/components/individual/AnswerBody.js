import React, { PureComponent } from 'react';
import {Card, Checkbox, Col, Form, Input, Radio, Row, Typography} from 'antd';
import PropTypes from "prop-types";

import {CaretRightOutlined} from "@ant-design/icons";

const { Paragraph, Text,Title } = Typography;

class AnswerBody extends PureComponent {


  getAnswerBody = ( ) => {
    const {data} = this.props;


    if (data.question.type === 'SHORT')
      return  <Text>{data.formData.answer ==="undefined"? "THIS QUESTION WAS NOT ANSWERED":data.formData.answer}</Text>
    if (data.question.type === 'PARAGRAPH')
      return  <Paragraph>{data.formData.answer}</Paragraph>
    if (data.question.type === 'DROPDOWN') return<Card style={{padding:"2px", borderRadius:"10px", marginBottom:"1px", border:"1px solid #8fc9fb"}}>
      <Row gutter={16}>
        <Col><Text>{data.formData.answer}</Text></Col>
        <Col span={2}></Col>
        <Col> <CaretRightOutlined rotate={90} />
         </Col></Row>
    </Card>
    if (data.question.type === 'MULTIPLE'){
      let answers =[];
      for(const answer of  data.question.answers){
        if(data.formData.answer ===answer.title){
          answers.push({title:answer.title, selected:true})
        }else{
          answers.push({title:answer.title, selected:false})
        }
      }
      return  < div>{answers.map(function (answer,index) {
        return <Row style={{marginTop:"10px"}}><Radio checked={answer.selected} disabled={!answer.selected}>{answer.title}</Radio></Row>
      })}</ div>
    }

    if ( data.question.type === 'CHECKBOX' ){
      let i=0;
      let answersChecks =[];
      let splitAnswers =data.formData.answer.split(',');

      for (const answer of data.question.answers){
        answersChecks.push({title:answer.title, selected:false})

      }

      for (const answer of answersChecks){

        for (const formDataAnswer of splitAnswers){
          if(formDataAnswer ===answer.title){

            answersChecks[i].selected = true;
          }

        }

          i++;
      }


      return  < div>{answersChecks.map(function (answer,index) {
        return <Row style={{marginTop:"10px"}}><Checkbox checked={answer.selected} disabled={!answer.selected}>{answer.title}</Checkbox></Row>
      })}

      </ div>

    }

    if (data.question.type === 'FILE')
      return  <Text>
         FILE UPLOADED
      </Text>
    if (data.question.type === 'DATE')
      return  <Text>{data.formData.answer ==="undefined"? "THIS QUESTION WAS NOT ANSWERED":data.formData.answer}</Text>
    if (data.question.type === 'TIME')
      return   <Text>{data.formData.answer ==="undefined"? "THIS QUESTION WAS NOT ANSWERED":data.formData.answer}</Text>
  }


  render() {

    return (
      <>
        {this.getAnswerBody()}
      </>
    )
  }
}
AnswerBody.propTypes ={
  data:PropTypes.object
}
export default AnswerBody
