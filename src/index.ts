import {TheaterButtonSvg} from "./assets/svg.ts";
import {waitForElement} from "./utils.ts";
const SCROLL_MARGIN_PX = 16;

async function main(): Promise<void> {
  const bodyWrapSelector = ".rc-LegacyDataFetch";
  const bodyWrapEl = await waitForElement(bodyWrapSelector);

  // Observe change of bodyWrapEl to attach the button for every page navigation
  const bodyWrapObserver = new MutationObserver(addTogglebutton);
  if (bodyWrapEl) {
    bodyWrapObserver.observe(bodyWrapEl, {childList: true});
  }
}

async function addTogglebutton(): Promise<void> {
  // Wait until all necessary elements become available
  const [mainContainerEl, toolbarEl] = (await Promise.all([
    waitForElement("#main-container"),
    waitForElement(".rc-ControlBar .icon-container"),
  ])) as (HTMLElement | null)[];

  // Current state
  let isTheaterMode = false;

  // Add theater mode button
  const buttonEl = document.createElement("button");
  buttonEl.type = "button";
  buttonEl.innerHTML = TheaterButtonSvg;
  buttonEl.onclick = () => {
    mainContainerEl?.classList.toggle("theater-mode");
    isTheaterMode = !isTheaterMode;
  };
  const buttonContainerEl = document.createElement("span");
  buttonContainerEl.className = "rc-TooltipWrapper";
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
