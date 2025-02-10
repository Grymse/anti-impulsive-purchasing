import type { PlasmoCSConfig } from "plasmo"

type Permit = {
  start: number;
  end: number;
}
 
export const config: PlasmoCSConfig = {
  /* matches: ["https://www.amazon.com/*"], // or specific URLs */
  matches: ["<all_urls>"], // or specific URLs
  all_frames: true,
}

const PERMIT_LENGTH = 5000 //1000 * 60 * 60 * 24 * 3; // 3 days
const PERMIT_WAIT_TIME = 5000 //1000 * 60 * 60 * 24 * 2; // 20 minutes
const DOMAIN = document.location.hostname;
let permit : Permit | null = null;

function getCheckoutButtons(): Element[] {
  const amazonButton = document.querySelectorAll('input[name="proceedToRetailCheckout"]');
  return Array.from(amazonButton);
}

function getCheckoutButtonLabels(): Element[] {
  const amazonButton = document.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"]');
  return Array.from(amazonButton);
}

function getPlaceOrderButtons(): Element[] {
  const amazonButtons = document.querySelectorAll('input[name="placeYourOrder1"]');
  return Array.from(amazonButtons);
}

function setup() {
  loadPermit();
  const checkoutButtons = getCheckoutButtons();
  const checkoutButtonLabels = getCheckoutButtonLabels();
  const placeOrderButtons = getPlaceOrderButtons();
  checkoutButtons.forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  });

  checkoutButtonLabels.forEach(injectVisuals);

  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  });
  
}


async function loadPermit() {
  const loadedObject = (await chrome.storage.local.get(DOMAIN)) as Record<string, Permit>;
  permit = loadedObject[DOMAIN] ?? null
}

function onPlaceOrderClick(e: Event)  {
  const permit = getOrCreatePermit();
  if (!isPermitValid(permit)) {
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait a few minutes before checking out.");
    return;
  }

  clearPermit();
}

function clearPermit() {
  permit = null;
  chrome.storage.local.remove(DOMAIN);
}

function onCheckoutClick(e: Event) {
  const permit = getOrCreatePermit();
  if (!isPermitValid(permit)) {
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait a few minutes before checking out.");
  }
}

function permitToWaittime(permit: Permit) : string {
  const now = Date.now();
  const diff = permit.end - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function injectVisuals(e: HTMLElement) {
  /* if (!permit) return;
  if (permit.end < Date.now() ) return; */
  console.log(permit);
  e.innerText = "Wait " + Number(1234).toString() + " before checking out";
}


function getOrCreatePermit() : Permit {
  // Is there permit?
  if (!permit) return createNewPermit();

  const now = Date.now();
  const permitExpired = permit.end < now;
  const permitIsValid = permit.start < now && !permitExpired;

  // Is there permit?
  if (permitExpired) return createNewPermit();

  return permit;
}

function isPermitValid(permit: Permit) : boolean {
  if (!permit) return false;

  const now = Date.now();
  const permitExpired = permit.end < now;
  const permitIsValid = permit.start < now && !permitExpired;

  return permitIsValid;
};

function createNewPermit() : Permit {
  permit = {
    start: Date.now() + PERMIT_WAIT_TIME,
    end: Date.now() + PERMIT_LENGTH + PERMIT_WAIT_TIME
  }

  chrome.storage.local.set({[DOMAIN]: permit});
  // TODO: Inject visuals

  return permit;
}

window.addEventListener("load", setup);
