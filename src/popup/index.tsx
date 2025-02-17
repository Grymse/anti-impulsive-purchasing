import IconSrc from "data-base64:~assets/icon.png"
import IconOffSrc from "data-base64:~assets/icon-off.png"
import "../style.css"
import { Button } from "~components/ui/button"
import { useConsent } from "~hooks/useConsent"

function IndexPopup() {
  const {isActive, toggleActive} = useConsent();
  const preferDarkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function onOpenPrivacyPolicy() {
    chrome.runtime.openOptionsPage()
  }
  
  return <main className={`${preferDarkmode && 'dark'} p-8 py-6 bg-background w-64 flex flex-col gap-4`}>
    {isActive ? <img src={IconSrc} width={128} height={128} className="w-full h-full animation-breathe" /> :
      <img src={IconOffSrc} width={128} height={128} className="w-full h-full scale-75 transform opacity-80" />
      }
    <p className="text-foreground text-sm">By activating you are accepting our <a className="text-primary cursor-pointer underline" onClick={onOpenPrivacyPolicy}>Privacy Policy</a></p>
    <div className="flex w-full">
      <Button
        className="w-full"
        onClick={toggleActive}
      >Turn {isActive ? 'off' : 'on'}</Button>
    </div>
  </main>
}



export default IndexPopup
