import { getDefaultState } from "./utils.ts";

async function popup(): Promise<void> {
  const inputEl: HTMLInputElement | null =
    document.querySelector("#default-behaviour");
  const defaultState = await getDefaultState();
  console.log(defaultState);

  if (inputEl) {
    // Set user setting to toggle button
    inputEl.checked = defaultState;

    inputEl.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      void chrome.storage.local.set({ defaultState: target.checked });
    };
  }
}

popup();
