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

    updateToDo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map(item => {
          if(item.id === action.payload.id){
            item = action.payload
            return item
          }else{
            return item
          }
        })
      }
    },
    
    deleteToDo: (state,action) => {
      return {...state, todoList: state.todoList.filter(item => action.payload !== item.id)}
    },
    saveCompletedToDo: (state,action) => {
      state.completedToDo.push({...action.payload, done:true})
    },

    saveCompletedTodos: (state, action) => {
      state.completedToDo = action.payload
    },

    deleteCompletedToDo: (state,action) => {
      return {...state, completedToDo: state.completedToDo.filter(item => action.payload !== item.id)}
    },

    updateCompletedToDo: (state,action) => {
      return {
        ...state,
        completedToDo: state.completedToDo.map(item => {
          if(item.id === action.payload.id){
            item = action.payload
            return item
          }else{
            return item
          }
        })
      }
    },

    saveBoards: (state, action) => {
      state.boards = action.payload
    },

    addBoard: (state,action) => {
      state.boards.push({...action.payload, todos: []})
    },

    deleteBoard: (state,action) => {
      return {...state, boards: state.boards.filter(item => action.payload !== item.id)}
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
  updateToDo,
  saveCompletedToDo,
  deleteCompletedToDo,
  updateCompletedToDo,
  saveBoards,
  addBoard,
  deleteToDo,
  deleteBoard
} = toDoSlice.actions
export default toDoSlice.reducer