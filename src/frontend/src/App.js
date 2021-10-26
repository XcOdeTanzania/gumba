import './App.css';
import {deleteUser, getAllUsers} from "./client";
import {useState, useEffect} from "react";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Avatar,
    Dropdown,
    Popconfirm,
    message
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined, PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined,

} from '@ant-design/icons';
import UserDrawerForm from "./pages/user/UserDrawerForm";
import {confirmPopup} from "./components/ConfirmPopup";
import {errorNotification, successNotification} from "./components/Notifications";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

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

function App() {
    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
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
                <Empty/>;
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

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>

                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderUsers()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Qlicue Analytica ©2021 Created by Qlicue Analytica</Footer>
        </Layout>
    </Layout>
}

export default App;
