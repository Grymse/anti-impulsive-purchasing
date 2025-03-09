import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import "../style.css"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~components/ui/accordion"
import { Badge } from "~components/ui/badge"
import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { sendAnalytics } from "~lib/analytics"
import {
  formatTime,
  PERMIT_LENGTH,
  PERMIT_WAIT_TIME
} from "~lib/constants"
import { getters as getterRegistry } from "~lib/getters"
import { observer } from "~lib/observer"
import permit, { type Permit } from "~lib/permit"
import { settings } from "~lib/settings"
import { useScaling } from "~hooks/useScaling"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: [
    // ----- Danish Domains -----
    "https://*.amazon.de/*",
    "https://*.amazon.co.uk/*",
    "https://*.amazon.se/*",
    "https://*.ebay.co.uk/*",
    "https://*.ebay.de/*",
    "https://*.harald-nyborg.dk/*",
    "https://jysk.dk/*",
    "https://*.zalando.dk/*",
    "https://*.matas.dk/*",
    "https://*.proshop.dk/*",
    "https://*.elgiganten.dk/*",
    "https://*.magasin.dk/*",
    "https://*.jemogfix.dk/*",
    "https://*.bilka.dk/*",
    "https://*.foetex.dk/*",
    "https://*.saxo.com/*",
    "https://*.thansen.dk/*",
    "https://*.imerco.dk/*",
    "https://*.xl-byg.dk/*",
    "https://*.sport24.dk/*",
    "https://*.bog-ide.dk/*",
    "https://*.power.dk/*",
    "https://*.Plantorama.dk/*",
    "https://*.kop-kande.dk/*",
    "https://*.avxperten.dk/*",
    "https://*.fleggaard.dk/*",
    "https://ilva.dk/*",
    "https://*.sportsworld.dk/*",
    "https://*.telenor.dk/*",
    "https://*.kids-world.dk/*",
    "https://*.telia.dk/*",
    "https://*.10-4.dk/*",
    "https://*.asos.com/*",
    "https://*.billigvvs.dk/*",
    "https://intersport.dk/*",
    "https://*.ticketmaster.dk/*",
    "https://*.telmore.dk/*",
    "https://*.ditur.dk/*",
    "https://*.quint.dk/*",
    "https://*.maxizoo.dk/*",
    "https://*.fribikeshop.dk/*",
    "https://*.just-eat.dk/*",
    "https://*.bygma.dk/*",
    "https://*.williamdam.dk/*",
    "https://*.av-cables.dk/*",
    "https://*.plantetorvet.dk/*",
    "https://salling.dk/*",
    "https://luksusbaby.dk/*",
    "https://*.apotekeren.dk/*",
    "https://*.lampeguru.dk/*",
    "https://*.billetlugen.dk/*",
    "https://*.computersalg.dk/*",
    "https://havehandel.dk/*",
    "https://*.sinful.dk/*",
    "https://*.kaufmann.dk/*",
    "https://*.callme.dk/*",
    "https://*.hyggeonkel.dk/*",
    "https://legeakademiet.dk/*",
    "https://*.lampemesteren.dk/*",
    "https://*.zooplus.dk/*",
    "https://*.loebeshop.dk/*",
    "https://loberen.dk/*",
    "https://*.cocopanda.dk/*",
    "https://*.calle.dk/*",
    "https://*.mytrendyphone.dk/*",
    "https://*.jacobsenplus.dk/*",
    "https://greenmind.dk/*",
    "https://*.cchobby.dk/*",
    "https://*.komplett.dk/*",
    "https://*.billigparfume.dk/*",
    "https://*.faraos.dk/*",
    "https://*.feline.dk/*",
    "https://*.kitchenone.dk/*",
    "https://moebelkompagniet.dk/*",
    "https://*.luxoliving.dk/*",
    "https://*.av-connection.dk/*",
    "https://sneakerzone.dk/*",
    "https://*.partyking.dk/*",
    "https://*.bygmax.dk/*",
    "https://*.daells-bolighus.dk/*",
    "https://*.greenline.dk/*",
    "https://*.punkt1.dk/*",
    "https://*.illumsbolighus.dk/*",
    "https://*.lirumlarumleg.dk/*",
    "https://*.coolstuff.dk/*",
    "https://*.mobilcovers.dk/*",
    "https://*.grejfreak.dk/*",
    "https://*.flugger.dk/*",
    "https://ingvardchristensen.dk/*",
    "https://mobler.dk/*",
    "https://*.adidas.dk/*",

    // ----- Common domains -----
    "https://*.shein.com/*",
    "https://*.apple.com/*",
    "https://*.hm.com/*",
    "https://*.boozt.com/*",
    "https://*.temu.com/*",

    // ----- American domains -----
    "https://*.ebay.com/*",
    "https://*.amazon.com/*",
    "https://*.target.com/*",
    "https://*.homedepot.com/*",
    "https://*.costco.com/*",
    "https://*.bestbuy.com/*",
    "https://*.costco.com/*",
    "https://*.kroger.com/*",
    "https://*.aliexpress.com/*",
    "https://*.etsy.com/*",
    "https://*.adidas.com/*",
    "https://*.samsung.com/*",
    "https://*.nike.com/*",
    "https://*.wayfair.com/*",
    "https://*.lowes.com/*",
    "https://*.macys.com/*",
    "https://*.chewy.com/*",
    "https://*.gap.com/*",
    "https://*.wish.com/*",
    "https://*.lg.com/*",
    "https://*.dell.com/*",
    "https://*.kohls.com/*",
    "https://*.walgreens.com/*",
    "https://*.lenovo.com/*",
    "https://*.zara.com/*",
    "https://*.hp.com/*",
    "https://*.ikea.com/*",
    "https://*.nordstrom.com/*",

    // ----- 100 Shopify domains -----
    "https://klaedeskabet.dk/*",
    "https://*.fashionnova.com/*",
    "https://kyliecosmetics.com/*",
    "https://colourpop.com/*",
    "https://jeffreestarcosmetics.com/*",
    "https://*.gymshark.com/*",
    "https://*.allbirds.com/*",
    "https://*.brooklinen.com/*",
    "https://ruggable.com/*",
    "https://*.ruggable.com/*", // subdomain
    "https://*.chubbiesshorts.com/*",
    "https://*.chubbiesshorts.com/*",
    "https://*.puravidabracelets.com/*",
    "https://*.nativecos.com/*",
    "https://*.hauslabs.com/*",
    "https://skknbykim.com/*",
    "https://*.harney.com/*",
    "https://*.redbullshopus.com/*",
    "https://tula.com/*",
    "https://*.tula.com/*",
    "https://*.tesla.com/*", // subdomain
    "https://spiritualgangster.com/*",
    "https://*.taylorstitch.com/*",
    "https://*.american-giant.com/*",
    "https://*.drsquatch.com/*",
    "https://mejuri.com/*",
    "https://*.mejuri.com/*",
    "https://*.peets.com/*",
    "https://*.deathwishcoffee.com/*",
    "https://hellotushy.com/*",
    "https://*.bando.com/*",
    "https://*.moroccanoil.com/*",
    "https://negativeunderwear.com/*",
    "https://birdies.com/*",
    "https://naadam.co/*",
    "https://*.popflexactive.com/*",
    "https://*.moderncitizen.com/*",
    "https://greatjonesgoods.com/*",
    "https://pinklily.com/*",
    "https://misen.com/*",
    "https://materialkitchen.com/*",
    "https://*.hedleyandbennett.com/*",
    "https://*.rumpl.com/*",
    "https://*.mizzenandmain.com/*",
    "https://ohpolly.com/*",
    "https://*.tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://*.trueclassictees.com/*",
    "https://*.meundies.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://*.luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://*.everlast.com/*",
    "https://*.skims.com/*",
    "https://feals.com/*",
    "https://*.foursigmatic.com/*",
    "https://golde.co/*",
    "https://*.liquid-iv.com/*",
    "https://*.thesill.com/*",
    "https://*.wearlively.com/*",
    "https://andieswim.com/*",
    "https://yourparade.com/*",
    "https://brightland.co/*",
    "https://omsom.com/*",
    "https://jenis.com/*",
    "https://snowehome.com/*",
    "https://*.graza.co/*",
    "https://*.flybyjing.com/*",
    "https://getmaude.com/*",
    "https://ugmonk.com/*"
  ],
  all_frames: true
}

