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
  Card,
  Image,
  Icon,
} from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { saveToDo } from "../features/toDoSlice";
import ToDoItem from "./ToDoItem";

const TODOS = [
  { name: "Grociers", id: 6954261 },
  { name: "Assignmnet", id: 6954262 },
  { name: "Major WOrk", id: 6954263 },
  { name: "Hello", id: 6954264 },
];

const ToDoList = () => {
  const [toDoEvent, setToDoEvent] = useState("");
  const dispatch = useDispatch();

  const addToDo = () => {
    console.log("TODO");
    console.log(toDoEvent);
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

              <Grid.Column width={16}>
                <Header as="h3">Pilot Details</Header>
                <Container>
                  <Grid.Row centered style={{margin: '10px', padding: '10px'}}>
                    {TODOS.map((item) => <ToDoItem item={item} />)}
                  </Grid.Row>
                </Container>
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Column>

        <Grid.Column width={6}>
          <Header as="h3">Pilot Details</Header>
          <Segment>
            {/* <Form size="large">
              <Form.Field name="name" width={16}>
                <label>Name</label>
                <input placeholder="Name" value="Natasha Kerensky" />
              </Form.Field>
              <Form.Field name="rank" width={16}>
                <label>Rank</label>
                <Dropdown fluid selection options={RANKS} value="Colonel" />
              </Form.Field>
              <Form.Field name="age" width={6}>
                <label>Age</label>
                <input placeholder="Age" value="52" />
              </Form.Field>
              <Form.Field name="gunnery" width={6}>
                <label>Gunnery</label>
                <input value="2" />
              </Form.Field>
              <Form.Field name="piloting" width={6}>
                <label>Piloting</label>
                <input value="3" />
              </Form.Field>
              <Form.Field name="mech" width={16}>
                <label>Mech</label>
                <Dropdown fluid selection options={MECHS} value="WHM-6R" />
              </Form.Field>
            </Form> */}
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default ToDoList;
