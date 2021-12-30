import React, { useState } from "react";
import {
  Grid,
  Image,
  List,
  Checkbox,
  Container,
  Modal,
  Transition,
  Segment,
  Divider,
} from "semantic-ui-react";

import { useDispatch } from "react-redux";
import {
  setCheck,
  saveCompletedToDo,
} from "../features/toDoSlice";
import axios from "axios";

const ToDoItem = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemChecked, setIsItemChecked] = useState(false);
  const dispatch = useDispatch();

  const handleCheck = async () => {


    try {
      await axios.patch(`http://localhost:1337/todos/${props.item.id}`, {...props.item, status: true})
      console.log(props.item)
      setIsItemChecked(!isItemChecked);
      dispatch(setCheck(props.item.id));
      dispatch(saveCompletedToDo(props.item));
    }catch(e) {
      console.log(e)
    }
  
    
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {title, description} = props.item 

  return (
    <div {...props}>
      <Grid.Column className="to-do-container">
        <Container>
          <Grid.Row centered>
            <List relaxed animated className="to-do-list">
              <List.Item className="to-do-content-conatiner">
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                />
                <List.Content
                  onClick={handleToggleModal}
                  className="to-do-content"
                >
                  <List.Header as="a">{title}</List.Header>
                  <List.Description>
                    {!description ? "Click here to add description" : description}
                  </List.Description>
                </List.Content>
                <span style={{ margin: "50px" }}>
                  <Checkbox checked={isItemChecked} onClick={handleCheck} />
                </span>
              </List.Item>
            </List>
          </Grid.Row>
        </Container>
        <Modal
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
          open={isModalOpen}
          header="Reminder!"
          content="Call Benjamin regarding the reports."
          actions={[
            {
              key: "Snooze",
              content: "Cancel",
              onClick: () => setIsModalOpen(false),
            },
            {
              key: "done",
              content: "Done",
              positive: true,
              onClick: () => setIsModalOpen(false),
            },
          ]}
        />
      </Grid.Column>
      <Divider />
    </div>
  );
};

export default ToDoItem;
