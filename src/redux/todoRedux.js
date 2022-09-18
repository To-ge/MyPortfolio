import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    total: 0,
  },
  reducers: {
    addTodo: (state, action) => {
      state.total += 1;
      state.todos.push(...action.payload);
    },
    getTodo: (state, action) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos.splice(
        state.todos.findIndex((todo) => todo._id === action.payload),
        1
      );
    },
    updateTodo: (state, action) => {
      state.todos[
        state.todos.findIndex((todo) => todo._id === action.payload.id)
      ] = action.payload.todo;
    },
  },
});

export const { addTodo, getTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
