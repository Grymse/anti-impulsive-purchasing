import { useEffect, useState } from "react"
import { sendAnalytics } from "~lib/analytics"
import { settings, type Settings } from "~lib/settings"

const reloadPage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // TODO: Fix refresh (Should distinguish between execution from popup and options page.)
    if (tab?.id && !location?.href?.includes?.("chrome-extension://")) {
      chrome.tabs.reload(tab.id)
    } 
}

export const useConsent = () => {
    const [isActive, setActive] = useState(settings.value.active);

    useEffect(() => {
        const updateActive = (settings: Settings) => setActive(settings.active);
        settings.onChange(reloadPage);
        settings.onChange(updateActive);

        return () => {
            settings.removeOnChange(reloadPage);
            settings.removeOnChange(updateActive);
        }
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
