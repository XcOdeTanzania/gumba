import React, { PureComponent } from 'react';
import {Button, Card, Col, Form, Input, Row, Select, Switch, Tooltip} from 'antd';
import PropTypes from "prop-types";
import styles from './question.less'
import {connect} from "umi";
import Answer from "./Answer";
const { TextArea } = Input;
const FormItem = Form.Item
@connect(({ section }) => ({ section }))

class Question extends PureComponent {

  constructor(props) {
    super(props)
    const {question} = props;
    this.state = {
      type: question.type
    }
  }
  formRef = React.createRef()

  handleEditQuestion = ( ) => {
    const {question,   onEditQuestion } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: question.id,
        }
        onEditQuestion(data,question.id,false)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  handleEditQuestionSkips = ( ) => {
    const {question,   onEditQuestion } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: question.id,
        }
        onEditQuestion(data,question.id,true)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  setSelectedCardIndex=(index)=>{
    const {dispatch } = this.props
       dispatch({
       type: 'section/selectQuestionCard',
       payload: {
         selectedCardIndex: index,
       },
     })
  }
  onChangeQuestionType = (value) => {
    this.setState({ type: value});

    const {question,   onEditQuestion } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: question.id,
        }
        onEditQuestion(data,question.id)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })

  }
  handleDeleteQuestion = ( ) => {
    const {question,   onDeleteQuestion } = this.props
    onDeleteQuestion(question.id);
  }

  duplicateQuestion = (value) => {

  }

  handleCreateQuestion = ( ) => {
    const {sectionId,   onCreateQuestion } = this.props

    const data={
      "title":"Untitled Question",
      "type":"MULTIPLE",
      "isRequired":false,
      "sectionId":sectionId
    }
    onCreateQuestion(data,sectionId);
  }


  get answerProps() {
    const { type } = this.state
    const {question,onEditAnswer,onCreateAnswer, onDeleteAnswer, publish, sectionQuestions } = this.props


    return {
      type:type,
      answers:question.answers,
      questionId:question.id,
      onEditAnswer:onEditAnswer,
      onCreateAnswer:onCreateAnswer,
      onDeleteAnswer:onDeleteAnswer,
      publish:publish,
      hasSkips:question.hasSkips,
      sectionQuestions:sectionQuestions
    }
  }

  render() {
      const {section } = this.props
      const { selectedCardIndex } = section
      const {index,title,question, showAddButton,showDuplicateButton, showDeleteButton,publish}= this.props;
        return (
            <div style={{marginBottom: '2rem'}}  onClick={() => this.setSelectedCardIndex(index)}>

              <div style={{background: '#4da4f0', padding: '0.5rem', display: 'inline-block', color: '#fff'}}>
                {title}
              </div>
                <Card
                   className={selectedCardIndex === index ?  `${styles.customBorder}` : ''}
                 style={{borderColor:"#4da4f0"}}>
                  <Form ref={this.formRef} name="control-ref">

                      <Row gutter={16}>
                        <Col span={14}>
                      <FormItem name='title' rules={[{ required: false }]}
                      >
                        <TextArea style={{ resize: 'none', height: '1.5rem', width: '100%', maxWidth: '100%'}}
                                  placeholder={question.title === 'Untitled Question' ? question.title : ""}
                                  defaultValue={question.title === 'Untitled Question' ? null : question.title}
                                  onChange={this.handleEditQuestion}
                                  disabled={publish}
                        />
                      </FormItem>
                        </Col>
                        <Col span={6}>
                        <FormItem name='type' rules={[{ required: false }]}
                        >
                        <Select
                          defaultValue={question.type}
                          onChange={this.onChangeQuestionType}
                          disabled={publish}
                        >
                          <Option value="SHORT"> Short answer</Option>
                          <Option value="PARAGRAPH">Paragraph</Option>
                          <Option value="MULTIPLE"> Multiple choices</Option>
                          <Option value="CHECKBOX"> Checkboxes</Option>
                          <Option value="DROPDOWN">Dropdown</Option>
                          <Option value="FILE">File upload</Option>
                          <Option value="DATE">Date</Option>
                          <Option value="TIME">Time</Option>
                        </Select>
                        </FormItem>
                        </Col>
                      </Row>

                    <Answer {...this.answerProps} />

                    {selectedCardIndex === index ?
                      <div>
                       <hr />
                       <div  style={{display: 'flex',height:"30px", justifyContent: 'flex-end'}}>

                        {showAddButton ? <div style={{paddingRight: '1rem'}}>

                          <Tooltip title="add" key="add">

                            <Button  onClick={this.handleCreateQuestion}  disabled={publish} >
                              Add Question
                            </Button>
                          </Tooltip>
                        </div>: <div></div>}

                        {showDuplicateButton? <div style={{paddingRight: '1rem'}}>

                          <Tooltip title="duplicate" key="duplicate">

                            <Button  onClick={this.duplicateQuestion}  disabled={publish} >
                              DUPLICATE
                            </Button>
                          </Tooltip>
                        </div>:<div></div>}
                        {showDeleteButton?    <div style={{paddingRight: '1rem'}}>
                          <Tooltip title="delete" key="delete">

                            <Button  onClick={this.handleDeleteQuestion} danger  disabled={publish}>
                              DELETE
                            </Button>
                          </Tooltip>
                        </div>
                        :<div></div>}

                        <div  >
                          <FormItem
                            name="required"
                            valuePropName="checked"

                          >
                            <Switch
                              checkedChildren="Required"
                              unCheckedChildren="Not required"
                              defaultChecked={question.required}
                              onChange={this.handleEditQuestion}
                              disabled={publish}

                            />
                          </FormItem>,
                        </div>

                         <div  style={{paddingLeft:"5px"}} >
                           <FormItem
                             name="hasSkips"
                             valuePropName="checked"

                           >
                             <Switch
                               checkedChildren="Remove Skips"
                               unCheckedChildren="Add Skips"
                               defaultChecked={question.hasSkips}
                               onChange={this.handleEditQuestionSkips}
                               disabled={publish}

                             />
                           </FormItem>,
                         </div>
                      </div>

                     </div>
                    :<div></div>}

                  </Form>
                  </Card>
            </div>
        )
    }
}
Question.propTypes ={
  question:PropTypes.object,
  onEditQuestion:PropTypes.func,
  onCreateQuestion:PropTypes.func,
  onEditAnswer:PropTypes.func,
  onCreateAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,
  sectionId:PropTypes.any,
  title:PropTypes.string,
  index:PropTypes.any,
  showAddButton:PropTypes.bool,
  showDuplicateButton:PropTypes.bool,
  showDeleteButton:PropTypes.bool,
  publish:PropTypes.bool,
  sectionQuestions:PropTypes.array

}
export default Question
