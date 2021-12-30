import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todoList: [],
  completedToDo: [],
  boards:[]
}

const toDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    saveToDo: (state, action) => {
      state.todoList.push(action.payload)
    },

    setToDos: (state,action) => {
      state.todoList = action.payload
    },

    setCheck: (state,action) => {   
      return {...state, todoList: state.todoList.filter(item => action.payload !== item.id)}
    },
    
    saveCompletedToDo: (state,action) => {
      state.completedToDo.push({...action.payload, done:true})
    },

    saveCompletedTodos: (state, action) => {
      state.completedToDo = action.payload
    },

    deleteCompletedToDo: (state,action) => {
      return {...state, completedToDo: state.completedToDo.filter(item => action.payload !== item.status)}
    },

    saveBoards: (state, action) => {
      state.boards = action.payload
    },

    addBoard: (state,action) => {
      state.boards.push(action.payload)
    }
  }
});

export const getToDoList = state => state.todos.todoList
export const getCompletedToDo = state => state.todos.completedToDo
export const getBoards = state => state.todos.boards

export const {
  saveToDo,
  setToDos,
  saveCompletedTodos,
  setCheck,
  saveCompletedToDo,
  deleteCompletedToDo,
  saveBoards,
  addBoard
} = toDoSlice.actions
export default toDoSlice.reducer