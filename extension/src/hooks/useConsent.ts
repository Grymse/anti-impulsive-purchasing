import { useEffect, useState } from "react"
import { consent, sendAnalytics } from "~lib/analytics"

const reloadPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.id && !tab?.url?.includes("chrome-extension://")) {
      chrome.tabs.reload(tab.id)
    }
}



export const useConsent = () => {
    const [isActive, setActive] = useState(consent.value)

    useEffect(() => {
        consent.onChange(reloadPage);
        return () => consent.removeOnChange(reloadPage);
    }, []);

    function toggleActive() {
        const newIsActive = !isActive;
        setActive(newIsActive);
        sendAnalytics('consent', {allow: newIsActive})
        consent.value = newIsActive
    }

    return {
        isActive,
        toggleActive
    }
}
