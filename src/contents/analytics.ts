// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";
import { observer } from "~lib/observer";

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://www.ebay.com/*"], // or specific URLs
  all_frames: true,
}

const DOMAIN = document.location.hostname;
const LOCAL_CART_STORAGE_KEY = DOMAIN + "cart";
const SESSION_LENGTH = 1000 * 60 * 15; // 30 minutes

function effect(signal: {signal: AbortSignal}) {
  const addToCartButtons = getters.getDomainGetters().addToCartButtons(document.body);
  const placeOrderButtons = getters.getDomainGetters().placeOrderButtons(document.body);
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
  }, signal);

  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  }, signal);

  saveCurrentItems();
}

function onPlaceOrderClick(e: Event) {
  const items = getters.getDomainGetters().getCartItems(document.body);
  sendAnalytics('place-order', items);
}

function saveCurrentItems() {
  const items = getters.getDomainGetters().getCartItems(document.body);
  if(items.length === 0) return;
  localStorage.setItem(LOCAL_CART_STORAGE_KEY, JSON.stringify(items));
}

function onAddToCartClick(e: Event) {
  sendAnalytics('add-to-cart', undefined);
}

window.addEventListener("load", () =>{
    observer.addEffect(effect)
});


type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  user_id: string;
  session_id: string;
  created_at: number;
}

type AnalyticsPayloads = {
  'add-to-cart': undefined;
  'checkout': ShoppingItem[];
  'place-order': ShoppingItem[];
}

function sendAnalytics<T extends keyof AnalyticsPayloads>(type: T, payload: AnalyticsPayloads[T]) {
  const data: AnalyticsEvent = {
    type,
    url: window.location.href,
    payload: JSON.stringify(payload),
    user_id: getUserId(),
    session_id: getSessionId(),
    created_at: Date.now()
  }

  // Send the analytics data to the server
  console.log("ANALYTICS:",data);
}

type SessionID = {
  id: string;
  expires: number;
}

function getSessionId() {
  const session = JSON.parse(localStorage.getItem('sessionid')) as SessionID | undefined;

  if(session && session.expires > Date.now()) {
    session.expires = Date.now() + SESSION_LENGTH;
    localStorage.setItem('sessionid', JSON.stringify(session));
    return session.id;
  }

  const newSession = {
    id: crypto.randomUUID(),
    expires: Date.now() + SESSION_LENGTH
  }
  localStorage.setItem('sessionid', JSON.stringify(newSession));

  return newSession.id;
}

function getUserId(): string {
  const id = localStorage.getItem('userid');
  if(id) return id;

  const newId = crypto.randomUUID();
  localStorage.setItem('userid', newId);
  return newId;
}


/* function test() {
  const button = e.querySelector<HTMLElement>('#add-to-cart-button');
  const section = button.closest(".a-section");
  const site = button.closest("#ppd");
  const buttons : AddButton[] = [];

  buttons.push({
    button,
    getItems: (e: HTMLElement) =>{
      const id = site?.querySelector<HTMLElement>('#title')?.innerText;
      const quantity = section?.querySelector<HTMLElement>('.a-dropdown-prompt')?.innerText;
      const priceWhole = section?.querySelector<HTMLElement>('.a-offscreen')?.innerText;
      const currency = section?.querySelector<HTMLElement>('.a-price-symbol')?.innerText;
      const price = priceWhole?.replace(currency, '');

      return [{
        quantity: quantity ? parseInt(quantity) : 0,
        price: price ? parseFloat(price) : 0,
        currency: currency ? currency : '',
      }];
    },
  });

  const tableButtons = e.querySelectorAll<HTMLElement>('table input[name="submit.addToCart"]');

  tableButtons.forEach((button, index) => {
    const table = button.closest('table');
    const pricetr = table.querySelectorAll('tr')[2];
    buttons.push({
      button,
      getItems: (e: HTMLElement) =>{
        const priceWhole = pricetr?.querySelectorAll<HTMLElement>('.a-offscreen')[index]?.innerText;
        const currency = pricetr?.querySelectorAll<HTMLElement>('.a-price-symbol')[index]?.innerText;
        const price = priceWhole?.replace(currency, '');

        return [{
          quantity: 1,
          price: price ? parseFloat(price) : 0,
          currency: currency ? currency : '',
        }];
      },
    });
  });

  const bothToCartButton = e.querySelector<HTMLElement>('div[data-price-totals] input[name="submit.addToCart"]');
  buttons.push({
    button: bothToCartButton,
    getItems: (e: HTMLElement) =>{
      const data = JSON.parse(bothToCartButton.closest('div[data-price-totals]').getAttribute('data-components'));
      
      return Object.values(data).map((item: any) => {
        console.log(item);
        const currency = item?.price?.currencySymbol;
        const price = item.price.displayString.replace(currency, '');
        return {
          quantity: item.minQuantity,
          price: price ? parseFloat(price) : 0,
          currency: currency ? currency : '',
        };
      });
  }});

  buttons.flatMap(button => button.getItems()).forEach(console.log);
  buttons.forEach(button => {
    button.button.parentElement.style.backgroundColor = 'red';
  });
}
 */
/* 
type AddButton = {
  button: HTMLElement;
  getItems: () =>ShoppingItem[];
} */