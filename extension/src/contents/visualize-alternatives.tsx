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

interface AlternativeInvestmentProps {
  amount: number
  currency: string
  onContinue: () => void
  onCancel: () => void
  selectedOption: AlternativeOption
  onSelectOption: (option: AlternativeOption) => void
  onBack: () => void
}

function calculateInvestmentGrowth(
  initialAmount: number,
  years: number,
  rate: number = 0.07
): number {
  // Compound interest formula: A = P(1 + r)^t
  return initialAmount * Math.pow(1 + rate, years)
}

function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

type AlternativeOption = "initial" | "monthly" | "savings" | "investment"

function AlternativeInvestment({
  amount,
  currency,
  onContinue,
  onCancel,
  selectedOption,
  onSelectOption,
  onBack
}: AlternativeInvestmentProps) {
  const [years, setYears] = useState(10)
  const [editableAmount, setEditableAmount] = useState(amount)

  useEffect(() => {
    // Update editable amount when prop changes
    setEditableAmount(amount)
  }, [amount])

  // Calculate growth for different time periods based on the editable amount
  const growth5Years = calculateInvestmentGrowth(editableAmount, 5)
  const growth10Years = calculateInvestmentGrowth(editableAmount, 10)
  const growth20Years = calculateInvestmentGrowth(editableAmount, 20)
  const growth30Years = calculateInvestmentGrowth(editableAmount, 30)

  // Calculate current growth based on slider
  const currentGrowth = calculateInvestmentGrowth(editableAmount, years)

  // Handle amount changes
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value > 0) {
      setEditableAmount(value)
    }
  }

  // Example alternatives based on editable amount
  const alternatives = [
    {
      id: "monthly" as AlternativeOption,
      title: "Monthly Subscription",
      description: `That's ${formatCurrency(editableAmount / 12, currency)} per month for a year of premium subscriptions`
    },
    {
      id: "savings" as AlternativeOption,
      title: "Savings Goal",
      description: `Could contribute to your savings goal for a ${editableAmount > 500 ? "vacation" : "weekend getaway"}`
    },
    {
      id: "investment" as AlternativeOption,
      title: "Investment Growth",
      description: `If invested, could grow to ${formatCurrency(growth10Years, currency)} in 10 years`
    }
  ]

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(parseInt(e.target.value))
  }

  const renderMonthlyContent = () => (
    <div className="flex flex-col gap-6">
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="font-medium text-lg">Monthly Subscription Value</h3>

        <div className="mt-3 mb-4">
          <Label htmlFor="monthly-amount-input" className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="monthly-amount-input"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-md">
          <p className="text-center font-medium text-xl">
            {formatCurrency(editableAmount / 12, currency)} per month
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Instead of a one-time purchase, this amount could get you a monthly
            subscription for an entire year.
          </p>
          <div className="mt-4 grid gap-2">
            <p className="text-sm">Examples of what this could get you:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Premium music or video streaming services</li>
              <li>Online learning platforms</li>
              <li>Meal kit subscription</li>
              <li>Magazine or newsletter subscriptions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="w-full" onClick={onContinue}>
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  const renderSavingsContent = () => (
    <div className="flex flex-col gap-6">
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="font-medium text-lg">Savings Goal Contribution</h3>

        <div className="mt-3 mb-4">
          <Label htmlFor="savings-amount-input" className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="savings-amount-input"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-md">
          <p className="text-center font-medium text-xl">
            {formatCurrency(editableAmount, currency)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This amount could be saved toward a meaningful financial goal.
          </p>
          <div className="mt-4 grid gap-2">
            <p className="text-sm">This could help you save for:</p>
            <ul className="list-disc list-inside text-sm">
              <li>
                {editableAmount > 500
                  ? "A vacation or travel experience"
                  : "A weekend getaway"}
              </li>
              <li>Emergency fund</li>
              <li>Down payment on a car or home</li>
              <li>Education or personal development</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="w-full" onClick={onContinue}>
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  const renderInvestmentContent = () => (
    <div className="flex flex-col gap-6">
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="font-medium text-lg">Investment Growth Potential</h3>

        <div className="mt-3 mb-4">
          <Label
            htmlFor="investment-amount-input"
            className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="investment-amount-input"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="years">Investment Growth Over Time (Years)</Label>
          <input
            type="range"
            id="years"
            min="1"
            max="30"
            value={years}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />

          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>1 yr</span>
            <span>15 yrs</span>
            <span>30 yrs</span>
          </div>

          <div className="flex flex-col gap-2 mt-4 p-4 bg-white rounded-md">
            <h3 className="font-medium text-center text-xl">
              {formatCurrency(currentGrowth, currency)}
            </h3>
            <p className="text-sm text-center">
              Potential value after {years} {years === 1 ? "year" : "years"}
            </p>

            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">5 Years</div>
                <div className="font-medium">
                  {formatCurrency(growth5Years, currency)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">10 Years</div>
                <div className="font-medium">
                  {formatCurrency(growth10Years, currency)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">20 Years</div>
                <div className="font-medium">
                  {formatCurrency(growth20Years, currency)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">30 Years</div>
                <div className="font-medium">
                  {formatCurrency(growth30Years, currency)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              *Based on historical average annual stock market return of 7%
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="w-full" onClick={onContinue}>
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  const renderInitialContent = () => (
    <div className="flex flex-col gap-6">
      <div className="p-4 border rounded-md bg-gray-50">
        <Label htmlFor="amount-input" className="font-medium mb-2 block">
          Purchase Amount:
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{currency}</span>
          <input
            id="amount-input"
            type="number"
            value={editableAmount}
            onChange={handleAmountChange}
            min="1"
            className="w-full p-2 border rounded-md"
            placeholder="Enter amount"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enter the amount you're planning to spend
        </p>
      </div>

      <p className="text-sm font-medium text-center mb-2 text-blue-600">
        Please explore one of these options before continuing
      </p>
      <div className="grid gap-4">
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            className="border p-4 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onSelectOption(alt.id)}>
            <h3 className="font-medium">{alt.title}</h3>
            <p className="text-sm text-muted-foreground">{alt.description}</p>
            <p className="text-xs text-blue-600 mt-2">Click to explore →</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 mt-2">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full"
          disabled
          title="Please explore one of the options above first">
          Continue with Purchase
        </Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (selectedOption) {
      case "monthly":
        return renderMonthlyContent()
      case "savings":
        return renderSavingsContent()
      case "investment":
        return renderInvestmentContent()
      default:
        return renderInitialContent()
    }
  }

  return (
    <div
      className="fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center"
      onClick={onCancel}>
      <Card className="max-w-xl bg-white" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Consider the Alternatives</CardTitle>
          <CardDescription>
            Before spending {formatCurrency(amount, currency)}, consider what
            else you could do with this money
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}

type F = () => void
let createVisualization: ({
  onFinish,
  amount,
  currency
}: {
  onFinish: F
  amount: number
  currency: string
}) => void

export default function VisualizeAlternatives() {
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState("")
  const [currentView, setCurrentView] = useState<AlternativeOption>("initial")
  const onFinish = useRef<null | F>(null)

  // Here we assign the function that can be called outside the component.
  createVisualization = ({ onFinish: f, amount: a, currency: c }) => {
    setShow(true)
    setAmount(a)
    setCurrency(c)
    setCurrentView("initial")
    onFinish.current = f
  }

  const handleContinue = () => {
    sendAnalytics("visualize_alternatives_continue", {
      amount,
      from: currentView
    })
    setShow(false)
    onFinish.current?.()
  }

  const handleCancel = () => {
    sendAnalytics("visualize_alternatives_cancel", {
      amount,
      from: currentView
    })
    setShow(false)
  }

  const handleOptionSelect = (option: AlternativeOption) => {
    sendAnalytics("visualize_alternatives_select_option", {
      amount,
      option
    })
    setCurrentView(option)
  }

  const handleBack = () => {
    sendAnalytics("visualize_alternatives_back", {
      amount,
      from: currentView
    })
    setCurrentView("initial")
  }

  if (!show) return null

  return (
    <AlternativeInvestment
      amount={amount}
      currency={currency}
      onContinue={handleContinue}
      onCancel={handleCancel}
      selectedOption={currentView}
      onSelectOption={handleOptionSelect}
      onBack={handleBack}
    />
  )
}

const onPlaceOrderClick = (e: Event) => {
  const isBlocked =
    document.body.getAttribute("data-plasmo-place-order-blocked") === "true"
  if (!isBlocked) return // If the button is not blocked, we don't need to show the visualization

  e.preventDefault()
  e.stopPropagation()

  // Simple approach to get cart amount
  let totalAmount = 0
  let currencySymbol = "$"

  try {
    // Try getting cart items from domain-specific getters only
    const domainGetters = getters.getDomainGetters()
    const cartItems = domainGetters.getCartItems(document.body)

    if (cartItems && cartItems.length > 0) {
      // Calculate total amount
      totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)

      // Get currency from first item
      currencySymbol = cartItems[0].currency || "$"
    }
  } catch (error) {
    console.error("Error determining cart total:", error)
  }

  // Set a default if we couldn't determine the amount
  if (totalAmount === 0 || isNaN(totalAmount)) {
    totalAmount = 100 // Default to $100
  }

  createVisualization({
    onFinish: () => {
      document.body.setAttribute("data-plasmo-place-order-blocked", "false")

      const button = e.target as HTMLButtonElement
      button.click()
    },
    amount: totalAmount,
    currency: currencySymbol
  })
}

settings.onInit((settings) => {
  if (
    !settings.active ||
    !settings.activeStrategies.includes("visualize-alternatives")
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
