// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";
import { observer } from "~lib/observer";
import { Stopwatch } from "ts-stopwatch";
import permit from "~lib/permit";
import { consent, sendAnalytics } from "~lib/analytics";
import { PersistentValue } from "~lib/utils";

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://*.ebay.com/*", "https://www.matas.dk/*", "https://www.proshop.dk/*", "https://www.boozt.com/*", "https://www2.hm.com/*", "https://klaedeskabet.dk/*", "https://jeffreestarcosmetics.com/*"],
  all_frames: true,
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

function onPlaceOrderClick(e: Event) {
  if (!permit.isValid()) return;

  sendAnalytics('place-order', cart.value ?? []);
}

function saveCurrentItems() {
  const items = getters.getDomainGetters().getCartItems(document.body);
  if(items.length === 0) return;

  cart.value = items;
}

function onCheckoutClick(e: Event) {
  if (!permit.isValid()) return;
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

consent.onInit((hasConsent) => {
  if (!hasConsent) return;
  setupTimeMeasurement();
  observer.addEffect(effect)
  sendAnalytics('page-view', undefined);
});