import {Button, Col, Form, Input, Row, Tooltip,} from 'antd';

import {  useRef, useState} from "react";
import {CloseOutlined,} from "@ant-design/icons";
import IconItemAnswer from "./IconItemAnswer";
import {  getQuestionAnswers} from "../../client/AnswerClient";
import {errorNotification, successNotification} from "../../components/Notifications";
import {addNewAnswer} from "../../client/AnswerClient";
import {deleteAnswer} from "../../client/AnswerClient";
import {updateAnswer} from "../../client/AnswerClient";


function OptionAnswer({type, question}) {

    const ref = useRef();
    const [answers, setAnswers] = useState(question.answers);
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchAnswers = () => getQuestionAnswers(question.id)
        .then(resp => resp.json())
        .then(data => {
            setAnswers(data)


        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => {
            setFetching(false);

        });

    const addAnswer = () => {
        const answer = {title: `Option`};
        addNewAnswer(answer, question.id).then(() => {

            successNotification("Answer successfully added", `${answer.title} was added to gumba system`)

        }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
            });

        }).finally(() => {
            fetchAnswers();
        });


    }


    const removeAnswer = (index) => () => {

        deleteAnswer(answers[index].id).then(() => {
            let copy_list = [...answers]
            copy_list.splice(index, 1)
            setAnswers(copy_list)
            successNotification("Answer deleted", `Answer with ${answers[index].id} was deleted`);

        }).catch(err => {
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`);
            });
        });


    }

    const onChange = (event) => {

        console.log('First save data to db, ' + event)
        ref.current.submit();

    }

    const onFinish = (index) => editedAnswer => {
        setSubmitting(true);
        console.log(JSON.stringify(editedAnswer, null, 2));
        console.log(answers[index].id);
        console.log("===================");
        if (answers[index].title.replace("\n", "").trim().length <= 0) {
            console.log("Title is empty");
        } else {
            updateAnswer(editedAnswer, answers[index].id).then(() => {
                console.log("Answer added");

                successNotification("Answer successfully edited", `${editedAnswer.title} was added to gumba system`)

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

    return <>

        {answers.map(function (answer, index) {
            return <Form
                ref={ref}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={onFinish(index)}
                hideRequiredMark>

                <>
                    <Row>
                        <Col span={1}>
                            <IconItemAnswer type={type} index={index}/>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="title">
                                <Input className={'customInput'} key={answer.id} type="text"
                                       placeholder={answer.title === 'Option' ? answer.title + " " + `${index + 1}` : ""}
                                       defaultValue={answer.title === 'Option' ? null : answer.title}
                                       onChange={onChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Tooltip title="remove" key="remove">
                                <Button type="text" key="remove" onClick={removeAnswer(index)}>
                                    <CloseOutlined/>
                                </Button>
                            </Tooltip>
                        </Col>


                    </Row>
                    <br/>
                </>
            </Form>

        })}


        <Button type="text" onClick={addAnswer}>
            Add option
        </Button>
    </>
}

export default OptionAnswer;