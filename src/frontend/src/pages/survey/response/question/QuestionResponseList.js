import {

    Card, Divider,

} from "antd";


import {useState} from "react";
import {CheckSquareOutlined} from "@ant-design/icons";


function QuestionResponseList({questions, answers}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const answersList = [{
        title: 'Mke',
        resp: 200
    }, {
        title: 'Mme',
        resp: 120
    }];

    return answersList.map((answer, index)=>
        <>
        <Card
        style={{width: '100%', borderRadius: "5px",}}

    >
        <>
            <p><CheckSquareOutlined/> Mke</p>
            <Divider/>
            <p>200 responses</p>
        </>
    </Card>
            <br/>
        </>
    );

}


export default QuestionResponseList;