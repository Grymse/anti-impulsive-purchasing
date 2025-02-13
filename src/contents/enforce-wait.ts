import { getters as getterRegistry } from "~lib/getters";

import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
    matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://*.ebay.com/*", "https://www.matas.dk/*", "https://www.proshop.dk/*", "https://www.boozt.com/*"], // or specific URLs
    all_frames: true,
    run_at: "document_idle",
}

type Permit = {
  start: number;
  end: number;
}

const PERMIT_LENGTH = 50000 //1000 * 60 * 60 * 24 * 3; // 3 days
const PERMIT_WAIT_TIME = 50000 //1000 * 60 * 60 * 24 * 2; // 2 days
const DOMAIN = document.location.hostname;
let permit : Permit | null = null;

const getters = getterRegistry.getDomainGetters();

console.log("LESS IS ACTIVE");

function setup() {
  // Load the existing permit from storage
  loadPermit();

  // Get the checkout and place order buttons using the getters
  const checkoutButtons = getters.checkoutButtons();
  const placeOrderButtons = getters.placeOrderButtons();

  // Add event listeners to the checkout buttons
  checkoutButtons.forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  });

  // Add event listeners to the place order buttons
  placeOrderButtons.forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  });
}
async function loadPermit() {
  // Load the permit from local storage
  const loadedObject = (await chrome.storage.local.get(DOMAIN)) as Record<string, Permit>;
  permit = loadedObject[DOMAIN] ?? null;
  
  // Update the checkout button labels with the current permit status
  const checkoutButtonLabels = getters.checkoutButtonLabels();
  checkoutButtonLabels.forEach(injectVisuals);
}
function onPlaceOrderClick(e: Event)  {
  const permit = getOrCreatePermit();
  
  if (!isPermitValid(permit)) {
    // Prevent the default action and stop event propagation if the permit is not valid
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait a few minutes before checking out.");
    return;
  }

  // Clear the permit if it is valid
  clearPermit();
}

function clearPermit() {
  permit = null;
  chrome.storage.local.remove(DOMAIN);
}
function onCheckoutClick(e: Event) {
  const permit = getOrCreatePermit();
  
  // Check if the permit is valid
  if (!isPermitValid(permit)) {
    // Prevent the default action and stop event propagation if the permit is not valid
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait a few minutes before checking out.");
  }
}

function permitToWaitTime(permit: Permit) : string {
  // Calculate the remaining wait time in hours and minutes
  const now = Date.now();
  const diff = permit.end - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function injectVisuals(e: HTMLElement) {
  // Update the button label based on the permit status
  if (!permit || permit.end < Date.now()) {
    e.innerText = "Start checkout wait timer";  
  }
  else if (Date.now() < permit.start) {
    e.innerText = "Wait " + permitToWaitTime(permit) + " before checking out";
  }
  else {
    e.innerText = "Checkout";
  }
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

/**
 * Creates a new permit with a start time delayed by `PERMIT_WAIT_TIME` and an end time
 * delayed by `PERMIT_LENGTH` plus `PERMIT_WAIT_TIME`. The permit is then stored in
 * Chrome's local storage under the key `DOMAIN` and visuals are injected into the
 * checkout button labels.
 *
 * @returns {Permit} The newly created permit object.
 */
function createNewPermit() : Permit {
  permit = {
    start: Date.now() + PERMIT_WAIT_TIME,
    end: Date.now() + PERMIT_LENGTH + PERMIT_WAIT_TIME
  }

  chrome.storage.local.set({[DOMAIN]: permit});
  getters.checkoutButtonLabels().forEach(injectVisuals);

  return permit;
}

/* window.addEventListener("load", setup); */
