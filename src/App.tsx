import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Switch, Route, Link as RouterLink } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={RouterLink}
            to="/"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit" component={RouterLink} to="/signup">
            Signup
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "2rem" }} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}
