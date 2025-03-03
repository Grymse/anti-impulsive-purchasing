import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import "../style.css"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Label } from "~components/ui/label"
import { Badge } from "~components/ui/badge"
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
    "https://www.temu.com/*",
    "https://www.amazon.de/*",
    "https://www.amazon.co.uk/*",
    "https://www.amazon.se/*",
    "https://*.ebay.co.uk/*",
    "https://*.ebay.de/*",
    "https://www.harald-nyborg.dk/*",
    "https://jysk.dk/*",
    "https://www.zalando.dk/*",
    "https://www.matas.dk/*",
    "https://www.proshop.dk/*",
    "https://www.elgiganten.dk/*",
    "https://www.magasin.dk/*",
    "https://www.jemogfix.dk/*",
    "https://www.bilka.dk/*",
    "https://www.foetex.dk/*",
    "https://www.saxo.com/*",
    "https://www.thansen.dk/*",
    "https://www.imerco.dk/*",
    "https://www.xl-byg.dk/*",
    "https://www.sport24.dk/*",
    "https://www.bog-ide.dk/*",
    "https://www.power.dk/*",
    "https://www.Plantorama.dk/*",
    "https://www.kop-kande.dk/*",
    "https://www.avxperten.dk/*",
    "https://www.fleggaard.dk/*",
    "https://ilva.dk/*",
    "https://www.sportsworld.dk/*",
    "https://www.telenor.dk/*",
    "https://www.kids-world.dk/*",
    "https://www.telia.dk/*",
    "https://www.10-4.dk/*",
    "https://www.asos.com/*",
    "https://www.billigvvs.dk/*",
    "https://intersport.dk/*",
    "https://www.ticketmaster.dk/*",
    "https://www.telmore.dk/*",
    "https://www.ditur.dk/*",
    "https://www.quint.dk/*",
    "https://www.maxizoo.dk/*",
    "https://www.fribikeshop.dk/*",
    "https://www.just-eat.dk/*",
    "https://www.bygma.dk/*",
    "https://www.williamdam.dk/*",
    "https://www.av-cables.dk/*",
    "https://www.plantetorvet.dk/*",
    "https://salling.dk/*",
    "https://luksusbaby.dk/*",
    "https://www.apotekeren.dk/*",
    "https://www.lampeguru.dk/*",
    "https://www.billetlugen.dk/*",
    "https://www.computersalg.dk/*",
    "https://havehandel.dk/*",
    "https://www.sinful.dk/*",
    "https://www.kaufmann.dk/*",
    "https://www.callme.dk/*",
    "https://www.hyggeonkel.dk/*",
    "https://legeakademiet.dk/*",
    "https://www.lampemesteren.dk/*",
    "https://www.zooplus.dk/*",
    "https://www.loebeshop.dk/*",
    "https://loberen.dk/*",
    "https://www.cocopanda.dk/*",
    "https://www.calle.dk/*",
    "https://www.mytrendyphone.dk/*",
    "https://www.jacobsenplus.dk/*",
    "https://greenmind.dk/*",
    "https://www.cchobby.dk/*",
    "https://www.komplett.dk/*",
    "https://www.billigparfume.dk/*",
    "https://www.faraos.dk/*",
    "https://www.feline.dk/*",
    "https://www.kitchenone.dk/*",
    "https://moebelkompagniet.dk/*",
    "https://www.luxoliving.dk/*",
    "https://www.av-connection.dk/*",
    "https://sneakerzone.dk/*",
    "https://www.partyking.dk/*",
    "https://www.bygmax.dk/*",
    "https://www.daells-bolighus.dk/*",
    "https://www.greenline.dk/*",
    "https://www.punkt1.dk/*",
    "https://www.illumsbolighus.dk/*",
    "https://www.lirumlarumleg.dk/*",
    "https://www.coolstuff.dk/*",
    "https://www.mobilcovers.dk/*",
    "https://www.grejfreak.dk/*",
    "https://www.flugger.dk/*",
    "https://ingvardchristensen.dk/*",
    "https://mobler.dk/*",
    "https://www.adidas.dk/*",

    // ----- Common domains -----
    "https://*.shein.com/*",
    "https://www.apple.com/*",
    "https://www2.hm.com/*",
    "https://www.boozt.com/*",

    // ----- American domains -----
    "https://*.ebay.com/*",
    "https://www.amazon.com/*",
    "https://www.target.com/*",
    "https://www.homedepot.com/*",
    "https://www.costco.com/*",
    "https://www.bestbuy.com/*",
    "https://www.costco.com/*",
    "https://www.kroger.com/*",
    "https://www.aliexpress.com/*",
    "https://www.etsy.com/*",
    "https://www.adidas.com/*",
    "https://www.samsung.com/*",
    "https://www.nike.com/*",
    "https://www.wayfair.com/*",
    "https://www.lowes.com/*",
    "https://www.macys.com/*",
    "https://www.chewy.com/*",
    "https://www.gap.com/*",
    "https://www.wish.com/*",
    "https://www.lg.com/*",
    "https://www.dell.com/*",
    "https://www.kohls.com/*",
    "https://www.walgreens.com/*",
    "https://www.lenovo.com/*",
    "https://www.zara.com/*",
    "https://www.hp.com/*",
    "https://www.ikea.com/*",
    "https://www.nordstrom.com/*",
    "https://us.shein.com/*",

    // ----- 100 Shopify domains -----
    "https://klaedeskabet.dk/*",
    "https://www.fashionnova.com/*",
    "https://kyliecosmetics.com/*",
    "https://colourpop.com/*",
    "https://jeffreestarcosmetics.com/*",
    "https://www.gymshark.com/*",
    "https://www.allbirds.com/*",
    "https://www.brooklinen.com/*",
    "https://ruggable.com/*",
    "https://shop.ruggable.com/*", // subdomain
    "https://www.chubbiesshorts.com/*",
    "https://checkout.chubbiesshorts.com/*",
    "https://www.puravidabracelets.com/*",
    "https://www.nativecos.com/*",
    "https://www.hauslabs.com/*",
    "https://skknbykim.com/*",
    "https://www.harney.com/*",
    "https://www.redbullshopus.com/*",
    "https://tula.com/*",
    "https://checkout.tula.com/*",
    "https://shop.tesla.com/*", // subdomain
    "https://spiritualgangster.com/*",
    "https://www.taylorstitch.com/*",
    "https://www.american-giant.com/*",
    "https://www.drsquatch.com/*",
    "https://mejuri.com/*",
    "https://checkout-uk.mejuri.com/*", // subdomain
    "https://www.peets.com/*",
    "https://www.deathwishcoffee.com/*",
    "https://hellotushy.com/*",
    "https://www.bando.com/*",
    "https://www.moroccanoil.com/*",
    "https://negativeunderwear.com/*",
    "https://birdies.com/*",
    "https://naadam.co/*",
    "https://www.popflexactive.com/*",
    "https://www.moderncitizen.com/*",
    "https://greatjonesgoods.com/*",
    "https://pinklily.com/*",
    "https://misen.com/*",
    "https://materialkitchen.com/*",
    "https://shop.hedleyandbennett.com/*",
    "https://www.rumpl.com/*",
    "https://checkout.mizzenandmain.com/*",
    "https://ohpolly.com/*",
    "https://checkout.tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://www.trueclassictees.com/*",
    "https://checkout.meundies.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://www.luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://www.everlast.com/*",
    "https://checkout.skims.com/*",
    "https://feals.com/*",
    "https://us.foursigmatic.com/*",
    "https://golde.co/*",
    "https://shop.liquid-iv.com/*",
    "https://www.thesill.com/*",
    "https://www.wearlively.com/*",
    "https://andieswim.com/*",
    "https://yourparade.com/*",
    "https://brightland.co/*",
    "https://omsom.com/*",
    "https://jenis.com/*",
    "https://snowehome.com/*",
    "https://www.graza.co/*",
    "https://shop.flybyjing.com/*",
    "https://getmaude.com/*",
    "https://ugmonk.com/*"
  ],
  all_frames: true
}

