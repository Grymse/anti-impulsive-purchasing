import { getUserId } from "~lib/analytics"
import { settings } from "~lib/settings"

// Set uninstall URL when extension starts
if (true) {
    getUserId().then((id) => {
        chrome.runtime.setUninstallURL(`https://www.lessextension.com/goodbye?userid=${id}`, () => {
            console.log("Uninstall URL set successfully")
        })
    })

}
chrome.runtime.onInstalled.addListener(() => {
    settings.getFromStorage().then(value => {
        if (!value.hasSeenWelcomeModal) {
            chrome.tabs.create({ url: "https://www.lessextension.com/onboarding" }, () => {
                console.log("Onboarding tab opened")
            });
        }
        else {
            console.log("Onboarding tab not opened. User has already seen the welcome modal.")
        }
    });
});


export {}
