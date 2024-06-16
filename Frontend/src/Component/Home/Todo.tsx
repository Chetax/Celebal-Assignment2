import React, { useEffect, useState } from "react";
import logo from "./Logo.png";
import { FaPen } from "react-icons/fa";
import './Todo.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileDoneOutlined,
  SettingOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  PlusOutlined,
  DeleteOutlined 
} from "@ant-design/icons";
import { Button, Layout, Modal, Menu, theme, Card, Checkbox, TimePicker, TimePickerProps } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import { getUnCheckedTasks,getCheckedTasks, createTask, updateTask, deleteTask } from '../../Api';
import { Task } from "@mui/icons-material";

interface Task {
  _id?: string;
  task: string;
  time: string;
  status: boolean;
}

const format = 'HH:mm';
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const redirect=useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [task, setTask] = useState<string>("");
  const [datashow, setdatashow] = useState<boolean>(false);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [datashow]);

  const fetchTasks = async () => {
    try {
      let response: Task[] = [];
        response = datashow===false ? await getUnCheckedTasks()  : await getCheckedTasks() ;
      console.log(response);
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  


  const showModal = () => {
    setIsModalOpen(true);
  };

  const notifySuccess = () => toast.success('Successfully created!');
  const notifyError = () => toast.error("Error!");

  const onChange: TimePickerProps['onChange'] = (time, timeString) => {
    setTime(time);
  };

  const handleOk = async () => {
    const formattedTime = time ? time.format(format) : null;
  
    if (!task || !time) {
      notifyError();
      return;
    }
  
    try {
      if(editIndex!=null){
      const editedTask = await updateTask(tasks[editIndex]._id!, task, formattedTime!, tasks[editIndex].status);
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
    }
      notifySuccess();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
      notifyError();
    }
  
    setTask("");
    setTime(null);
  };
  const handleEdit = (index: number) => {
    const taskToEdit = tasks[index];
    setEditIndex(index);
    setTask(taskToEdit.task);
    setTime(dayjs(taskToEdit.time, format));
    showModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDone = () => {
    setEditIndex(null);
    setTask("");
    setTime(null);
    fetchTasks(); // Refresh tasks after editing
  };

  const handleCheckboxChange = async (index: number) => {
    try {
      const taskToUpdate = tasks[index];
      await updateTask(taskToUpdate._id!, taskToUpdate.task, taskToUpdate.time, !taskToUpdate.status);
      fetchTasks(); // Refresh tasks after updating status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="div" style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}>
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
                { key: "5", label: "Complete", onClick: ()=>setdatashow(true) },
                { key: "6", label: "Remains" ,onClick: ()=>setdatashow(false)},
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
        <Content style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: "0 15px" }}>
  {
    tasks.map((task, index) => (
      <Card hoverable className="Card" style={{ margin: "10px 0" }} key={task._id}>
        <div id="divzero" style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
          <div className="divone">
            <input type="text" value={task.task} readOnly style={{ fontSize: "20px", width: "35vw", border: "none", background: "none", outline: "none" }} />
          </div>
          <div className="div2" style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "150px" }}>
            {task.time ? <span>{task.time}</span> : <span>No Time Set</span>}
            <Checkbox checked={task.status} onChange={() => handleCheckboxChange(index)}></Checkbox>
            <FaPen onClick={() => handleEdit(index)} />
            
          </div>
        </div>
      </Card>
    ))
  }
</Content>


        <Button onClick={showModal} type="link" style={{ width: 'auto', position: "absolute", top: "80%", left: "90%", }}> <PlusOutlined style={{ fontSize: "5vh" }} /> </Button>
        <Modal title="Todo" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div className="div" style={{ display: 'flex', alignContent: 'center', justifyContent: 'start' }}>
            <label style={{ fontSize: "20px" }}>Enter Task: </label>
            <input type="text" value={task} onChange={(e) => { setTask(e.target.value) }} style={{ width: "15vw", marginLeft: "15px" }} />
          </div>
          <div className="div" style={{ display: 'flex', alignContent: 'center', justifyContent: 'start', marginTop: "15px" }}>
            <label style={{ fontWeight: "", fontSize: "20px" }}>Deadline: </label>
            <TimePicker onChange={onChange} style={{ marginLeft: "26px" }} value={time} format={format} />
          </div>
        </Modal>
      </Layout>
      <Toaster />
    </Layout>
  );
};

export default App;
