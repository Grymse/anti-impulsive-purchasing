import type { PlasmoCSConfig } from "plasmo";

export const defaultConfig: PlasmoCSConfig = {
    matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*"], // or specific URLs
    all_frames: true,
}