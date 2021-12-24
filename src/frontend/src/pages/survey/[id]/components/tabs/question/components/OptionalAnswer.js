import React, { PureComponent } from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, Switch, Tag, Tooltip} from 'antd';
import PropTypes from "prop-types";
const FormItem = Form.Item


const randomColors=['gold','lime', 'green', 'cyan','magenta','red','volcano','orange','blue','geekblue','purple']

//checkbox
const CheckboxGroup = Checkbox.Group;


class OptionalAnswer extends PureComponent {
     options = [ ];


  constructor(props) {
    super(props)

    this.state = {
      checkedList:  [],
      indeterminate:true,
      checkAll:true,
      answerOptions:[]
    }



  }


  formRef = React.createRef()


    onChangeCheckbox = list => {

     //setState
      this.setState({ checkedList: list
      });

      //setState
      this.setState({
        indeterminate:!!list.length && list.length < this.state.answerOptions.length
       })

      //setState
      this.setState({ checkAll:list.length === this.state.answerOptions.length})

  };

  onCheckAllChange = e => {

    this.setState({
      checkedList: e.target.checked ? this.state.answerOptions : [],
      indeterminate:false,
      checkAll:e.target.checked
    });
  };

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

  handleAddSkipAnswer = (data) => {
    const {answer,   onAddSkipAnswer } = this.props
    const defaultLogic = [ ];
    let i=0;
    let currentQuestion={};
    for(const opt of this.options){
      if(opt.value === data){

        currentQuestion = opt.question;

        break;
      }
    }
    for(const ans  of currentQuestion.answers){


      defaultLogic[i] =  ans.id  ;
        i++;

    }


    const skipData = {
      "questionId": currentQuestion.id,
      "answerId": answer.id,
      "skipAll": true,
      "logic":   defaultLogic
    }


    onAddSkipAnswer(skipData,answer.id)
  }

onSelectQuestion=(data)=>{
 let plainOptions = [ ];
 let    defaultCheckedList = [ ];

  let i=0;
  let currentQuestion={};
  for(const opt of this.options){
    if(opt.value === data){

      currentQuestion = opt.question;

      break;
    }
  }
  for(const ans  of currentQuestion.answers){


    plainOptions[i] =  ans.title  ;

    i++;

  }

  this.setState({answerOptions:  plainOptions });
   this.setState({checkedList:   defaultCheckedList
  })

}

  handleDeleteAnswer = ( ) => {
    const {answer,   onDeleteAnswer } = this.props
    onDeleteAnswer(answer.id);
  }

  //Tag render method..
   tagRender=(props)=> {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event => {

      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={randomColors[0]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  //choose prefix
  showPrefix = ( ) => {
    const {  number, type } = this.props


    if (type === 'MULTIPLE')
      return <div style={{paddingTop:"6px"}}>
        <Radio checked disabled />
      </div>
    if (type === 'CHECKBOX')
      return <div style={{paddingTop:"6px"}}>
         <Checkbox checked disabled/>
      </div>

    if (type === 'DROPDOWN')
      return  <>
        <div style={{backgroundColor:"#8fc9fb",borderRadius: "50%", height:"30px", width:"30px", display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"8px" }}><h3 style={{color:"white"} }>{number}</h3></div>
      </>


  }


  getSectionQuestions=()=>{
    const {sectionQuestions, questionId } = this.props

     for(const qs  of sectionQuestions){

       if(questionId !== qs.id)
      this. options.push({
         value:` ${qs.id} . ${qs.title}`,
          "question":qs
          });
     }

    return this.options;
  }


  getSkippedQuestions=()=>{
    const {sectionQuestions,   answer } = this.props
    const skippedList = [ ];
    let i=0;
    for(const skp  of answer.skip ){

      for(const qn of sectionQuestions){
        if(qn.id === skp.questionId){
          skippedList[i] = ` ${qn.id} . ${qn.title}`;
          i++;
        }
      }


    }
    return skippedList;
  }

  getSkippedQuestionsOptions=()=>{
    const {sectionQuestions,   answer } = this.props
    const skippedList = [ ];

    for(const skp  of answer.skip ){

      for(const qn of sectionQuestions){
        if(qn.id === skp.questionId){

          skippedList.push({
            value:` ${qn.id} . ${qn.title}`,
            "question":qn
          });

        }
      }


    }
    return skippedList;
  }

  render() {
     const {answer, number,publish,hasSkips  } = this.props



    return (
      <>
      <Form ref={this.formRef}>
        <Row gutter={16}>
          <Col span={1}>
            {this.showPrefix() }
          </Col>
          <Col span={13} style={{marginLeft:"2px"}}>
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
        {hasSkips ? <>
          <Row>
            <Col span={1}></Col><Tag>SKIPS:</Tag>
          </Row>

            <Row gutter={16}>
              <Col span={1}></Col>
              <Col span={19}>
                <Select
                  mode="multiple"
                  placeholder="Select questions to skip"
                  showArrow
                  tagRender={this.tagRender}
                  defaultValue={ this.getSkippedQuestions()}
                  style={{width: '100%'}}
                  options={this.getSectionQuestions()}
                  onSelect={this.handleAddSkipAnswer}
                />
              </Col>
            </Row>
          <br/>
          <Row>
            <Col span={1}></Col><Tag>FILTER ANSWERS TO SKIP</Tag>
          </Row>
          <Row gutter={16}>
            <Col span={1 }></Col>
            <Col span={13}>
              <Select
                      style={{ width: 380 }}
                      placeholder="Select question to filter"
                      options={this.getSkippedQuestionsOptions()}
                      onSelect={this.onSelectQuestion}
                      showArrow >
              </Select>
            </Col>
          </Row>
           <br/>
            <Row gutter={16}>
              <Col span={1}></Col>
              <Col>
                <Checkbox indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkAll}>
                  Check all
                </Checkbox>
              </Col>

           </Row>
          <Row gutter={16}>
            <Col span={1}></Col>
           <Col>
             <CheckboxGroup options={this.state.answerOptions} value={this.state.checkedList} onChange={this.onChangeCheckbox} />

           </Col>
          </Row>

          <Row>

          </Row>

          <hr/>
        </> : <></>}
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
  publish:PropTypes.bool,
  sectionQuestions:PropTypes.array,
  onAddSkipAnswer:PropTypes.func
}
export default OptionalAnswer
