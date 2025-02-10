import type { PlasmoCSConfig } from "plasmo"
import { getters as getterRegistry } from "~lib/getters";

type Permit = {
  start: number;
  end: number;
}
 
export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*"], // or specific URLs
  all_frames: true,
}

const PERMIT_LENGTH = 50000 //1000 * 60 * 60 * 24 * 3; // 3 days
const PERMIT_WAIT_TIME = 50000 //1000 * 60 * 60 * 24 * 2; // 20 minutes
const DOMAIN = document.location.hostname;
let permit : Permit | null = null;

const getters = getterRegistry.getDomainGetters(DOMAIN);

function setup() {
  loadPermit();
  const checkoutButtons = getters.checkoutButtons();
  const placeOrderButtons = getters.placeOrderButtons();
  checkoutButtons.forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  });
  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  });
  
}

async function loadPermit() {
  const loadedObject = (await chrome.storage.local.get(DOMAIN)) as Record<string, Permit>;
  permit = loadedObject[DOMAIN] ?? null
  const checkoutButtonLabels = getters.checkoutButtonLabels();
  checkoutButtonLabels.forEach(injectVisuals);
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

function permitToWaitTime(permit: Permit) : string {
  const now = Date.now();
  const diff = permit.end - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function injectVisuals(e: HTMLElement) {
  if (!permit || permit.end < Date.now()) {
    e.innerText = "Start checkout wait timer";  
  }
  else if (Date.now() < permit.start) {
    e.innerText = "Wait " + permitToWaitTime(permit) + " before checking out";
  }
  else e.innerText = "Checkout";
}


function getOrCreatePermit() : Permit {
  // Create new permit if necessary?
  if (!permit) return createNewPermit();

  const now = Date.now();
  const permitExpired = permit.end < now;

  // Is permit expired?
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
  getters.checkoutButtonLabels().forEach(injectVisuals);

  return permit;
}

window.addEventListener("load", setup);
