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
  Form,
  Icon,
  Button,
} from "semantic-ui-react";

import { useDispatch } from "react-redux";
import {
  setCheck,
  saveCompletedToDo,
  updateToDo,
  deleteToDo,
} from "../features/toDoSlice";
import axios from "axios";

const ToDoItem = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [isFormItemChecked, setIsFormItemChecked] = useState(0);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleCheck = async () => {
    try {
      await axios.patch(`http://localhost:1337/todos/${props.item.id}`, {
        ...props.item,
        status: true,
      });
      console.log(props.item);
      setIsItemChecked(!isItemChecked);
      dispatch(setCheck(props.item.id));
      dispatch(saveCompletedToDo(props.item));
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormCheck = () => {
    setIsFormItemChecked(!isFormItemChecked);
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateToDoItem = async (e) => {
    e.preventDefault();
    const formValues = Object.fromEntries(new FormData(e.target));
    console.log(formValues);
    const { title, description, status } = formValues;
    try {
      const updatedObj = await axios.patch(
        `http://localhost:1337/todos/${props.item.id}`,
        {
          title,
          description,
          status: status === "true",
          userId: user.id,
          boardId: props.item.boardId,
        }
      );

      if (status == "true") {
        dispatch(setCheck(props.item.id));
        dispatch(saveCompletedToDo(updatedObj.data));
      } else {
        dispatch(updateToDo(updatedObj.data));
      }
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
    setIsModalOpen(false);
  };

  const onDelete = async () => {
    await axios.delete(`http://localhost:1337/todos/${props.item.id}`);
    dispatch(deleteToDo(props.item.id));
  };

  const { title, description } = props.item;

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
                    {!description
                      ? "Click here to add description"
                      : description}
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
          size="small"
        >
          <Modal.Header>Edit To Do Item</Modal.Header>
          <Modal.Content>
            <Form onSubmit={updateToDoItem}>
              <Form.Field>
                <label>Title</label>
                <input
                  name="title"
                  defaultValue={props.item.title}
                  placeholder="Put a suitable title"
                />
              </Form.Field>
              <Form.TextArea
                name="description"
                defaultValue={props.item.description}
                label="About"
                placeholder="description"
              />
              <Form.Field>
                <Checkbox
                  name="status"
                  value={isFormItemChecked}
                  onChange={handleFormCheck}
                  label="Completion Status of the Todo Item"
                />
              </Form.Field>
              <div style={{ float: "right", margin: "15px" }}>
                <Button
                  type="button"
                  onClick={onDelete}
                  negative
                  icon="delete"
                  labelPosition="right"
                >
                  Delete <Icon name="delete" />
                </Button>
                <Button
                  positive
                  icon="save"
                  type="submit"
                  labelPosition="right"
                >
                  Save and Exit <Icon name="save" />
                </Button>
              </div>

              {/* <Button type="submit">Submit</Button> */}
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
      <Divider />
    </div>
  );
};

export default ToDoItem;
