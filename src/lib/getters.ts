
export type ElementGetters = {
    checkoutButtons: (e: HTMLElement) => Element[];
    placeOrderButtons: (e: HTMLElement) => Element[];
    checkoutButtonLabels: (e: HTMLElement) => Element[];
    addToCartButtons: (e: HTMLElement) => Element[];
    getCartItems: (e: HTMLElement) => ShoppingItem[];
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
            checkoutButtons: (e: HTMLElement) => [],
            placeOrderButtons: (e: HTMLElement) => [],
            checkoutButtonLabels: (e: HTMLElement) => [],
            addToCartButtons: (e: HTMLElement) => [],
            getCartItems: (e: HTMLElement) => []
        };
    }
}

getters.register('www.amazon.com', {
    checkoutButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('input[name="proceedToRetailCheckout"]');
      return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('input[name="placeYourOrder1"]');
      return Array.from(buttons);
    },

    checkoutButtonLabels: (e: HTMLElement) => { 
      const buttons = e.querySelectorAll('div[data-feature-id="proceed-to-checkout-label"], #submitOrderButtonId-announce, #bottomSubmitOrderButtonId-announce');
      return Array.from(buttons);
    },

    addToCartButtons: (e: HTMLElement) => {
      const buttons = e.querySelectorAll('#add-to-cart-button, [name="submit.addToCart"], .add-to-cart .a-button-input, input[data-asin], div[data-csa-c-action="addToCart"] button');
      buttons.forEach(button => button.parentElement.style.backgroundColor = 'red');
      return Array.from(buttons);
    },

    getCartItems: (e: HTMLElement) => {
        const quantities = e.querySelectorAll<HTMLElement>('div[name="sc-quantity"] span[data-a-selector="value"]')
        const priceSymbol = e.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-symbol');
        const priceWhole = e.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-whole');
        const priceFraction = e.querySelectorAll<HTMLElement>('#sc-active-cart .a-price span.a-price-fraction');
        let items = [];
        for (let i = 0; i < priceSymbol.length; i++) {
            items.push({
                quantity: parseInt(quantities[i].innerText),
                price: parseFloat(priceWhole[i].innerText) + parseFloat(priceFraction[i].innerText) / 100,
                currency: priceSymbol[i].innerText
            });
        }
        
        const rightSideList = e.querySelectorAll<HTMLElement>('.ewc-item');
        if(rightSideList.length === 0) return items;
        items = [];
        rightSideList.forEach(item => {
            const quantity = parseInt(item.querySelector<HTMLElement>('[data-a-selector="value"]').innerText);
            const {price, currency} = splitPriceCurrency(item.querySelector<HTMLElement>('.ewc-unit-price span').innerText);
            items.push({ quantity, price, currency });
        });
        
        return items;
    }
});

function splitPriceCurrency(price: string) {
    const numericPrice = price.match(/[\d,.]+/);
    const currency = price.replace(numericPrice ? numericPrice[0] : '', '');
    return { price: parseFloat(numericPrice[0].replace(',', '.')), currency };
}

getters.register('www.zalando.dk', {
    checkoutButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="proceed-to-checkout-button"]');
        return Array.from(buttons);
    },

    placeOrderButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        return Array.from(buttons);
    },
    
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-id="proceed-to-checkout-button"], button[data-id="buy-now-button-top"], button[data-id="buy-now-button-bottom"]');
        //@ts-expect-error
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },

    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
});

getters.register("www.walmart.com", {
    checkoutButtons: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },
  
    placeOrderButtons: (e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
  
    checkoutButtonLabels: (e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[id="Continue to checkout button"]')
        return Array.from(buttons)
    },

    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
  })

  getters.register("cart.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-test-id="cart-checkout-button"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[data-test-id="cta-top"]')
        return Array.from(buttons)
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register("pay.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll<HTMLElement>('#gpay-button-online-api-id, div[data-test-id="PAYPAL_CTA_BUTTON"]')
        buttons.forEach(button => button.style.backgroundColor = 'red');
        return Array.from(buttons);
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})


getters.register("www.ebay.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = [];
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('#binBtn_btn_1, div.gh-minicart-action a[aria-label="Checkout"]')
        return Array.from(buttons);
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

    //TODO - Reactive components, create mutation observer
getters.register("www.matas.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh BasketPowerstepOpener__StyledButtonWithSpinner-sc-1s4iypb-1 BasketPowerstepOpener___StyledStyledButtonWithSpinner-sc-1s4iypb-2 VvhEn bFKtaQ"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh"]');
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh BasketPowerstepOpener__StyledButtonWithSpinner-sc-1s4iypb-1 BasketPowerstepOpener___StyledStyledButtonWithSpinner-sc-1s4iypb-2 VvhEn bFKtaQ"], button[class="Button__StyledButton-sc-1hw8wt-0 AmFIh"]')
        //@ts-expect-error
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('div')));
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

getters.register("www.proshop.dk", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('button[name="paymentOption"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('a[class="btn site-btn-tall site-btn-green pull-right ml-2"], a[class="btn site-btn-tall site-btn-green"], span[data-amountformat="dubbleLine"]')
        return Array.from(buttons)
        //button[name="paymentOption"]
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

//TODO - Client side rendering, som wall mart
getters.register("www.boozt.com", {
    checkoutButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
        return Array.from(buttons)
    },  
    placeOrderButtons:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
        return Array.from(buttons)
    },
    checkoutButtonLabels:(e: HTMLElement) => {
        const buttons = e.querySelectorAll('div[class="shopcart-order-summary__action"], div[class="shopcart-quick-checkout__content"]')
        //@ts-expect-error
        return Array.from(buttons.entries().map(([_, element]) => element.querySelector('span')));
    },
    addToCartButtons: (e: HTMLElement) => {
        return [];
    },

    getCartItems: (e: HTMLElement) => {
        return [];
    }
})

