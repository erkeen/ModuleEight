import React from "react";
import "./style.css";
import Register from "../Register";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login";
import Weather from "../Weather";
function App() {
  return (
    <Container className="app">
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Weather />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
