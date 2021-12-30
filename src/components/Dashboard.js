import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Menu,
} from "semantic-ui-react";
import {
  addBoard,
  getBoards,
  saveBoards,
  deleteBoard,
} from "../features/toDoSlice";
import ToDoList from "./ToDoList";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState(0);
  const [input, setInput] = useState(false);
  const [boardName, setBoardName] = useState("");

  const boards = useSelector(getBoards);

  const handleItemClick = (board) => setActiveItem(board.id);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const { id } = user;
    try {
      const fetchedBoards = await axios.get(
        `http://localhost:1337/boards/${id}`
      );

      if (fetchedBoards?.data?.length > 0) {
        setActiveItem(fetchedBoards.data[0].id);
      }

      dispatch(saveBoards(fetchedBoards.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddBoard = async (name) => {
    const { id } = user;

    try {
      const createdBoard = await axios.post(
        "http://localhost:1337/boards",
        {
          name,
          userId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setActiveItem(createdBoard?.data.id);
      dispatch(addBoard(createdBoard.data));
      setInput(false);
    } catch (e) {
      console.log(e);
    }
    setBoardName("");
  };

  const handleLogout = () => {
    setActiveItem("logout");
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteBoard = async(id) => {
  
    try{
      await axios.delete(`http://localhost:1337/boards/${id}`)
      dispatch(deleteBoard(id))
      console.log(boards[0].id)
      setActiveItem(boards[0].id || boards[1].id || boards[2].id || 0)
    }catch(e) {
      console.log(e)
    }

  }

  return (
    <div className="App">
      <div className="app-header">
        {/* <Header as="h1">To Do List</Header> */}
        <Image
          avatar
          style={{ width: "260px", height: "100px", objectFit: "cover" }}
          size={"medium"}
          src={
            "https://cdn.dribbble.com/users/45617/screenshots/7867139/media/b61183f8a0b2869a9258b5599b56cb50.png"
          }
        />
      </div>
      <Container>
        <Menu pointing secondary>
          {/* <Menu.Item
            name="board_1"
            active={activeItem === "board_1"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="board_2"
            active={activeItem === "board_2"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="board_3"
            active={activeItem === "board_3"}
            onClick={handleItemClick}
          /> */}
          {boards?.length > 0 ? (
            <>
              {boards.map((board) => {
                return (
                  <Menu.Item
                    // name={board.name}
                    key={board.id}
                    active={activeItem === board.id}
                    onClick={() => handleItemClick(board)}
                  >
                    <span style={{ marginRight: "15px" }}>{board.name}</span>{" "}
                    <Icon
                      onClick={() => handleDeleteBoard(board.id)}
                      name="delete"
                    />
                  </Menu.Item>
                );
              })}
            </>
          ) : (
            <Button
              animated
              style={{ borderRadius: 0 }}
              onClick={() => handleAddBoard("Home")}
            >
              <Button.Content visible>Add a Board</Button.Content>
              <Button.Content hidden>
                <Icon name="add" />
              </Button.Content>
            </Button>
          )}

          {input && (
            <Form.Input
              value={boardName || ""}
              onChange={(e) => setBoardName(e.target.value)}
              style={{ marginLeft: 35, width: 150, height: "auto" }}
              action={{
                content: "Add",
                onClick: () => handleAddBoard(boardName),
              }}
              placeholder="Add a Board..."
            />
          )}
          {!input && boards.length !== 0 && (
            <Button
              onClick={() => setInput(true)}
              style={{ borderRadius: 0 }}
              icon
            >
              <Icon className="small" name="add" />
            </Button>
          )}

          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleLogout}
            />
          </Menu.Menu>
        </Menu>
        {boards.length > 0 && <ToDoList boardId={activeItem} boards={boards} />}
      </Container>
    </div>
  );
}
