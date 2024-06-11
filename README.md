# Celebal-Assignment 2

A simple To-Do List application built with React and TypeScript. This application allows users to add, remove, and mark tasks as completed. It includes features such as input validation, dynamic task display, optional sorting, filtering, and localStorage integration.

## Features

- Add new tasks with input validation
- Remove tasks
- Mark tasks as completed
- Optional sorting of tasks
- Filtering tasks (e.g., all, completed, active)
- Persist tasks using localStorage

## Tech Stack

- React
- TypeScript
- Material UI

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/react-todo-list.git
   cd react-todo-list


2. Install the dependencies:
   ```sh
   npm install
   
3. Start the development server:
   ```sh
     npm start
   
  This will open the application in your default web browser at http://localhost:3000.

## Usage

1. **Adding a Task**:
   - Type a task in the input field and press Enter or click the "Add Task" button. The task will be added to the list.

2. **Removing a Task**:
   - Click the "Remove" button next to the task you want to delete. The task will be removed from the list.

3. **Marking a Task as Completed**:
   - Click the checkbox next to a task to mark it as completed. The task will be visually indicated as completed (e.g., crossed out).

4. **Sorting and Filtering**:
   - Use the provided controls to sort tasks by name or date.
   - Use the filtering options to view all tasks, only completed tasks, or only active tasks.

## Local Storage Integration

The tasks are persisted in the browser's localStorage. This means that when you refresh the page or close and reopen the browser, your tasks will still be there. Here’s how it works:

- **Saving Tasks**: When you add, remove, or complete a task, the updated list of tasks is saved to localStorage.
- **Loading Tasks**: When the application loads, it checks localStorage for any saved tasks and loads them into the task list.
- **Updating Tasks**: Any changes to the tasks (such as marking a task as completed or deleting a task) automatically update the tasks in localStorage.

This ensures that your to-do list is persistent and will not be lost upon page reload or browser restart.

## Testing

To ensure the application works as expected, follow these steps:

1. **Adding a Task**:
   - Type a task in the input field and press Enter or click the "Add Task" button.
   - Verify that the task appears in the list.

2. **Removing a Task**:
   - Click the "Remove" button next to a task.
   - Verify that the task is removed from the list.

3. **Marking a Task as Completed**:
   - Click the checkbox next to a task.
   - Verify that the task is marked as completed (e.g., the text is crossed out or visually different).

4. **LocalStorage Persistence**:
   - Add a task.
   - Refresh the page.
   - Verify that the task is still in the list, indicating it was saved in localStorage.

5. **Sorting and Filtering**:
   - Add multiple tasks with different statuses (completed and active).
   - Use the sort control to sort tasks by name or date.
   - Use the filter control to view all tasks, only completed tasks, or only active tasks.
   - Verify that the sorting and filtering functionalities work as expected.

By following these steps, you can confirm that the core functionalities of the To-Do List application are working correctly.

   
