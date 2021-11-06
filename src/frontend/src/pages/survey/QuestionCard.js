import {
    Button,

    Card, Col,

      Input,

    Row, Select,

    Switch,

    Tooltip
} from "antd";
import {
    AlignLeftOutlined, CalendarOutlined, CheckSquareOutlined, CloudUploadOutlined,
    CopyOutlined,
    DeleteOutlined, DownCircleOutlined,
    FieldTimeOutlined, MenuUnfoldOutlined,
    MoreOutlined, PlusCircleOutlined,

} from "@ant-design/icons";

import {useState} from "react";

import OptionAnswer from "./components/OptionAnswer";


import {Option} from "antd/es/mentions";
import SingleAnswer from "./components/SingleAnswer";

function QuestionCard({question, index, selectedCardIndex, deleteQuestion, handleChange, duplicateQuestion}) {
    const questionAnswerTypes = [<SingleAnswer type='Short'/>, <SingleAnswer type='Paragraph'/>,
        <OptionAnswer type='Radio'/>, <OptionAnswer type='Checkbox'/>, <OptionAnswer type='Dropdown'/>,
        <SingleAnswer type='File'/>, <SingleAnswer type='Date'/>, <SingleAnswer type='Time'/>];

    const [questionAnswerTypeIndex, setQuestionAnswerTypeIndex] = useState(2);

    return < >
        <Card
            className={selectedCardIndex === index ? 'customBorder' : ''}
            style={{
                borderRadius: "5px",
            }}


            actions={selectedCardIndex === index ? [
                <Tooltip title="duplicate" key="duplicate">
                    <Button type="text" onClick={duplicateQuestion}>
                        <CopyOutlined key="duplicate"/>
                    </Button>
                </Tooltip>
                ,
                <Tooltip title="delete" key="delete">

                    <Button type="text" onClick={deleteQuestion}>
                        <DeleteOutlined key="delete" danger/>
                    </Button>
                </Tooltip>
                ,
                <Switch
                    checkedChildren="Required"
                    unCheckedChildren="Not required"
                    defaultChecked={question.isRequired}
                />,

                <MoreOutlined/>
            ] : []}
        >
            <  >
                <Row gutter={16}>
                    <Col span={14}>
                        <Input placeholder="Untitled question" onChange={handleChange}/>
                    </Col>
                    <Col span={4}>

                    </Col>
                    <Col span={6}>
                        <Select placeholder="Please select a gender" defaultValue="2"
                                onChange={setQuestionAnswerTypeIndex}>

                            <Option value="0"><MenuUnfoldOutlined/> Short answer</Option>
                            <Option value="1"><AlignLeftOutlined/> Paragraph</Option>
                            <Option value="2"><PlusCircleOutlined/> Multiple choices</Option>
                            <Option value="3"><CheckSquareOutlined/> Checkboxes</Option>
                            <Option value="4"><DownCircleOutlined/> Dropdown</Option>
                            <Option value="5"><CloudUploadOutlined/> File upload</Option>
                            <Option value="6"><CalendarOutlined/> Date</Option>
                            <Option value="7"><FieldTimeOutlined/> Time</Option>


                        </Select>
                    </Col>
                </Row>
                <br/><br/>
                {questionAnswerTypes[questionAnswerTypeIndex]}

                <br/><br/>

            </ >

        </Card>

    </ >


}


export default QuestionCard;