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
    "https://ugmonk.com/*",
    "https://shop.app/*"
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
      <div className="border p-4 rounded-lessmd bg-gray-50">
        <h3 className="font-medium text-lg">Monthly Subscription Value</h3>

        <div className="mt-3 mb-4">
          <Label htmlFor="monthly-amount-lessinput" className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="monthly-amount-lessinput"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-lessmd"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lessmd">
          <p className="text-center font-medium text-xl">
            {formatCurrency(editableAmount / 12, currency)} per month
          </p>
          <p className="text-sm text-lessmuted-foreground mt-2">
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
      <div className="border p-4 rounded-lessmd bg-gray-50">
        <h3 className="font-medium text-lg">Savings Goal Contribution</h3>

        <div className="mt-3 mb-4">
          <Label htmlFor="savings-amount-lessinput" className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="savings-amount-lessinput"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-lessmd"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lessmd">
          <p className="text-center font-medium text-xl">
            {formatCurrency(editableAmount, currency)}
          </p>
          <p className="text-sm text-lessmuted-foreground mt-2">
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
      <div className="border p-4 rounded-lessmd bg-gray-50">
        <h3 className="font-medium text-lg">Investment Growth Potential</h3>

        <div className="mt-3 mb-4">
          <Label
            htmlFor="investment-amount-lessinput"
            className="text-sm mb-1 block">
            Adjust Amount:
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{currency}</span>
            <input
              id="investment-amount-lessinput"
              type="number"
              value={editableAmount}
              onChange={handleAmountChange}
              min="1"
              className="w-full p-2 border rounded-lessmd"
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
            className="w-full h-2 bg-gray-200 rounded-lesslg appearance-none cursor-pointer mt-2"
          />

          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>1 yr</span>
            <span>15 yrs</span>
            <span>30 yrs</span>
          </div>

          <div className="flex flex-col gap-2 mt-4 p-4 bg-white rounded-lessmd">
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
      <div className="p-4 border rounded-lessmd bg-gray-50">
        <Label htmlFor="amount-lessinput" className="font-medium mb-2 block">
          Purchase Amount:
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{currency}</span>
          <input
            id="amount-lessinput"
            type="number"
            value={editableAmount}
            onChange={handleAmountChange}
            min="1"
            className="w-full p-2 border rounded-lessmd"
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
            className="border p-4 rounded-lessmd cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onSelectOption(alt.id)}>
            <h3 className="font-medium">{alt.title}</h3>
            <p className="text-sm text-lessmuted-foreground">{alt.description}</p>
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

  const {scale} = useScaling();
  
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
