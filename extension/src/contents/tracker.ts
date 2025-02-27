// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";
import { observer } from "~lib/observer";
import { Stopwatch } from "ts-stopwatch";
import { sendAnalytics } from "~lib/analytics";
import { PersistentValue } from "~lib/utils";
import { settings } from "~lib/settings";

export const config: PlasmoCSConfig = {
  matches: [
    // ----- Your original domains -----
    "https://www.amazon.com/*",
    "https://www.zalando.dk/*",
    "https://*.ebay.com/*",
    "https://www.matas.dk/*",
    "https://www.proshop.dk/*",
    "https://www.boozt.com/*",
    "https://www2.hm.com/*",
    "https://www.elgiganten.dk/*",

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
    "https://shop.tesla.com/*",    // subdomain
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
    "https://glossier.com/*",
    "https://hedleyandbennett.com/*",
    "https://starface.world/*",
    "https://youthtothepeople.com/*",
    "https://myhydro.hydroflask.com/*", // subdomain
    "https://rumpl.com/*",
    "https://therabody.com/*",
    "https://aesop.com/*",
    "https://iliabeauty.com/*",
    "https://mizzenandmain.com/*",
    "https://marinelayer.com/*",
    "https://ohpolly.com/*",
    "https://happysocks.com/*",
    "https://tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://trueclassictees.com/*",
    "https://meundies.com/*",
    "https://nuggetsofwisdom.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://everlast.com/*",
    "https://getstix.co/*",
    "https://skims.com/*",
    "https://feals.com/*",
    "https://foursigmatic.com/*",
    "https://golde.co/*",
    "https://liquid-iv.com/*",
    "https://readyjudy.com/*",
    "https://thesill.com/*",
    "https://wearlively.com/*",
    "https://andieswim.com/*",
    "https://yourparade.com/*",
    "https://brightland.co/*",
    "https://omsom.com/*",
    "https://jenis.com/*",
    "https://partakefoods.com/*",
    "https://snowehome.com/*",
    "https://imperfectfoods.com/*",
    // Updated Graza domain to www
    "https://www.graza.co/*",
    "https://flybyjing.com/*",
    "https://getmaude.com/*",
    "https://ugmonk.com/*"
  ],
  all_frames: true
}


const DOMAIN = document.location.hostname;
const LOCAL_CART_STORAGE_KEY = DOMAIN + "-cart";
const INTERVAL_LENGTH = 1000 * 5; // 5 seconds
const cart = new PersistentValue<ShoppingItem[]>(LOCAL_CART_STORAGE_KEY);

function effect(signal: {signal: AbortSignal}) {
  const addToCartButtons = getters.getDomainGetters().addToCartButtons(document.body);
  const placeOrderButtons = getters.getDomainGetters().placeOrderButtons(document.body);
  const checkoutButtons = getters.getDomainGetters().checkoutButtons(document.body);

  checkoutButtons.forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  }, signal);

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
  }, signal);

  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  }, signal);

  saveCurrentItems();
}

function onPlaceOrderClick(e: MouseEvent) {
  const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
  if (isBlocked) return;

  sendAnalytics('place-order', cart.value ?? []);
}

function saveCurrentItems() {
  const items = getters.getDomainGetters().getCartItems(document.body);

  if(items.length === 0) return;

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