import { PureComponent } from 'react'
import {Card, Col, Empty, Row, Tabs, Typography} from 'antd'
import PropTypes from "prop-types";
 import PieChartComponent from "./PieChartComponent";
import DescriptionBoxComponent from "./DescriptionBoxComponent";

import SingleAnswerComponent from "./SingleAnswersComponent";
import QuestionTab from "./question/QuestionTab";
import IndividualTab from "./individual/IndividualTab";


const { Paragraph, Text,Title } = Typography;
const { TabPane } = Tabs

class ResponseHeader extends PureComponent {

  get questionsProps() {

    const {sections,survey } = this.props
     let questions= [];

    for (const section of sections){
       for (const question of section.questions){
         questions.push(question);
       }
    }



    return {

      questions:questions,
      survey:survey

    }
  }
    render() {
      const {sections,survey}= this.props;

        return (
            <>
                <Card>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2> {survey.totalResponses} {survey.totalResponses ===1? "response":"responses"}   </h2>
                        <div>
                            <label>Accepting responses {' '}
                                <input type="checkbox" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Summary" key="1">
                              {survey.totalResponses === 0?<Empty />:    <>
                                {sections.map(function (section, i){

                                  return  section.questions.map(function(qns,index){
                                    const chartData = [];
                                    let  singleAnswerProps={ };
                                    if(qns.type === "MULTIPLE" || qns.type === "DROPDOWN" ){

                                      for (const answer of qns.answers){
                                        let respValue=0;
                                        for (const resp of qns.responses){
                                          if(answer.title === resp.answer){
                                            respValue++;
                                          }
                                        }
                                        chartData.push({name:answer.title, value:respValue})
                                      }
                                    }else  if(  qns.type === "CHECKBOX"){

                                      for (const answer of qns.answers){
                                        let respValue=0;
                                        for (const resp of qns.responses){
                                          if(resp.answer.split(',').some(v => (v  === answer.title  ))){
                                            respValue++;
                                          }

                                        }
                                        chartData.push({name:answer.title, value:respValue})
                                      }
                                    }else{

                                      singleAnswerProps = {
                                        type: qns.type,
                                        responses:  qns.responses
                                      };
                                    }

                                    const pieChatProps={
                                      data:  chartData,
                                    }
                                    return  <Card style={ {marginBottom:"10px"}}>

                                      <div>
                                        <Row>
                                          <Text>    {qns.title}</Text>
                                        </Row>

                                        <Row>
                                          <Paragraph> {qns.responses.length} {qns.responses.length ===1? "response":"responses"}</Paragraph>

                                        </Row>

                                        <div  >
                                          {(qns.type === "MULTIPLE" || qns.type === "DROPDOWN" || qns.type === "CHECKBOX")?   <Row>
                                            <Col>
                                              <PieChartComponent {...pieChatProps}/>
                                            </Col>
                                            <Col span={12}>
                                              <DescriptionBoxComponent  {...pieChatProps}/>
                                            </Col>
                                          </Row>: <SingleAnswerComponent {...singleAnswerProps}/>}

                                        </div>


                                      </div>




                                    </Card>
                                  })
                                })}

                              </>}


                            </TabPane>
                            <TabPane tab="Questions" key="2">
                              {survey.totalResponses === 0?<Empty />: <QuestionTab {...this.questionsProps}  />}

                            </TabPane>
                            <TabPane tab="Individual" key="3">
                              {survey.totalResponses === 0?<Empty />: <IndividualTab {...this.questionsProps}  />}

                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </>
        )
    }
}

ResponseHeader.propTypes = {
  sections: PropTypes.array,
}
export default ResponseHeader



