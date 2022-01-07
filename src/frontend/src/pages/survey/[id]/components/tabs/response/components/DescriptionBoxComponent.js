import React from "react";
import PropTypes from "prop-types";
import PieChartComponent from "./PieChartComponent";

import {Col, Row, Typography} from "antd";
const { Paragraph, Text,Title } = Typography;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#64ea91','#8fc9fb','#d897eb'];


class DescriptionBoxComponent extends React.PureComponent{

  render() {
    const {  data } = this.props
    return (<div style={{paddingTop:"40px"}}>
      {data.map((entry, index) => (
          <Row style={{marginBottom:"10px"}}>
             <Col>
               <div style={{backgroundColor:  COLORS[index % COLORS.length]   , borderRadius: "50%", height:"20px", width:"20px", display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"8px" }}> </div>

             </Col>
             <Col span={1}></Col>
            <Col><Text>{entry.name}</Text></Col>
          </Row>
      ))}
    </div> )
  }

}
PieChartComponent.propTypes = {
  data: PropTypes.array,
}
export default  DescriptionBoxComponent;
