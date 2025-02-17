import IconSrc from "data-base64:~assets/icon.png"
import IconOffSrc from "data-base64:~assets/icon-off.png"
import "../style.css"
import { useState } from "react"
import { Button } from "~ui/button"
import { useEffect } from "react"
import { consent } from "~lib/analytics"

function IndexPopup() {
  const [isActive, setIsActive] = useState(consent.value)

  useEffect(() => {
    consent.onChange(setIsActive)
  }, []);

  useEffect(() => {
    consent.value = isActive;
  }, [isActive]);

  const preferDarkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  return <main className={`${preferDarkmode && 'dark'} p-8 py-6 bg-background w-48 flex flex-col gap-4`}>
    {isActive ? <img src={IconSrc} width={128} height={128} className="w-full h-full animation-breathe" /> :
      <img src={IconOffSrc} width={128} height={128} className="w-full h-full scale-75 transform opacity-80" />
      }
    <div className="flex w-full">
      <Button className="w-full" onClick={() => setIsActive(!isActive)}>Turn {isActive ? 'off' : 'on'}</Button>
    </div>
  </main>
}

export default IndexPopup
