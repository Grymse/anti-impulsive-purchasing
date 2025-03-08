import IconSrc from "data-base64:~assets/icon.png"
import IconOffSrc from "data-base64:~assets/icon-off.png"
import "../style.css"
import { Button } from "~components/ui/button"
import { useConsent } from "~hooks/useConsent"
import { getters } from "~lib/getters"
import React, { useEffect, useState } from "react"
import MainLogo from '../components/ui/MainLogo';
import { Badge } from "~components/ui/badge"
import { sendAnalytics } from "~lib/analytics"
import { send } from "process"

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

  useEffect(() => {
    sendAnalytics("open-popup", undefined);
  },[]);


  const {content: currentDomain} = useAsync(getActiveTabUrl, []);


  function requestWebsite() {
    sendAnalytics("request-add-website", currentDomain);
  }

  const domainName = capitalizeFirstLetter(currentDomain?.split(".").at(-2));
  const worksOnDomain = getters.hasDomain(currentDomain ?? "");
  
  return <main className={`${preferDarkmode && 'dark'} p-8 py-6 bg-background w-64 flex flex-col gap-4 items-center`}>
    <MainLogo size={128} active={isActive} />
    <p className="text-foreground text-sm text-center">By activating you are accepting our <a className="text-primary cursor-pointer underline" onClick={onOpenPrivacyPolicy}>Privacy Policy</a></p>
    <div className="flex w-full">
      <Button
        className="w-full mb-6"
        onClick={toggleActive}
      >Turn {isActive ? 'off' : 'on'}</Button>
    </div>
    {isActive ? worksOnDomain ? 
      <StatusLabel variant="secondary">Active on {domainName}</StatusLabel> :
      <StatusLabel variant="destructive">Does not work on {domainName}</StatusLabel> : ''}
  </main>
}


function StatusLabel({children, variant}: {children: React.ReactNode, variant: "secondary" | "destructive"}) {
  return <Badge variant={variant} className="absolute bottom-0 h-8 flex justify-center w-full rounded-none">{children}</Badge>
}


export default IndexPopup
