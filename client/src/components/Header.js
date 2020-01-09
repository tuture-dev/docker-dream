import React from "react";
import axios from "axios";

import TodoTextInput from "./TodoTextInput";

import { addTodo } from "../stores/todo";
import { API_URL } from "../utils";

const Header = () => {
  async function addTodoRequest(text) {
    try {
      const { data } = await axios.post(`${API_URL}/todos`, {
        text
      });

      addTodo(data);
    } catch (err) {
      console.log("addTodo ERR", err);
    }
  }

  return (
    <header className="header">
      <h1>Dreams</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            addTodoRequest(text);
          }
        }}
        placeholder="你有什么梦想？"
      />
    </header>
  );
};

export default Header;
