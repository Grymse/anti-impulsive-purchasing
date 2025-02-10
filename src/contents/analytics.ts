// content.ts
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"], // or specific URLs
  run_at: "document_start", // Critical for first paint,
  all_frames: true
}

/* console.log("ANALYTICS"); */

/* // Main content script logic
const observer = new MutationObserver((mutations) => {
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