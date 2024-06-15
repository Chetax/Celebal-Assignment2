import React, { FormEvent, useState } from "react";
import logo from "./Logo.png";
import { FaPen } from "react-icons/fa";
import './Todo.css'
import toast, { Toaster } from 'react-hot-toast';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileDoneOutlined ,
  SettingOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  PlusOutlined
} from "@ant-design/icons";


import { Button, Layout, Modal,Menu, theme ,Card,Checkbox,TimePicker,TimePickerProps} from "antd";
import dayjs ,{ Dayjs } from 'dayjs';  
interface Task{
  task:string,
  time:Dayjs |null
  }
const format = 'HH:mm';
const { Header, Sider, Content } = Layout;
let taskArray:Array<Task>=[];
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pen,setpen]=useState<boolean>(true);
  const [task,settask]=useState<string>("");
  const [time, setTime] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const showModal = () => {setIsModalOpen(true);};
  const notifysucess = () => toast.success('Successfully created!');
  const notifyError = () => {
    toast.error("Error!");
  };
  const onChange: TimePickerProps['onChange'] = (time, timeString) => {
    setTime(time);  
  };
  const handleOk = () => {
    const formattedTime = time ? time.format(format) : null;

    taskArray.map((e)=>{
      if(e.task==task ){
        notifyError();
        return;
      }
    });
 
    if(task===""||time===null) {
      notifyError();
    }
    else{
      taskArray.push({ task, time: formattedTime ? dayjs(formattedTime, format) : null });
      console.log({ task, time: time ? time.format(format) : null });
      settask("");
      setTime(null);
      notifysucess()
    }

    setIsModalOpen(false);

  };
 
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  console.log({task,time});
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
      
      { 
        taskArray.map((e,index)=>(
          <Card   hoverable className="Card" style={{margin:"10px 0"}}>

          <div id="divzero" style={{display:'flex',alignItems:'center',justifyContent:"space-between"}}>    
          <div className="divone">
          <input type="text" value={e.task} readOnly={pen} style={{ fontSize: "20px",width:"35vw", border: "none", background: "none", outline: "none" }} />
          </div>
          
          <div className="div2" style={{display:'flex',alignItems:'center',justifyContent:"space-between",width:"150px"}}>
  
          {pen === false ? (
  <TimePicker
    className="custom-time-picker"
    style={{ width: "90px", border: "none", background: "none", outline: "none" }}
    defaultValue={dayjs('12:08', format)} 
    format={format}
    disabled={pen}
  />
) : (
  e.time!=null ? <span>{e.time.format("HH:MM")}</span> :  <span>No Time Set</span> // Adjust this based on how e.time is formatted or displayed
)}

          {pen===true ?  <FaPen onClick={(e)=>setpen(!pen)}/> : <FileDoneOutlined onClick={(e)=>setpen(!pen)}/>}
          <Checkbox></Checkbox>
          </div>
          </div>
            </Card>
        ))
      }
    

        </Content>
      
        <Button onClick={showModal} type="link" style={{width:'auto',position:"absolute",top:"80%",left:"90%",}}> <PlusOutlined  style={{fontSize:"5vh"}}/> </Button>
        <Modal title="Todo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
    <div className="div" style={{display:'flex',alignContent:'center',justifyContent:'start'}}>  <label style={{fontSize:"20px"}}>Enter Task : </label>  <input type="text" value={task} onChange={(e)=>{settask(e.target.value)}} style={{width:"15vw",marginLeft:"15px"}} /></div>
    <div className="div" style={{display:'flex',alignContent:'center',justifyContent:'start',marginTop:"15px"}}>  <label style={{fontWeight:"",fontSize:"20px"}}>DeadLine    : </label>   <TimePicker   onChange={onChange} style={{marginLeft:"26px"}} defaultValue={dayjs('12:08', format)} format={format} />;</div>
     
      </Modal>
   
      </Layout>
      <Toaster />
    </Layout>
  );
};


export default App;
