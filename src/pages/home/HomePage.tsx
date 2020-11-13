// src/pages/home/HomePage.tsx
import { observer } from "mobx-react-lite";
import { trace } from 'mobx'
import React, { useContext } from "react";

import { Typography, Container, Grid, Card, CardContent } from "@material-ui/core";
import { RootStoreContext } from "../../stores/RootStore";

export default observer(() => {
  const { blogPostStore } = useContext(RootStoreContext);

  trace()

  return (
    <Container fixed>
      <Typography variant="h3" component="h1">
        Codaisseur Coders Network
      </Typography>
      {blogPostStore.isLoading && <p>Loading...</p>}
      {!blogPostStore.isLoading && (
        <Grid container spacing={3}>
          {blogPostStore.blogPosts.map((post) => {
            return (
              <Grid key={post.id} item xs={4}>
                <Card>
                  <CardContent
                    style={{ maxHeight: "15rem", overflow: "hidden" }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
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
