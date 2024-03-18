import { FC } from 'react';
import { Task } from './TodoList';
import TodoItem from './TodoItem';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onStartEditing: (task: Task) => void;
  onDelete: (id: number) => void;
  editingTaskId: number | null;
  setEditingTaskText: (newTask: string) => void;
  saveEditedTask: () => void;
  cancelEditingTask: () => void;
  editingTaskText: string;
};

const TaskList: FC<TaskListProps> = ({ tasks, onToggleComplete, onStartEditing, onDelete, editingTaskId, setEditingTaskText, saveEditedTask, cancelEditingTask, editingTaskText }) => {
  return (
    <ul style={{ height: "500px", overflow: "auto" }}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onStartEditing={() => onStartEditing(task)}
          onDelete={onDelete}
          isEditing={task.id === editingTaskId}
          onEditChange={setEditingTaskText}
          onSaveEdit={saveEditedTask}
          onCancelEdit={cancelEditingTask}
          editingTaskText={editingTaskText}
        />
      ))}
    </ul>
  );
};

export default TaskList;
