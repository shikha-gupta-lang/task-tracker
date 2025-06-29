import React from 'react';

function Task({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <span className="task-text" onClick={() => onToggle(task.id)}>
        {task.text}
        {task.dueDate && (
          <small style={{ display: 'block', fontSize: '12px', color: '#666' }}>
            Due: {task.dueDate}
          </small>
        )}
      </span>
      <button className="task-delete" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
