import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
class LoginComponent extends React.Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    return (
      <Row className="register">
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              value={this.state.email}
              placeholder="email"
              onChange={(val) =>
                this.setState({ email: val.currentTarget.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={(val) =>
                this.setState({ password: val.currentTarget.value })
              }
            />
          </Form.Group>

          <Button ype="button" onClick={this.login} value="login">
            Login
          </Button>
        </Form>
      </Row>
    );
  }

  login = async () => {
    const history = useHistory();

    const res = await fetch(`http://localhost:3001/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("accessToken", json.token);
      localStorage.setItem("refreshToken", json.refreshToken);
      history.push("/weather");
    }
  };
}

export default LoginComponent;
