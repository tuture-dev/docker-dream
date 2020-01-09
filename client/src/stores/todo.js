import { Store } from "laco";

export const TodoStore = new Store(
  {
    todos: [],
    visibilityFilter: "All"
  },
  "TodoStore"
);

export const setTodos = newTodos =>
  TodoStore.set(
    ({ todos }) => ({
      todos: [...todos, ...newTodos]
    }),
    "Set todos"
  );

export const addTodo = todo =>
  TodoStore.set(
    ({ todos }) => ({
      todos: [...todos, todo]
    }),
    "Add todo"
  );

export const deleteTodo = _id =>
  TodoStore.set(
    ({ todos }) => ({
      todos: todos.filter(item => item._id !== _id)
    }),
    "Delete todo"
  );

export const editTodo = (_id, text) =>
  TodoStore.set(
    ({ todos }) => ({
      todos: todos.map(todo => (todo._id === _id ? { ...todo, text } : todo))
    }),
    "Edit todo"
  );

export const completeTodo = _id =>
  TodoStore.set(
    ({ todos }) => ({
      todos: todos.map(todo =>
        todo._id === _id ? { ...todo, completed: !todo.completed } : todo
      )
    }),
    "Complete todo"
  );

export const getTodosCount = () => TodoStore.get().todos.length;

export const getCompletedCount = todos =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

// Visibility filter stuff
export const setVisibilityFilter = type =>
  TodoStore.set(
    () => ({
      visibilityFilter: type
    }),
    "Set visibility"
  );

export const getFilteredTodos = visibilityFilter => {
  const todos = TodoStore.get().todos;
  switch (visibilityFilter) {
    case "All":
      return todos;
    case "Completed":
      return todos.filter(t => t.completed);
    case "Active":
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }
};
