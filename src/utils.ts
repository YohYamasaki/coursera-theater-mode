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

// export function detectElementChange(selector: string) {
//   const observer = new MutationObserver((mutation) => {
//     console.log(mutation);
//   });

//   observer.observe(document.querySelector("#main-container")!, {
//     attributes: true,
//     characterData: true,
//     childList: true,
//     subtree: true,
//     attributeOldValue: true,
//     characterDataOldValue: true,
//   });
// }
