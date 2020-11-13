import { makeAutoObservable, reaction, IReactionDisposer } from "mobx";
import * as uuid from "uuid";
import { BlogPostStore } from "../../stores/BlogPostStore";
import { Author } from "./Author";

export class BlogPost {
  id: string | null = null; // Unique id of this BlogPost, immutable.
  authorId?: string | null = null;
  title = "";
  content = "";
  createdAt = "";
  updatedAt = "";
  author: null | Author = null; // Reference to an Author object (from the authorStore).
  tags = [];
  post_likes = [];
  store: BlogPostStore | null = null;
  autoSave = true; // Indicator for submitting changes in this BlogPost to the server.
  saveHandler: IReactionDisposer | null = null; // Disposer of the side effect auto-saving this BlogPost (dispose).
  isDeleted?: false;

  constructor(store: BlogPostStore, id = uuid.v4()) {
    makeAutoObservable(this, {
      id: false,
      store: false,
      autoSave: false,
      saveHandler: false,
      dispose: false,
    });
    this.store = store;
    this.id = id;

    this.saveHandler = reaction(
      () => this.asJson, // Observe everything that is used in the JSON.
      (json) => {
        // If autoSave is true, send JSON to the server.
        if (this.autoSave) {
          this.store!.transportLayer.saveBlogPost(json);
        }
      }
    );
  }

  // Remove this BlogPost from the client and the server.
  delete() {
    this.store!.transportLayer.deleteBlogPost(this.id);
    this.store!.removeBlogPost(this);
  }

  get asJson() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.author ? this.author.id : null,
      // etc.
    };
  }

  // Update this BlogPost with information from the server.
  updateFromJson(json: BlogPost) {
    this.autoSave = false; // Prevent sending of our changes back to the server.
    this.title = json.title;
    this.content = json.content;
    this.author =
      (this.store!.rootStore.authorStore &&
        this.store!.rootStore.authorStore.resolveAuthor(json.authorId!)) ||
      null;
    this.autoSave = true;
  }

  // Clean up the observer.
  dispose() {
    this.saveHandler!();
  }
}
