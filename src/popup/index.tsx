import { useEffect, useState } from "react"

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [data, setData] = useState("")

  const getCurrentUrl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    setCurrentUrl(tab.url)
  }

  useEffect(() => {
    getCurrentUrl()
  }, [])

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Orgasmo
        </a>{" "}
        Extension!
      </h2>
      <h3>
        You are currently on the following url: <br />
        <a
          href={currentUrl}
          target="_blank"
          style={{
            wordBreak: "break-all"
          }}>
          {currentUrl}
        </a>
      </h3>
    </div>
  )
}

export default IndexPopup
