
export type ElementGetters = {
    checkoutButtons: () => Element[];
    placeOrderButtons: () => Element[];
    checkoutButtonLabels: () => Element[];
    addToCartButtons: () => Element[];
    getCartItems: () => ShoppingItem[];
}

export type ShoppingItem = {
    quantity: number;
    price: number;
    currency: string;
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
            checkoutButtonLabels: () => [],
            addToCartButtons: () => [],
            getCartItems: () => []
        };
    }
}

getters.register('www.amazon.com', {
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
      const buttons = document.querySelectorAll('#add-to-cart-button, [name="submit.addToCart"], .add-to-cart .a-button-input, input[data-asin], div[data-csa-c-action="addToCart"] button');
      buttons.forEach(button => button.parentElement.style.backgroundColor = 'red');
      return Array.from(buttons);
    },

    getCartItems: () => {
        const quantities = document.querySelectorAll<HTMLElement>('div[name="sc-quantity"] span[data-a-selector="value"]')
        const priceSymbol = document.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-symbol');
        const priceWhole = document.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-whole');
        const priceFraction = document.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-fraction');
        const items = [];
        for (let i = 0; i < priceSymbol.length; i++) {
            items.push({
                quantity: parseInt(quantities[i].innerText),
                price: parseFloat(priceWhole[i].innerText) + parseFloat(priceFraction[i].innerText) / 100,
                currency: priceSymbol[i].innerText
            });
        }
        /* const elements = document.querySelectorAll<HTMLElement>('span.a-list-item div[data-csa-c-type="item"]');
        const x = elements.entries().map(([_, element]) => {
            return {
                quantity: parseFloat(element.getAttribute('data-quantity')),
                price: parseFloat(element.getAttribute('data-price')),
                currency: JSON.parse(element.getAttribute('data-subtotal'))?.subtotal?.code
            }
        }).toArray(); */
        return items;
    }
});

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
    },

    getCartItems: () => {
        return [];
    }
});