// Using formatTime from constants.ts

function permitToWaitTime(permit: Permit): {
  hours: number
  minutes: number
  seconds: number
} {
  // Calculate the remaining wait time in hours, minutes and seconds
  const now = Date.now()
  const diff = Math.max(0, permit.start - now)
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { hours, minutes, seconds }
}

type F = () => void
let showWaitModal: ({ onComplete }: { onComplete: F }) => void

interface WaitTimerProps {
  onCancel: () => void
  onComplete: () => void
}

function WaitTimer({ onCancel, onComplete }: WaitTimerProps) {
  const [currentPermit, setCurrentPermit] = useState<Permit | null>(
    permit.get()
  )
  const [waitTime, setWaitTime] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(currentPermit ? permitToWaitTime(currentPermit) : null)
  const domain = document.location.hostname
  const {scale} = useScaling();

  // Using permit constants from constants.ts

  // Create a permit if none exists
  useEffect(() => {
    if (!currentPermit) {
      permit.createIfNone()
      setCurrentPermit(permit.get())
    }
  }, [])

  // Set up timer to update the wait time display
  useEffect(() => {
    if (!currentPermit) return

    const id = window.setInterval(() => {
      const newWaitTime = permitToWaitTime(currentPermit)
      setWaitTime(newWaitTime)

      // If wait time has expired, allow the purchase
      if (permit.isValid()) {
        clearInterval(id)

        // Track when the waiting period completes
        sendAnalytics("enforce_wait_period_completed", {
          domain: domain,
          waitDuration: Date.now() - (currentPermit.start - PERMIT_WAIT_TIME)
        })

        onComplete()
      }
    }, 1000)

    return () => {
      if (id) clearInterval(id)
    }
  }, [currentPermit])

  const handleStartWaitTimer = () => {
    permit.createIfNone()
    setCurrentPermit(permit.get())
    sendAnalytics("enforce_wait_timer_started", {
      domain: domain,
      waitTime: PERMIT_WAIT_TIME,
      permitLength: PERMIT_LENGTH
    })
  }


  

  return (
    <div
    className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center"
    onClick={onCancel}>
      <Card
        style={{
          transform: `scale(${scale})`
        }}
        className="max-w-xl bg-white"
        onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Wait Before Purchasing</span>
            <Badge variant="outline" className="ml-2">
              {domain}
            </Badge>
          </CardTitle>
          <CardDescription>
            Taking time before making a purchase helps reduce impulsive buying
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {!currentPermit || currentPermit.end < Date.now() ? (
            <div className="text-center">
              <p className="mb-4">
                Starting a wait timer for <strong>{domain}</strong> helps you
                make more conscious purchasing decisions.
              </p>
              <Button onClick={handleStartWaitTimer}>Start Wait Timer</Button>
            </div>
          ) : Date.now() < currentPermit.start ? (
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-100 rounded-md">
                  <div className="text-3xl font-bold">
                    {waitTime?.hours || 0}
                  </div>
                  <div className="text-sm text-slate-500">Hours</div>
                </div>
                <div className="p-3 bg-slate-100 rounded-md">
                  <div className="text-3xl font-bold">
                    {waitTime?.minutes || 0}
                  </div>
                  <div className="text-sm text-slate-500">Minutes</div>
                </div>
                <div className="p-3 bg-slate-100 rounded-md">
                  <div className="text-3xl font-bold">
                    {waitTime?.seconds || 0}
                  </div>
                  <div className="text-sm text-slate-500">Seconds</div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600">
                Please wait before completing your purchase on{" "}
                <strong>{domain}</strong>. This waiting period helps you make a
                more thoughtful decision.
              </p>
              <div className="flex justify-between gap-4 mt-2 w-full">
                <Button variant="outline" className="w-full" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!permit.isValid()}>
                  Continue with Purchase
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">
                Your wait time for <strong>{domain}</strong> has elapsed. You
                may proceed with your purchase.
              </p>
              <Button onClick={onComplete}>Continue with Purchase</Button>
            </div>
          )}

          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) => {
              if (value) {
                sendAnalytics("enforce_wait_info_expanded", {
                  domain: domain
                })
              }
            }}>
            <AccordionItem value="info">
              <AccordionTrigger className="text-sm">
                How does the wait timer work?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    <strong>Purchase Permits</strong> are domain-specific
                    waiting periods that help you avoid impulsive purchases.
                    Each website you shop at has its own permit.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-md space-y-2">
                    <p className="font-medium">When you start a wait timer:</p>
                    <ul className="list-disc list-inside">
                      <li>
                        You'll need to wait{" "}
                        <strong>{formatTime(PERMIT_WAIT_TIME)}</strong> before
                        being able to purchase
                      </li>
                      <li>
                        After the waiting period, you'll have a{" "}
                        <strong>{formatTime(PERMIT_LENGTH)}</strong> window to
                        complete your purchase
                      </li>
                      <li>
                        This permit only applies to <strong>{domain}</strong>
                      </li>
                      <li>
                        You can come back anytime - your timer continues to run
                        even if you close the site
                      </li>
                    </ul>
                  </div>

                  <p>
                    Research shows that introducing a waiting period between
                    wanting to buy something and actually purchasing it
                    significantly reduces impulsive buying behavior.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EnforceWait() {
  const [show, setShow] = useState(false)
  const onComplete = useRef<null | F>(null)

  // Here we assign the function that can be called outside the component
  showWaitModal = ({ onComplete: f }) => {
    setShow(true)
    onComplete.current = f

    // Track when the modal is shown to the user
    sendAnalytics("enforce_wait_modal_shown", {
      domain: document.location.hostname,
      permitExists: !!permit.get(),
      permitIsValid: permit.isValid()
    })
  }

  const handleComplete = () => {
    sendAnalytics("enforce_wait_completed", {
      domain: document.location.hostname,
      permitActive: permit.isValid()
    })
    setShow(false)
    onComplete.current?.()
  }

  const handleCancel = () => {
    sendAnalytics("enforce_wait_canceled", {
      domain: document.location.hostname,
      permitActive: permit.get() ? Date.now() >= permit.get()!.start : false,
      waitCompleted: permit.isValid()
    })
    setShow(false)
  }

  if (!show) return null

  return <WaitTimer onCancel={handleCancel} onComplete={handleComplete} />
}

