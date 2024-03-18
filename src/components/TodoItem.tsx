import { FC } from 'react';
import { Task } from './TodoList';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  task: Task;
  onToggleComplete: (id: number) => void;
  onStartEditing: (task: Task) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  onEditChange: (newTask: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  editingTaskText: string;
};

const TodoItem: FC<TodoItemProps> = ({ task, onToggleComplete, onStartEditing, onDelete, isEditing, onEditChange, onSaveEdit, onCancelEdit, editingTaskText }) => {

  if (isEditing) {
    return (
      <div className={styles.taskEditing}>
        <input type="text" value={editingTaskText} onChange={(e) => onEditChange(e.target.value)} className={styles.taskInput} />
        <button onClick={onSaveEdit} className={styles.editBtn}>Save</button>
        <button onClick={onCancelEdit} className={styles.deleteBtn}>Cancel</button>
      </div>
    );
  }

  return (
    <li className={styles.taskItem}>
      <div className={styles.taskContent}>
        <label className={styles.customCheckbox}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxControl}></span>
          {task.completed && <span className={styles.checkboxCheckmark}></span>}
        </label>
        <span className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>
          {task.task}
        </span>
      </div>
      <div className={styles.taskActions}>
        <button onClick={() => onStartEditing(task)} className={styles.editBtn}>Edit</button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>Delete</button>
      </div>
    </li>
  );
};
export default TodoItem;
