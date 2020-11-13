import axios from "axios";
import { Author } from "./entities/Author";
import { BlogPost } from "./entities/BlogPost";

interface FetchResponse<Entity> {
  count: number;
  rows: Entity[];
}

export class API {
  onReceiveAuthorUpdateCallbacks: ((updatedAuthor: Author) => void)[] = [];
  onReceiveBlogPostUpdateCallbacks: ((
    updatedBlogPost: BlogPost
  ) => void)[] = [];

  fetchAuthors() {
    return axios
      .get<FetchResponse<Author>>(this.url("/developers"))
      .then((res) => res.data.rows);
  }

  saveAuthor(author: Author) {
    if (author.id) {
      axios.put(this.url(`/developers/${author.id}`), author).then((res) => {
        this.onReceiveAuthorUpdateCallbacks.forEach((cb) => cb(res.data));
      });
    } else {
      axios.post(this.url("/developers"), author).then((res) => {
        this.onReceiveAuthorUpdateCallbacks.forEach((cb) => cb(res.data));
      });
    }
  }

  fetchBlogPosts() {
    return axios.get<FetchResponse<BlogPost>>(this.url("/posts"))
      .then((res) => res.data.rows);
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
