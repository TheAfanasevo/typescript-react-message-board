import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import { Loader, Dimmer, Message } from "semantic-ui-react";
import { UserContext } from "./contexts/UserContext";

const GetUserData = () => {
  const [data, setData] = useState({ users: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await Axios.get("http://localhost:3040/users")
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          try {
            setError(err.response.data);
          } catch (serverError) {
            setError("Server error!");
          }
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return [{ data, loading, error }];
};

const App: FunctionComponent<{}> = () => {
  const [{ data, loading, error }] = GetUserData();
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the <code>react-app</code>.
        </p>
        <a
          className="App-link"
          href="https://github.com/theafanasevo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creator
        </a>

        <div>
          {user}
        </div>
        {error && (
          <Message negative>
            <Message.Header>
              You are not allowed to view this page!
            </Message.Header>
            <p>{error}</p>
          </Message>
        )}

        {loading ? (
          <Dimmer active>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        ) : (
          <ul>
            {data.users.map((item: { id: number; username: string }) => (
              <li key={item.id}>{item.username}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;
