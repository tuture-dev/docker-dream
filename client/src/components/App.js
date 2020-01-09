import React, { useEffect } from "react";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import axios from "axios";

import { API_URL } from "../utils";
import { setTodos } from "../stores/todo";

const App = () => {
  useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await axios.get(`${API_URL}/todos`);
        setTodos(data);
      } catch (err) {
        console.log("getTodos ERR:", err);
      }
    }

    getTodos();
  });

  return (
    <div>
      <Header />
      <MainSection />
    </div>
  );
};

export default App;
