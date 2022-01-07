import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import {Card, Col, Input, InputNumber, Row, Typography} from "antd";
import AnswerBody from "./AnswerBody";

const { Paragraph, Text,Title } = Typography;





class IndividualTab extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,

    }
  }

    onChange=(value)=> {
    console.log('changed', value);
    this.setState({currentIndex: value-1})
  }





getFormBody=()=>{
  const {  questions, survey } = this.props
  const{currentIndex} = this.state;
  const supperArray = [];

  for(const data of survey.forms[currentIndex].formAttributes.data){
    for(const question of questions ){
      if(data.questionNumber === question.id){
        supperArray.push({
          formData:data,
          question:question
        });
        break;
      }
    }
  }


 return  supperArray.map(function (data,index) {
   const answerProps={
     data:data,

   }

    return <Card style={{padding:"20px", borderRadius:"10px", marginBottom:"40px" }} key={index}>
      <>
       <Row> <Text style={{fontWeight:"bold", fontSize:"14px"}}>{data.question.title}</Text></Row>
       <Row> <AnswerBody {...answerProps}/>    </Row>
      </>
    </Card>
  })


}


  render() {
    const {  survey } = this.props
    return (
     <>
        <Card  style={{padding:"20px", borderRadius:"10px", marginBottom:"40px" }}>
       <Row>
         <Col>   <InputNumber min={1} max={survey.forms.length} defaultValue={1} onChange={this.onChange} />
         </Col>
         <Col><div style={{fontSize:"14px", fontWeight:"bold", paddingTop:"4px", paddingLeft:"5px"}}>of {survey.forms.length}</div></Col>
       </Row>
        </Card>
        <Card style={{padding:"20px", borderRadius:"10px", marginBottom:"40px", borderTop:"10px solid #8fc9fb"}}
        >
          <div>These responses cannot be edited</div>
          <Title>{survey.title}</Title>
          <Paragraph>{survey.description}</Paragraph>
          <Paragraph>{survey.summary}</Paragraph>

        </Card>
       {this.getFormBody()}

     </>

    );
  }
}

IndividualTab.propTypes = {
  questions: PropTypes.array,
  survey:PropTypes.object
}

export default IndividualTab;
