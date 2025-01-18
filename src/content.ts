import type { PlasmoCSConfig } from "plasmo"
import modifyText from "~content-script"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}
console.log("Hello from content script!")

modifyText("kurv", "FY BAD")
