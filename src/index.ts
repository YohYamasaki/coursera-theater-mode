import { TheaterButtonSvg } from "./assets/svg.ts";
import { waitForElement } from "./utils.ts";
const SCROLL_MARGIN_PX = 16;

async function main() {
  // Wait until all necessary elements become available
  const [mainContainerEl, titleEl, videoEl, toolbarEl] = (await Promise.all([
    waitForElement("#main-container"),
    waitForElement("#video-item-title-and-save-note"),
    waitForElement(".video-js video.vjs-tech"),
    waitForElement(".rc-ControlBar .icon-container"),
  ])) as (HTMLElement | null)[];

  // Add theater mode button
  const buttonEl = document.createElement("button");
  buttonEl.type = "button";
  buttonEl.innerHTML = TheaterButtonSvg;
  buttonEl.onclick = () => {
    mainContainerEl?.classList.toggle("theater-mode");
  };
  const buttonContainerEl = document.createElement("span");
  buttonContainerEl.className = "rc-TooltipWrapper";
  buttonContainerEl.append(buttonEl);
  toolbarEl?.append(buttonContainerEl);

  // Scroll handling to change the video height
  const originalPos = titleEl?.getBoundingClientRect();

  function handleScroll() {
    if (!titleEl || !videoEl || !originalPos) return;
    if (!mainContainerEl || !mainContainerEl.classList.contains("theater-mode"))
      return;

    // Set shorter height to create a space for transcripts when scrolled
    const newPos = titleEl.getBoundingClientRect();

    if (newPos.top + SCROLL_MARGIN_PX < originalPos.top) {
      videoEl.style.height = "400px";
    } else {
      videoEl.style.height = "100%";
    }
  }

  if (mainContainerEl) {
    mainContainerEl.addEventListener("scroll", handleScroll);
  }
}

void main();
