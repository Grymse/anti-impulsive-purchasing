import { getUserId } from "~lib/analytics"

// This ensures the service worker activates properly
console.log("Background service worker starting")

// Set uninstall URL when extension starts
getUserId().then((id) => {
    chrome.runtime.setUninstallURL(`https://www.lessextension.com/goodbye?userid=${id}`, () => {
        console.log("Uninstall URL set successfully")
    })
})

// Add a listener to make sure the service worker stays active
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed")
})

export {}
