import {
  makeAutoObservable,
  reaction,
  IReactionDisposer,
} from 'mobx';
import * as uuid from 'uuid';
import { AuthorStore } from '../../stores/AuthorStore';

export class Author {
  id: string | null = null;
  name = "";
  email = "";
  store: AuthorStore | null = null;
  autoSave = true;
  saveHandler: IReactionDisposer | null = null;
  isDeleted?: false;

  constructor(store: AuthorStore, id = uuid.v4()) {
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
          this.store!.transportLayer.saveAuthor(json);
        }
      }
    );
  }

  delete() {
    this.store!.transportLayer.deleteBlogPost(this.id);
    this.store!.removeAuthor(this);
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

  // Update this Author with information from the server.
  updateFromJson(json: Author) {
    this.autoSave = false; // Prevent sending of our changes back to the server.
    this.name = json.name;
    this.email = json.email;
    this.autoSave = true;
  }

  // Clean up the observer.
  dispose() {
    this.saveHandler!();
  }
}
