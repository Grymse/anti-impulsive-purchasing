import type { PlasmoCSConfig } from "plasmo";
import { consent } from "~lib/analytics";
import { getters as getterRegistry } from "~lib/getters";
import { observer } from "~lib/observer";
import permit, { type Permit } from "~lib/permit";

export const config: PlasmoCSConfig = {
    matches: ["https://www.amazon.com/*", "https://www.zalando.dk/*", "https://www.walmart.com/*", "https://*.ebay.com/*", "https://www.matas.dk/*", "https://www.proshop.dk/*", "https://www.boozt.com/*"], // or specific URLs
    all_frames: true,
}

const getters = getterRegistry.getDomainGetters();

let currentTarget = document.body;

function effect(signal: {signal: AbortSignal}) {
  updateVisuals();

  // Add event listeners to the checkout buttons
  getters.checkoutButtons(currentTarget).forEach((button) => {
    button.addEventListener("click", onCheckoutClick);
  }, signal);

  // Add event listeners to the place order buttons
  getters.placeOrderButtons(currentTarget).forEach((button) => {
    button.addEventListener("click", onPlaceOrderClick);
  }, signal);
}

function onPlaceOrderClick(e: Event)  {
  permit.createIfNone();
  updateVisuals();

  if (!permit.isValid()) {
    // Prevent the default action and stop event propagation if the permit is not valid
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait before checking out.");
    return;
  }

  // Clear the permit if it is valid
  permit.markAsUsed();
}


function onCheckoutClick(e: Event) {
  permit.createIfNone();
  updateVisuals();

  if (!permit.isValid()) {
    // Prevent the default action and stop event propagation if the permit is not valid
    e.preventDefault();
    e.stopPropagation();
    alert("Please wait before checking out.");
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
  const currentPermit = permit.get();

  // Update the button label based on the permit status
  if (!currentPermit || currentPermit.end < Date.now()) {
    e.innerText = "Start checkout wait timer";  
  }
  else if (Date.now() < currentPermit.start) {
    e.innerText = "Wait " + permitToWaitTime(currentPermit) + " before checking out";
  }
}

function updateVisuals() {
  getters.checkoutButtonLabels(currentTarget).forEach(injectVisuals);
}

window.addEventListener("load", () =>{
    consent.onInit((hasConsent) => {
      if (!hasConsent) return;
      observer.addEffect(effect)
  });
});
