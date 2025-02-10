
export type ElementGetters = {
    checkoutButtons: () => Element[];
    placeOrderButtons: () => Element[];
    checkoutButtonLabels: () => Element[];
  }

type GetterRegister = {
    register: (domain: string, getters: ElementGetters) => void;
    _getters: Map<string,ElementGetters>;
    getDomainGetters : (url: string) => ElementGetters;
}

export const getters: GetterRegister = {
    register: function(domain: string, getters: ElementGetters) {
        this._getters.set(domain, getters);
    },
    _getters: new Map(),
    getDomainGetters: function(domain: string) {
        return this._getters.get(domain) || {
            checkoutButtons: () => [],
            placeOrderButtons: () => [],
            checkoutButtonLabels: () => []
        };
    }
}

getters.register('www.amazon.com',  {
    checkoutButtons: () => {
      const buttons = document.querySelectorAll('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },

    placeOrderButtons: () => {
      const buttons = document.querySelectorAll('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    checkoutButtonLabels: () => {
      const buttons = document.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    }
}
);

getters.register('www.zalando.dk', {
    checkoutButtons: () => {
        const buttons = document.querySelectorAll('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },

    placeOrderButtons: () => {
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },
    
    checkoutButtonLabels: () => {
        const buttons = document.querySelectorAll('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    }
});