// content.ts

import type { PlasmoCSConfig } from "plasmo";
import { getters, type ShoppingItem } from "~lib/getters";

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://www.ebay.com/*"], // or specific URLs
  all_frames: true,
}


async function setup() {
  const addToCartButtons = getters.getDomainGetters().addToCartButtons();
  /* test(); */
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", onAddToCartClick);
  });

  await delay(1000);

  const items = getters.getDomainGetters().getCartItems();
  console.log(items);
}

function onAddToCartClick(e: Event) {
  sendAnalytics('add-to-cart', undefined);
}

window.addEventListener("load", setup);

type AnalyticsEvent = {
  type: keyof AnalyticsPayloads;
  url: string;
  payload: string;
  userId: string;
  sessionId: string;
  unixTime: number;
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
    userId: getUserId(),
    sessionId: getSessionId(),
    unixTime: Date.now()
  }

  // Send the analytics data to the server
  console.log("ANALYTICS:",data);
}

// TODO: Create if none. Reset if expired?
function getSessionId() {
  return 'sessionid'
}

// TODO: Create if none.
function getUserId(): string {
  return 'userid'
}

/* function test() {
  const button = document.querySelector<HTMLElement>('#add-to-cart-button');
  const section = button.closest(".a-section");
  const site = button.closest("#ppd");
  const buttons : AddButton[] = [];

  buttons.push({
    button,
    getItems: () => {
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

  const tableButtons = document.querySelectorAll<HTMLElement>('table input[name="submit.addToCart"]');

  tableButtons.forEach((button, index) => {
    const table = button.closest('table');
    const pricetr = table.querySelectorAll('tr')[2];
    buttons.push({
      button,
      getItems: () => {
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

  const bothToCartButton = document.querySelector<HTMLElement>('div[data-price-totals] input[name="submit.addToCart"]');
  buttons.push({
    button: bothToCartButton,
    getItems: () => {
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

type AddButton = {
  button: HTMLElement;
  getItems: () => ShoppingItem[];
}