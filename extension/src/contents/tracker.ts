// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";
import { observer } from "~lib/observer";
import { Stopwatch } from "ts-stopwatch";
import { sendAnalytics } from "~lib/analytics";
import { PersistentValue } from "~lib/utils";
import { settings } from "~lib/settings";
import { cart, purchases } from "~lib/purchases";

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

const INTERVAL_LENGTH = 1000 * 5; // 5 seconds

function effect(signal: {signal: AbortSignal}) {
  const addToCartButtons = getters.getDomainGetters().addToCartButtons(document.body);
  const placeOrderButtons = getters.getDomainGetters().placeOrderButtons(document.body);
  const checkoutButtons = getters.getDomainGetters().checkoutButtons(document.body);
  const oneClickBuy = getters.getDomainGetters().getOneClickBuyNow?.(document.body);

  checkoutButtons.forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  }, signal);

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
  }, signal);

  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  }, signal);

  oneClickBuy?.forEach((p) => {
    p.button?.addEventListener("click", (e) => {onInstantBuyClick([p.item]); e.stopPropagation; e.preventDefault()});
  }, signal);

  saveCurrentItems();
}

function onInstantBuyClick(items: ShoppingItem[]) {
  const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
  if (isBlocked) return;
  
  purchases.value = purchases.value.concat({time: Date.now(), items});
  sendAnalytics('place-order', items);
}

function onPlaceOrderClick(e: MouseEvent) {
  const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
  if (isBlocked) return;

  const target = e.target as HTMLElement;
  if((target).id === "less-inner-button-text") {
    target.remove();
  }

  purchases.value = purchases.value.concat({time: Date.now(), items: cart.value ?? []});
  sendAnalytics('place-order', cart.value ?? []);
}

function saveCurrentItems() {
  const items = getters.getDomainGetters().getCartItems(document.body);
  if(items.length === 0) return;

  if(process.env.NODE_ENV === "development")
    console.log("save items", items);

  cart.value = items;
}

function onCheckoutClick(e: MouseEvent) {
  const isBlocked = document.body.getAttribute('data-plasmo-checkout-blocked') === "true";
  if (isBlocked) return;

  sendAnalytics('checkout', undefined);
}

function onAddToCartClick(e: Event) {
  sendAnalytics('add-to-cart', undefined);
}

function setupTimeMeasurement() {
  const stopWatch = new Stopwatch();
  stopWatch.start();

  // Is triggered by the browser when the tab is hidden or visible
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopWatch.stop() : stopWatch.start();
  });

  // If another application is opened on top of the browser, the focus changes
  window.addEventListener("focus", () => {
    stopWatch.start();
  });

  window.addEventListener("blur", () => {
    stopWatch.stop();
  });

  const sendTimeEvent = () => {
    if (!stopWatch.isRunning()) return;
    sendAnalytics('time-spent', {duration: stopWatch.getTime()});
    stopWatch.start(true);
  }

  setInterval(sendTimeEvent, INTERVAL_LENGTH); // Every so often
  window.addEventListener("beforeunload", sendTimeEvent); // When the tab is closed
}

settings.onInit((settings) => {
  if (!settings.active) return;
  setupTimeMeasurement();
  observer.addEffect(effect)
  sendAnalytics('page-view', undefined);
});