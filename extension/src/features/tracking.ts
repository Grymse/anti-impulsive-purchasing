// content.ts

import { type OneBlickBuyButton, type ShoppingItem } from "~lib/getters";
import { Stopwatch } from "ts-stopwatch";
import { sendAnalytics } from "~lib/analytics";
import { cart } from "~lib/purchases";

const INTERVAL_LENGTH = 1000 * 5; // 5 seconds

type TrackerEffect = {
  signal: {signal: AbortSignal};
  addToCartButtons: Element[];
  placeOrderButtons: Element[];
  oneClickBuy?: OneBlickBuyButton[];
  cartItems: ShoppingItem[];
}

export function trackerEffect({signal, addToCartButtons, placeOrderButtons, oneClickBuy, cartItems}: TrackerEffect) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
  }, signal);

  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  }, signal);

  oneClickBuy?.forEach((p) => {
    p.button?.addEventListener("click", () => {onInstantBuyClick([p.item]);});
  }, signal);

  saveCurrentItems(cartItems);
}



function onInstantBuyClick(items: ShoppingItem[]) {
  const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
  if (isBlocked) return;

  if (!isNewOrder(items ?? [])) return;
  
  sendAnalytics('place-order', items);
}

let latestPlacedOrder;

function isNewOrder(order: ShoppingItem[]) : boolean {
  let tempLatestPlacedOrder = latestPlacedOrder;
  latestPlacedOrder = order;
  if(!tempLatestPlacedOrder) return true;
  if(order.length !== tempLatestPlacedOrder.length) return true;
  
  return JSON.stringify(order) !== JSON.stringify(tempLatestPlacedOrder);
}

function onPlaceOrderClick(e: MouseEvent) {
  const isBlocked = document.body.getAttribute('data-plasmo-place-order-blocked') === "true";
  if (isBlocked) return;

  const target = e.target as HTMLElement;
  if((target).id === "less-inner-button-text") {
    target.style.pointerEvents = "none";
  }

  if (!isNewOrder(cart.value ?? [])) return;

  sendAnalytics('place-order', cart.value ?? []);
}

function saveCurrentItems(items: ShoppingItem[]) {
  if(items.length === 0) return;

  if(process.env.NODE_ENV === "development")
    console.log("save items", items);

  cart.value = items;
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

export function trackingInit() {
  setupTimeMeasurement();
  sendAnalytics('page-view', undefined);
}