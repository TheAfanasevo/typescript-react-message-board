import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import logo from "../logo.svg";

export const Register: FunctionComponent<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} /> Sign up to see more!
        </Header>
        <Form size="large" onSubmit={(e) => {
          e.preventDefault();
          console.log(email, username, password);
        }}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already registered? <a href="http://localhost:3000/login">Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
