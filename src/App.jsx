import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex].text = task;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask('');
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="app">
      <h2>📝 My To-Do List</h2>
      <div className="input-container">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={handleAddOrUpdate}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i} className="task-item">
            <span
              className={t.completed ? 'completed' : ''}
              onClick={() => toggleComplete(i)}
            >
              {t.text}
            </span>
            <div className="actions">
              <button onClick={() => handleEdit(i)}>✏️</button>
              <button onClick={() => handleDelete(i)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
