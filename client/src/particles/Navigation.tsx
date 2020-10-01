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
          try {
            setError(err.response.data);
          } catch (serverError) {
            console.log("catch", serverError);
            setError("Server error!");
          }
        });
    };

    fetchData();
  }, []);

  return [{ data, error }];
};

export const Navigation: FunctionComponent = () => {
  const [active, setActive] = useState("");
  const [{ data, error }] = GetBoardData();

  interface MenuItem {
    id: number;
    name: string;
  }

  const menuItems: MenuItem[] = [
    {
      id: 0,
      name: "Home",
    },
    {
      id: 1,
      name: "Feed",
    },
    {
      id: 2,
      name: "Register",
    },
    {
      id: 3,
      name: "Login",
    },
  ];

  return (
    <Menu stackable>
      <Menu.Item>
        <img src={logo} alt="Application logo"/>
      </Menu.Item>

      <Dropdown item simple text="Boards">
        <Dropdown.Menu>
          {error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )}
          {data &&
            data.boards.map((item: { id: number; category: string }) => (
              <Dropdown.Item as={Link} to={{ pathname: `/boards/${item.id}` }}>
                {item.category}
              </Dropdown.Item>
            ))}
          <Dropdown.Item>Add new</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {menuItems.map((item: MenuItem) => (
        <Menu.Item
          key={item.id}
          as={Link}
          name={item.name}
          active={active === item.name}
          onClick={() => setActive(item.name)}
          to={item.name.toLowerCase()}
        >
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};
