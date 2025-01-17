import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}
console.log("Hello from content script!")

// const ReplaceNumbers = () => {
//   useEffect(() => {
//     // Function to replace numbers with exclamation marks
//     const replaceNumbers = () => {
//       const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
//       let node;

//       while ((node = walker.nextNode())) {
//         if (node.nodeValue) {
//           node.nodeValue = node.nodeValue.replace(/\d+/g, "!");
//         }
//       }
//     };

//     // Call the function to replace numbers
//     replaceNumbers();
//   }, []);

//   return null;
// };

// export default ReplaceNumbers;