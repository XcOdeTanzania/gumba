import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { Col,  Row, Typography} from "antd";



const { Paragraph, Text,Title } = Typography;
class SingleAnswerComponent extends PureComponent {


  render() {
    const {type,responses}= this.props;
    return (
     <>
       {responses.map(function (response,index){

         if (type === 'SHORT')
           return <>
             {response.answer==="undefined"? <></>:<>
               <Row gutter={16}>
               <Col span={12}>
                 <Text>{response.answer}</Text>
               </Col>
             </Row>
               <br/></> }

           </>
         if (type === 'PARAGRAPH')
           return <>
             <Row gutter={16}>
               <Col span={14}>
                  <Paragraph>{response.answer}</Paragraph>
               </Col>
             </Row>
             <br/>
           </>


         if (type === 'FILE')
           return  <>
             <Row gutter={16}>
               <Col span={12}>
                 <Text>{response.answer}</Text>
               </Col>
             </Row>
             <Row>
               <Col span={12}>

               </Col>
             </Row>
           </>
         if (type === 'DATE')
           return <Row gutter={16}>
             <Col span={12}>
               <Text>{response.answer}</Text>
             </Col>
             <Col span={12}>

             </Col>

           </Row>
         if (type === 'TIME')
           return   <Row gutter={16}>
             <Col span={12}>
               <Text>{response.answer}</Text>
             </Col>
             <Col span={12}>

             </Col>

           </Row>
       })}
     </>
    );
  }
}

SingleAnswerComponent.propTypes = {
  responses: PropTypes.array,
  type:PropTypes.string
}

export default SingleAnswerComponent;
