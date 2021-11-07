import {Button, Col, Input, Row, Tooltip,} from 'antd';

import {useState} from "react";
import {CloseOutlined,} from "@ant-design/icons";
import IconItem from "./IconItem";


function OptionAnswer({type}) {


    const initialOptionList = [
        {
            id: 1,
            title: 'Option 1',
        },

    ];


    const [list, setList] = useState(initialOptionList);

    const handleChange = (index) => (event) => {


        let newEntry = list[index]
        newEntry["title"] = event.target.value;
        list[index] = newEntry
        setList([...list])

    }

    const addOption  = () => {
        const newList = list.concat({id: 0, title: `Option`});

        setList(newList);
    }


    const deleteOption = (index) => () => {
      if(list.length >1){
          let copy_list = [...list]
          copy_list.splice(index, 1)
          setList(copy_list)
      }

    }


    return <>

        {list.map(function (data, index) {
            return <>
                <Row>
                    <Col span={1}>
                        <IconItem type={type} index={index}/>
                    </Col>
                    <Col span={8}>

                        <Input className={'customInput'} key={data.id} type="text"
                               placeholder={data.title + " " + `${index + 1}`} value=  {data.title ==='Option'? data.title + " " + `${index + 1}`: data.title}
                               onChange={handleChange(index)}/>
                    </Col>
                    <Col span={2}>
                        <Tooltip title="remove" key="remove">
                            <Button type="text" key="remove" onClick={deleteOption(index)}>
                                <CloseOutlined/>
                            </Button>
                        </Tooltip>
                    </Col>


                </Row>
                <br/>
            </>


        })}


        <Button type="text" onClick={addOption}>
            Add option
        </Button>
    </>
}

export default OptionAnswer;