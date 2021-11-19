
import {  CheckSquareTwoTone, PlusSquareTwoTone} from "@ant-design/icons";


function IconItemAnswer({index, type} ) {


    if(type ==='Radio'){
        return <PlusSquareTwoTone/>
    }

    else if(type ==='Dropdown'){
        return <p>  {index+1}. </p>
    }
    else{
        return  <CheckSquareTwoTone />
    }
}

export default IconItemAnswer;