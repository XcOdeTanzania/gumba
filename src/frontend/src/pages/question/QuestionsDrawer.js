import {
    Drawer, Button, Tabs,
    Card,  Image, Typography, Badge
} from 'antd';
import {

    MoreOutlined,
    ShrinkOutlined
} from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import {useEffect, useState} from "react";
import {errorNotification, successNotification} from "../../components/Notifications";
import ResponseTab from "../survey/response/ResponseTab";
import {addNewQuestion, deleteQuestion, getAllQuestions} from "../../client/QuestionClient";




function QuestionsDrawer({showDrawer, setShowDrawer,   survey}) {

    const onCLose = () => setShowDrawer(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [fetching, setFetching] = useState(true);



    const [questions, setQuestions] = useState( []);


    const fetchQuestions = () => getAllQuestions()
        .then(resp => resp.json())
        .then(data => {
            setQuestions(data)
           //select a question
            setSelectedCardIndex(data.length -1);

        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => {
            setFetching(false);

        });

    useEffect(() => {
        console.log("Invoke only on mount");
        fetchQuestions();
    }, []);



    const addQuestion  = () => {
        const question = {  title: `Untitled question`,type:'MULTIPLE',   isRequired: false};
        addNewQuestion(question).then(() => {

            successNotification("Question successfully added", `${question.title} was added to gumba system`)

        }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
            });

        }).finally(() => {
             fetchQuestions();
        });


    }

    const duplicateQuestion  =(index) =>  () => {
        const newList = questions.concat(questions[index]);

        setQuestions(newList);

        //select the newly added question
        setSelectedCardIndex(newList.length-1  );
    }


    const removeQuestion  = (index) => () => {

            deleteQuestion(questions[index].id).then(() => {
                let copy_list = [...questions]
                copy_list.splice(index, 1)
                setQuestions(copy_list)
                setSelectedCardIndex(index -1);
                successNotification("Question deleted", `Question with ${questions[index].id} was deleted`);

            }).catch(err => {
                err.response.json().then(res => {
                    errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`);
                });
            }) ;


    }
    const { Title } = Typography;



    const {TabPane} = Tabs;

    return <Drawer

        title={survey.title}
        width={920}
        onClose={onCLose}
        visible={showDrawer}
        placement="left"
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={addQuestion} style={{marginRight: 8}}>
                    Add New Question
                </Button>
            </div>
        }

    >

        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Questions" key="1">

                <Card
                    style={{
                        height: 150, borderRadius: "5px",
                        overflow: "hidden"
                    }}
                    cover={
                        <Image
                            height={150}
                            alt="example"
                            src="https://picsum.photos/id/1/300/200"
                        />
                    }

                >

                </Card>
                <br/><br/>
                <Card
                    className={'customSurveyCardBorder'}
                    title= {<Title level={2}>{survey.title}</Title>}

                         extra={
                    <>  <Button type="text" icon={<ShrinkOutlined/>}>

                    </Button>
                        <Button type="text" icon={<MoreOutlined/>}>

                        </Button>
                    </>
                } style={{
                    borderRadius: "5px",
                    overflow: "hidden"
                }}>

                    <p   > {survey.metaTitle}</p>
                    <p>{survey.description}</p>
                </Card>
                <br/><br/>


                {questions.map(function (question, index) {
                    return <>
                    <div onClick={() => setSelectedCardIndex(index)}>
                        <QuestionCard question={question} index={index} selectedCardIndex={selectedCardIndex} deleteQuestion={removeQuestion(index)}   duplicateQuestion={duplicateQuestion(index)} />
                    </div>
                        <br/><br/>

                    </>

                })}


            </TabPane>
            <TabPane tab={<>Responses {<Badge count={400} className="site-badge-count-4"></Badge>}</>} key="2">
                 <ResponseTab/>
            </TabPane>
            <TabPane tab="Settings" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>

    </Drawer>
}

export default QuestionsDrawer;