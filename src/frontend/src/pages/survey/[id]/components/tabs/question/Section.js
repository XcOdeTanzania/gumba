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
       "surveyId":surveyId,
      "goTo":"SUBMIT"
    }
    onCreateSection(data,surveyId);
  }
  handleDeleteSection = ( ) => {
    const {section,   onDeleteSection } = this.props
    onDeleteSection(section.id);
  }

    render() {
      const {section, title,onEditQuestion,onCreateQuestion,onDeleteQuestion,onEditAnswer,onCreateAnswer,onDeleteAnswer,showAddSectionButton,sections,sectionNumber, publish, onAddSkipAnswer,onEditSkip,onDeleteSkip}= this.props;
        return (
            <Card style={{marginBottom:"16px", backgroundColor:'#d1eaff'}}>
              <Form ref={this.formRef} name="control-ref">
                <div style={{background: '#4da4f0', padding: '0.5rem', display: 'inline-block', color: '#fff'}}>
                    {title}
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <Card>

                          <FormItem name='title' rules={[{ required: false }]}
                                    >
                            <TextArea style={{  resize: 'none', width: '100%', maxWidth: '100%', fontSize: '1.8rem'}} rows="1"

                                      placeholder={section.title === 'Untitled Section' ? section.title : ""}
                                      defaultValue={section.title === 'Untitled Section' ? null : section.title}
                                      onChange={this.handleEditSection}
                                      disabled={publish}
                            ></TextArea>
                          </FormItem>
                          <FormItem name='subtitle' rules={[{ required: false }]}
                          >
                            <TextArea style={{ resize: 'none', height: '1.5rem', width: '100%', maxWidth: '100%'}}

                                      placeholder={section.subtitle === 'Description (Optional)' ? section.subtitle : ""}
                                      defaultValue={section.subtitle === 'Description (Optional)' ? null : section.subtitle}
                                      onChange={this.handleEditSection}
                                      disabled={publish}

                            ></TextArea>
                          </FormItem>

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
                          index:index,
                          publish:publish,
                          sectionQuestions:section.questions,
                          onAddSkipAnswer:onAddSkipAnswer,
                          onEditSkip:onEditSkip,
                          onDeleteSkip:onDeleteSkip

                        }
                        return <Question {...questionProps}/>
                      })}

                    </Card>
                </div>
              <Row gutter={16}>
                <Col span={3}>
                  <span>After section {sectionNumber}</span> {' '}

                </Col>
                <Col span={12}>
                  <div>

                    <FormItem name='goTo' rules={[{ required: false }]}
                    >
                    <Select defaultValue={section.goTo} disabled={publish}
                            onChange={this.handleEditSection}
                    >
                    <Select.Option value="NEXT">Go to next Section </Select.Option>
                      {sections.map(function (sec, index) {
                        if(section.id === sec.id) return ;
                     return   <Select.Option  value={sec.id} >Go to section {index+1} ({sec.title})</Select.Option>

                      })}
                      <Select.Option value="SUBMIT">Submit Form </Select.Option>
                    </Select>

                    </FormItem>

                  </div>
                </Col>

                <Col span={4}>
                  {showAddSectionButton ? <Button  onClick={this.handleCreateSection}
                                                   disabled={publish}
                  >
                    Add Section
                  </Button>: <div></div>}
                </Col>
                <Col span={4}>
                  <Button  onClick={this.handleDeleteSection} danger
                           disabled={publish}

                  >
                    Delete
                  </Button>
                </Col>
              </Row>
              </Form>
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
  sectionNumber:PropTypes.any,
  publish:PropTypes.bool,

  onAddSkipAnswer:PropTypes.func,
  onEditSkip:PropTypes.func,
  onDeleteSkip:PropTypes.func
}
export default Section
