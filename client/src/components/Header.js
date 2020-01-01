import React from "react";
import TodoTextInput from "./TodoTextInput";

import { addTodo } from "../stores/todo";

const Header = () => (
  <header className="header">
    <h1>Dreams</h1>
    <TodoTextInput
      newTodo
      onSave={text => {
        if (text.length !== 0) {
          addTodo(text);
        }
      }}
      placeholder="你有什么梦想？"
    />
  </header>
);

export default Header;
