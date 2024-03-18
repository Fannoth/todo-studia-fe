import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import styles from './TodoList.module.css';
import { toast } from "react-toastify";

export interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.task);
  };


  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:5000/api/tasks';
      if (filterText.length > 0) {
        url += `?taskName=${filterText}`;
      }
      if (filterCompleted) {
        url += filterText.length > 0 ? `&completed=${filterCompleted}` : `?completed=${filterCompleted}`;
      }
      const response = await axios.get<Task[]>(url);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const addTask = async () => {
    try {
      const response = await axios.post<Task>('http://localhost:5000/api/tasks', {
        task: newTask,
        completed: false,
        id: Math.random(),
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      if (response.status === 200) {
        toast.success(`Dodano ToDo - ${newTask}`)
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    try {
      const taskToToggle = tasks.find(t => t.id === id);
      if (taskToToggle) {
        const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
        const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
        if (response.status === 200 && taskToToggle.completed === false) {
          toast.success(`Ustawiono ${taskToToggle.task} jako wykonane`)
          fetchTasks();
        }

        if (response.status === 200 && taskToToggle.completed === true) {
          toast.success(`Ustawiono ${taskToToggle.task} jako niewykonane`)
          fetchTasks();
        }
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };


  const deleteTask = async (id: number) => {
    try {
      const taskToDelete = tasks.find(t => t.id === id);
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      if (response.status === 200) {
        toast.success(`Usunięto ToDo - ${taskToDelete?.task}`)
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const saveEditedTask = async () => {
    if (editingTaskId === null) return;

    try {
      const taskToEdit = tasks.find(t => t.id === editingTaskId);
      const updatedTask = { task: editingTaskText, completed: false, id: editingTaskId };
      const resposne = await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, updatedTask);
      setEditingTaskId(null);
      if (resposne.status === 200) {
        toast.success(`Zmieniono nazwę ToDo z ${taskToEdit?.task} na ${editingTaskText}`)
      }
      setEditingTaskText('');
      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };



  useEffect(() => {
    fetchTasks();
  }, [filterText, filterCompleted]);

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.title}>To Do List</h1>
      <FilterBar
        filterText={filterText}
        setFilterText={setFilterText}
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
      />
      <TodoForm
        newTask={newTask}
        setNewTask={setNewTask}
        onAddTask={addTask}
      />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onStartEditing={startEditingTask}
        onDelete={deleteTask}
        editingTaskId={editingTaskId}
        setEditingTaskText={setEditingTaskText}
        saveEditedTask={saveEditedTask}
        cancelEditingTask={cancelEditingTask}
        editingTaskText={editingTaskText}
      />
    </div>
  );
};

export default TodoList;
