// src/store.ts
import { makeAutoObservable } from "mobx";
import { themes } from "../lib/theme";
import { RootStore } from "./RootStore";

export class UIStore {
  rootStore!: RootStore;
  darkMode: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  toggleDarkMode = () => {
    this.darkMode = !this.darkMode
  };

  get theme() {
    return this.darkMode ? themes.dark : themes.light;
  }
}
