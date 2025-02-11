
export type ElementGetters = {
    checkoutButtons: () => Element[];
    placeOrderButtons: () => Element[];
    checkoutButtonLabels: () => Element[];
    addToCartButtons: () => Element[];
}

type GetterRegister = {
    register: (domain: string, getters: ElementGetters) => void;
    _getters: Map<string,ElementGetters>;
    getDomainGetters : () => ElementGetters;
}

/**
 * A registry for storing and retrieving element getters based on domain.
 */
export const getters: GetterRegister = {
    /**
     * Registers a set of element getters for a specific domain.
     * 
     * @param domain - The domain for which the getters are being registered.
     * @param getters - The set of element getters to register.
     */
    register: function(domain: string, getters: ElementGetters) {
        this._getters.set(domain, getters);
    },

    /**
     * A private map storing the registered element getters by domain.
     */
    _getters: new Map<string, ElementGetters>(),

    /**
     * Retrieves the element getters for the current domain.
     * 
     * @returns The set of element getters for the specified domain, or default getters if none are registered.
     */
    getDomainGetters: function() {
        const domain = document.location.hostname;
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
    },

    addToCartButtons: () => {
      const buttons = document.querySelectorAll('#add-to-cart-button, input[name="submit.addToCart"], .add-to-cart .a-button-input');
      buttons.forEach(button => button.parentElement.style.backgroundColor = 'red');
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
    },

    addToCartButtons: () => {
        return [];
      }
});