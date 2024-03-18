import { FC } from 'react';
import styles from './TodoForm.module.css';
type TaskFormProps = {
  newTask: string;
  setNewTask: (newTask: string) => void;
  onAddTask: () => void;
};

const TodoForm: FC<TaskFormProps> = ({ newTask, setNewTask, onAddTask }) => {
  return (
    <div className={styles.taskForm}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
        className={styles.taskInput}
      />
      <button onClick={onAddTask} className={styles.addBtn}>Add Task</button>
    </div>
  );
};

export default TodoForm;
