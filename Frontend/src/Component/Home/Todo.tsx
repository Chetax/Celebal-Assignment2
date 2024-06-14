import React, { useState } from "react";
import logo from "./Logo.png";
import { FaPen } from "react-icons/fa";
import './Todo.css'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  CheckSquareOutlined,
  FileDoneOutlined ,
  SettingOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme ,Card,Checkbox,TimePicker} from "antd";
import dayjs from 'dayjs';  

const format = 'HH:mm';
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pen,setpen]=useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div
          className="div"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          <img src={logo} alt="" style={{ width: "75px" }} />
        </div>
        <Menu
          style={{ paddingTop: "30px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: "Todays Task",
              icon: <AppstoreOutlined />,
              children: [
                { key: "5", label: "Complete" },
                { key: "6", label: "Remains" },
              ],
            },
            {
              key: "2",
              icon: <CalendarOutlined />,
              label: "Scheduled Task",
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: "Setting",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content  style={{background: colorBgContainer,borderRadius: borderRadiusLG,padding:"0 15px"}}>
        <Card   hoverable className="Card">

<div id="divzero" style={{display:'flex',alignItems:'center',justifyContent:"space-between"}}>    
<div className="divone">
<input type="text" readOnly={pen} style={{ fontSize: "20px",width:"35vw", border: "none", background: "none", outline: "none" }} />
</div>

<div className="div2" style={{display:'flex',alignItems:'center',justifyContent:"space-between",width:"150px"}}>
<TimePicker 
      className="custom-time-picker"
      style={{ width: "90px", border: "none", background: "none", outline: "none" }}
      defaultValue={dayjs('12:08', format)} 
      format={format}
      disabled={pen}
    />
{pen===true ?  <FaPen onClick={(e)=>setpen(!pen)}/> : <FileDoneOutlined onClick={(e)=>setpen(!pen)}/>}
<Checkbox></Checkbox>
</div>
</div>
  </Card>

        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
