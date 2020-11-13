import { createContext } from "react";
import { API } from "../lib/API";
import { AuthorStore } from "./AuthorStore";
import { BlogPostStore } from "./BlogPostStore";
import { UIStore } from "./UIStore";

export class RootStore {
  authorStore: AuthorStore;
  blogPostStore: BlogPostStore;
  uiStore: UIStore;

  constructor(transportLayer: API) {
    this.authorStore = new AuthorStore(transportLayer, this);
    this.blogPostStore = new BlogPostStore(transportLayer, this);
    this.uiStore = new UIStore(this);
  }
}

export const transportLayer = new API();
const store = new RootStore(transportLayer);
export const RootStoreContext = createContext<RootStore>(store);
export default store;
