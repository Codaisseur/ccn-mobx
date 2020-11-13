import axios from "axios";
import { Author } from "./entities/Author";
import { BlogPost } from "./entities/BlogPost";

export class API {
  onReceiveAuthorUpdateCallbacks: ((updatedAuthor: Author) => void)[] = [];
  onReceiveBlogPostUpdateCallbacks: ((
    updatedBlogPost: BlogPost
  ) => void)[] = [];

  fetchAuthors() {
    return axios.get<Author[]>(this.url("/authors")).then((res) => res.data);
  }

  saveAuthor(author: Author) {
    if (author.id) {
      axios.put(this.url(`/authors=${author.id}`), author).then((res) => {
        this.onReceiveAuthorUpdateCallbacks.forEach((cb) => cb(res.data));
      });
    } else {
      axios.post(this.url("/authors"), author).then((res) => {
        this.onReceiveAuthorUpdateCallbacks.forEach((cb) => cb(res.data));
      });
    }
  }

  fetchBlogPosts() {
    return axios.get<BlogPost[]>(this.url("/posts")).then((res) => res.data);
  }

  saveBlogPost(post: BlogPost) {
    axios.put<BlogPost>(this.url(`/posts/${post.id}`), post).then((res) => {
      this.onReceiveBlogPostUpdateCallbacks.forEach((cb) => cb(res.data));
    });
  }

  deleteBlogPost(id: number | string) {
    axios.delete(this.url(`/posts/${id}`)).then((res) => {
      this.onReceiveBlogPostUpdateCallbacks.forEach((cb) => cb(res.data));
    });
  }

  url(path: string = "/") {
    return `https://codaisseur-coders-network-okta.herokuapp.com${path}`;
  }

  onReceiveAuthorUpdate(cb: (updatedAuthor: Author) => void) {
    this.onReceiveAuthorUpdateCallbacks.push(cb);
  }

  onReceiveBlogPostUpdate(cb: (updatedBlogPost: BlogPost) => void) {
    this.onReceiveBlogPostUpdateCallbacks.push(cb);
  }
}
