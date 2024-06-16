import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb://localhost:27017';
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Task schema and model
interface ITask extends mongoose.Document {
  task: string;
  time: string;
  status: boolean;
}

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: Boolean, required: true },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

app.get('/tasksunchecked', async (req: Request, res: Response) => {
  try {
    const uncheckedTasks = await Task.find({ status: false });
    
    res.json(uncheckedTasks);
  } catch (err) {
    console.error('Error fetching unchecked tasks:', err);
    res.status(500).send('Error fetching tasks');
  }
});



app.get('/taskschecked', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ status: true })
    
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error fetching tasks');
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const newTask = new Task({ ...req.body, status: false });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Error creating task');
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { task, time, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { task, time, status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Error updating task');
  }
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Error deleting task');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});