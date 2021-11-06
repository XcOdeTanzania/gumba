import {
    Button,


    Card, Col, List, Switch, Tabs,

} from "antd";


import {useState} from "react";
import {FileTextTwoTone, MoreOutlined} from "@ant-design/icons";
import {PieChart} from 'react-minimal-pie-chart';
import QuestionDropdown from "./question/QuestionDropdown";
import QuestionResponseList from "./question/QuestionResponseList";

const {TabPane} = Tabs;
const tabList = [
    {
        key: 'summary',
        tab: 'Summary',
    },
    {
        key: 'question',
        tab: 'Question',
    }, {
        key: 'individual',
        tab: 'Individual',
    },
];

const contentList = {
    summary: "",
    question: <QuestionDropdown/>,
    individual: <p>content3</p>,
};


const gridStyle = {
    width: '25%',
    textAlign: 'center',
    borderRadius: '0px',
    border: 'none'
};


function ResponseTab({question, index, selectedCardIndex, deleteQuestion, handleChange, duplicateQuestion}) {
    const [activeTabKey, setActiveTabKey] = useState('summary');
    const onTab1Change = key => {
        setActiveTabKey(key);
    };

    const moreContentList = {
        summary: <TabPane tab="" key="summary">
            <Card
                style={{width: '100%', borderRadius: "5px",}}
                title={<>
                    <p>Where do you live?</p>
                    <p style={{fontSize: '12px'}}>413 responses</p>
                </>}


            >
                <>

                    <Card.Grid style={gridStyle}> </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <PieChart
                            data={[
                                {title: 'One', value: 10, color: '#00ced1'},
                                {title: 'Two', value: 15, color: '#da3287'},
                                {title: 'Three', value: 20, color: '#ffa500'},
                                {title: 'Four', value: 33, color: '#008000'},
                                {title: 'Five', value: 9, color: '#ff0000'},
                            ]}
                            label={({x, y, dx, dy, dataEntry}) => (
                                <text
                                    x={x}
                                    y={y}
                                    dx={dx}
                                    dy={dy}
                                    dominant-baseline="central"
                                    text-anchor="middle"
                                    style={{
                                        fontSize: '8px',
                                        fontFamily: 'sans-serif',
                                        fill: '#fff'
                                    }}

                                >
                                    {Math.round(dataEntry.percentage) + '%'}
                                </text>
                            )}
                        />
                    </Card.Grid>
                    <Card.Grid style={{
                        width: '50%',
                        textAlign: 'center',
                        borderRadius: '0px',
                        border: 'none'
                    }}>

                        <span className="dot" style={{backgroundColor: '#00ced1'}}></span>
                        <span>One boss good names</span>
                        <br/>
                        <span className="dot" style={{backgroundColor: '#da3287'}}></span>
                        <span>Two boss good names</span>
                        <br/>
                        <span className="dot" style={{backgroundColor: '#ffa500'}}></span>
                        <span>One boss good names</span>
                        <br/>
                        <span className="dot" style={{backgroundColor: '#008000'}}></span>
                        <span>Two boss good names</span>
                        <br/>
                        <span className="dot" style={{backgroundColor: '#ff0000'}}></span>
                        <span>Two boss good names</span>


                    </Card.Grid>
                </>


            </Card>
        </TabPane>,
        question: <TabPane tab="" key="question">
            <QuestionResponseList/>
        </TabPane>,
        individual: <TabPane tab="" key="individual">
            Content 3
        </TabPane>,
    };

    return < >
        <Card
            style={{width: '100%', borderRadius: "5px",}}
            title="400 responses"
            extra={<>
                <Button type="text"><FileTextTwoTone/></Button><Button type="text"><MoreOutlined/> </Button> <br/>
                Accepting responses <Switch

                defaultChecked={false}
            />

            </>}
            tabList={tabList}
            tabProps={`centered`}
            activeTabKey={activeTabKey}
            onTabChange={key => {
                onTab1Change(key);
            }}
        >
            {contentList[activeTabKey]}
        </Card>


        <Tabs defaultActiveKey={activeTabKey} centered>
            {moreContentList[activeTabKey]}
        </Tabs>


    </ >


}


export default ResponseTab;