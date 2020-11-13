import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { Link as RouterLink } from "react-router-dom";

import { RootStoreContext } from "../stores/RootStore";

export default observer(() => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          backgroundColor: uiStore.theme.colors.toolbarBackgroundColor,
        }}
      >
        <IconButton
          component={RouterLink}
          to="/"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          onClick={uiStore.toggleDarkMode}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          {uiStore.darkMode ? <SunnyIcon /> : <NightsStayIcon />}
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <div style={{ flexGrow: 1 }} />
        <Button color="inherit" component={RouterLink} to="/signup">
          Signup
        </Button>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
});
