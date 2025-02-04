import type { PlasmoCSConfig } from "plasmo"
import { setTimeoutTimer } from "./content-script"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}
setTimeoutTimer()
