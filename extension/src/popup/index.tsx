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
import BackgroundWave from "~options/BackgroundWave"
import { cn } from "~lib/utils"
import { Card, CardFooter, CardHeader } from "~components/ui/card"
import Text from "~options/Text"

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

  const domainName = capitalizeFirstLetter(currentDomain?.split(".").at(-2));
  const worksOnDomain = getters.hasDomain(currentDomain ?? "");
  
  return <main className={`${preferDarkmode && 'dark'} p-8 py-6 w-64 flex flex-col gap-4 items-center`}>
    <div className="-z-10 bg-lessbackground absolute top-0 w-full h-full">
      <BackgroundWave isActive={isActive} />
    </div>
    <MainLogo size={128} active={isActive} />
    <p className="text-lessforeground text-sm text-center">By activating you are accepting our <a className="text-lessprimary cursor-pointer underline" onClick={onOpenPrivacyPolicy}>Privacy Policy</a></p>
    <div className="flex w-full">
      <Button
        className="w-full mb-6"
        onClick={toggleActive}
      >Turn {isActive ? 'off' : 'on'}</Button>
    </div>
    <div className="absolute bottom-0 w-full">
    {isActive ? worksOnDomain ? 
      <StatusLabel variant="secondary">Active on {domainName}</StatusLabel> :
      <RequestWebsiteModal domainName={domainName}><StatusLabel variant="destructive">Does not work on {domainName}</StatusLabel></RequestWebsiteModal> : ''}
    </div>
  </main>
}


function StatusLabel({children, variant, className}: {children: React.ReactNode, variant: "secondary" | "destructive", className?: string}) {
  return <Badge variant={variant} className={cn('h-8 flex justify-center w-full rounded-none', className)}>{children}</Badge>
}

function RequestWebsiteModal({domainName, children}: {domainName: string, children: React.ReactNode}) {
  const [show, setShow] = useState(false);
  const [hasBeenRequested, setHasBeenRequested] = useState(false);
  function requestWebsite() {
    sendAnalytics("request-add-website", domainName);
    setHasBeenRequested(true);
    setShow(false);
  }

  return <>
    {show && <div className="z-10 top-0 left-0 w-full h-full bg-lessbackground bg-opacity-50 flex items-center justify-center">
      <Card>
        <CardHeader>
          <Text className="text-wrap text-ellipsis max-w-full">Request {domainName.slice(0, 25)}{25 < domainName.length ? "..." : ""}</Text>
        </CardHeader>
        <CardFooter className="justify-between gap-4">
          <Button variant="outline" onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={requestWebsite}>Request</Button>
        </CardFooter>
      </Card>
    </div>}
    <div onClick={() => setShow(true)} className="cursor-pointer w-full">
      {hasBeenRequested ? <StatusLabel variant="secondary">{domainName} been requested!</StatusLabel> : children}
    </div>
  </>
}


export default IndexPopup
