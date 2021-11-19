import {useState, Fragment} from "react";
import UserList from "./user/UserList";
import {Badge, Breadcrumb, Button, Col, Divider, Image, Layout, List, Menu, Popover, Row} from "antd";
import {
    BellOutlined,
    DashboardOutlined,
    DesktopOutlined,
    FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import SurveyList from "./survey/SurveyList";
import Avatar from "antd/es/avatar/avatar";
import moment from "moment";



const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function HomeScreen() {
    const [collapsed, setCollapsed] = useState(false);
    const [notifications, setNotifications] = useState([])
    const languages = [{title: "Swahili", flag: ""}, {title: "English", flag: ""},];
    const pages = [  "First Page", "Second page",
        <UserList/>, "Forth page", "Fifth page", "Sixth page", SurveyList(), "Eighth page", "Ninth page"];
    const pageTitles = ["First page", "Second page", "User", "Forth page", "Fifth page", "Sixth page", "Survey", "Eighth page", "Ninth page"];
    const [contentIndex, setContentIndex] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState({title: "Swahili", flag: ""})
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const changeSelectedKey = (event) => {
        const key = event.key;
        // setSelectedKey(key);
        setContentIndex(key);
    };

    const handleClickMenu = e => {
        /// e.key === 'SignOut' && this.props.onSignOut()
    }

    const rightContent = [
        <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
            <SubMenu
                title={
                    <Fragment>
              <span style={{color: '#999', marginRight: 4}}>
                Hi,
              </span>
                        <span>Kalimwenjuma </span>
                        <Avatar style={{marginLeft: 8}} src=""/>
                    </Fragment>
                }
            >
                <Menu.Item key="SignOut">
                    Sign out
                </Menu.Item>
            </SubMenu>
        </Menu>,
    ]

    rightContent.unshift(
        <Menu
            key="language"
            selectedKeys={[currentLanguage.key]}
            onClick={data => {
                //  setLocale(data.key)
            }}
            mode="horizontal"
        >
            <SubMenu title={<Avatar size="small" src={currentLanguage.flag}/>}>
                {languages.map(item => (
                    <Menu.Item key={item.key}>
                        <Avatar
                            size="small"
                            style={{marginRight: 8}}
                            src={item.flag}
                        />
                        {item.title}
                    </Menu.Item>
                ))}
            </SubMenu>
        </Menu>
    );


    function onAllNotificationsRead() {

    }

    rightContent.unshift(
        <Popover
            placement="bottomRight"
            trigger="click"
            key="notifications"
            overlayClassName="notificationPopover "
            getPopupContainer={() => document.querySelector('#primaryLayout')}
            content={
                <div className="notification">
                    <List
                        itemLayout="horizontal"
                        dataSource={notifications}
                        locale={{
                            emptyText: "You have viewed all notifications.",
                        }}
                        renderItem={item => (
                            <List.Item className="notificationItem">
                                <List.Item.Meta
                                    title={
                                        <Badge className="site-badge-count-4">{item.title}</Badge>

                                    }
                                    description={moment(item.date).fromNow()}
                                />
                                <RightOutlined style={{fontSize: 10, color: '#ccc'}}/>
                            </List.Item>
                        )}
                    />
                    {notifications.length ? (
                        <div
                            onClick={onAllNotificationsRead}
                            className="clearButton"
                        >
                            Clear notifications
                        </div>
                    ) : null}
                </div>
            }
        >
            <Badge
                count={notifications.length}
                dot
                offset={[-10, 10]}
                className="iconButton"
            >
                <BellOutlined className="iconFont"/>
            </Badge>
        </Popover>
    );


    return <Layout style={{minHeight: '100vh'}}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo">
                <Image width={70}
                       src="https://user-images.githubusercontent.com/8332431/138810912-9f5b943f-84cc-46dd-8c56-c77a418e89f0.jpg"/>
            </div>
            <Divider></Divider>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="0" icon={<DashboardOutlined/>} onClick={changeSelectedKey}>
                    Dashboard
                </Menu.Item>
                <Menu.Item key="1" icon={<DesktopOutlined/>} onClick={changeSelectedKey}>
                    Sites
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined/>} onClick={changeSelectedKey}>
                    Accounts
                </Menu.Item>

                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="3" onClick={changeSelectedKey}>Administrators</Menu.Item>
                    <Menu.Item key="4" onClick={changeSelectedKey}>Surveyors</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<FileOutlined/>} title="Surveys">
                    <Menu.Item key="6" onClick={changeSelectedKey}>All</Menu.Item>
                    <Menu.Item key="7" onClick={changeSelectedKey}>Draft</Menu.Item>
                </SubMenu>
                <Menu.Item key="8" icon={<SettingOutlined/>} onClick={changeSelectedKey}>
                    Settings
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-header-layout-background" style={{padding: 0}}>
                         <Row>
                             <Col span={8}>
                                 <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16, marginLeft: 10}}>
                                     {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                 </Button>
                             </Col>
                             <Col span={8} offset={8}>

                                 <div className="rightContainer">{rightContent}</div>

                             </Col>
                         </Row>

            </Header>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item> {pageTitles[contentIndex]}</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                </Breadcrumb>

                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {pages[contentIndex]}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Gumba Survey Tool © Project Clear</Footer>
        </Layout>
    </Layout>

}

export default HomeScreen;