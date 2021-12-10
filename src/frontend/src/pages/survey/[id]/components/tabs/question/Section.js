import React, { PureComponent } from 'react'
import {Button, Card, Col, Form, Input, Row, Select, Switch, Tooltip} from 'antd'
import PropTypes from "prop-types";
import Question from "./components/Question";

const { TextArea } = Input;
const FormItem = Form.Item
class Section extends PureComponent {
  formRef = React.createRef()

  handleEditSection = () => {
    const {section,   onEditSection } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: section.id,
        }
       onEditSection(data,section.id)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  handleCreateSection = ( ) => {
    const {surveyId,   onCreateSection } = this.props

    const data={
      "title":"Untitled Section",
      "subtitle":"Description (Optional)",
       "surveyId":surveyId
    }
    onCreateSection(data,surveyId);
  }
  handleDeleteSection = ( ) => {
    const {section,   onDeleteSection } = this.props
    onDeleteSection(section.id);
  }

    render() {
      const {section, title,onEditQuestion,onCreateQuestion,onDeleteQuestion,onEditAnswer,onCreateAnswer,onDeleteAnswer,showAddSectionButton,sections,sectionNumber}= this.props;
        return (
            <Card style={{marginBottom:"16px", backgroundColor:'#d1eaff'}}>
                <div style={{background: '#8fc9fb', padding: '0.5rem', display: 'inline-block', color: '#fff'}}>
                    {title}
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <Card>
                        <Form ref={this.formRef} name="control-ref">
                          <FormItem name='title' rules={[{ required: false }]}
                                    >
                            <TextArea style={{  resize: 'none', width: '100%', maxWidth: '100%', fontSize: '1.8rem'}} rows="1"

                                      placeholder={section.title === 'Untitled Section' ? section.title : ""}
                                      defaultValue={section.title === 'Untitled Section' ? null : section.title}
                                      onChange={this.handleEditSection}
                            ></TextArea>
                          </FormItem>
                          <FormItem name='subtitle' rules={[{ required: false }]}
                          >
                            <TextArea style={{ resize: 'none', height: '1.5rem', width: '100%', maxWidth: '100%'}}

                                      placeholder={section.subtitle === 'Description (Optional)' ? section.subtitle : ""}
                                      defaultValue={section.subtitle === 'Description (Optional)' ? null : section.subtitle}
                                      onChange={this.handleEditSection}
                            ></TextArea>
                          </FormItem>
                        </Form>
                      <br/>

                      {section.questions.map(function (question, index) {
                        const questionProps ={
                          question: question,
                          onEditQuestion:onEditQuestion,
                          onCreateQuestion:onCreateQuestion,
                          onDeleteQuestion:onDeleteQuestion,
                          onEditAnswer:onEditAnswer,
                          onCreateAnswer:onCreateAnswer,
                          onDeleteAnswer:onDeleteAnswer,
                          showAddButton:index ===section.questions.length-1,
                          showDuplicateButton:false,
                          showDeleteButton:true,
                          sectionId:section.id,
                          title:`Question: ${index+1}`,
                          index:index

                        }
                        return <Question {...questionProps}/>
                      })}

                    </Card>
                </div>
              <Row gutter={16}>
                <Col span={16}>
                  <div>
                    <span>After section {sectionNumber}</span> {' '}
                    <Select defaultValue="Submit">
                      <Option value="Submit">Submit Form&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Option>
                      {sections.map(function (section, index) {
                     return   <Option  value="" >Go to section {index+1} ({section.title})</Option>
                      })}


                    </Select>
                  </div>
                </Col>

                <Col span={4}>
                  {showAddSectionButton ? <Button  onClick={this.handleCreateSection} >
                    Add Section
                  </Button>: <div></div>}
                </Col>
                <Col span={4}>
                  <Button  onClick={this.handleDeleteSection} danger>
                    Delete
                  </Button>
                </Col>
              </Row>

            </Card>
        )
    }
}

Section.propTypes = {
  section: PropTypes.object,
  title: PropTypes.string,

  onEditSection:PropTypes.func,
  onCreateSection:PropTypes.func,
  onDeleteSection:PropTypes.func,

  onCreateQuestion: PropTypes.func,
  onEditQuestion:PropTypes.func,
  onDeleteQuestion:PropTypes.func,

  onEditAnswer:PropTypes.func,
  onCreateAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,

  showAddSectionButton:PropTypes.bool,
  surveyId:PropTypes.any,
  sections:PropTypes.array,
  sectionNumber:PropTypes.any
}
export default Section