// Define marketing tactic categories and examples
const marketingTactics = [
  {
    category: "Artificial Scarcity",
    examples: [
      "Limited time offers that aren't actually limited",
      "\"Only X left in stock\" messages that may be fabricated",
      "Exclusive collections that become regular items later",
      "Flash sales that recur frequently"
    ],
    description: "Creating a false sense of limited availability to drive immediate purchasing decisions."
  },
  {
    category: "Social Proof Manipulation",
    examples: [
      "Fake review counts or ratings",
      "Inflated popularity metrics",
      "\"Customers also bought\" recommendations",
      "\"Trending now\" labels that may not be accurate"
    ],
    description: "Exploiting your natural tendency to trust what others have supposedly chosen or recommended."
  },
  {
    category: "Dark Patterns",
    examples: [
      "Hidden costs revealed only at checkout",
      "Pre-ticked add-on services",
      "Difficult cancellation processes",
      "Countdown timers creating false urgency"
    ],
    description: "Deceptive user interface designs that trick you into actions you might not otherwise take."
  },
  {
    category: "Price Manipulation",
    examples: [
      "Artificial price anchoring (inflated \"original\" prices)",
      "Dynamic pricing based on your browsing history",
      "Bundle deals that include unwanted items",
      "Subscription traps with complicated cancellation"
    ],
    description: "Tactics that make you believe you're getting a better deal than you actually are."
  },
  {
    category: "Data Harvesting",
    examples: [
      "Tracking your shopping habits to target you later",
      "Selling your personal information to third parties",
      "Using AI to predict and manipulate your next purchase",
      "Creating personalized pricing based on your spending patterns"
    ],
    description: "Collecting your personal data to build profiles that help companies extract more money from you."
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

  const handleCategorySelect = (index: number) => {
    // Toggle - if same category is clicked again, collapse it
    if (currentCategory === index) {
      setCurrentCategory(null)
      sendAnalytics("corporate_agenda_collapse_category", {
        category: marketingTactics[index].category
      })
    } else {
      setCurrentCategory(index)
      sendAnalytics("corporate_agenda_select_category", {
        category: marketingTactics[index].category
      })
    }
  }
  
  const handleAcknowledge = () => {
    setAcknowledged(true)
    sendAnalytics("corporate_agenda_acknowledge", {
      category: currentCategory !== null ? marketingTactics[currentCategory].category : "all"
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
      <div className="p-4 border rounded-md bg-red-50">
        <h3 className="font-semibold text-lg text-red-700 mb-2">Before you spend your hard-earned money...</h3>
        <p className="text-sm mb-4">
          Be aware of these common marketing tactics designed to manipulate you into impulse purchases:
        </p>
        
        <div className="grid gap-3">
          {marketingTactics.map((tactic, index) => (
            <div
              key={index}
              className={`border p-3 rounded-md cursor-pointer transition-colors ${
                currentCategory === index ? "bg-white border-red-400 shadow-sm" : "hover:bg-white"
              }`}
              onClick={() => handleCategorySelect(index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{tactic.category}</h4>
                <Badge variant="outline" className="text-xs">
                  {currentCategory === index ? "▼" : "▶"}
                </Badge>
              </div>
              {currentCategory === index && (
                <div className="mt-3 space-y-3">
                  <p className="text-sm text-gray-700">{tactic.description}</p>
                  <div className="bg-gray-50 p-3 rounded-md">
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
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white" 
          onClick={handleAcknowledge}
          disabled={currentCategory === null}
        >
          Continue
        </Button>
      </div>
    </div>
  )

  const renderAcknowledgedView = () => (
    <div className="flex flex-col gap-6">
      <div className="p-4 border rounded-md bg-red-50">
        <h3 className="font-semibold text-lg text-red-700 mb-2">One final thought...</h3>
        <p className="text-sm mb-4">
          Remember that corporations spend billions on research to understand your psychology better than you do. 
          Their goal is to extract maximum profit, not to improve your wellbeing.
        </p>
        
        <div className="bg-white p-4 rounded-md border border-red-200">
          <p className="text-sm font-medium mb-2">Ask yourself:</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Am I being manipulated into this purchase?
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Would I still buy this without the marketing pressure?
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">→</span> Is this product actually worth the price, or am I paying for marketing?
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          className="w-full text-white" 
          onClick={handleContinue}
        >
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  return (
    <div
      className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center"
      onClick={onCancel}>
      <Card className="max-w-xl bg-white" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="bg-red-600 text-white">
          <CardTitle>Marketing Awareness Check</CardTitle>
          <CardDescription className="text-red-100">
            Recognize how companies are trying to influence your purchase decision
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
    sendAnalytics("corporate_agenda_cancel", undefined)
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
  })
})