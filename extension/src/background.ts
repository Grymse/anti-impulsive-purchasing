import { getUserId } from "~lib/analytics"

// Set uninstall URL when extension starts
if (process.env.NODE_ENV !== "development") {
    getUserId().then((id) => {
        chrome.runtime.setUninstallURL(`https://www.lessextension.com/goodbye?userid=${id}`, () => {
            console.log("Uninstall URL set successfully")
        })
    })
    
    chrome.runtime.onInstalled.addListener(() => {
        chrome.tabs.create({ url: "https://www.lessextension.com/onboarding" }, () => {
            console.log("Onboarding tab opened")
        })
    })
}

export {}
