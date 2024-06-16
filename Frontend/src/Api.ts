import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

interface Task {
  _id: string;
  task: string;
  time: string;
  status: boolean;
}

export const getUnCheckedTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(`${BASE_URL}/tasksunchecked`);
    
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getCheckedTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(`${BASE_URL}/taskschecked`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createTask = async (task: string, time: string): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.post(`${BASE_URL}/tasks`, { task, time });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateTask = async (id: string, task: string, time: string, status: boolean): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.put(`${BASE_URL}/tasks/${id}`, { task, time, status });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  // Implement your error handling logic here (e.g., logging, displaying error messages)
};
