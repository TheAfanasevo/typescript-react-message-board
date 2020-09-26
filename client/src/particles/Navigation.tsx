import React, { FunctionComponent, useEffect, useState } from "react";
import { Menu, Dropdown, Message } from "semantic-ui-react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import Axios from "axios";

const GetBoardData = () => {
  const [data, setData] = useState({ boards: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get("http://localhost:3040/boards")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    };

    fetchData();
  }, []);

  return [{ data, error }];
};

export const Navigation: FunctionComponent = () => {
  const [active, setActive] = useState("");
  const [{ data, error }] = GetBoardData();

  return (
    <Menu stackable>
      <Menu.Item>
        <img src={logo} />
      </Menu.Item>

      <Dropdown item simple text="Boards">
        <Dropdown.Menu>
          {data && data.boards.map((item: { id: number; category: string }) => (
            <Dropdown.Item as={Link} to={{ pathname: `/boards/${item.id}` }}>
              {item.category}
            </Dropdown.Item>
          ))}
          <Dropdown.Item>Add new</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Item
        as={Link}
        name="home"
        active={active === "home"}
        onClick={() => setActive("home")}
        to="/"
      >
        Home
      </Menu.Item>

      <Menu.Item
        as={Link}
        name="register"
        active={active === "register"}
        onClick={() => setActive("register")}
        to="/register"
      >
        Register
      </Menu.Item>

      <Menu.Item
        as={Link}
        name="sign-in"
        active={active === "sign-in"}
        onClick={() => setActive("sign-in")}
        to="/login"
      >
        Sign-in
      </Menu.Item>
    </Menu>
  );
};
