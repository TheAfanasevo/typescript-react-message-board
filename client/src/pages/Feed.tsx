import Axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Header,
  Comment,
  Form,
  Button,
  Container,
  Segment,
  Dimmer,
  Loader,
  Image,
  Message,
} from "semantic-ui-react";
import logo from "../logo.svg";

interface BoardProps {
  id: number;
  category: string;
}

const GetPostData = ({ id, category }: BoardProps) => {
  const [data, setData] = useState({ posts: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Axios.get(`http://localhost:3040/boards/${id}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          try {
            setError(err.response.data);
          } catch(serverError) {
            setError("Server error!");
          }

          setLoading(false);
        });
    };

    fetchData();
  }, [id]);

  return [{ data, loading, error }];
};

export const Feed: FunctionComponent<BoardProps> = ({
  id,
  category,
  children,
}) => {
  const [{ data, loading, error }] = GetPostData({ id, category });

  return (
    <Container text>
      <Comment.Group>
        <Header as="h3" dividing>
          Messages about {category}...
        </Header>

        {error && (
          <Message negative>
            <Message.Header>
              Ooops!
            </Message.Header>
            <p>{error}</p>
          </Message>
        )}

        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="huge">Loading</Loader>
            </Dimmer>

            <Image src="/images/wireframe/paragraph.png" />
          </Segment>
        ) : (
          data.posts.map(
            (item: { id: number; category: string; posts: object[] }) => (
              <Comment>
                <Comment.Avatar src={logo} />
                <Comment.Content>
                  <Comment.Author as="a">Matt</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>How artistic!</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            )
          )
        )}

        <Form reply>
          <Form.TextArea placeholder="Write here..." />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </Container>
  );
};
