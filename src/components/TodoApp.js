import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    const taskParts = newTask.trim().split(" ");
    const count = parseInt(taskParts.pop(), 10);
    const taskName = taskParts.join(" ");

    if (!isNaN(count) && taskName) {
      const newTasks = Array(count).fill({ name: taskName, updates: 0 });
      setTasks([...tasks, ...newTasks]);
    } else if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, updates: 0 }]);
    }
    setNewTask("");
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].name);
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex
        ? { ...task, name: editText, updates: task.updates + 1 }
        : task
    );
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditText("");
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Day Goals!</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
            e.preventDefault(); 
          }
        }}
        placeholder="Enter a task"
        className="add-task-input"
      />
      <button onClick={handleAddTask} className="add-task-button">
        Add Todo
      </button>
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          {editIndex === index ? (
            <input
              type="text"
              className="edit-task-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span>
              {task.name} (Updated {task.updates} Times)
            </span>
          )}
          {editIndex === index ? (
            <>
              <button onClick={handleUpdate} className="update-button">
                Update
              </button>
              <button onClick={cancelEdit} className="cancel-button">
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="btns">
                <button
                  onClick={() => handleEdit(index)}
                  className="edit-button"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="delete-button"
                >
                  ❌
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
