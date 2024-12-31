/**
 * Wait for the target element.
 * @param selector CSS selector of the target
 * @returns Promise of Element
 */
export async function waitForElement(
  selector: string
): Promise<Element | null> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((_, observer) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Get user set default state from chrome storage.
 * @returns default state user setting
 */
export async function getDefaultState(): Promise<boolean> {
  // init the default state as true
  const data = await chrome.storage.local.get("defaultState");
  let defaultState: boolean | undefined = data?.defaultState;
  if (defaultState === undefined) {
    chrome.storage.local.set({ defaultState: true });
    defaultState = true;
  }
  return defaultState;
}
