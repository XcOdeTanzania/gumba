import {Avatar, Badge, Button, Dropdown, Empty, Menu, message, Popconfirm, Spin, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import UserDrawerForm from "./UserDrawerForm";
import {deleteUser, getAllUsers} from "../../client/UserClient";
import {errorNotification, successNotification} from "../../components/Notifications";
import {useEffect, useState} from "react";



const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }

    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)} </Avatar>
    }


    return <Avatar>{name.charAt(0)} </Avatar>
}

const removeUser = (userId, callback) => {
    deleteUser(userId).then(() => {
        successNotification("User deleted", `User with ${userId} was deleted`);
        callback();
    }).catch(err=>{
        err.response.json().then(res=>{
            errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`);
        });
    });
}
const columns = fetchUsers => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, user) => <TheAvatar name={user.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, user) => <Dropdown overlay={menu(user, fetchUsers)} placement="bottomLeft" arrow>
            <MoreOutlined/>
        </Dropdown>
    }
];

const menu = (user, fetchUsers) => (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><EditOutlined style={{color: "#52c41a"}}/> Edit</Menu.Item>
        <Menu.Item key="3"> <Popconfirm
            title={`Are you sure to delete ${user.name}`}
            onConfirm={() => removeUser(user.id, fetchUsers)}
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

function UserList() {
    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchUsers = () => getAllUsers()
        .then(resp => resp.json())
        .then(data => {
            setUsers(data)


        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res=>{
                console.log(res);
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(()=>{
            setFetching(false);
        });

    useEffect(() => {
        console.log("Invoke only on mount");
        fetchUsers();
    }, []);

    const renderUsers = () => {
        if (fetching) {
            return <Spin/>;
        }
        if (users.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary"   icon={<PlusOutlined/>} size="small">
                    Add New User
                </Button>
                <UserDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchUsers={fetchUsers}
                />
                <Empty/>
            </>
        }
        return <>

            <UserDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchUsers={fetchUsers}
            />
            <Table
                dataSource={users}
                columns={columns(fetchUsers)}
                title={() =>
                    <>

                        <Tag style={{marginLeft: "5px"}}>Number of users </Tag>
                        <Badge count={users.length} className="site-badge-count-4"/>
                        <br/><br/>
                        <Button onClick={() => setShowDrawer(!showDrawer)} type="primary"
                                icon={<PlusOutlined/>} size="medium">
                            Add new User
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={(user) => user.id}
            />
        </>
    }


    return renderUsers();
}


export default  UserList;