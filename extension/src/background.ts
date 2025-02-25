import { getUserId, sendAnalytics } from "~lib/analytics"


getUserId().then((id) => {
    chrome.runtime.setUninstallURL(`https://www.lessextension.com/goodbye?userid=${id}`, () => {
    }
    )
}
)

export {}
