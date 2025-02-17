import { useState } from "react"
import { consent, sendAnalytics } from "~lib/analytics"

const reloadPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.url.includes("chrome-extension://") && tab?.id) {
      chrome.tabs.reload(tab.id)
    }
}

export const useConsent = () => {
    const [isActive, setActive] = useState(consent.value)

    function toggleActive() {
        setActive(!isActive)
        consent.value = isActive
        sendAnalytics('consent', {allow: isActive})
        reloadPage()
    }

    return {
        isActive,
        toggleActive
    }
}
