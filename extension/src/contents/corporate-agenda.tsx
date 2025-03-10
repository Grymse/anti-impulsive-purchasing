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
import { Label } from "~components/ui/label"
import { useScaling } from "~hooks/useScaling"
import { sendAnalytics } from "~lib/analytics"
import { getters } from "~lib/getters"
import { observer } from "~lib/observer"
import { settings } from "~lib/settings"

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
    "https://ugmonk.com/*",
    "https://shop.app/*"
  ],
  all_frames: true
}

// Reusable countdown timer component
interface CountdownTimerProps {
  countdown: number
  className?: string
}

const CountdownTimer = ({ countdown, className = "" }: CountdownTimerProps) => {
  if (countdown <= 0) return null

  return (
    <div
      className={`bg-blue-50 border-2 border-blue-300 rounded-md p-3 flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-blue-700 mb-1">{countdown}</div>
        <div className="text-xs text-blue-700">seconds remaining</div>
        <div className="w-full mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(10 - countdown) * 10}%` }}></div>
        </div>
      </div>
    </div>
  )
}

// Define marketing tactic categories and examples
const marketingTactics = [
  {
    category: "Artificial Scarcity",
    examples: [
      "Limited time offers that aren't actually limited",
      '"Only X left in stock" messages that may be fabricated',
      "Exclusive collections that become regular items later",
      "Flash sales that recur frequently"
    ],
    description:
      "Creating a false sense of limited availability to drive immediate purchasing decisions."
  },
  {
    category: "Social Proof Manipulation",
    examples: [
      "Fake review counts or ratings",
      "Inflated popularity metrics",
      '"Customers also bought" recommendations',
      '"Trending now" labels that may not be accurate'
    ],
    description:
      "Exploiting your natural tendency to trust what others have supposedly chosen or recommended."
  },
  {
    category: "Dark Patterns",
    examples: [
      "Hidden costs revealed only at checkout",
      "Pre-ticked add-on services",
      "Difficult cancellation processes",
      "Countdown timers creating false urgency"
    ],
    description:
      "Deceptive user interface designs that trick you into actions you might not otherwise take."
  },
  {
    category: "Price Manipulation",
    examples: [
      'Artificial price anchoring (inflated "original" prices)',
      "Dynamic pricing based on your browsing history",
      "Bundle deals that include unwanted items",
      "Subscription traps with complicated cancellation"
    ],
    description:
      "Tactics that make you believe you're getting a better deal than you actually are."
  },
  {
    category: "Data Harvesting",
    examples: [
      "Tracking your shopping habits to target you later",
      "Selling your personal information to third parties",
      "Using AI to predict and manipulate your next purchase",
      "Creating personalized pricing based on your spending patterns"
    ],
    description:
      "Collecting your personal data to build profiles that help companies extract more money from you."
  }
]

// Define the main component interface
interface CorporateGreedAwarenessProps {
  onContinue: () => void
  onCancel: () => void
}

