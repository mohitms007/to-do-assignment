import React from "react";
import { Card, Grid, Icon, Image, List, Checkbox, Container } from "semantic-ui-react";

const ToDoItem = ({ item }) => {
  return (
    <div className="to-do-container">
      <Grid.Column>
        <Container>
          <Grid.Row centered>
            <List fluid relaxed animated>
              <List.Item className="to-do-content-conatiner">
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                />
                <List.Content className="to-do-content">
                  <List.Header as="a">Daniel Louise</List.Header>
                  <List.Description>
                    Last seen watching{" "}
                    <a>
                      <b>Arrested Development</b>
                    </a>{" "}
                    just now.
                  </List.Description>
                </List.Content>
                <span style={{ marginLeft: "25px" }}>
                  <Checkbox />
                </span>
              </List.Item>
            </List>
          </Grid.Row>
        </Container>
      </Grid.Column>
    </div>
  );
};

export default ToDoItem;
