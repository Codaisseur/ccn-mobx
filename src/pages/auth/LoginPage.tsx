// src/pages/auth/LoginPage.tsx
import React from "react";

import { Typography, Container } from "@material-ui/core";

export default function LoginPage() {
  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Log In
      </Typography>
      <p>Welcome!</p>
    </Container>
  );
}
