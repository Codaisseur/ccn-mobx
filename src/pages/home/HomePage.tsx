// src/pages/home/HomePage.tsx
import { observer } from "mobx-react-lite";
import { trace } from 'mobx'
import React, { useContext } from "react";

import { Typography, Container, Grid, Card, CardContent } from "@material-ui/core";
import { RootStoreContext } from "../../stores/RootStore";

export default observer(() => {
  const { blogPostStore, uiStore: { theme } } = useContext(RootStoreContext);

  trace()

  return (
    <Container fixed>
      <Typography
        variant="h3"
        component="h1"
        style={{ color: theme.colors.textColor }}
      >
        Codaisseur Coders Network
      </Typography>
      {blogPostStore.isLoading && <p>Loading...</p>}
      {!blogPostStore.isLoading && (
        <Grid container spacing={3}>
          {blogPostStore.blogPosts.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card
                  style={{ backgroundColor: theme.colors.cardBackgroundColor }}
                >
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ color: theme.colors.textColor }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{
                        color: theme.colors.textColor,
                        maxHeight: "10rem",
                        overflow: "hidden",
                      }}
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
});
