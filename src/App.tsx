import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./stores/RootStore";

export default observer(() => {
  const { uiStore: { theme } } = useContext(RootStoreContext);

  return (
    <Box pb={10} style={{ backgroundColor: theme.colors.backgroundColor }}>
      <NavBar />
      <div style={{ height: "2rem" }} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Box>
  );
});
