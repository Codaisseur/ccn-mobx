import { AuthorStore } from "./AuthorStore";
import { BlogPostStore } from "./BlogPostStore";

export class RootStore {
  authorStore: AuthorStore;
  blogPostStore: BlogPostStore;

  constructor(transportLayer: any) {
    this.authorStore = new AuthorStore(transportLayer, this)
    this.blogPostStore = new BlogPostStore(transportLayer, this)
  }
}