function CorporateGreedAwareness({
  onContinue,
  onCancel
}: CorporateGreedAwarenessProps) {
  const [currentCategory, setCurrentCategory] = useState<number | null>(null)
  const [acknowledged, setAcknowledged] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { scale } = useScaling()

  // Countdown timer effect when accordion is opened
  useEffect(() => {
    let timerId: NodeJS.Timeout

    if (currentCategory !== null && countdown > 0) {
      timerId = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1))
      }, 1000)
    }

    return () => {
      if (timerId) clearInterval(timerId)
    }
  }, [currentCategory, countdown])

  const handleAcknowledge = () => {
    setAcknowledged(true)
    sendAnalytics("corporate_agenda_acknowledge", {
      category:
        currentCategory !== null
          ? marketingTactics[currentCategory].category
          : "all"
    })
  }

  const handleContinue = () => {
    sendAnalytics("corporate_agenda_continue", {
      acknowledged
    })
    onContinue()
  }

  const renderMainView = () => (
    <div className="flex flex-col gap-6">
      <div className="p-4 border rounded-lessmd bg-red-50">
        <h3 className="font-semibold text-lg text-red-700 mb-2">
          Before you spend your hard-earned money...
        </h3>
        <p className="text-sm mb-4">
          Be aware of these common marketing tactics designed to manipulate you
          into impulse purchases:
        </p>

        {countdown > 0 && (
          <CountdownTimer countdown={countdown} className="mb-4" />
        )}

        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          onValueChange={(value) => {
            console.log("value", value)
            if (value && value.length !== 0) {
              const index = parseInt(value)
              setCurrentCategory(index)
              setCountdown(10) // Start countdown from 10 when opened
              sendAnalytics("corporate_agenda_select_category", {
                category: marketingTactics[index].category
              })
            } else {
              if (currentCategory !== null) {
                sendAnalytics("corporate_agenda_collapse_category", {
                  category: marketingTactics[currentCategory].category
                })
                setCurrentCategory(null)
                setCountdown(0)
              }
            }
          }}
          value={
            currentCategory !== null ? currentCategory.toString() : undefined
          }>
          {marketingTactics.map((tactic, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="border rounded-lessmd bg-white data-[state=open]:border-red-400 data-[state=open]:shadow-sm">
              <AccordionTrigger className="px-3 py-2 hover:no-underline">
                <h4 className="font-medium">{tactic.category}</h4>
              </AccordionTrigger>
              <AccordionContent className="px-3">
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{tactic.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lessmd">
                    <p className="text-xs font-medium mb-1">Common examples:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tactic.examples.map((example, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-1">•</span> {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={handleAcknowledge}
          disabled={countdown !== 0}>
          Continue
        </Button>
      </div>
    </div>
  )

  const renderAcknowledgedView = () => (
    <div className="flex flex-col gap-6">
      <div className="p-4 border rounded-lessmd bg-red-50">
        <h3 className="font-semibold text-lg text-red-700 mb-2">
          One final thought...
        </h3>
        <p className="text-sm mb-4">
          Remember that corporations spend billions on research to understand
          your psychology better than you do. Their goal is to extract maximum
          profit, not to improve your wellbeing.
        </p>

        <div className="bg-white p-4 rounded-lessmd border border-red-200">
          <p className="text-sm font-medium mb-2">Ask yourself:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Am I being
              manipulated into this purchase?
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Would I
              still buy this without the marketing pressure?
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Is this
              product actually worth the price, or am I paying for marketing?
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-full text-white" onClick={handleContinue}>
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  return (
    <div
      className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center"
      onClick={onCancel}>
      <Card
        style={{
          transform: `scale(${scale})`
        }}
        className="max-w-xl bg-white rounded-lesslg overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <CardHeader className="bg-red-600 text-white rounded-lesst-lg">
          <CardTitle>Marketing Awareness Check</CardTitle>
          <CardDescription className="text-red-100">
            Recognize how companies are trying to influence your purchase
            decision
          </CardDescription>
        </CardHeader>
        <CardContent>
          {acknowledged ? renderAcknowledgedView() : renderMainView()}
        </CardContent>
      </Card>
    </div>
  )
}

type F = () => void
let createGreedAwareness: ({ onFinish }: { onFinish: F }) => void

export default function CorporateAgenda() {
  const [show, setShow] = useState(false)
  const onFinish = useRef<null | F>(null)

  // Here we assign the function that can be called outside the component.
  createGreedAwareness = ({ onFinish: f }) => {
    setShow(true)
    onFinish.current = f
  }

  const handleContinue = () => {
    setShow(false)
    onFinish.current?.()
  }

  const handleCancel = () => {
    sendAnalytics("cancel", undefined)
    setShow(false)
  }

  if (!show) return null

  return (
    <CorporateGreedAwareness
      onContinue={handleContinue}
      onCancel={handleCancel}
    />
  )
}

const onPlaceOrderClick = (e: Event) => {
  const isBlocked =
    document.body.getAttribute("data-plasmo-place-order-blocked") === "true"
  if (!isBlocked) return // If the button is not blocked, we don't need to show the intervention

  e.preventDefault()
  e.stopPropagation()

  createGreedAwareness({
    onFinish: () => {
      document.body.setAttribute("data-plasmo-place-order-blocked", "false")

      const button = e.target as HTMLButtonElement
      button.click()
    }
  })
}

// Key for storing the last suggestion timestamp in browser storage
const LAST_SUGGESTION_KEY = "corporate_agenda_last_suggestion_time"
const SUGGESTION_INTERVAL = 1000 * 60 * 3 // 3 minutes

// Function to check if it's time to show a suggestion based on stored timestamp
const shouldShowSuggestion = async (): Promise<boolean> => {
  try {
    const data = await chrome.storage.local.get(LAST_SUGGESTION_KEY)
    const lastSuggestionTime = data[LAST_SUGGESTION_KEY] as number
    const currentTime = Date.now()

    // If no previous suggestion or it's been more than SUGGESTION_INTERVAL since last suggestion
    if (
      !lastSuggestionTime ||
      currentTime - lastSuggestionTime >= SUGGESTION_INTERVAL
    ) {
      return true
    }

    return false
  } catch (error) {
    console.error("Error checking suggestion timing:", error)
    return false
  }
}

// Function to update the last suggestion timestamp
const updateLastSuggestionTime = async (): Promise<void> => {
  try {
    await chrome.storage.local.set({ [LAST_SUGGESTION_KEY]: Date.now() })
  } catch (error) {
    console.error("Error updating suggestion timestamp:", error)
  }
}

// Function to present the corporate agenda intervention
const showCorporateAgendaIntervention = () => {
  // Check if user is still on the page and the extension is active
  if (
    document.hidden ||
    !settings.value.active ||
    !settings.value.activeStrategies.includes("corporate-agenda")
  ) {
    return
  }

  createGreedAwareness({
    onFinish: () => {
      // Update the timestamp when modal is closed
      updateLastSuggestionTime()
    }
  })

  // Update the timestamp
  updateLastSuggestionTime()
}

// Function to start checking for suggestion timing
const startSuggestionCheck = () => {
  // Run the check every 10 seconds
  const checkInterval = 10000

  // Set up the interval for checking
  const intervalId = setInterval(async () => {
    // Check if it's time to show a suggestion
    const shouldShow = await shouldShowSuggestion()

    if (shouldShow) {
      showCorporateAgendaIntervention()
    }
  }, checkInterval)

  // Return a cleanup function
  return () => {
    clearInterval(intervalId)
  }
}

settings.onInit((settings) => {
  if (
    !settings.active ||
    !settings.activeStrategies.includes("corporate-agenda")
  )
    return

  observer.addEffect((signal) => {
    document.body.setAttribute("data-plasmo-place-order-blocked", "true")

    const domainGetters = getters.getDomainGetters()
    domainGetters.placeOrderButtons(document.body).forEach((button) => {
      button.addEventListener("click", onPlaceOrderClick)
    }, signal)

    domainGetters.getOneClickBuyNow?.(document.body)?.forEach((p) => {
      p.button?.addEventListener("click", onPlaceOrderClick)
    }, signal)

    // Start the suggestion check system
    const cleanup = startSuggestionCheck()

    // If tab becomes visible, check if we should show a suggestion
    document.addEventListener(
      "visibilitychange",
      async () => {
        if (!document.hidden) {
          // Only check but don't force a suggestion
          const shouldShow = await shouldShowSuggestion()
          if (shouldShow) {
            showCorporateAgendaIntervention()
          }
        }
      },
      signal
    )

    // Clean up the interval when the effect is cleaned up
    return cleanup
  })
})
