import {useEffect, useState} from "react";
import {addNewSurveyResponse, addNewSurveyResponseForm, getSurvey} from "../components/client/SurveyClient";
import {errorNotification, successNotification} from "../components/notifications/Notification";
import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,

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
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined} from "@ant-design/icons";
import moment from 'moment';

import ImgCrop from 'antd-img-crop';
import {useParams} from "react-router-dom";



const { Paragraph, Text,Title } = Typography;
let totalFormData = [];
const antIcon = <LoadingOutlined style={{fontSize: 24, color: "white"}} spin/>;



function onChangeSelect(value) {
    console.log(`skipped ${value}`);
}

function onSearch(val) {
    console.log('search:', val);
}

function SurveyForm() {
    const [currentSectionIndex, setCurrentSection] = useState(0);

     const [survey, setSurvey] = useState({});
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [finishedSurvey, setFinishedSurvey] = useState(false);

    const formData = [];
    const { surveyId } = useParams();

    //pagination
    const goToNextPage=()=> {

        // not yet implemented
        setCurrentSection((page) => page + 1);


    }

    const retakeSurvey = () => {
        fetchSurvey(surveyId);


    }

    const goToPreviousPage=()=> {
        // not yet implemented
        setCurrentSection((page) => page - 1);


    }

    ////

    const onFinish = surveyResponse => {




        for (const [key, value] of Object.entries(surveyResponse)) {

            console.log(`${key}: ${value}`);
            formData.push({
                'answer':`${value}`,
                'questionNumber':parseInt(key.replace("answer", "")),
                'surveyId': survey.id,
                'sectionId': survey.sections[currentSectionIndex].id});

        }

        for (const data of formData ){
            totalFormData.push(data);
        }




        if(currentSectionIndex !==  (survey.sections.length-1)){


             goToNextPage();
         }else{
            setSubmitting(true);
            // alert(JSON.stringify(totalFormData, null, 2));
                 addNewSurveyResponse(totalFormData,surveyId ).then(() => {
                         successNotification("Survey response successfully added", `Your response was added to gumba system`)
                         setFinishedSurvey(true);
                         addNewSurveyResponseForm(totalFormData,surveyId ).then(()=>{
                             totalFormData = [];
                         }).catch(err=>{
                             console.log(err);
                             err.response.json().then(res => {
                                 errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
                             });
                         })
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
        // alert(JSON.stringify(errorInfo, null, 2));
    };
    const fetchSurvey = (surveyId) => getSurvey(surveyId)
        .then(resp => resp.json())
        .then(data => {
            setSurvey(data);

            setCurrentSection(0);


        }).catch(err => {
             console.log(err);
             setSurvey({});
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => {
            setFinishedSurvey(false);
            setFetching(false);

        });

    useEffect(() => {
        console.log("Invoke only on mount");
        fetchSurvey(surveyId);
    }, []);



    const onChange = list => {
        console.log(list);
        // setCheckedList(list);
        // setIndeterminate(!!list.length && list.length < plainOptions.length);
        // setCheckAll(list.length === plainOptions.length);
    };




    /////

   const onChangeRadio =  (e, data)  => {

         let selectedAnswer  = data;

       let newSurvey = survey;
       newSurvey.sections[currentSectionIndex].questions.forEach(question=>{

          if(question.answers.find(item => item.id === selectedAnswer.id)){
              question.answers.forEach(answer=>{

                  if(selectedAnswer.id === answer.id){
                      answer.selected=true;
                  }else{
                      answer.selected = false;
                  }

              })
          }


               for(const skip of  selectedAnswer.skip ){
                   console.log('SKIP:=> ',  skip );
                   if(question.id === skip.questionId){
                       console.log('I reached here');
                        for(const lg of skip.logic){
                            question.answers.forEach(answer=>{

                                if(lg === answer.id){
                                    console.log('Here also....')
                                    answer.skipped=true;
                                }
                            })

                        }
                   }
               }

    });




       console.log('new Survey:=> ',  newSurvey );

       localStorage.setItem('gumba_survey',JSON.stringify(newSurvey));


       updateSurvey(JSON.parse(localStorage.getItem('gumba_survey')));
    };


   function updateSurvey(survey){

       setSurvey(survey);
       console.log("*******************************")
       console.log(survey);
       console.log("++++++++++++++++++++++++++++++++++")
   }
    /////
    function onChangeTime(time, timeString) {
        console.log(time, timeString);
    }
    ////
    ///file upload.....

    const [fileList, setFileList] = useState([

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
if(currentSectionIndex !==  (survey.sections.length-1) ){
    return <Row>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                  NEXT
            </Button>
        </Form.Item>

    </Row>;
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
        <Form.Item>
            <Button type="primary" htmlType="submit">
                NEXT
            </Button>
        </Form.Item>
    </Row>;}

    }

    ////

    const renderSurvey = () => {
        if (fetching) {
            return <Spin/>;
        }

        return <>
            {/*<Link to={`survey/1`}> TEST THE LINK</Link>*/}
            {
              !finishedSurvey ? JSON.stringify(survey) === '{}'? <Layout>
                    <Header style={{backgroundColor:"#8fc9fb",fontSize:'1.8rem'}}>GUMBA SURVEY</Header>
                    <Content style={{padding:"20px"}}>
                        <Text>`NO Published Survey with ID:   {surveyId}`</Text>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Gumba Survey Tool © Project Clear</Footer>
                </Layout>:    <Layout>
                    <Header style={{backgroundColor:"#8fc9fb",fontSize:'1.8rem'}}>{survey.title}</Header>
                    <Content style={{padding:"20px"}}>
                        {/*{survey ===! {}? */}
                        <Form layout="vertical"
                              onFinishFailed={onFinishFailed}
                              onFinish={onFinish}
                        >
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
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Col span="12">
                                                                <Form.Item
                                                                    name={`answer`+question.id}
                                                                    label={question.title}
                                                                    rules={[{required: question.required, message: 'This field is required'}]}
                                                                >
                                                                    <Input placeholder="Write your answer here.." />
                                                                </Form.Item>
                                                            </Col>


                                                        </Row>
                                                    </Card>
                                                case "PARAGRAPH":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>
                                                            <Col span="16">
                                                                <Form.Item
                                                                    name={`answer`+question.id}
                                                                    label={question.title}
                                                                    rules={[{required: question.required, message: 'This field is required'}]}
                                                                >
                                                                    <TextArea rows={4} placeholder="Write your answer here.."/>
                                                                </Form.Item>
                                                            </Col>

                                                        </Row>
                                                    </Card>
                                                case "MULTIPLE":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={`MULTIPLE`+index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
                                                                label={question.title}
                                                                rules={[{required: question.required, message: 'This field is highly required'}]}
                                                            >
                                                                <Radio.Group  value={ question.answers.find(item => item.selected) !==undefined ?  question.answers.find(item => item.selected)['title'] :""   }

                                                                 >
                                                                    <Space direction="vertical">
                                                                        {question.answers.map(function (answer, index) {

                                                                            return  !answer.skipped? <Row> <Radio value={ answer.title }  onChange={e=>{onChangeRadio(e,answer)}  } key={index} >{answer.title}</Radio></Row>:<></> ;
                                                                        })}


                                                                    </Space>
                                                                </Radio.Group>


                                                            </Form.Item>


                                                        </Row>
                                                    </Card>
                                                case "CHECKBOX":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
                                                                label={question.title}
                                                                rules={[{required: question.required, message: 'This field is required'}]}
                                                            >
                                                                <Checkbox.Group style={{ width: '100%' }}   onChange={onChange} >
                                                                    <Space  direction="vertical">
                                                                        {question.answers.map(function (answer, index) {
                                                                            return <Row >  <Checkbox value={answer.title}>{answer.title}</Checkbox> </Row> ;
                                                                        })}
                                                                    </Space>

                                                                </Checkbox.Group>
                                                            </Form.Item>


                                                        </Row>
                                                    </Card>
                                                case "DROPDOWN":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
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
                                                                        return  <Select.Option value={answer.title} key={index}>{answer.title}</Select.Option>
                                                                    })}


                                                                </Select>
                                                            </Form.Item>


                                                        </Row>
                                                    </Card>
                                                case "FILE":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
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
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
                                                                label={question.title}
                                                                rules={[{required: question.required, message: 'This field is required'}]}
                                                            >
                                                                <DatePicker/>
                                                            </Form.Item>


                                                        </Row>
                                                    </Card>
                                                case "TIME":
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Form.Item
                                                                name={`answer`+question.id}
                                                                label={question.title}
                                                                rules={[{required: question.required, message: 'This field is required'}]}
                                                            >
                                                                <TimePicker onChange={onChangeTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                                            </Form.Item>


                                                        </Row>
                                                    </Card>
                                                default:
                                                    return   <Card style={{padding:"20px", borderRadius:"10px",marginBottom:"20px"}} key={index}>
                                                        <Row gutter={16}>

                                                            <Col span="12">
                                                                <Form.Item
                                                                    name={`answer`+question.id}
                                                                    label={question.title}
                                                                    rules={[{required: question.required, message: 'This field is required'}]}
                                                                >
                                                                    <Input placeholder="Write your answer here.." />
                                                                </Form.Item>
                                                            </Col>


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
                </Layout> : <Layout>
                  <Header style={{backgroundColor:"#8fc9fb",fontSize:'1.8rem'}}>{survey.title}</Header>
                  <Content style={{padding:"20px"}}>
                      <Row><Text>Thank you for taking part on this survey, Your response has been recorded.</Text></Row>
                      <Row><Button  type="primary" onClick={retakeSurvey}>Submit another response</Button></Row>
                  </Content>
                  <Footer style={{textAlign: 'center'}}>Gumba Survey Tool © Project Clear</Footer>
              </Layout>
            }

        </>
    }


return renderSurvey();
}

export default  SurveyForm;