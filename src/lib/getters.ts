
export type ElementGetters = {
    checkoutButtons: () => Element[];
    placeOrderButtons: () => Element[];
    checkoutButtonLabels: () => Element[];
  }

export const amazonGetters: ElementGetters = {
    checkoutButtons: () => {
      const buttons = document.querySelectorAll('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },
    placeOrderButtons: () => {
      const buttonss = document.querySelectorAll('input[name="placeYourOrder1"]');
      return Array.from(buttonss);
    },
    checkoutButtonLabels: () => {
      const buttons = document.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    }
  }

export const zalandoGetters: ElementGetters = {
    checkoutButtons: () => {
        const buttons = document.querySelectorAll('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },
    
    placeOrderButtons: () => { //
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },
    checkoutButtonLabels: () => { //
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    }
}