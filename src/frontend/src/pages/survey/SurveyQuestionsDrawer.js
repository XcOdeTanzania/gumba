import {
    Drawer, Button, Tabs,
    Card,  Image, Typography, Badge
} from 'antd';
import {

    MoreOutlined,
    ShrinkOutlined
} from "@ant-design/icons";
import QuestionCard from "./QuestionCard";
import {useState} from "react";
import {successNotification} from "../../components/Notifications";
import ResponseTab from "./response/ResponseTab";


function SurveyQuestionsDrawer({showDrawer, setShowDrawer, fetchSurveys, survey}) {

    const onCLose = () => setShowDrawer(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const initialQuestionList = [
        {
            id: 1,
            title: 'Question',
            isRequired:false
        }

    ];


    const [questionList, setQuestionList] = useState(initialQuestionList);

    const handleChange = (index) => (event) => {


        let newEntry = questionList[index]
        newEntry["title"] = event.target.value;
        questionList[index] = newEntry
        setQuestionList([...questionList])

        //save the question to database

    }

    const addQuestion  = () => {
        const newList = questionList.concat({id: 0, title: `Question`,isRequired: false});

        setQuestionList(newList);

        //select the newly added question
        setSelectedCardIndex(newList.length -1);
    }

    const duplicateQuestion  =(index) =>  () => {
        const newList = questionList.concat(questionList[index]);

        setQuestionList(newList);

        //select the newly added question
        setSelectedCardIndex(newList.length-1  );
    }


    const deleteQuestion = (index) => () => {
        if(questionList.length >1){
            let copy_list = [...questionList]
            copy_list.splice(index, 1)
            setQuestionList(copy_list)
            setSelectedCardIndex(index -1);
            successNotification("Item successfully deleted", `item deleted`)
        }

    }
    const { Title } = Typography;
    // const onFinish = survey => {
    //     setSubmitting(true);
    //     console.log(JSON.stringify(survey, null, 2));
    //     addNewSurvey(survey).then(() => {
    //         console.log("survey added");
    //         onCLose();
    //         successNotification("Survey successfully added", `${survey.name} was added to gumba system`)
    //         fetchSurveys();
    //     }).catch(err => {
    //         console.log(err);
    //         err.response.json().then(res => {
    //             errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
    //         });
    //
    //     }).finally(() => {
    //         setSubmitting(false);
    //     });
    //     ///alert(JSON.stringify(values, null, 2));
    // };

    // const onFinishFailed = errorInfo => {
    //     alert(JSON.stringify(errorInfo, null, 2));
    // };

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


                {questionList.map(function (question, index) {
                    return <>
                    <div onClick={() => setSelectedCardIndex(index)}>
                        <QuestionCard question={question} index={index} selectedCardIndex={selectedCardIndex} deleteQuestion={deleteQuestion(index)} handleChange={handleChange(index)} duplicateQuestion={duplicateQuestion(index)} />
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

export default SurveyQuestionsDrawer;