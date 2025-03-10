import IconOffSrc from "data-base64:~assets/icon-off.png"
import IconSrc from "data-base64:~assets/icon.png"

import "../style.css"

import { useConsent } from "~hooks/useConsent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~components/ui/card"
import { Label } from "~components/ui/label"
import { Switch } from "~components/ui/switch"
import { settings, strategies } from "~lib/settings"
import { useEffect, useState } from "react"

function SettingsPage() {
  let { isActive } = useConsent();

  // Detect the user's system preference for dark mode
  const preferDarkmode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches

  return (
    <main
      className={`
        ${preferDarkmode ? "dark" : ""}
        min-h-screen
        flex flex-col items-center justify-center
        bg-lessbackground
        text-lessforeground
        px-8 py-6
      `}>
      <div className="max-w-2xl space-y-2">
        <div className="flex flex-col items-center justify-center mb-8">
        {/* Logo Section */}
        <div className="mb-12 text-center">
          {isActive ? (
            <img
              src={IconSrc}
              alt="Extension Logo (On)"
              width={128}
              height={128}
              className="w-full h-full max-w-[200px] animation-breathe"
            />
          ) : (
            <img
              src={IconOffSrc}
              alt="Extension Logo (Off)"
              width={128}
              height={128}
              className="w-full h-full max-w-[200px] scale-75 transform opacity-80"
            />
          )}
        </div>
        {/* Toggle Button */}
        </div>
      {/* First Text Block */}
      
        <Card className="text-base">
      <CardHeader>
        <CardTitle>Strategy settings</CardTitle>
        <CardDescription>Manage your strategy settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {strategies.map((strategy) => {
            const [isSwitchActive, setActive] = useState(false);

            useEffect(() => {
                const f = (s) => {
                    setActive(s.activeStrategies?.includes(strategy.code))
                }

                settings.onInit(f);
                settings.onChange(f);

                return () => settings.removeOnChange(f);
            },[]);

            function onChange(active: boolean) {
                settings.update(settings => {

                    if (active) {
                        settings.activeStrategies.push(strategy.code)
                        return {...settings }
                    }
                    
                    return {...settings, activeStrategies: settings.activeStrategies.filter(code => code !== strategy.code)}
                });
            }

            return <div key={strategy.code} className="flex items-center justify-between space-x-4">
                <Label htmlFor={strategy.code} className="flex flex-col space-y-1">
                    <span>{strategy.name}</span>
                    <span className="text-xs font-normal leading-snug text-lessmuted-foreground">
                    {strategy.description}
                    </span>
                </Label>
                <Switch id={strategy.code} checked={isSwitchActive} onCheckedChange={onChange} aria-label={strategy.code} />
            </div>
        })}
      </CardContent>
    </Card>
      </div>
    </main>
  )
}

export default SettingsPage
