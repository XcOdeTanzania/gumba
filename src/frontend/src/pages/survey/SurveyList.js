import {Avatar, Badge, Button, Dropdown, Empty, Menu, message, Popconfirm, Spin, Switch, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined, UnlockOutlined} from "@ant-design/icons";
import SurveyDrawerForm from "./SurveyDrawerForm";
import {deleteSurvey, getAllSurveys} from "../../client/SurveyClient";
import {errorNotification, successNotification} from "../../components/Notifications";
import {useEffect, useState} from "react";
import QuestionsDrawer from "../question/QuestionsDrawer";


const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UnlockOutlined/>}/>
    }

    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)} </Avatar>
    }


    return <Avatar>{name.charAt(0)} </Avatar>
}

const removeSurvey = (surveyId, callback) => {
    deleteSurvey(surveyId).then(() => {
        successNotification("Survey deleted", `Survey with ${surveyId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`);
        });
    });
}
const columns = (fetchSurveys,setShowQuestionDrawer,showQuestionDrawer,  setSelectedSurvey, selectedSurvey) => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, survey) => <TheAvatar name={survey.title}/>
    },

    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Publish',
        dataIndex: 'publish',
        key: 'publish',
        render: (text, survey) => <Switch defaultChecked={survey.publish}/>
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },

    {
        title: 'Accessibility',
        dataIndex: 'accessibility',
        key: 'accessibility',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, survey) => <Dropdown overlay={menu(survey, fetchSurveys,setShowQuestionDrawer,showQuestionDrawer, setSelectedSurvey, selectedSurvey)} placement="bottomLeft" arrow>
            <MoreOutlined/>
        </Dropdown>
    }
];

const menu = (survey, fetchSurveys,setShowQuestionDrawer,showQuestionDrawer, setSelectedSurvey, selectedSurvey) => (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><EditOutlined style={{color: "#52c41a"}}/> Edit</Menu.Item>
        <Menu.Item key="2" onClick={()=>  {
            setSelectedSurvey(survey)
            setShowQuestionDrawer(!showQuestionDrawer)
        }}>< EyeOutlined  /> View</Menu.Item>
        <Menu.Item key="3"> <Popconfirm
            title={`Are you sure to delete ${survey.name}`}
            onConfirm={() => removeSurvey(survey.id, fetchSurveys)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <a href="#"><DeleteOutlined style={{color: "#ff0000"}}/> Delete</a>
        </Popconfirm> </Menu.Item>

    </Menu>
);

function cancel(e) {
    console.log(e);
    message.error('Click on No').then(() => {
        console.log('deleting canceled')
    });
}

function handleMenuClick(e) {
    console.log('click', e);
}

function SurveyList() {
    const [surveys, setSurveys] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showQuestionDrawer, setShowQuestionDrawer] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(  {'title':'',});
    const fetchSurveys = () => getAllSurveys()
        .then(resp => resp.json())
        .then(data => {
            setSurveys(data)


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
        fetchSurveys();
    }, []);

    const renderSurveys = () => {
        if (fetching) {
            return <Spin/>;
        }
        if (surveys.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" icon={<PlusOutlined/>} size="small">
                    Add New Survey
                </Button>
                <SurveyDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchSurveys={fetchSurveys}
                />
                <Empty/>;
            </>
        }
        return <>

            <QuestionsDrawer
                showDrawer={showQuestionDrawer}
                setShowDrawer={setShowQuestionDrawer}
                fetchSurveys={fetchSurveys}
                survey={selectedSurvey}
            />

            <SurveyDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchSurveys={fetchSurveys}
            />
            <Table
                dataSource={surveys}
                columns={columns(fetchSurveys,setShowQuestionDrawer,showQuestionDrawer, setSelectedSurvey, selectedSurvey)}
                title={() =>
                    <>

                        <Tag style={{marginLeft: "5px"}}>Number of surveys </Tag>
                        <Badge count={surveys.length} className="site-badge-count-4"/>
                        <br/><br/>
                        <Button onClick={() => setShowDrawer(!showDrawer)} type="primary"
                                icon={<PlusOutlined/>} size="medium">
                            Add new Survey
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={(survey) => survey.id}
            />
        </>
    }


    return renderSurveys();
}


export default SurveyList;