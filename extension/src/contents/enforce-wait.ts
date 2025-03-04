import type { PlasmoCSConfig } from "plasmo";
import { getters as getterRegistry } from "~lib/getters";
import { observer } from "~lib/observer";
import permit, { type Permit } from "~lib/permit";
import { settings } from "~lib/settings";

export const config: PlasmoCSConfig = {
  matches: [
    // ----- Danish Domains -----
    "https://www.amazon.de/*",
    "https://www.amazon.co.uk/*",
    "https://www.amazon.se/*",
    "https://*.ebay.co.uk/*",
    "https://*.ebay.de/*",
    "https://www.harald-nyborg.dk/*",
    "https://jysk.dk/*",
    "https://www.zalando.dk/*",
    "https://www.matas.dk/*",
    "https://www.proshop.dk/*",
    "https://www.elgiganten.dk/*",
    "https://www.magasin.dk/*",
    "https://www.jemogfix.dk/*",
    "https://www.bilka.dk/*",
    "https://www.foetex.dk/*",
    "https://www.saxo.com/*",
    "https://www.thansen.dk/*",
    "https://www.imerco.dk/*",
    "https://www.xl-byg.dk/*",
    "https://www.sport24.dk/*",
    "https://www.bog-ide.dk/*",
    "https://www.power.dk/*",
    "https://www.Plantorama.dk/*",
    "https://www.kop-kande.dk/*",
    "https://www.avxperten.dk/*",
    "https://www.fleggaard.dk/*",
    "https://ilva.dk/*",
    "https://www.sportsworld.dk/*",
    "https://www.telenor.dk/*",
    "https://www.kids-world.dk/*",
    "https://www.telia.dk/*",
    "https://www.10-4.dk/*",
    "https://www.asos.com/*",
    "https://www.billigvvs.dk/*",
    "https://intersport.dk/*",
    "https://www.ticketmaster.dk/*",
    "https://www.telmore.dk/*",
    "https://www.ditur.dk/*",
    "https://www.quint.dk/*",
    "https://www.maxizoo.dk/*",
    "https://www.fribikeshop.dk/*",
    "https://www.just-eat.dk/*",
    "https://www.bygma.dk/*",
    "https://www.williamdam.dk/*",
    "https://www.av-cables.dk/*",
    "https://www.plantetorvet.dk/*",
    "https://salling.dk/*",
    "https://luksusbaby.dk/*",
    "https://www.apotekeren.dk/*",
    "https://www.lampeguru.dk/*",
    "https://www.billetlugen.dk/*",
    "https://www.computersalg.dk/*",
    "https://havehandel.dk/*",
    "https://www.sinful.dk/*",
    "https://www.kaufmann.dk/*",
    "https://www.callme.dk/*",
    "https://www.hyggeonkel.dk/*",
    "https://legeakademiet.dk/*",
    "https://www.lampemesteren.dk/*",
    "https://www.zooplus.dk/*",
    "https://www.loebeshop.dk/*",
    "https://loberen.dk/*",
    "https://www.cocopanda.dk/*",
    "https://www.calle.dk/*",
    "https://www.mytrendyphone.dk/*",
    "https://www.jacobsenplus.dk/*",
    "https://greenmind.dk/*",
    "https://www.cchobby.dk/*",
    "https://www.komplett.dk/*",
    "https://www.billigparfume.dk/*",
    "https://www.faraos.dk/*",
    "https://www.feline.dk/*",
    "https://www.kitchenone.dk/*",
    "https://moebelkompagniet.dk/*",
    "https://www.luxoliving.dk/*",
    "https://www.av-connection.dk/*",
    "https://sneakerzone.dk/*",
    "https://www.partyking.dk/*",
    "https://www.bygmax.dk/*",
    "https://www.daells-bolighus.dk/*",
    "https://www.greenline.dk/*",
    "https://www.punkt1.dk/*",
    "https://www.illumsbolighus.dk/*",
    "https://www.lirumlarumleg.dk/*",
    "https://www.coolstuff.dk/*",
    "https://www.mobilcovers.dk/*",
    "https://www.grejfreak.dk/*",
    "https://www.flugger.dk/*",
    "https://ingvardchristensen.dk/*",
    "https://mobler.dk/*",
    "https://www.adidas.dk/*",

    // ----- Common domains -----
    "https://*.shein.com/*",
    "https://*.apple.com/*",
    "https://www2.hm.com/*",
    "https://www.boozt.com/*",

    // ----- American domains -----
    "https://www.temu.com/*",
    "https://*.ebay.com/*",
    "https://www.amazon.com/*",
    "https://www.target.com/*",
    "https://www.homedepot.com/*",
    "https://www.costco.com/*",
    "https://www.bestbuy.com/*",
    "https://www.costco.com/*",
    "https://www.kroger.com/*",
    "https://www.aliexpress.com/*",
    "https://www.etsy.com/*",
    "https://www.adidas.com/*",
    "https://www.samsung.com/*",
    "https://www.nike.com/*",
    "https://www.wayfair.com/*",
    "https://www.lowes.com/*",
    "https://www.macys.com/*",
    "https://www.chewy.com/*",
    "https://www.gap.com/*",
    "https://www.wish.com/*",
    "https://www.lg.com/*",
    "https://www.dell.com/*",
    "https://www.kohls.com/*",
    "https://www.walgreens.com/*",
    "https://www.lenovo.com/*",
    "https://www.zara.com/*",
    "https://www.hp.com/*",
    "https://www.ikea.com/*",
    "https://www.nordstrom.com/*",
    "https://us.shein.com/*",

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
    "https://*.chubbiesshorts.com/*",
    "https://www.puravidabracelets.com/*",
    "https://www.nativecos.com/*",
    "https://www.hauslabs.com/*",
    "https://skknbykim.com/*",
    "https://www.harney.com/*",
    "https://www.redbullshopus.com/*",
    "https://tula.com/*",
    "https://*.tula.com/*",
    "https://*.tesla.com/*", // subdomain
    "https://spiritualgangster.com/*",
    "https://www.taylorstitch.com/*",
    "https://www.american-giant.com/*",
    "https://www.drsquatch.com/*",
    "https://mejuri.com/*",
    "https://*.mejuri.com/*",
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
    "https://shop.hedleyandbennett.com/*",
    "https://www.rumpl.com/*",
    "https://*.mizzenandmain.com/*",
    "https://ohpolly.com/*",
    "https://*.tecovas.com/*",
    "https://*.stance.com/*",
    "https://spongelle.com/*",
    "https://www.trueclassictees.com/*",
    "https://*.meundies.com/*",
    "https://studs.com/*",
    "https://jackhenry.co/*",
    "https://www.luxyhair.com/*",
    "https://juicycouture.com/*",
    "https://www.everlast.com/*",
    "https://*.skims.com/*",
    "https://feals.com/*",
    "https://us.foursigmatic.com/*",
    "https://golde.co/*",
    "https://shop.liquid-iv.com/*",
    "https://www.thesill.com/*",
    "https://www.wearlively.com/*",
    "https://andieswim.com/*",
    "https://yourparade.com/*",
    "https://brightland.co/*",
    "https://omsom.com/*",
    "https://jenis.com/*",
    "https://snowehome.com/*",
    "https://www.graza.co/*",
    "https://shop.flybyjing.com/*",
    "https://getmaude.com/*",
    "https://ugmonk.com/*",
    "https://studs.com/*",
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

  getters.getOneClickBuyNow?.(currentTarget)?.forEach((p) => {
    p.button?.addEventListener("click", onPlaceOrderClick);
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
    e.stopImmediatePropagation();
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
    if (e.parentElement) e.parentElement.style.backgroundImage = 'none';  
  }
  else if (Date.now() < currentPermit.start) {
    e.innerText = "Wait " + permitToWaitTime(currentPermit) + " before checking out";
    if (e.parentElement) e.parentElement.style.backgroundImage = 'none';  
  }

}

function updateVisuals() {
  getters.checkoutButtonLabels(currentTarget).forEach(injectVisuals);
  getters.getOneClickBuyNow?.(currentTarget)?.forEach(e => {if(e.label) injectVisuals(e.label)});
}

settings.onInit((settings) => {
  if (!settings.active || !settings.activeStrategies.includes('enforce-wait')) return;
  observer.addEffect(effect)
});
