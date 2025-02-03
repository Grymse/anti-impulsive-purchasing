import React, { useEffect, useState } from "react"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<string>("")

  const getCurrentUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    setCurrentUrl(tab?.url ?? "")
  }

  useEffect(() => {
    getCurrentUrl()

    // Function to update hours & minutes left
    const updateTimer = async () => {
      // Fetch expirationTime from chrome.storage
      const result = await chrome.storage.local.get("expirationTime")
      const expirationTime = result.expirationTime as number | undefined

      if (!expirationTime) {
        setTimeLeft("No Timer Set")
        return
      }

      const now = Date.now()
      const diff = expirationTime - now

      if (diff <= 0) {
        // Timer is expired
        setTimeLeft("Expired")
      } else {
        // Convert ms difference to hours/minutes
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}h ${minutes}m`)
      }
    }

    // Update immediately, then every second
    updateTimer()
    const intervalId = setInterval(updateTimer, 1000)

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <h3>Time Remaining: {timeLeft}</h3>
      <h5>Current URL: {currentUrl}</h5>
    </div>
  )
}

export default IndexPopup
