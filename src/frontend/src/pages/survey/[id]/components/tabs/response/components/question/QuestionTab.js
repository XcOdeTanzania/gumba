import React, { PureComponent } from 'react';
 import PropTypes from "prop-types";
import {Card, Col, Collapse, Divider, Input, Row, Select, Typography} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import OptionalAnswerResponse from "./OptionalAnswerResponse";
const { TextArea } = Input;
const { Paragraph, Text,Title } = Typography;


const { Panel } = Collapse;




class QuestionTab extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,

    }
  }


  onSelectQuestion = (value) => {

    this.setState({ currentIndex: value});
    const {questions} = this.props
    console.log(questions[value]);

  }

  getAnswerTypes = (value) => {
    const {questions} = this.props;
    const {currentIndex} = this.state;

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

     return <>
        {
          questions[currentIndex].answers.map(function(answer,index){
            const answerProps={
              answer:answer,
              number:index+1,
              type:value,
              checked:false
               }
            return  <OptionalAnswerResponse  {...answerProps} />
          })

        }


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



  getAnswerResponses = (value) => {
    const {questions} = this.props;
    const {currentIndex} = this.state;

    if (value === 'SHORT')
      return <>
        {questions[currentIndex].responses.map(function(resp,index){
         return <Card style={{marginTop:"10px"}}>
           <Row gutter={16} >
             <Col span={12}>
               <Text>{resp.answer}</Text>
             </Col>
           </Row>
         </Card>
        })}


      </>
    if (value === 'PARAGRAPH')
      return <>
        {questions[currentIndex].responses.map(function(resp,index){
          return <Card style={{marginTop:"10px"}}>
            <Row gutter={16} >
              <Col span={12}>
                <Paragraph>{resp.answer}</Paragraph>
              </Col>
            </Row>
          </Card>
        })}
      </>
    if (value === 'MULTIPLE' ||value === 'DROPDOWN'){

      return <>
        {
          questions[currentIndex].answers.map(function(answer,index){
            let respValue=0;
            for (const resp of  questions[currentIndex].responses){
              if(answer.title === resp.answer){
                respValue++;
              }
            }
            const answerProps={
              answer:answer,
              number:index+1,
              type:value,
              checked:true
            }


            return <Card style={{marginTop:"10px"}}>
                <OptionalAnswerResponse  {...answerProps} />
                <div style={{backgroundColor:"red", width:"100%", height:"1px"}}/>
              <Row>
                <Text>{respValue} responses</Text>
              </Row>
            </Card>

          })

        }


      </>
    }
    if ( value === 'CHECKBOX'  ){
      return <>
        {
          questions[currentIndex].answers.map(function(answer,index){
            let respValue=0;
            for (const resp of  questions[currentIndex].responses){
              if(resp.answer.split(',').some(v => (v  === answer.title  ))){
                respValue++;
              }

            }
            const answerProps={
              answer:answer,
              number:index+1,
              type:value,
              checked:true
            }


            return <Card style={{marginTop:"10px"}}>
              <OptionalAnswerResponse  {...answerProps} />
              <div style={{backgroundColor:"red", width:"100%", height:"1px"}}/>
              <Row>
                <Text>{respValue} responses</Text>
              </Row>
            </Card>

          })

        }


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
      return < >
        {questions[currentIndex].responses.map(function(resp,index){
          return <Card style={{marginTop:"10px"}}>
            <Row gutter={16} >
              <Col span={12}>
                <Text>{resp.answer}</Text>
              </Col>
            </Row>
          </Card>
        })}

      </ >
    if (value === 'TIME')
      return   < >
        {questions[currentIndex].responses.map(function(resp,index){
          return <Card style={{marginTop:"10px"}}>
            <Row gutter={16} >
              <Col span={12}>
                <Text>{resp.answer}</Text>
              </Col>
            </Row>
          </Card>
        })}

      </ >
  }





  render() {
  const {  questions } = this.props
    const { currentIndex } = this.state
    return (
      <  >
        <Row gutter={16}  >
           <Col span={12}  >
             <Select defaultValue={0}
                     onChange={this.onSelectQuestion}
                     style={{width: '100%' }}
             >
               {questions.map(function (question, index) {
                 return <Select.Option value={index}>{question.title} </Select.Option>
               })}


             </Select>
           </Col>
          <Col span={12}>

          </Col>
        </Row>

        <Row>
        <Text style={{fontWeight:"bold", fontSize:"12px"}}> {currentIndex+1} of  {questions.length} </Text>
        </Row>
        <br/><br/>
        <Collapse
          bordered={false}

          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Panel header={questions[currentIndex].title}   key="1" className="site-collapse-custom-panel">
            <p>{this.getAnswerTypes( questions[currentIndex].type)}</p>
          </Panel>

        </Collapse>

        { this.getAnswerResponses(questions[currentIndex].type)}
      </ >

    );
  }
}

QuestionTab.propTypes = {
  questions: PropTypes.array,
}

export default QuestionTab;
