import { useEffect, useState } from "react";
import {
  Grid,
  Segment,
  Header,
  Form,
  Container,
  List,
  Transition,
  Divider,
  Message,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import {  getCompletedToDo, getToDoList, saveCompletedTodos, saveToDo, setToDos } from "../features/toDoSlice";
import ToDoItem from "./ToDoItem";


import CompletedTodos from "./CompletedTodos";
import axios from "axios";

const ToDoList = ({boardId, boards}) => {
  const [toDoEvent, setToDoEvent] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const toDoList = useSelector(getToDoList);
  const completedToDoList = useSelector(getCompletedToDo);

  const addToDo = async() => {
    try{
      const createdToDo = await axios.post('http://localhost:1337/todos', {title: toDoEvent, boardId, userId: user.id, description: '', status: false})
      dispatch(saveToDo(createdToDo.data));
    }catch(e) {
      console.log(e)
    }
   
    setToDoEvent("");
  };


  useEffect(() => {
    getTodosByBoard()
  }, [boardId, boards])


  const getTodosByBoard = async() => {
    
    const selectedBoard = await boards?.filter((board) => board.id === boardId)
    const completedToDoList = await selectedBoard[0]?.todos.filter((todo) => todo.status === true);
    const todosLeft = await selectedBoard[0]?.todos.filter((todo) => todo.status === false)
    dispatch(setToDos(todosLeft))
    dispatch(saveCompletedTodos(completedToDoList))
    
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={10}>
          <Header as="h4">Add a Task</Header>
          <Container className="form-container">
            <Grid>
              <Grid.Row centered>
                <Form className="form-input" onSubmit={addToDo}>
                  <Form.Input
                    icon={
                      <i
                        onClick={addToDo}
                        className="teal plus circle icon"
                      ></i>
                    }
                    value={toDoEvent}
                    onChange={(e) => setToDoEvent(e.target.value)}
                    placeholder="Add a to do event"
                  />
                </Form>
              </Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Divider horizontal/>
              <Grid.Column width={12}>
                
                <Container>
                  <Grid.Row
                    centered
                    style={{ margin: "0px auto", padding: "10px" }}
                  >
                    <Segment>
                    <Header as="h5" style={{backgroundColor: '#E4CDA7', padding: '4px 10px', borderRadius: '12px'}}>Pending Tasks</Header>
                      <Transition.Group
                        as={List}
                        duration={500}
                        divided
                        size="small"
                        verticalAlign="middle"
                      >
                        {toDoList?.length > 0 ? (
                          toDoList.map((item) => (
                           <ToDoItem key={item.id} item={item} />
                          ))
                        ) : (
                          // <Message icon="inbox">
                          //   <Message.Header>No Tasks Left</Message.Header>
                          //   <p>
                          //     Add tasks and they should show up here!
                          //   </p>
                          // </Message>
                          <Message
                          positive
                          header='Great! You have completed all your tasks.'
                          content="Add more and they will show up here!"
                        />
                        )}
                      </Transition.Group>
                    </Segment>
                  </Grid.Row>
                </Container>
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Column>
                         
        <Grid.Column width={6}>
         
          <Segment>
          <Header as="h5" style={{backgroundColor: '#B1E693', padding: '2px 8px', borderRadius: '12px'}} >Completed To Dos</Header>
                      <Transition.Group
                        as={List}
                        duration={500}
                        divided
                        size="small"
                        verticalAlign="middle"
                      >
                        {completedToDoList?.length > 0 ? (
                          completedToDoList.map((item) => (
                            <CompletedTodos key={item.id} item={item} />
                          ))
                        ) : (
                          // <Message icon="inbox">
                          //   <Message.Header>No Tasks Left</Message.Header>
                          //   <p>
                          //     Add tasks and they should show up here!
                          //   </p>
                          // </Message>
                          <Message
                          positive
                          header='Great! You have completed all your tasks.'
                          content="Add more and they will show up here!"
                        />
                        )}
                      </Transition.Group>
                    </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ToDoList;
