import { useEffect, useState } from "react"
import { sendAnalytics } from "~lib/analytics"
import { settings } from "~lib/settings"

const reloadPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // TODO: Fix refresh (Should distinguish between execution from popup and options page.)
    if (tab?.id && !tab?.url?.includes("chrome-extension://")) {
      chrome.tabs.reload(tab.id)
    } 
}

export const useConsent = () => {
    const [isActive, setActive] = useState(settings.value.active);

    useEffect(() => {
        settings.onChange(reloadPage);
        return () => settings.removeOnChange(reloadPage);
    }, []);

    function toggleActive() {
        const newIsActive = !isActive;
        setActive(newIsActive);
        sendAnalytics('active', newIsActive);
        settings.update(settings => ({...settings, active: newIsActive}))
    }

    return {
        isActive,
        toggleActive
    }
}
