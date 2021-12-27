// import React from 'react'
// import { Input } from 'semantic-ui-react'

// export default function ToDoList() {
//   return (
//     <div>
//       {/* To Do List */}

//       <Input focus placeholder='Search...' />

//     </div>
//   )
// }
import { useState } from "react";
import {
  Grid,
  Segment,
  Header,
  Form,
  Dropdown,
  Container,
  Button,
  List,
  Transition,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { saveToDo } from "../features/toDoSlice";
import ToDoItem from "./ToDoItem";

import { useSelector } from "react-redux";
import { getToDoList } from "../features/toDoSlice";

const ToDoList = () => {
  const [toDoEvent, setToDoEvent] = useState("");
  const dispatch = useDispatch();
  const [visible,setVisible] = useState(false)

  const toDoList = useSelector(getToDoList);

  const addToDo = () => {
    dispatch(saveToDo({ item: toDoEvent, done: false, id: Date.now() }));
    setToDoEvent("");
  };

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
          {/* <Transition.Group animation={"fly right"} duration={600}>
            
              {visible && (<div> thuasFjdanfjkdnfkdanjkfdna kdnkfndskfnsdkafndksfjd</div> )}
              <Button
            content={visible ? 'Unmount' : 'Mount'}
            onClick={() => setVisible(!visible)}
          />
          </Transition.Group> */}
        </Grid.Column>
              <Grid.Column width={16}>
                <Header as="h3">Pilot Details</Header>
                <Container>
                  <Grid.Row centered style={{ margin: "8px", padding: "8px" }}>
                    <Transition.Group
                    as={List}
                    duration={500}
                    divided
                    size='small'
                    verticalAlign='middle'
                    >
                      {toDoList &&
                        toDoList.map((item) => <ToDoItem key={item.id} item={item} />)}
                    </Transition.Group>
                  </Grid.Row>
                </Container>
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Column>

        <Grid.Column width={6}>
          <Header as="h3">Pilot Details</Header>
          <Segment></Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ToDoList;
