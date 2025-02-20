import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo";
import React from 'react'
 

export const config: PlasmoCSConfig = {
    matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://*.ebay.com/*", "https://www.matas.dk/*", "https://www.proshop.dk/*", "https://www.boozt.com/*"], // or specific URLs
    all_frames: true,
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
    document.querySelector(".nav-logo")


export default function needThis() {
  return (
    <div style={{
        height: '200px',
        width: '200px',
        background: 'red'
    }}>need-this</div>
  )
}