import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todoList: [],
  completedToDo: []
}

const toDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    saveToDo: (state, action) => {
      state.todoList.push(action.payload)
    },

    setCheck: (state,action) => {   
      return {...state, todoList: state.todoList.filter(item => action.payload !== item.id)}
    },
    
  saveCompletedToDo: (state,action) => {
      state.completedToDo.push({...action.payload, done:true})
    }
  }
});

export const getToDoList = state => state.todos.todoList
export const getCompletedToDo = state => state.todos.completedToDo

export const {
  saveToDo,
  setCheck,
  saveCompletedToDo,
} = toDoSlice.actions
export default toDoSlice.reducer