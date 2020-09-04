import React, { useState } from "react";
import "./style.css";
import { Form, Button, Row } from "react-bootstrap";
import axios from "../axios";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // const login = async (e) => {
  //   // const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   method: "POST",
  //   //   body: JSON.stringify({
  //   //     email: this.state.email,
  //   //     password: this.state.password,
  //   //   }),
  //   // });
  //   e.preventDefault();
  //   const response = axios.post("/users/login", { email, password });
  //   // .then((res) => res.json())
  //   // .then((res) => {
  //   //   localStorage.setItem("accessToken", res.token);
  //   //   localStorage.setItem("refreshToken", res.refreshToken);
  //   //   console.log("Done");
  //   // });

  //   if (response.ok) {
  //     const json = await response.json();
  //     localStorage.setItem("accessToken", json.token);
  //     localStorage.setItem("refreshToken", json.refreshToken);
  //     console.log("Done");
  //   }
  // };

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("accessToken", json.token);
      localStorage.setItem("refreshToken", json.refreshToken);
      history.push("/weather");
    }
  };

  // useEffect(() => {});

  // const register = (e) => {
  //   e.preventDefault();
  //   axios.post("/users/register", { email, password });
  // };

  return (
    <Row className="register">
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={login} value="login">
          Login
        </Button>
      </Form>
    </Row>
  );
}

export default Login;
