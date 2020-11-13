import {
  makeAutoObservable,
  runInAction,
} from "mobx";
import { Author } from "../lib/entities/Author";
import { RootStore } from "./RootStore";

export class AuthorStore {
  rootStore!: RootStore;
  authors: Author[] = [];
  transportLayer: any;
  isLoading = true;

  constructor(transportLayer: any, rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.transportLayer = transportLayer;
    this.transportLayer.onReceiveAuthorUpdate((updatedAuthor: Author) =>
      this.updateAuthorFromServer(updatedAuthor)
    );
    this.loadAuthors();
  }

  loadAuthors() {
    this.isLoading = true;
    this.transportLayer.fetchAuthors().then((fetchedAuthors: Author[]) => {
      runInAction(() => {
        fetchedAuthors.forEach((json) => this.updateAuthorFromServer(json));
        this.isLoading = false;
      });
    });
  }

  updateAuthorFromServer(json: Author) {
    let author = this.authors.find((author) => author.id === json.id);
    if (!author) {
      author = new Author(this, json.id!);
      this.authors.push(author);
    }
    if (json.isDeleted) {
      this.removeAuthor(author);
    } else {
      author.updateFromJson(json);
    }
  }

  // Creates a fresh BlogPost on the client and the server.
  createAuthor() {
    const author = new Author(this);
    this.authors.push(author);
    return author;
  }

  // A Author was somehow deleted, clean it from the client memory.
  removeAuthor(author: Author) {
    this.authors.splice(this.authors.indexOf(author), 1);
    author.dispose();
  }

  resolveAuthor(id: string) {
    return this.authors.find((author) => author.id === id) || null;
  }
}
