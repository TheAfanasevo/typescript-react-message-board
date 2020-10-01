import Axios from "axios";
import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { UserContext } from "../contexts/UserContext";
import logo from "../logo.svg";

export const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, setValue, errors, setError } = useForm();

  useEffect(() => {
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    Axios.defaults.withCredentials = true;
    await Axios.post("http://localhost:3040/users/login", data)
      .then((response) => {
        const { username, accesstoken } = response.data;
        setUser({ username, accesstoken });
        setLoading(false);
        setSuccess(response.statusText);
      })
      .catch((err) => {
        setLoading(false);
        try {
          setError("validation", { message: err.response.data });
        } catch (serverError) {
          setError("server", {
            message: "Server failed to handle the login!",
          });
        }
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
  };

  console.log("user::", user);
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} /> Log-in to your account
        </Header>
        {success ? (
          <Message positive>
            <Message.Header>You are logged in!</Message.Header>
            <p>{success}</p>
            <p>
              Click <Link to="/">here</Link> to continue!
            </p>
          </Message>
        ) : (
          <Form size="large" onSubmit={handleSubmit(onSubmit)}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
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
              <Button fluid color="teal" size="large">
                Login
              </Button>
            </Segment>
          </Form>
        )}
        {errors.validation && (
          <Message negative>
            <Message.Header>Login failed!</Message.Header>
            <p>{errors.validation.message}</p>
          </Message>
        )}
        {errors.server && (
          <Message negative>
            <Message.Header>Login failed!</Message.Header>
            <p>{errors.server.message}</p>
          </Message>
        )}
        <Message>
          New to us?
          <a href="http://localhost:3000/register"> Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