const getters = getterRegistry.getDomainGetters()
let currentTarget = document.body

function onPlaceOrderClick(e: Event) {
  permit.createIfNone()

  if (!permit.isValid()) {
    // Prevent the default action and stop event propagation if the permit is not valid
    e.preventDefault()
    e.stopPropagation()

    showWaitModal({
      onComplete: () => {
        document.body.setAttribute("data-plasmo-place-order-blocked", "false")
        const button = e.target as HTMLElement
        button.click?.()
        permit.markAsUsed()
      }
    })
    return
  }

  document.body.setAttribute("data-plasmo-place-order-blocked", "false")
  const button = e.target as HTMLElement
  button.click?.()
  
  permit.markAsUsed()
}

function effect(signal: { signal: AbortSignal }) {
  // Add event listeners to the place order buttons
  getters.placeOrderButtons(currentTarget).forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick)
  }, signal)

  getters.getOneClickBuyNow?.(currentTarget)?.forEach((p) => {
    p.button?.addEventListener("click", onPlaceOrderClick)
  }, signal)

}

settings.onInit((settings) => {
  
  if (!settings.active || !settings.activeStrategies.includes("enforce-wait"))
    return
  observer.addEffect(effect)
  document.body.setAttribute(
    "data-plasmo-place-order-blocked",
    permit.isValid() ? "false" : "true"
  )
})
