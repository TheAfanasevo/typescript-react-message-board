import Axios from "axios";
import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useForm } from "react-hook-form";
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

export const Register: FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [success, setSuccess] = useState("");
  const { register, handleSubmit, setValue, errors, setError } = useForm();

  useEffect(() => {
    register("email", { required: true });
    register("username", { required: true });
    register("password", { required: true });
    register("name", { required: true });
    register("age", { required: true });
  }, [register]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    await Axios.post("http://localhost:3040/users/register", data)
      .then((response) => {
        setSuccess(response.statusText);
        history.push("/login")
      })
      .catch((err) => {
        try {
          setError("validation", { message: err.response.data });
        } catch (serverError) {
          setError("server", {
            message: "Server failed to handle the registration!",
          });
        }
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} alt="Application logo" /> Sign up to see more!
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="user outline"
              iconPosition="left"
              placeholder="Fullname"
              name="name"
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="birthday"
              iconPosition="left"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            {errors.validation && (
              <Message negative>
                <Message.Header>Registration failed!</Message.Header>
                <p>{errors.validation.message}</p>
              </Message>
            )}
            {errors.server && (
              <Message negative>
                <Message.Header>Registration failed!</Message.Header>
                <p>{errors.server.message}</p>
              </Message>
            )}
            {success && (
              <Message positive>
                <Message.Header>You are registered!</Message.Header>
                <p>{success}</p>
              </Message>
            )}
            <Button fluid color="teal" size="large" type="submit">
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
