import React, {useState} from "react";
import { Container, Header, Menu } from "semantic-ui-react";
import ToDoList from "./ToDoList";

export default function Dashboard() {

  const [activeItem, setActiveItem] = useState("board_1");

  const handleItemClick = (e, { name }) => setActiveItem(name);


  return (
    <div className="App">
      <div className="app-header">
        <Header as="h1">To Do List</Header>
      </div>
      <Container>
        <Menu pointing secondary>
          <Menu.Item
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
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        <ToDoList />
      </Container>
    </div>
  );
}