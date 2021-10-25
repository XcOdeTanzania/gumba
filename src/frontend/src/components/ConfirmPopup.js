import {Popconfirm, message} from 'antd';

function confirm(e) {
    console.log(e);
    message.success('Click on Yes').then(()=>{
        console.log('deleted successfully')
    });
}

function cancel(e) {
    console.log(e);
    message.error('Click on No').then(()=>{
        console.log('Error while deleting the content')
    });
}

const openConfirmPopup = (title) =>
    <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <a href="#">Delete</a>
    </Popconfirm>

export const confirmPopup =(title) => openConfirmPopup(title);