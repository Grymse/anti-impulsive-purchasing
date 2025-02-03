import type { PlasmoCSConfig } from "plasmo"
import { interceptBuyNowButton, modifyAmazonPricesToMindfulness } from "./content-script"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}
console.log("Der scriptes!")

modifyAmazonPricesToMindfulness()
interceptBuyNowButton()
