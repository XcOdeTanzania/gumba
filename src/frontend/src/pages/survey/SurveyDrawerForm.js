import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker, Switch} from 'antd';
import {addNewSurvey} from "../../client/SurveyClient";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {successNotification, errorNotification} from "../../components/Notifications";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{fontSize: 24, color: "white"}} spin/>;

function SurveyDrawerForm({showDrawer, setShowDrawer, fetchSurveys}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const onFinish = survey => {
        setSubmitting(true);
        console.log(JSON.stringify(survey, null, 2));
        addNewSurvey(survey).then(() => {
            console.log("survey added");
            onCLose();
            successNotification("Survey successfully added", `${survey.name} was added to gumba system`)
            fetchSurveys();
        }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message}   [${res.status}]  [${res.error}]`, "bottomLeft");
            });

        }).finally(() => {
            setSubmitting(false);
        });
        ///alert(JSON.stringify(values, null, 2));
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new survey"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="title"
                        rules={[{required: true, message: 'Please enter survey title'}]}
                    >
                        <Input placeholder="Please enter survey title"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="metaTitle"
                        label="meta title"
                        rules={[{required: true, message: 'Please enter survey meta title'}]}
                    >
                        <Input placeholder="Please enter survey meta title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="slug"
                        label="slug"
                        rules={[{required: true, message: 'Please enter survey slug'}]}
                    >
                        <Input placeholder="Please enter survey slug"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="accessibility"
                        label="accessibility"
                        rules={[{required: true, message: 'Please select an accessibility'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="PUBLIC">PUBLIC</Option>
                            <Option value="PRIVATE">PRIVATE</Option>

                        </Select>
                    </Form.Item>
                </Col>


            </Row>


            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="description"
                        label="description"
                        rules={[{required: true, message: 'Please enter survey description'}]}

                    >
                        <TextArea rows={4} placeholder="Please enter survey description"/>

                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="summary"
                        label="summary"
                        rules={[{required: true, message: 'Please enter survey summary'}]}
                    >
                        <TextArea rows={4} placeholder="Please enter survey summary"/>
                    </Form.Item>
                </Col>

            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="startsAt"
                        label="Start Date">
                        <DatePicker/>

                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endsAt"
                        label="End Date"

                    >
                        <DatePicker/>

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>

                <Col span={12}>
                    <Form.Item
                        name="publish"
                        label="publish"
                         valuePropName="checked"

                    >
                        <Switch
                            defaultChecked = {false}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {submitting && <Spin indicator={antIcon}/>} Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
}

export default SurveyDrawerForm;