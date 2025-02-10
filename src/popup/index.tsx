import React, { useEffect, useState } from "react"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<string>("")

  // This function queries the active tab, sends a message to the content script,
  // and uses the response to update our UI.
  const updateTimer = async () => {
    try {
      // 1. Get the active tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
      if (!tab?.id || !tab.url) {
        setTimeLeft("No Timer Found")
        return
      }

      // 2. Derive the domain from the URL
      const trimmedUrl = tab.url.split("://")[1]?.split("/")[0] || ""
      setCurrentUrl(trimmedUrl)

      // 3. Ask the content script for the expiration time
      chrome.tabs.sendMessage(tab.id, { type: "GET_TIMER" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Could not contact content script:",
            chrome.runtime.lastError.message
          )
          setTimeLeft("No Timer Found")
          return
        }

        // If the content script replies with { expirationTime }
        const expirationTime = response?.expirationTime
        console.log("Expiration time fetched: ", expirationTime)
        if (!expirationTime) {
          setTimeLeft("No Timer Set")
          return
        }

        // 4. Compute how much time remains
        const now = Date.now()
        const diff = expirationTime - now

        if (diff <= 0) {
          setTimeLeft("Expired")
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          setTimeLeft(`${hours}h ${minutes}m`)
        }
      })
    } catch (err) {
      console.error("Failed to update timer:", err)
      setTimeLeft("Error")
    }
  }

  useEffect(() => {
    // Fetch immediately
    updateTimer()

    // Then refresh every 10s
    const intervalId = setInterval(() => {
      updateTimer()
    }, 10_000) // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h3>Time Remaining: {timeLeft}</h3>
      <h5>Current URL: {currentUrl}</h5>
    </div>
  )
}

export default IndexPopup
