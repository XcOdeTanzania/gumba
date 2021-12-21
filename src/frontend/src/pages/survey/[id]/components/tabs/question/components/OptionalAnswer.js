import React, { PureComponent } from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, Switch, Tag, Tooltip} from 'antd';
import PropTypes from "prop-types";
const FormItem = Form.Item


const randomColors=['gold','lime', 'green', 'cyan','magenta','red','volcano','orange','blue','geekblue','purple']

//checkbox
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

class OptionalAnswer extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      checkedList: defaultCheckedList,
      indeterminate:true,
      checkAll:true
    }
  }


  formRef = React.createRef()


    onChangeCheckbox = list => {

    console.log('++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(list);
     console.log('++++++++++++++++++++++++++++++++++++++++++++++++')
     //setState
      this.setState({ checkedList: list
      });

      //setState
      this.setState({
        indeterminate:!!list.length && list.length < plainOptions.length
       })

      //setState
      this.setState({ checkAll:list.length === plainOptions.length})

  };

  onCheckAllChange = e => {
    console.log('++++++++++++++++++++================++++++++++++++++++++++++++++')
    console.log(plainOptions );
    console.log('++++++++++++++++++++================++++++++++++++++++++++++++++')
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
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
    const options = [ ];
     for(const qs  of sectionQuestions){
       console.log(qs );
       if(questionId !== qs.id)
       options.push({
         value:` ${qs.id} . ${qs.title}`,
          });
     }
    return options;
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

                  style={{width: '100%'}}
                  options={this.getSectionQuestions()}
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
              <Select defaultValue="lucy" style={{ width: 380 }}  >

                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>

                  <Option value="Yiminghe">yiminghe</Option>

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
             <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChangeCheckbox} />

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
  sectionQuestions:PropTypes.array
}
export default OptionalAnswer
