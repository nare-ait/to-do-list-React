import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    // Initialize state with the values from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    return savedTodos || [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEditTodo = () => {
    if (inputValue.trim() === '') return;

    let updatedTodos;

    if (editIndex !== null) {
      updatedTodos = todos.map((todo, index) =>
        index === editIndex ? inputValue.trim() : todo
      );
      setEditIndex(null);
    } else {
      updatedTodos = [...todos, inputValue.trim()];
    }

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setInputValue('');  
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAddOrEditTodo}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
