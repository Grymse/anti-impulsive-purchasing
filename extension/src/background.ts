import { getUserId } from "~lib/analytics"

// This ensures the service worker activates properly
console.log("Background service worker starting")

// Set uninstall URL when extension starts
getUserId().then((id) => {
    chrome.runtime.setUninstallURL(`https://www.lessextension.com/goodbye?userid=${id}`, () => {
        console.log("Uninstall URL set successfully")
    })
})

if (process.env.NODE_ENV !== "development") {
    chrome.runtime.onInstalled.addListener(() => {
        chrome.tabs.create({ url: "https://www.lessextension.com/onboarding" }, () => {
            console.log("Onboarding tab opened")
        })
    })
}

export {}
