import { TheaterButtonSvg } from "./assets/svg.ts";
import { getDefaultState, waitForElement } from "./utils.ts";
const SCROLL_MARGIN_PX = 16;

async function main(): Promise<void> {
  const defaultState = await getDefaultState();
  const bodyWrapSelector = ".rc-LegacyDataFetch";
  const bodyWrapEl = await waitForElement(bodyWrapSelector);

  // Observe change of bodyWrapEl to attach the button for every page navigation
  const bodyWrapObserver = new MutationObserver(() =>
    addTheaterButton(defaultState)
  );
  if (bodyWrapEl) {
    bodyWrapObserver.observe(bodyWrapEl, { childList: true });
  }
}

async function addTheaterButton(startState: boolean): Promise<void> {
  // Wait until all necessary elements become available
  const [mainContainerEl, toolbarEl] = (await Promise.all([
    waitForElement("#main-container"),
    waitForElement(".rc-ControlBar .icon-container"),
  ])) as (HTMLElement | null)[];

  // Current state
  let isTheaterMode = startState;
  if (isTheaterMode && mainContainerEl) {
    mainContainerEl.classList.add("theater-mode");
  }

  // Remove old theater mode button
  const oldWrapEl = document.querySelector(".rc-TooltipWrapper.tm-wrapper");
  oldWrapEl?.remove();

  // Add theater mode button
  // Button element
  const buttonEl = document.createElement("button");
  buttonEl.className = "tm-button";
  buttonEl.type = "button";
  buttonEl.innerHTML = TheaterButtonSvg;
  buttonEl.onclick = () => {
    if (isTheaterMode) {
      if (mainContainerEl?.classList.contains("theater-mode")) {
        mainContainerEl?.classList.remove("theater-mode");
      }
    } else {
      mainContainerEl?.classList.add("theater-mode");
    }
    isTheaterMode = !isTheaterMode;
  };

  // Tooltip element
  const tooltipEl = document.createElement("span");
  tooltipEl.className = "tm-tooltip";
  tooltipEl.textContent = "Toggle Theater Mode";
  buttonEl.append(tooltipEl);

  // Button container element
  const buttonContainerEl = document.createElement("span");
  buttonContainerEl.className = "rc-TooltipWrapper tm-wrapper";
  buttonContainerEl.append(buttonEl);
  toolbarEl?.append(buttonContainerEl);

  function handleScroll() {
    if (!mainContainerEl || !isTheaterMode) return;

    if (mainContainerEl.scrollTop >= SCROLL_MARGIN_PX) {
      mainContainerEl.classList.remove("theater-mode");
    } else {
      mainContainerEl.classList.add("theater-mode");
    }
  }

  if (mainContainerEl) {
    mainContainerEl.addEventListener("scroll", handleScroll);
  }
}

void main();
