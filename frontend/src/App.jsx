// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Failed to fetch todos:", err));
  }, []);

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error("Failed to delete todo:", err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>MERN To-Do App</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
};

export default App;
