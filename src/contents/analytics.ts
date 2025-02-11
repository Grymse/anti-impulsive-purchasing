// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters } from "~lib/getters";

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://www.ebay.com/*"], // or specific URLs
  all_frames: true,
}



// Main content script logic
/* const observer = new MutationObserver((mutations) => {
  // Apply changes as soon as elements exist
  if (document.body) {
    // Apply your DOM modifications here
    document.body.style.backgroundColor = "lightblue"
    
    // Cleanup observer if needed
    observer.disconnect()
  }
})

window.addEventListener("load", () => {
  // Start observing the document
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  })
}) */


function setup() {
  getters.getDomainGetters().addToCartButtons();
}

window.addEventListener("load", setup);
