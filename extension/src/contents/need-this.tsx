import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState, type MouseEventHandler } from "react"

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
import { Progress } from "~components/ui/progress"
import { Textarea } from "~components/ui/textarea"
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
    "https://www.temu.com/*",
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
    "https://*.chubbiesshorts.com/*",
    "https://www.puravidabracelets.com/*",
    "https://www.nativecos.com/*",
    "https://www.hauslabs.com/*",
    "https://skknbykim.com/*",
    "https://www.harney.com/*",
    "https://www.redbullshopus.com/*",
    "https://tula.com/*",
    "https://*.tula.com/*",
    "https://*.tesla.com/*", // subdomain
    "https://spiritualgangster.com/*",
    "https://www.taylorstitch.com/*",
    "https://www.american-giant.com/*",
    "https://www.drsquatch.com/*",
    "https://mejuri.com/*",
    "https://*.mejuri.com/*",
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
    "https://*.mizzenandmain.com/*",
    "https://ohpolly.com/*",
    "https://*.tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://www.trueclassictees.com/*",
    "https://*.meundies.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://www.luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://www.everlast.com/*",
    "https://*.skims.com/*",
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

type Question = {
  label: string
  title: string
  minWords: number
  content: string
}

const questions: Array<Question> = [
  {
    label: "Need",
    title: "Why do you really need this?",
    minWords: 5,
    content: ""
  },
  {
    label: "Like",
    title: "What do you like about these products?",
    minWords: 5,
    content: ""
  },
  {
    label: "Dislike",
    title: "Why would it be a good idea not to buy this?",
    minWords: 5,
    content: ""
  },
  {
    label: "Alternative",
    title: "What alternatives could you invest your time and money in?",
    minWords: 5,
    content: ""
  }
]

type F = () => void
let createQuestionary: ({ onFinish }: { onFinish: F }) => void

export default function needThis() {
  const [show, setShow] = useState(false)
  const onFinish = useRef<null | F>(null)
  const [text, setText] = useState("")
  const [page, setPage] = useState(questions[0].label)
  const [error, setError] = useState<string | null>(null)
  const labels = questions.map((question) => question.label)
  const currentQuestion = questions.find((question) => question.label === page)

  const textfieldSufficient =
    text.split(" ").filter((word) => word.length > 0).length >=
    currentQuestion.minWords
  const isLast = labels.indexOf(page) === labels.length - 1
  const isFirst = labels.indexOf(page) === 0

  // Here we assign the function that can be called outside the component.
  // This is a way to communicate between the content script and the popup-questionary.
  createQuestionary = ({ onFinish: f }) => {
    setShow(true)
    onFinish.current = f
  }

  useEffect(() => {
    currentQuestion.content = text
    if (textfieldSufficient) setError(null)
  }, [text])

  useEffect(() => {
    setText(currentQuestion.content)
  }, [page])

  const onNext: MouseEventHandler = () => {
    if (!textfieldSufficient) {
      setError(`Please enter atleast ${currentQuestion.minWords} words`)
      return
    }

    sendAnalytics("answer", { question: currentQuestion.title, answer: text })

    if (isLast) {
      submit()
      return
    }

    setPage(labels[labels.indexOf(page) + 1])
  }

  const onPrevious: MouseEventHandler = () => {
    if (isFirst) {
      cancel()
      return
    }

    setPage(labels[labels.indexOf(page) - 1])
  }

  const cancel = () => {
    sendAnalytics("cancel", undefined)
    setShow(false)
  }

  const submit = () => {
    setShow(false)
    onFinish.current?.()
  }

  if (!show) return null

  const isShopify = document
    .querySelector("link")
    .href.includes("https://cdn.shopify.com")

  return (
    <div
      id="popover-questionary"
      className={`fixed text-base ${isShopify ? "transform scale-150" : ""} bg-black/75 z-50 w-screen h-screen flex items-center justify-center`}
      onClick={cancel}>
      <Card className="max-w-xl bg-white" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Reflection Questions</CardTitle>
          <CardDescription>
            Before committing to the purchase, please reflect on the following
            questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress labels={labels} current={page} />
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
              <Label htmlFor={currentQuestion.label}>
                {currentQuestion.title}
              </Label>
              <div className="relative">
                <Textarea
                  id={currentQuestion.label}
                  className="resize-none h-48"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <p
                  className={`text-xs absolute bottom-1 right-4 ${textfieldSufficient ? "hidden" : "text-destructive"}`}>
                  Mininimum {currentQuestion.minWords} words
                </p>
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
            <div className="flex justify-between gap-4">
              <Button variant="outline" className="w-full" onClick={onPrevious}>
                {isFirst ? "Cancel" : "Previous"}
              </Button>
              <Button type="submit" className="w-full" onClick={onNext}>
                {isLast ? "Continue to purchase" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const onPlaceOrderClick = (e: Event) => {
  const isBlocked =
    document.body.getAttribute("data-plasmo-place-order-blocked") === "true"
  if (!isBlocked) return // If the button is not blocked, we don't need to show the questionary.

  e.preventDefault()
  e.stopPropagation()

  createQuestionary({
    onFinish: () => {
      document.body.setAttribute("data-plasmo-place-order-blocked", "false")

      const button = e.target as HTMLButtonElement
      button.click()
    }
  })
}

settings.onInit((settings) => {
  if (!settings.active || !settings.activeStrategies.includes("need-this"))
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
