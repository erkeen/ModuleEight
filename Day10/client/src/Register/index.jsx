import React, { useState } from "react";
import "./style.css";
import { Form, Button, Row } from "react-bootstrap";
import axios from "../axios";
import { useHistory } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // useEffect(() => {});

  const register = (e) => {
    e.preventDefault();
    axios.post("/users/register", { name, surname, email, password });
    history.push("/login");
  };

  return (
    <Row className="register">
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="surname">
          <Form.Label>surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

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

        <Button variant="primary" type="submit" onClick={register}>
          Register
        </Button>
      </Form>
    </Row>
  );
}

export default Register;
