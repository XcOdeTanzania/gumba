import {useState} from "react";
import UserList from "./user/UserList";
import {Breadcrumb, Image, Layout, Menu} from "antd";
import {
    DashboardOutlined,
    DesktopOutlined,
    FileOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function HomeScreen() {
    const [collapsed, setCollapsed] = useState(false);
    const pages = ["First page", "Second page", UserList(), "Forth page", "Fifth page", "Sixth page", "Seventh Page", "Eighth page", "Ninth page"];
    const [contentIndex, setContentIndex] = useState(0);


    const changeSelectedKey = (event) => {
        const key = event.key;
        // setSelectedKey(key);
        setContentIndex( key );
    };
    return <Layout style={{minHeight: '100vh'}}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo" >
                <Image width={70} src="https://user-images.githubusercontent.com/8332431/138810912-9f5b943f-84cc-46dd-8c56-c77a418e89f0.jpg" />
            </div>

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
                    <Menu.Item key="3">Administrators</Menu.Item>
                    <Menu.Item key="4">Surveyors</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<FileOutlined/>} title="Surveys">
                    <Menu.Item key="5">Create</Menu.Item>
                    <Menu.Item key="6">All</Menu.Item>
                    <Menu.Item key="7">Draft</Menu.Item>
                </SubMenu>
                <Menu.Item key="8" icon={<SettingOutlined/>}>
                    Settings
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
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