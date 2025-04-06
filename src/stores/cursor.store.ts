import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type CursorType = "default" | "hover" | "hover-social" | "hover-name";

interface UiStoreState {
  cursorType: CursorType;
}

interface UiStoreActions {
  // actions
  setCursorType: (type: CursorType) => void;
}

const storeApi: StateCreator<
  UiStoreState & UiStoreActions,
  [["zustand/devtools", never]]
> = (set, get) => ({
  // state
  cursorType: "default",

  // actions
  setCursorType: (type) => {
    set(() => ({ cursorType: type }));
  },
});

export const useUiStore = create<UiStoreState & UiStoreActions>()(
  devtools(storeApi, { name: "ui-store" }),
);
