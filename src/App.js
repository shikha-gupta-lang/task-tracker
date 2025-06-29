import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import confetti from 'canvas-confetti';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText, dueDate) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // 🎉 Trigger confetti when all tasks are completed
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(t => t.completed)) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [tasks]);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>Task Tracker</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginBottom: '20px',
          background: darkMode ? '#f0f0f0' : '#111',
          color: darkMode ? '#111' : '#f0f0f0',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          float: 'right',
          cursor: 'pointer'
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <AddTaskForm onAdd={addTask} />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', borderRadius: '8px' }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* Progress bar */}
      <div style={{
        height: '12px',
        background: '#e0e0e0',
        borderRadius: '6px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: '#28a745',
          transition: 'width 0.5s ease'
        }}></div>
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      <p>✅ Completed: {completedCount} / {tasks.length}</p>

      {tasks.length > 0 && tasks.every(t => t.completed) && (
        <p style={{ color: 'green', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
          🎉 All tasks completed — great job!
        </p>
      )}
    </div>
  );
}

export default App;
