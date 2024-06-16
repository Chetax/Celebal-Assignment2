import React, { useEffect, useState } from "react";
import logo from "./Logo.png";
import { FaPen } from "react-icons/fa";
import './Todo.css';
import toast, { Toaster } from 'react-hot-toast';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileDoneOutlined,
  SettingOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Layout, Modal, Menu, theme, Card, Checkbox, TimePicker, TimePickerProps } from "antd";
import dayjs, { Dayjs } from 'dayjs';

interface Task {
  task: string;
  time: string; 
  status: boolean;
}

const format = 'HH:mm';
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [task, setTask] = useState<string>("");
  const [time, setTime] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [completeInd, setcompleteInd] = useState<number | null>(null);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('taskArray', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem('taskArray');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const showModal = () => { setIsModalOpen(true); };
  const notifysucess = () => toast.success('Successfully created!');
  const notifyError = () => { toast.error("Error!"); };

  const onChange: TimePickerProps['onChange'] = (time, timeString) => { setTime(time); };

  const handleComplete = () => {
    if (completeInd !== null) {
      const tasks = loadTasksFromLocalStorage();
      if (tasks.length > completeInd) {
        tasks[completeInd].status = true;
        saveTasksToLocalStorage(tasks);
      }
      setcompleteInd(null);
    }
  };

  const handleOk = () => {
    const formattedTime = time ? time.format(format) : null;
    let invalid = false;
    const tasks = loadTasksFromLocalStorage();

    tasks.forEach((e, index) => {
      if (e.task === task && editIndex === null) {
        notifyError();
        invalid = true;
        return;
      }
    });

    if (task === "" || time === null || invalid) {
      notifyError();
    } else {
      if (!invalid) {
        if (editIndex !== null && tasks.length > editIndex) {
          tasks[editIndex] = { task, time: formattedTime || '', status: false };
        } else {
          tasks.push({ task, time: formattedTime || '', status: false });
        }
        saveTasksToLocalStorage(tasks);
        notifysucess();
      }
      setTask("");
      setTime(null);
    }

    setIsModalOpen(false);
  };

  const handleEdit = (index: number) => {
    const tasks = loadTasksFromLocalStorage();
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setTime(taskToEdit.time ? dayjs(taskToEdit.time, format) : null);
    showModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDone = () => {
    setEditIndex(null);
    setTask("");
    setTime(null);
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
        <Content style={{ background: colorBgContainer, borderRadius: borderRadiusLG, padding: "0 15px" }}>
          {
            loadTasksFromLocalStorage().map((e, index) => (
              e.status===false ? (
                <Card hoverable className="Card" style={{ margin: "10px 0" }} key={index}>
                  <div id="divzero" style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    <div className="divone">
                      <input type="text" value={e.task} readOnly={editIndex !== index} style={{ fontSize: "20px", width: "35vw", border: "none", background: "none", outline: "none" }} />
                    </div>

                    <div className="div2" style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "150px" }}>
                      {editIndex !== index ? (
                        e.time ? <span>{e.time}</span> : <span>No Time Set</span>
                      ) : (
                        <TimePicker
                          className="custom-time-picker"
                          style={{ width: "90px", border: "none", background: "none", outline: "none" }}
                          value={time}
                          format={format}
                          onChange={onChange}
                        />
                      )}
                      {editIndex === index ? <FileDoneOutlined onClick={handleDone} /> : <FaPen onClick={() => handleEdit(index)} />}
                      <Checkbox onClick={() => setcompleteInd(index)}></Checkbox>
                    </div>
                  </div>
                </Card>
              ) : <></>
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
