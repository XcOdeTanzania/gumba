import {
    Button,

    Card, Col, Form,

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

import {useEffect, useRef, useState} from "react";

import OptionAnswer from "./components/OptionAnswer";


import {Option} from "antd/es/mentions";
import SingleAnswer from "./components/SingleAnswer";
import {errorNotification, successNotification} from "../../components/Notifications";
import {  updateQuestion} from "../../client/QuestionClient";

function QuestionCard({question, index, selectedCardIndex, deleteQuestion,   duplicateQuestion}) {
    const ref = useRef();
    const questionAnswerTypes = [<SingleAnswer type='Short'/>, <SingleAnswer type='Paragraph'/>,
        <OptionAnswer type='Radio'/>, <OptionAnswer type='Checkbox'/>, <OptionAnswer type='Dropdown'/>,
        <SingleAnswer type='File'/>, <SingleAnswer type='Date'/>, <SingleAnswer type='Time'/>];

    const [questionAnswerTypeIndex, setQuestionAnswerTypeIndex] = useState(2);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        onChangeQuestionType(question.type)
    }, []);
    const onChange = (event) => {

        console.log('First save data to db, ' + event)
        ref.current.submit();

    }
    const onChangeQuestionType = (value) => {
        if (value === 'SHORT')
            setQuestionAnswerTypeIndex(0)
        if (value === 'PARAGRAPH')
            setQuestionAnswerTypeIndex(1)
        if (value === 'MULTIPLE')
            setQuestionAnswerTypeIndex(2)
        if (value === 'CHECKBOX')
            setQuestionAnswerTypeIndex(3)
        if (value === 'DROPDOWN')
            setQuestionAnswerTypeIndex(4)
        if (value === 'FILE')
            setQuestionAnswerTypeIndex(5)
        if (value === 'DATE')
            setQuestionAnswerTypeIndex(6)
        if (value === 'TIME')
            setQuestionAnswerTypeIndex(7)

        ref.current.submit();
    }
    const onFinish = editedQuestion => {
        setSubmitting(true);
        if (editedQuestion.title === undefined) {

            editedQuestion ["title"] = question.title;
        }
        if (editedQuestion.type === undefined) {

            editedQuestion ["type"] = question.type;
        }
        if (editedQuestion.isRequired === undefined) {

            editedQuestion ["isRequired"] = question.required;

        }


        console.log(JSON.stringify(editedQuestion, null, 2));

        if (editedQuestion.title.replace("\n", "").trim().length <= 0) {
            console.log("Title is empty");
        } else {
            updateQuestion(editedQuestion, question.id).then(() => {
                console.log("Question added");

                successNotification("Question successfully edited", `${question.title} was added to gumba system`)

            }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
                });

            }).finally(() => {
                setSubmitting(false);
            });
        }

    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    return <Form
        ref={ref}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        hideRequiredMark>

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
                <Form.Item
                    name="isRequired"
                    valuePropName="checked"

                >
                    <Switch
                        checkedChildren="Required"
                        unCheckedChildren="Not required"
                        defaultChecked={question.required}
                        onChange={onChange}

                    />
                </Form.Item>,

                <MoreOutlined/>
            ] : []}
        >
            <  >
                <Row gutter={16}>
                    <Col span={14}>
                        <Form.Item
                            name="title">
                            <Input placeholder="Untitled question" defaultValue={question.title} onChange={onChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>

                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="type">
                            <Select placeholder="Please select a gender" defaultValue={question.type}
                                    onChange={onChangeQuestionType}>

                                <Option value="SHORT"><MenuUnfoldOutlined/> Short answer</Option>
                                <Option value="PARAGRAPH"><AlignLeftOutlined/> Paragraph</Option>
                                <Option value="MULTIPLE"><PlusCircleOutlined/> Multiple choices</Option>
                                <Option value="CHECKBOX"><CheckSquareOutlined/> Checkboxes</Option>
                                <Option value="DROPDOWN"><DownCircleOutlined/> Dropdown</Option>
                                <Option value="FILE"><CloudUploadOutlined/> File upload</Option>
                                <Option value="DATE"><CalendarOutlined/> Date</Option>
                                <Option value="TIME"><FieldTimeOutlined/> Time</Option>


                            </Select>

                        </Form.Item>
                    </Col>
                </Row>
                <br/><br/>
                {questionAnswerTypes[questionAnswerTypeIndex]}

                <br/><br/>

            </ >

        </Card>

    </Form>


}


export default QuestionCard;