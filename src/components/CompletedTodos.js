import React, { useEffect, useState } from "react";
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
  Button,
  Header,
  Icon,
  Form,
} from "semantic-ui-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCheck,
  saveCompletedToDo,
  deleteCompletedToDo,
  saveToDo,
  updateCompletedToDo,
} from "../features/toDoSlice";

const CompletedTodos = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const updateToDo = async (e) => {
    e.preventDefault();

    const formValues = Object.fromEntries(new FormData(e.target));
    const { title, description, status } = formValues;
    try {
      const updatedObj = await axios.patch(
        `http://localhost:1337/todos/${props.item.id}`,
        {
          title,
          description,
          status: status === "1",
          userId: user.id,
          boardId: props.item.boardId,
        }
      );

      if (!status) {
        dispatch(deleteCompletedToDo(props.item.id));
        dispatch(saveToDo(updatedObj.data));
      } else {
        dispatch(updateCompletedToDo(updatedObj.data));
      }
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
    setIsModalOpen(false);
  };

  const onDelete = async () => {
    await axios.delete(`http://localhost:1337/todos/${props.item.id}`);
    dispatch(deleteCompletedToDo(props.item.id));
  };

  const { title, description, status } = props.item;
  return (
    <div {...props}>
      <Grid.Column className="completed-to-do-container">
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
                  <List.Header as="a">
                    <h5>{title}</h5>
                  </List.Header>
                  <List.Description>
                    <p>
                      {!description
                        ? "Click here to add description"
                        : description}
                    </p>
                  </List.Description>
                </List.Content>
                {/* <span style={{ margin: "10px" }}>
                  <Checkbox checked={isItemChecked} onClick={handleCheck} />
                </span> */}
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
            <Form onSubmit={updateToDo}>
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
                  defaultChecked
                  value={1}
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

export default CompletedTodos;
