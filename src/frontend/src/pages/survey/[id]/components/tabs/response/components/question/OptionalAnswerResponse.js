import React, { PureComponent } from 'react';
import {Checkbox, Col, Form, Input, Radio, Row, Typography} from 'antd';
import PropTypes from "prop-types";
const FormItem = Form.Item

const { Paragraph, Text,Title } = Typography;

class OptionalAnswerResponse extends PureComponent {

  //choose prefix
  showPrefix = ( ) => {
    const {  number, type, checked } = this.props


    if (type === 'MULTIPLE')
      return <div style={{paddingTop:"6px"}}>
        <Radio checked={checked}   />
      </div>
    if (type === 'CHECKBOX')
      return <div style={{paddingTop:"6px"}}>
        <Checkbox checked={checked}  />
      </div>

    if (type === 'DROPDOWN')
      return  <>
        <div style={{backgroundColor:"#8fc9fb",borderRadius: "50%", height:"20px", width:"20px", display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"8px", marginTop:"6px" }}><h3 style={{color:"white"} }>{number}</h3></div>
      </>


  }



  render() {
    const {answer } = this.props

    return (
      <>
        <Form  >
          <Row gutter={16}>
            <Col span={1}>
              {this.showPrefix() }
            </Col>
            <Col span={13} style={{marginLeft:"2px"}}>
              <FormItem name='title'>
                <Text>{answer.title} </Text>

              </FormItem>
            </Col>

          </Row>

        </Form>

      </>
    )
  }
}
OptionalAnswerResponse.propTypes ={
  answer:PropTypes.array,
  number:PropTypes.any,
  type:PropTypes.string,
  checked:PropTypes.bool

}
export default OptionalAnswerResponse
