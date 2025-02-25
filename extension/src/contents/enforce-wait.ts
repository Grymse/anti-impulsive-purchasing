import type { PlasmoCSConfig } from "plasmo";
import { getters as getterRegistry } from "~lib/getters";
import { observer } from "~lib/observer";
import permit, { type Permit } from "~lib/permit";
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

  document.body.setAttribute('data-plasmo-place-order-blocked', permit.isValid() ? "false" : "true");
  document.body.setAttribute('data-plasmo-checkout-blocked', permit.isValid() ? "false" : "true");
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
  const diff = permit.start - now;
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

settings.onInit((settings) => {
  if (!settings.active || !settings.activeStrategies.includes('enforce-wait')) return;
  observer.addEffect(effect)
});
