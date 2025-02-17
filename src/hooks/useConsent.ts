import { useState } from "react"
import { consent, sendAnalytics } from "~lib/analytics"

const reloadPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (tab?.id) {
      chrome.tabs.reload(tab.id)
    }
}

export const useConsent = () => {
    const [isActive, setActive] = useState(consent.value)

    function toggleActive() {
        const newIsActive = !isActive;
        setActive(newIsActive);
        sendAnalytics('consent', {allow: newIsActive})
        consent.onChange(() => reloadPage());
        consent.value = newIsActive
    }

    return {
        isActive,
        toggleActive
    }
}
