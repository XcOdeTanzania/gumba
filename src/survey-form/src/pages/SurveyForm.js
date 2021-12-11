import {useEffect, useState} from "react";
import {addNewSurveyResponse, getSurvey} from "../components/client/SurveyClient";
import {errorNotification, successNotification} from "../components/notifications/Notification";
import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Layout, Radio,
    Row,
    Select,
    Space,
    Spin, TimePicker,
    Typography,
    Upload

} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Option} from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined} from "@ant-design/icons";
import moment from 'moment';

import ImgCrop from 'antd-img-crop';



const { Paragraph, Text,Title } = Typography;

const antIcon = <LoadingOutlined style={{fontSize: 24, color: "white"}} spin/>;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];




function onChangeSelect(value) {
    console.log(`selected ${value}`);
}

function onSearch(val) {
    console.log('search:', val);
}

function SurveyForm() {
    const [currentSectionIndex, setCurrentSection] = useState(0);

    const [survey, setSurvey] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    //pagination
    const goToNextPage=()=> {
        // not yet implemented
        setCurrentSection((page) => page + 1);
    }

    const goToPreviousPage=()=> {
        // not yet implemented
        setCurrentSection((page) => page - 1);


    }

    ////

    const onFinish = surveyResponse => {
        setSubmitting(true);
        console.log(JSON.stringify(surveyResponse, null, 2));
        // addNewSurveyResponse(surveyResponse).then(() => {
        //
        //     successNotification("Survey response successfully added", `Your response was added to gumba system`)
        //
        // }).catch(err => {
        //     console.log(err);
        //     err.response.json().then(res => {
        //         errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
        //     });
        //
        // }).finally(() => {
        //     setSubmitting(false);
        // });
        ///alert(JSON.stringify(values, null, 2));
    };


    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };
    const fetchSurvey = (surveyId) => getSurvey(surveyId)
        .then(resp => resp.json())
        .then(data => {
            setSurvey(data);

            setCurrentSection(0);


        }).catch(err => {
             console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => {
            setFetching(false);
        });

    useEffect(() => {
        console.log("Invoke only on mount");
        fetchSurvey(1);
    }, []);


    ///check box logic

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };


    /////

   const onChangeRadio = e => {
        console.log('radio checked', e.target.value);

    };

    /////
    function onChangeTime(time, timeString) {
        console.log(time, timeString);
    }
    ////
    ///file upload.....

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChangeFile = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };


    //pagination
    const paginationButtons=()=>{
if(currentSectionIndex ==! (survey.sections.length-1)){
    return <Row><Button  type="primary" onClick={goToNextPage}>NEXT</Button></Row>;
}else
if(currentSectionIndex === (survey.sections.length-1)){
    return  <Row><Form.Item>
        <Button type="primary" htmlType="submit">
            {submitting && <Spin indicator={antIcon}/>} Submit
        </Button>
    </Form.Item></Row>;
}else
if(currentSectionIndex < (survey.sections.length-1)){
    return <Row>
        <Button  type="primary" onClick={goToPreviousPage}>BACK</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button  type="primary" onClick={goToNextPage}>NEXT</Button>
    </Row>;}

    }

    ////

    const renderSurvey = () => {
        if (fetching) {
            return <Spin/>;
        }
       console.log("++++++++++++++++++++++++++++++++++++++++=");
        console.log(currentSectionIndex);
        console.log("++++++++++++++++++++++++++++++++++++++++=");
        return <>

            <Layout>
                <Header style={{backgroundColor:"#8fc9fb",fontSize:'1.8rem'}}>{survey.title}</Header>
                <Content style={{padding:"20px"}}>
                    <Form layout="vertical"
                          onFinishFailed={onFinishFailed}
                          onFinish={onFinish}
                          hideRequiredMark>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>      <Card style={{padding:"20px", borderRadius:"10px", marginBottom:"40px"}}>

                                    <Title style={{textAlign:"start"}}>{survey.title}</Title>


                                    <Paragraph style={{textAlign:"start"}}>{survey.description}</Paragraph>


                                    <Paragraph style={{textAlign:"start"}}>{survey.summary}</Paragraph>


                            </Card></Col>

                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                <>
                                    <Card style={{padding:"20px", borderRadius:"10px", marginBottom:"40px", borderTop:"10px solid #8fc9fb"}} >
                                        <Row>
                                            <Title>{survey.sections[currentSectionIndex].title}</Title>
                                        </Row>
                                        <Row>
                                            <Paragraph>{survey.sections[currentSectionIndex].subtitle}</Paragraph>
                                        </Row>


                                    </Card>
                                    {survey.sections[currentSectionIndex].questions.map(function (question,index) {
                                        switch (question.type) {
                                            case "SHORT":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answer"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <Input placeholder="Write your answer here.."/>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "PARAGRAPH":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answer"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <TextArea rows={4} placeholder="Write your answer here.."/>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "MULTIPLE":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answer"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <Radio.Group onChange={onChangeRadio} value="0">
                                                                <Space direction="vertical">
                                                                    {question.answers.map(function (answer, index) {
                                                                        return <Row> <Radio value={index}>{answer.title}</Radio></Row>;
                                                                    })}


                                                                </Space>
                                                            </Radio.Group>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "CHECKBOX":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answer"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <>
                                                                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                                                    Check all
                                                                </Checkbox>
                                                                <Divider />
                                                                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                                                            </>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "DROPDOWN":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answer"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Select an option"
                                                                optionFilterProp="children"
                                                                onChange={onChangeSelect}
                                                                onSearch={onSearch}
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                {question.answers.map(function (answer,index) {
                                                                    return  <Option value={answer.title} key={index}>{answer.title}</Option>
                                                                })}


                                                            </Select>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "FILE":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answerFile"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <ImgCrop rotate>
                                                                <Upload
                                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                    listType="picture-card"
                                                                    fileList={fileList}
                                                                    onChange={onChangeFile}
                                                                    onPreview={onPreview}
                                                                >
                                                                    {fileList.length < 5 && '+ Upload'}
                                                                </Upload>
                                                            </ImgCrop>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "DATE":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answerDate"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <DatePicker/>
                                                        </Form.Item>


                                                    </Row>
                                                </Card>
                                            case "TIME":
                                                return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}}>
                                                    <Row gutter={16}>

                                                        <Form.Item
                                                            name="answerTime"
                                                            label={question.title}
                                                            rules={[{required: question.required, message: 'This field is required'}]}
                                                        >
                                                            <TimePicker onChange={onChangeTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                                        </Form.Item>


                                                    </Row>
                                                </Card>

                                        }

                                    })}
                                </>
                            </Col>

                            <Col span={4}></Col>
                        </Row>


                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                {paginationButtons() }
                            </Col>

                            <Col span={4}></Col>
                        </Row>



                    </Form>
                </Content>

                <Footer style={{textAlign: 'center'}}>Gumba Survey Tool © Project Clear</Footer>
            </Layout>
        </>
    }


return renderSurvey();
}

export default  SurveyForm;