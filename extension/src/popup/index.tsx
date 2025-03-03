import IconSrc from "data-base64:~assets/icon.png"
import IconOffSrc from "data-base64:~assets/icon-off.png"
import "../style.css"
import { Button } from "~components/ui/button"
import { useConsent } from "~hooks/useConsent"
import { getters } from "~lib/getters"
import { useEffect, useState } from "react"

function getActiveTabUrl() {
  return new Promise<string>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(new URL(tabs[0].url).hostname);
    });
  });
}

function capitalizeFirstLetter(string: string | undefined) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function useAsync<T>(fn: () => Promise<T>, deps: any[]) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<T| null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fn().then((result) => {
      setContent(result);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, deps)

  return {loading, content, error};
}

function IndexPopup() {
  const {isActive, toggleActive} = useConsent();
  const preferDarkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function onOpenPrivacyPolicy() {
    chrome.runtime.openOptionsPage()
  }

  const {content: currentDomain} = useAsync(getActiveTabUrl, []);
  const domainName = capitalizeFirstLetter(currentDomain?.split(".").at(-2));
  const worksOnDomain = getters.hasDomain(currentDomain ?? "");
  
  return <main className={`${preferDarkmode && 'dark'} p-8 py-6 bg-background w-64 flex flex-col gap-4 items-center`}>
    {isActive ? <img src={IconSrc} width={128} height={128} className="w-full h-full animation-breathe" /> :
      <img src={IconOffSrc} width={128} height={128} className="w-full h-full scale-75 transform opacity-80" />
      }
    <p className="text-foreground text-sm text-center">By activating you are accepting our <a className="text-primary cursor-pointer underline" onClick={onOpenPrivacyPolicy}>Privacy Policy</a></p>
    <div className="flex w-full">
      <Button
        className="w-full"
        onClick={toggleActive}
      >Turn {isActive ? 'off' : 'on'}</Button>
    </div>
    {isActive ? worksOnDomain ? 
      <p className="text-primary text-base font-light">Works on {domainName}</p> : <p className="text-red-500 text-base">Does not work on {domainName}</p> : ''}
  </main>
}



export default IndexPopup
