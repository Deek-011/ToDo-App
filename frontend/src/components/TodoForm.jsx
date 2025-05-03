import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      // Send POST request to backend to add a new todo
      const res = await axios.post("https://todo-app-54be.onrender.com/todos", { text });
      
      // Pass the new todo back to parent component
      onAdd(res.data);

      // Clear the input field after adding the todo
      setText("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        placeholder="Enter a new task"
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TodoForm;
