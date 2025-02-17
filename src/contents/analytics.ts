// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";
import { observer } from "~lib/observer";
import { Stopwatch } from "ts-stopwatch";
import permit from "~lib/permit";

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://*.ebay.com/*", "https://www.matas.dk/*", "https://www.proshop.dk/*", "https://www.boozt.com/*"], // or specific URLs
  all_frames: true,
}

const DOMAIN = document.location.hostname;
const LOCAL_CART_STORAGE_KEY = DOMAIN + "-cart";
const SESSION_LENGTH = 1000 * 30; // 1000 * 60 * 15; // 30 minutes
const INTERVAL_LENGTH = 1000 * 5; // 5 seconds

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

  chrome.storage.local.get(LOCAL_CART_STORAGE_KEY, (data) => {
    const items = data[LOCAL_CART_STORAGE_KEY];
    sendAnalytics('place-order', items ? JSON.parse(items) : []);
  });
}

function saveCurrentItems() {
  const items = getters.getDomainGetters().getCartItems(document.body);
  if(items.length === 0) return;

  chrome.storage.local.set({[LOCAL_CART_STORAGE_KEY]: JSON.stringify(items)});
}

function onCheckoutClick(e: Event) {
  if (!permit.isValid()) return;
  sendAnalytics('checkout', undefined);
}

function onAddToCartClick(e: Event) {
  sendAnalytics('add-to-cart', undefined);
}

window.addEventListener("load", () => {
    setupTimeMeasurement();
    observer.addEffect(effect)
    sendAnalytics('page-view', undefined);
});

type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: string;
}

type AnalyticsPayloads = {
  'add-to-cart': undefined;
  'checkout': undefined;
  'place-order': ShoppingItem[];
  'page-view': undefined;
  'time-spent': {duration: number};
}

async function sendAnalytics<T extends keyof AnalyticsPayloads>(type: T, payload: AnalyticsPayloads[T]) {
  const data: AnalyticsEvent = {
    type,
    url: window.location.hostname+window.location.pathname,
    payload: JSON.stringify(payload),
    user_id: await getUserId(),
    session_id: await getSessionId(),
    created_at: new Date().toISOString(),
  }

  // Send the analytics data to the server
  console.log(`${data.type} - ${data.url} - ${data.payload}`);
  const URL = process.env.PLASMO_PUBLIC_ANALYTICS_URL + '?apikey=' + process.env.PLASMO_PUBLIC_ANALYTICS_SECRET;
  navigator.sendBeacon(URL,JSON.stringify(data));
}

type SessionID = {
  id: string;
  expires: number;
}

async function getSessionId(): Promise<string> {
  const unparsedSession = (await chrome.storage.local.get('session'))?.["session"];
  const session = JSON.parse(unparsedSession ?? "{}") as SessionID;

  // Create new ID if session is new or previous session has expired
  if(session.id === undefined || session.expires < Date.now()) {
    session.id = crypto.randomUUID();
  }

  // Extend the session expiration time
  session.expires = Date.now() + SESSION_LENGTH;

  await chrome.storage.local.set({session: JSON.stringify(session)});
  return session.id;
}

async function getUserId(): Promise<string> {
  const id = (await chrome.storage.local.get('userid'))?.["userid"];
  if(id) return id;

  const newId = crypto.randomUUID();
  chrome.storage.local.set({userid: newId});
  return newId;
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
