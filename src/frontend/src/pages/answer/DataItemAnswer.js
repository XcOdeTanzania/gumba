
import {CalendarOutlined, CheckSquareTwoTone, ClockCircleOutlined } from "@ant-design/icons";
import {Col, Divider, Input, Row, Space} from "antd";
import TextArea from "antd/es/input/TextArea";


function DataItemAnswer({ type} ) {


    if(type ==='File'){
        return <div>
            <Row>
                <Col span={12}>
                    <CalendarOutlined/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p>File upload</p>
                </Col>
            </Row>
        </div>
    }

    else if(type ==='Date'){
        return   <div>
            <Row >
                <Col span={12}>
                    <p>Month, Day, Year</p>
                </Col>
                <Col span={12}>
                    <CalendarOutlined />
                </Col>

            </Row>
            <Row><Divider /></Row>
        </div>
    }
    else if(type==='Paragraph'){
        return <Space><TextArea rows={4} placeholder="Long response text" disabled/></Space>

    }
    else if(type ==='Short'){
        return <Space>  <Input placeholder="Short response text" disabled/>  </Space>

    }
    else if(type ==='Time'){
        return <div>
            <Row>
                <Col span={12}>
                    <p>Time</p>
                </Col>
                <Col span={12}>
                    <ClockCircleOutlined/>
                </Col>

            </Row>
            <Row><Divider/></Row>
        </div>
    }
    else{
        return  <CheckSquareTwoTone />
    }
}

export default DataItemAnswer;