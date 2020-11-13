// src/store.ts
import {
  makeAutoObservable,
  runInAction,
} from 'mobx';
import { BlogPost } from '../lib/entities/BlogPost';
import { RootStore } from './RootStore';

export class BlogPostStore {
  rootStore!: RootStore;
  transportLayer: any;
  blogPosts: BlogPost[] = [];
  isLoading: boolean = true;

  constructor(transportLayer: any, rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.transportLayer = transportLayer;
    this.transportLayer.onReceiveBlogPostUpdate((updatedBlogPost: BlogPost) =>
      this.updateBlogPostFromServer(updatedBlogPost)
    );
    this.loadBlogPosts();
  }

  get postsCount() {
    return this.blogPosts.length;
  }

  // fetch all the blog posts from the server
  loadBlogPosts() {
    this.isLoading = true;
    this.transportLayer
      .fetchBlogPosts()
      .then((fetchedBlogPosts: BlogPost[]) => {
        runInAction(() => {
          fetchedBlogPosts.forEach((json) =>
            this.updateBlogPostFromServer(json)
          );
          this.isLoading = false;
        });
      });
  }

  // Update a BlogPost with information from the server. Guarantees a BlogPost only
  // exists once. Might either construct a new BlogPost, update an existing one,
  // or remove a BlogPost if it has been deleted on the server.
  updateBlogPostFromServer(json: BlogPost) {
    let blogPost = this.blogPosts.find((post) => post.id === json.id);
    if (!blogPost) {
      blogPost = new BlogPost(this, json.id!);
      this.blogPosts.push(blogPost);
    }
    if (json.isDeleted) {
      this.removeBlogPost(blogPost);
    } else {
      blogPost.updateFromJson(json);
    }
  }

  // Creates a fresh BlogPost on the client and the server.
  createBlogPost() {
    const post = new BlogPost(this);
    this.blogPosts.push(post);
    return post;
  }

  // A BlogPost was somehow deleted, clean it from the client memory.
  removeBlogPost(post: BlogPost) {
    this.blogPosts.splice(this.blogPosts.indexOf(post), 1);
    post.dispose();
  }
}





