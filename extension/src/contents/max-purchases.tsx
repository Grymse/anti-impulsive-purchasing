import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import "../style.css"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { sendAnalytics } from "~lib/analytics"
import { getters, type ShoppingItem } from "~lib/getters"
import { observer } from "~lib/observer"
import { settings } from "~lib/settings"
import StepProgress from "~components/ui/step-progress"
import { PersistentValue } from "~lib/utils"
import { Minus, Pencil, Plus } from "lucide-react"
import { cart, purchases } from "~lib/purchases"
import { useScaling } from "~hooks/useScaling"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const maxItemsValue = new PersistentValue("max-items", 3);

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

type F = () => void
let createMaxPurchases: ({ onFinish, amountOfItems }: { onFinish: F, amountOfItems: number }) => void

export default function maxPurchases() {
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [maxItems, setMaxItems] = useState(maxItemsValue.value);
  const [itemsInCart, setItemsInCart] = useState(0)
  const onFinish = useRef<null | F>(null)
  const {scale} = useScaling();

  // Here we assign the function that can be called outside the component.
  // This is a way to communicate between the content script and the popup-questionary.
  createMaxPurchases = ({ onFinish: f, amountOfItems }) => {
    setShow(true)
    onFinish.current = f
    setItemsInCart(amountOfItems)
  }

  useEffect(() => {
    const f = (value: number) => {
      setMaxItems(value)
    }
    maxItemsValue.onChange(f);
    maxItemsValue.onInit(f);

    return () => {
      maxItemsValue.removeOnChange(f);
    }
  }, []);


  if (!show) return null

  const cancel = () => {
    sendAnalytics("cancel", undefined)
    setShow(false)
  }

  const commitToPurchase = () => {
    onFinish.current?.()
    setShow(false)
  }

  const increaseMaxItems = () => {
    maxItemsValue.value = maxItemsValue.value + 1
  }

  const decreaseMaxItems = () => {
    if (maxItemsValue.value <= 1) return;
    maxItemsValue.value = maxItemsValue.value - 1
  }

  const current = currentlyPurchasedItems();

  const hasSufficient = (current + itemsInCart) <= maxItems
  const hasRunOut = current >= maxItems


  
  return (
    <div
    id="popover-questionary"
    className={`fixed bg-black/75 z-50 w-screen h-screen flex items-center justify-center`}
    onClick={cancel}>
      <Card
        style={{
          transform: `scale(${scale})`
        }}
        className="max-w-xl bg-white"
        onClick={(e) => e.stopPropagation()}>
        <CardHeader className="relative">
          <Button variant="secondary" className="w-10 absolute right-6" onClick={() => setShowEdit(!showEdit)}>
            <Pencil />
          </Button>
          <CardTitle>Limited purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mt-4 gap-8">
            <div className="flex flex-col gap-4">
            <p>
              You have purchased <span className={`${hasRunOut ? 'text-lessdestructive' : 'text-lessprimary'} font-bold text-xl`}>{current}</span> out of <span className={`${hasRunOut ? 'text-lessdestructive' : 'text-lessprimary'} font-bold text-xl`}>{maxItems}</span> items this month.
            </p>
            <div className="flex gap-2 items-center">
              {showEdit &&
                <Button variant="secondary" className="w-10" onClick={decreaseMaxItems}>
                  <Minus />
                </Button>
              }
            <StepProgress length={maxItems} current={current} />
              {showEdit &&
                <Button variant="secondary" className="w-10" onClick={increaseMaxItems}>
                  <Plus />
                </Button>
              }
            </div>
            </div>
            {hasSufficient ? (
              <p>You are about to use <span className="text-lessprimary font-bold">{itemsInCart}</span> of your remaining <span className="text-lessprimary font-bold">{maxItems - current}</span> items this month</p>
            ) : (
              <p>You do not have enough purchases left, to buy <span className="text-lessdestructive font-bold">{itemsInCart}</span> items</p>
            )}

            <div className="flex justify-between gap-4">
              <Button variant="outline" className="w-full" onClick={cancel}>
                Cancel
              </Button>
              {hasSufficient && <Button type="submit" className="w-full" onClick={commitToPurchase}>
                Continue to purchase
              </Button>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function currentlyPurchasedItems() {
  const currentPurchases = purchases.value; // Do some time-based filtering
  return currentPurchases.reduce((acc, purchase) => acc + purchase.items.reduce((acc,item) => acc + item.quantity, 0), 0);
}

const onPlaceOrderClick = (e: Event, item: ShoppingItem = undefined) => {
  const isBlocked =
    document.body.getAttribute("data-plasmo-place-order-blocked") === "true"
  if (!isBlocked) return // If the button is not blocked, we don't need to show the questionary.

  e.preventDefault()
  e.stopPropagation()

  const onFinish = () => {
    document.body.setAttribute("data-plasmo-place-order-blocked", "false")

    const button = e.target as HTMLButtonElement
    button.click()
  };

  if (item) {
    createMaxPurchases({
      amountOfItems: item.quantity,
      onFinish 
    })
  }
  
  cart.getFromStorage().then((cart) => {
    createMaxPurchases({
      amountOfItems: cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 1,
      onFinish 
    })
  });
}

settings.onInit((settings) => {
  if (!settings.active || !settings.activeStrategies.includes("max-purchases"))
    return

  observer.addEffect((signal) => {
    document.body.setAttribute("data-plasmo-place-order-blocked", "true")

    const domainGetters = getters.getDomainGetters()
    domainGetters.placeOrderButtons(document.body).forEach((button) => {
      button.addEventListener("click", onPlaceOrderClick)
    }, signal)

    domainGetters.getOneClickBuyNow?.(document.body)?.forEach((p) => {
      
      p.button?.addEventListener("click", (e) => onPlaceOrderClick(e, p.item))
    }, signal)
  })
})