import { createContext } from "react";
import { API } from "../lib/API";
import { AuthorStore } from "./AuthorStore";
import { BlogPostStore } from "./BlogPostStore";

export class RootStore {
  authorStore: AuthorStore;
  blogPostStore: BlogPostStore;

  constructor(transportLayer: API) {
    this.authorStore = new AuthorStore(transportLayer, this);
    this.blogPostStore = new BlogPostStore(transportLayer, this);
  }
}

const transportLayer = new API();
const store = new RootStore(transportLayer);
export const RootStoreContext = createContext<RootStore>(store);
