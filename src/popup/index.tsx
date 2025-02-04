import React, { useEffect, useState } from "react"

import { getParentDomain } from "../content-script.ts"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState<string>("")

  const getCurrentUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    console.log("Current URL in index.tsx: ", tab.url)
    setCurrentUrl(tab.url as string)
  }

  useEffect(() => {
    getCurrentUrl()

    const updateTimer = async () => {
      // Fetch expirationTime from chrome.storage
      const parentDomain = getParentDomain(currentUrl)
      const parentDomainTimer = await chrome.storage.local.get(parentDomain)
      const expirationTime = parentDomainTimer[parentDomain]

      console.log("Parent Domain: ", parentDomain)
      console.log("Parent Domain Timer!!: ", parentDomainTimer)
      console.log("Expiration Time: ", expirationTime)

      if (!expirationTime) {
        console.log("No timer set")
        setTimeLeft("No Timer Set")
        return
      }

      const now = Date.now()
      const diff = expirationTime - now

      if (diff <= 0) {
        // Timer is expired
        console.log("Timer expired")
        setTimeLeft("Expired")
      } else {
        // Convert ms difference to hours/minutes
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        console.log("Sucessfully set time remaining,", `${hours}h ${minutes}m`)
        setTimeLeft(`${hours}h ${minutes}m`)
      }
    }

    // Update immediately, then every 10 seconds
    updateTimer()
    const intervalId = setInterval(updateTimer, 1000 * 10)

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
