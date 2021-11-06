import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

function QuestionDropdown({questions }) {



    return   <Select
        showSearch
        style={{ width: 400 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    >
        <Option value="jack">What is your first name</Option>
        <Option value="lucy">Lucy was in class when the teacher came?</Option>
        <Option value="tom">Was Tom the only person in the parade?</Option>
    </Select>







}


export default QuestionDropdown;