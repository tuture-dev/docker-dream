import React, { useState } from "react";
import classnames from "classnames";
import axios from "axios";

import TodoTextInput from "./TodoTextInput";
import { editTodo, deleteTodo, completeTodo } from "../stores/todo";
import { API_URL } from "../utils";

export default function TodoItem(props) {
  const [editing, setEditing] = useState(false);
  const { todo } = props;

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = async (id, text) => {
    if (text.length === 0) {
      await axios.delete(`${API_URL}/todos/${id}`);
      deleteTodo(id);
    } else {
      await axios.put(`${API_URL}/todos/${id}`, { text });
      editTodo(id, text);
    }

    setEditing(false);
  };

  async function deleteTodoRequest(todoId) {
    try {
      await axios.delete(`${API_URL}/todos/${todoId}`);
      deleteTodo(todoId);
    } catch (err) {
      console.log("deleteTodoRequest ERR: ", err);
    }
  }

  async function completeTodoRequest(todoId) {
    try {
      await axios.put(`${API_URL}/todos/${todoId}`, {
        completed: !todo.completed
      });

      completeTodo(todoId);
    } catch (err) {
      console.log("completedTodoRequest ERR: ", err);
    }
  }

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={text => handleSave(todo._id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodoRequest(todo._id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => deleteTodoRequest(todo._id)}
        />
      </div>
    );
  }

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing
      })}
    >
      {element}
    </li>
  );
}
