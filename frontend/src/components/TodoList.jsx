// src/components/TodoList.jsx
import React from "react";

const TodoList = ({ todos, onDelete }) => {
  return (
    <ul style={styles.list}>
      {todos.map((todo) => (
        <li key={todo._id} style={styles.item}>
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo._id)} style={styles.delete}>
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  delete: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TodoList;
